/**
 * NOVA CREDIT - BORROWER DEMO APP LOGIC
 * Manages the mobile-first simulation experience.
 */

const SCREEN_ORDER = [
    'landing', 'profile', 'info', 'kyc', 'consent', 'bureau', 
    'aa', 'risk', 'decision', 'offer', 'agreement', 'disbursement', 
    'dashboard', 'summary'
];

const app = {
    currentScreenId: 'landing',
    profile: null,
    decisionResult: null,

    init() {
        this.parseUrlParams();
        this.renderPresetProfiles();
        this.setupAssessmentForm();
        this.updateProgress();

        // Check if we need to auto-start
        if (AppState.selectedProfile && AppState.demoView.currentScreen !== 'landing') {
            this.profile = BORROWER_PROFILES[AppState.selectedProfile];
            this.prefillInfo();
            this.navigateTo(AppState.demoView.currentScreen, true);
        }
    },

    parseUrlParams() {
        const params = getUrlParams();
        if (params.profile && BORROWER_PROFILES[params.profile]) {
            AppState.selectedProfile = params.profile;
        }
        if (params.screen && SCREEN_ORDER.includes(params.screen)) {
            AppState.demoView.currentScreen = params.screen;
        }
    },

    navigateTo(screenId, noAnimation = false) {
        if (!SCREEN_ORDER.includes(screenId)) return;

        const currentScreen = document.getElementById(`screen-${this.currentScreenId}`);
        const nextScreen = document.getElementById(`screen-${screenId}`);

        if (currentScreen && nextScreen) {
            if (!noAnimation) {
                currentScreen.classList.add('exit-left');
                setTimeout(() => {
                    currentScreen.classList.remove('active', 'exit-left');
                }, 400);
            } else {
                currentScreen.classList.remove('active');
            }

            nextScreen.classList.add('active');
            
            // Screen specific initialization
            this.initScreen(screenId);

            this.currentScreenId = screenId;
            AppState.demoView.currentScreen = screenId;
            this.updateProgress();
        }
    },

    updateProgress() {
        const progressContainer = document.getElementById('progress-container');
        const progressBar = document.getElementById('journey-progress');
        
        if (this.currentScreenId === 'landing' || this.currentScreenId === 'profile') {
            progressContainer.classList.add('hidden');
        } else {
            progressContainer.classList.remove('hidden');
            const currentIndex = SCREEN_ORDER.indexOf(this.currentScreenId);
            const total = SCREEN_ORDER.length - 2; // exclude landing/profile
            const percentage = Math.max(0, Math.min(100, ((currentIndex - 1) / total) * 100));
            progressBar.style.width = `${percentage}%`;
        }
    },

    initScreen(screenId) {
        switch (screenId) {
            case 'info':
                if (this.profile) this.prefillInfo();
                break;
            case 'consent':
                // Reset toggles
                document.querySelectorAll('.consent-toggle').forEach(t => t.checked = false);
                this.checkConsents();
                break;
            case 'bureau':
                this.simulateBureau();
                break;
            case 'aa':
                this.simulateAA();
                break;
            case 'risk':
                this.simulateRisk();
                break;
            case 'offer':
                this.initOffer();
                break;
            case 'agreement':
                this.initAgreement();
                break;
            case 'disbursement':
                this.simulateDisbursement();
                break;
            case 'dashboard':
                this.initDashboard();
                break;
            case 'summary':
                this.renderSummary();
                break;
        }
    },

    renderPresetProfiles() {
        const container = document.getElementById('preset-profiles');
        container.innerHTML = '';

        Object.values(BORROWER_PROFILES).forEach(p => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-sm btn-ghost';
            btn.style.cssText = `display:flex; flex-direction:column; align-items:center; gap:2px; padding:8px 12px; border-color:${p.color}40;`;
            btn.innerHTML = `
                <span style="font-size:1.4rem">${p.avatar}</span>
                <span style="font-size:11px; font-weight:600; color:${p.color}">${p.name.split(' ')[0]}</span>
            `;
            btn.onclick = () => {
                this.profile = p;
                selectProfile(p.id);
                this.navigateTo('info');
            };
            container.appendChild(btn);
        });
    },

    setupAssessmentForm() {
        // Enable the "Assess" button only when all dropdowns are filled
        const selects = ['assess-income', 'assess-employment', 'assess-emi', 'assess-credit', 'assess-experience'];
        const nameInput = document.getElementById('assess-name');
        const btn = document.getElementById('btn-assess');

        const checkReady = () => {
            const allFilled = selects.every(id => document.getElementById(id).value !== '') && nameInput.value.trim() !== '';
            btn.disabled = !allFilled;
            if (allFilled) {
                btn.classList.remove('disabled');
            } else {
                btn.classList.add('disabled');
            }
        };

        selects.forEach(id => document.getElementById(id).addEventListener('change', checkReady));
        nameInput.addEventListener('input', checkReady);
    },

    assessAndBucket() {
        const income = parseInt(document.getElementById('assess-income').value);
        const employment = document.getElementById('assess-employment').value;
        const existingEmi = parseInt(document.getElementById('assess-emi').value);
        const creditScore = parseInt(document.getElementById('assess-credit').value);
        const experience = parseFloat(document.getElementById('assess-experience').value);
        const userName = document.getElementById('assess-name').value.trim();

        // ── Bucketing Algorithm ──
        // Score each dimension on 0-10 scale, then classify
        let score = 0;

        // Income scoring (max 10)
        if (income >= 80000) score += 10;
        else if (income >= 50000) score += 7;
        else if (income >= 30000) score += 4;
        else score += 2;

        // Credit history scoring (max 10)
        if (creditScore >= 750) score += 10;
        else if (creditScore >= 700) score += 7;
        else if (creditScore >= 650) score += 4;
        else score += 1;

        // EMI burden scoring (max 10, lower is better)
        const foirEstimate = income > 0 ? (existingEmi / income) * 100 : 100;
        if (foirEstimate <= 10) score += 10;
        else if (foirEstimate <= 25) score += 7;
        else if (foirEstimate <= 40) score += 4;
        else score += 1;

        // Experience scoring (max 5)
        if (experience >= 6) score += 5;
        else if (experience >= 3) score += 4;
        else if (experience >= 1) score += 2;
        else score += 1;

        // Employment stability (max 5)
        if (employment === 'Salaried-Govt') score += 5;
        else if (employment === 'Salaried-Private') score += 4;
        else score += 2;

        // ── Classification thresholds ──
        // Total possible: 40. A ≥ 28, B ≥ 18, C < 18
        // Also apply hard rules
        let bucketId;
        if (creditScore < 650 || foirEstimate > 55) {
            bucketId = 'C'; // Hard rule: poor credit or high debt
        } else if (score >= 28) {
            bucketId = 'A'; // Strong profile
        } else if (score >= 18) {
            bucketId = 'B'; // Moderate / thin-file
        } else {
            bucketId = 'C'; // Weak profile
        }

        const matchedProfile = BORROWER_PROFILES[bucketId];
        this.profile = matchedProfile;

        // Override the profile name with user's name
        this.profile = { ...matchedProfile };
        this.profile.name = userName || matchedProfile.name;

        selectProfile(bucketId);
        // Override name in state too
        AppState.journey.applicationData.name = this.profile.name;

        // Show result card
        const resultDiv = document.getElementById('bucket-result');
        const card = document.getElementById('bucket-card');
        card.style.borderLeft = `4px solid ${matchedProfile.color}`;
        card.style.background = matchedProfile.badgeColor;
        document.getElementById('bucket-avatar').textContent = matchedProfile.avatar;
        document.getElementById('bucket-label').textContent = matchedProfile.label;
        document.getElementById('bucket-label').style.color = matchedProfile.color;
        document.getElementById('bucket-tagline').textContent = matchedProfile.tagline;
        resultDiv.classList.remove('hidden');

        // Hide assess button, show continue
        document.getElementById('btn-assess').classList.add('hidden');
        document.getElementById('btn-assess-continue').classList.remove('hidden');

        // Scroll to result
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },

    prefillInfo() {
        if (!this.profile) return;
        document.getElementById('input-name').value = this.profile.name;
        document.getElementById('input-mobile').value = this.profile.mobile;
        document.getElementById('input-emp-type').value = this.profile.employmentType;
        document.getElementById('input-income').value = this.profile.income;
    },

    async simulateKYC() {
        const btn = document.getElementById('btn-start-kyc');
        const progress = document.getElementById('kyc-progress');
        const continueBtn = document.getElementById('btn-kyc-continue');
        
        btn.disabled = true;
        btn.innerText = 'Verifying...';
        progress.classList.remove('hidden');

        const checks = ['kyc-check-pan', 'kyc-check-aadhaar', 'kyc-check-selfie'];
        
        for (let i = 0; i < checks.length; i++) {
            await delay(600);
            const el = document.getElementById(checks[i]);
            el.classList.add('visible', 'passed');
            const icon = el.querySelector('.gate-icon');
            icon.classList.add('passed');
            icon.innerText = '✓';
            el.querySelector('.gate-label').innerText += ' Verified';
        }

        await delay(500);
        btn.classList.add('hidden');
        continueBtn.classList.remove('hidden');
        completeVerification(this.profile);
    },

    checkConsents() {
        const allChecked = Array.from(document.querySelectorAll('.consent-toggle')).every(t => t.checked);
        const btn = document.getElementById('btn-consent-continue');
        if (allChecked) {
            btn.disabled = false;
            btn.classList.remove('disabled');
        } else {
            btn.disabled = true;
            btn.classList.add('disabled');
        }
    },

    async simulateBureau() {
        const loading = document.getElementById('bureau-loading');
        const result = document.getElementById('bureau-result');
        const text = document.getElementById('bureau-loading-text');

        const steps = ['Connecting to bureau...', 'Fetching credit report...', 'Analysing history...'];
        for(let msg of steps) {
            text.innerText = msg;
            await delay(800);
        }

        loading.classList.add('hidden');
        result.classList.remove('hidden');
        result.classList.add('flex');

        const p = this.profile.bureau;
        document.getElementById('bureau-grade').innerText = getRiskGrade(this.profile.creditScore).grade;
        document.getElementById('bureau-loans').innerText = p.activeLoans;
        document.getElementById('bureau-history').innerText = p.paymentHistory;

        // Animate gauge
        const gauge = document.getElementById('bureau-gauge');
        const valEl = document.getElementById('bureau-score-val');
        
        // Map 300-900 to -90 to 90 degrees
        const score = this.profile.creditScore;
        const degrees = ((score - 300) / 600) * 180 - 90;
        
        setTimeout(() => {
            gauge.style.transform = `rotate(${degrees}deg)`;
            animateValue(valEl, 300, score, 1500);
        }, 100);
    },

    async simulateAA() {
        const loading = document.getElementById('aa-loading');
        const result = document.getElementById('aa-result');
        const text = document.getElementById('aa-loading-text');

        const steps = ['Connecting to Account Aggregator...', 'Fetching transactions...', 'Analysing cash flow...'];
        for(let msg of steps) {
            text.innerText = msg;
            await delay(800);
        }

        loading.classList.add('hidden');
        result.classList.remove('hidden');
        result.classList.add('flex');

        const p = this.profile.bankData;
        document.getElementById('aa-salary').innerText = formatCurrency(p.avgSalaryCredit);
        document.getElementById('aa-emis').innerText = formatCurrency(p.existingEmisDetected);
        document.getElementById('aa-bounces').innerText = p.bounces;

        // Calculate and animate FOIR
        const estimatedEmi = 2500; // rough estimate for display
        const foir = calculateFOIR(p.avgSalaryCredit, p.existingEmisDetected, estimatedEmi);
        const foirBar = document.getElementById('aa-foir-bar');
        const foirVal = document.getElementById('aa-foir-val');
        
        foirVal.innerText = foir.toFixed(1) + '%';
        
        setTimeout(() => {
            foirBar.style.width = Math.min(foir, 100) + '%';
            if (foir > 60) foirBar.className = 'progress-fill progress-fill-danger';
            else if (foir > 45) foirBar.className = 'progress-fill progress-fill-warning';
            else foirBar.className = 'progress-fill progress-fill-success';
        }, 100);
    },

    async simulateRisk() {
        this.decisionResult = runDecisionForProfile(this.profile.id);
        const container = document.getElementById('risk-checks');
        container.innerHTML = '';

        for (let gate of this.decisionResult.gates) {
            const el = document.createElement('div');
            el.className = `gate-check ${gate.passed ? 'passed' : (gate.warning ? 'warning' : 'failed')}`;
            el.innerHTML = `
                <div class="gate-icon ${gate.passed ? 'passed' : (gate.warning ? 'warning' : 'failed')}">
                    ${gate.passed ? '✓' : (gate.warning ? '⚠️' : '✗')}
                </div>
                <div>
                    <div class="font-bold text-sm">${gate.label}</div>
                    <div class="text-xs text-gray-600">${gate.detail}</div>
                </div>
            `;
            container.appendChild(el);
            
            await delay(100); // short wait before element is added to DOM
            setTimeout(() => el.classList.add('visible'), 50);
            await delay(600); // Time between checks
        }

        await delay(500);
        document.getElementById('risk-action').classList.remove('hidden');
    },

    async renderDecision() {
        const loading = document.getElementById('decision-loading');
        const result = document.getElementById('decision-result');
        const banner = document.getElementById('decision-banner');
        
        await delay(1500);
        
        loading.classList.add('hidden');
        result.classList.remove('hidden');
        result.classList.add('flex');

        const res = this.decisionResult;
        
        // Setup Banner
        banner.className = `decision-banner w-full ${res.decision.toLowerCase()}`;
        document.getElementById('decision-verdict').innerText = res.decision;
        
        if (res.decision === 'APPROVE') {
            document.getElementById('decision-icon').innerText = '🎉';
            document.getElementById('decision-subtitle').innerText = `Grade ${res.riskGrade} • ${res.rate}% p.a.`;
        } else if (res.decision === 'REFER') {
            document.getElementById('decision-icon').innerText = '⏳';
            document.getElementById('decision-subtitle').innerText = 'Routed for manual review';
        } else {
            document.getElementById('decision-icon').innerText = '🛑';
            document.getElementById('decision-subtitle').innerText = 'Application Declined';
        }

        // Reasons
        const reasonsList = document.getElementById('decision-reasons');
        reasonsList.innerHTML = res.decisionReasons.map(r => `<li>${r}</li>`).join('');

        // Actions
        const actions = document.getElementById('decision-actions');
        if (res.decision === 'APPROVE') {
            actions.innerHTML = `<button class="btn btn-teal btn-lg w-full" onclick="app.navigateTo('offer')">View Loan Offer</button>`;
        } else {
            actions.innerHTML = `
                <button class="btn btn-ghost w-full" onclick="app.openInsideView('step-4d')">Understand Policy Rules</button>
                <button class="btn btn-primary w-full mt-2" onclick="app.resetAndGoHome()">Try Another Profile</button>
            `;
        }
    },

    // Wrap navigateTo to handle special decision rendering logic
    navigateTo(screenId, noAnimation = false) {
        if(screenId === 'decision') {
            // normal navigation
            const currentScreen = document.getElementById(`screen-${this.currentScreenId}`);
            const nextScreen = document.getElementById(`screen-${screenId}`);
            if (currentScreen && nextScreen) {
                if (!noAnimation) {
                    currentScreen.classList.add('exit-left');
                    setTimeout(() => currentScreen.classList.remove('active', 'exit-left'), 400);
                } else {
                    currentScreen.classList.remove('active');
                }
                nextScreen.classList.add('active');
                this.currentScreenId = screenId;
                AppState.demoView.currentScreen = screenId;
                this.updateProgress();
                
                // then render
                this.renderDecision();
            }
        } else {
            // Proceed normally for other screens using the old logic which I'll preserve by calling prototype directly
            // Actually, I can just use the prototype-like pattern
            const currentScreen = document.getElementById(`screen-${this.currentScreenId}`);
            const nextScreen = document.getElementById(`screen-${screenId}`);

            if (currentScreen && nextScreen) {
                if (!noAnimation) {
                    currentScreen.classList.add('exit-left');
                    setTimeout(() => {
                        currentScreen.classList.remove('active', 'exit-left');
                    }, 400);
                } else {
                    currentScreen.classList.remove('active');
                }

                nextScreen.classList.add('active');
                this.initScreen(screenId);
                this.currentScreenId = screenId;
                AppState.demoView.currentScreen = screenId;
                this.updateProgress();
            }
        }
    },

    async simulateDisbursement() {
        const title = document.getElementById('disburse-title');
        const subtitle = document.getElementById('disburse-subtitle');
        const receipt = document.getElementById('disburse-receipt');
        const dashBtn = document.getElementById('btn-dashboard');
        const whyLink = document.getElementById('disburse-why');

        // Phase 1: Animation
        await delay(2000);

        // Phase 2: Show receipt
        completeDisbursement();
        title.innerText = '🎉 Loan Disbursed!';
        subtitle.innerText = 'Funds credited to your bank account via IMPS';
        document.getElementById('disburse-animation').innerText = '✅';
        document.getElementById('disburse-animation').classList.remove('animate-pulse');

        const offer = AppState.journey.loanOffer;
        document.getElementById('receipt-amount').innerText = formatCurrency(offer.amount - offer.processingFee);
        document.getElementById('receipt-ref').innerText = AppState.journey.disbursementStatus.reference;

        receipt.classList.remove('hidden');
        dashBtn.classList.remove('hidden');
        whyLink.classList.remove('hidden');
    },

    initOffer() {
        if(!this.decisionResult) return;
        document.getElementById('offer-rate').innerText = this.decisionResult.rate;
        
        // setup limits based on grade
        const sliderAmount = document.getElementById('offer-amount-slider');
        sliderAmount.max = this.decisionResult.maxLimit;
        if(this.decisionResult.maxLimit < parseInt(sliderAmount.value)) {
            sliderAmount.value = this.decisionResult.maxLimit;
        }
        
        this.updateOffer();
    },

    updateOffer() {
        const p = parseInt(document.getElementById('offer-amount-slider').value);
        const t = parseInt(document.getElementById('offer-tenure-slider').value);
        const r = this.decisionResult.rate;
        
        document.getElementById('offer-amount-display').innerText = p.toLocaleString('en-IN');
        document.getElementById('offer-tenure-display').innerText = t;
        
        const emi = calculateEMI(p, r, t);
        const fee = Math.round(p * 0.02);
        
        document.getElementById('offer-emi').innerText = emi.toLocaleString('en-IN');
        document.getElementById('offer-fee').innerText = fee.toLocaleString('en-IN');
        
        // update app state implicitly
        AppState.journey.loanOffer.amount = p;
        AppState.journey.loanOffer.tenure = t;
        AppState.journey.loanOffer.emi = emi;
        AppState.journey.loanOffer.processingFee = fee;
        AppState.journey.loanOffer.rate = r;
    },

    initAgreement() {
        const offer = AppState.journey.loanOffer;
        document.getElementById('agr-amount').innerText = formatCurrency(offer.amount);
        document.getElementById('agr-rate').innerText = offer.rate + '%';
        document.getElementById('agr-tenure').innerText = offer.tenure + ' Months';
        document.getElementById('agr-emi').innerText = formatCurrency(offer.emi);
        document.getElementById('agr-fee').innerText = formatCurrency(offer.processingFee);
    },

    async simulateESign() {
        const prompt = document.getElementById('esign-prompt');
        const progress = document.getElementById('esign-progress');
        const success = document.getElementById('esign-success');
        const btn = document.getElementById('btn-disburse');

        prompt.classList.add('hidden');
        progress.classList.remove('hidden');
        progress.classList.add('flex');

        await delay(1500);

        progress.classList.add('hidden');
        progress.classList.remove('flex');
        success.classList.remove('hidden');
        success.classList.add('flex');
        
        btn.classList.remove('hidden');
    },

    initDashboard() {
        completeDisbursement(); // Updates state
        const state = AppState.journey;
        const offer = state.loanOffer;

        document.getElementById('dash-outstanding').innerText = offer.amount.toLocaleString('en-IN');
        document.getElementById('dash-emi').innerText = offer.emi.toLocaleString('en-IN');
        document.getElementById('dash-due').innerText = state.repaymentStatus.nextDueDate;
        document.getElementById('dash-rate').innerText = offer.rate;
        document.getElementById('dash-tenure').innerText = offer.tenure;
        document.getElementById('dash-tenure-rem').innerText = offer.tenure;
    },

    renderSummary() {
        const tl = document.getElementById('summary-timeline');
        tl.innerHTML = '';
        
        // Map steps to summary
        const steps = JOURNEY_STEPS.filter(s => s.stepNumber <= 8); // simplified view
        
        steps.forEach((s, idx) => {
            const teams = s.teams.map(t => TEAM_DIRECTORY[t.key].name).join(' + ');
            const el = document.createElement('div');
            el.className = 'timeline-item';
            el.innerHTML = `
                <div class="font-bold text-sm text-navy-900">${s.stepNumber}. ${s.title}</div>
                <div class="text-xs text-blue-600 font-medium mb-1">Behind screen: ${teams}</div>
                <div class="text-xs text-gray-500">${s.businessPurpose}</div>
            `;
            tl.appendChild(el);
        });
    },

    resetAndGoHome() {
        resetJourney();
        window.location.href = 'demo.html';
    },

    // Modal / Tooltip logic
    openWhy(contextKey) {
        let content = '';
        const stepMap = {
            'info': JOURNEY_STEPS.find(s => s.id === 'step-2'),
            'kyc': JOURNEY_STEPS.find(s => s.id === 'step-3'),
            'consent-bureau': JOURNEY_STEPS.find(s => s.id === 'step-4a'),
            'consent-aa': JOURNEY_STEPS.find(s => s.id === 'step-4a'),
            'bureau': JOURNEY_STEPS.find(s => s.id === 'step-4b'),
            'aa': JOURNEY_STEPS.find(s => s.id === 'step-4c')
        };

        const step = stepMap[contextKey];
        if (step) {
            content = `
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold text-navy-900">Behind the Screen</h3>
                    <button class="modal-close" onclick="app.closeModal()">×</button>
                </div>
                <p class="text-sm text-gray-700 mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">${step.educationalExplanation}</p>
                <div class="mb-4">
                    <div class="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Teams Involved</div>
                    <div class="flex-col gap-2">
                        ${step.teams.map(t => {
                            const team = TEAM_DIRECTORY[t.key];
                            return `
                            <div class="flex items-start gap-2 text-sm">
                                <span style="color: ${team.color}">${team.icon}</span>
                                <div>
                                    <span class="font-semibold">${team.name}:</span>
                                    <span class="text-gray-600">${t.why}</span>
                                </div>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                <button class="btn btn-secondary w-full" onclick="app.openInsideView('${step.id}')">Explore details in Teaching View</button>
            `;
        } else {
            content = `<div class="p-4 text-center">Explanation content pending</div><button class="modal-close" onclick="app.closeModal()">×</button>`;
        }

        const modal = document.getElementById('modal-overlay');
        const modalContent = document.getElementById('modal-content');
        modalContent.innerHTML = content;
        modal.classList.add('open');
    },

    closeModal() {
        document.getElementById('modal-overlay').classList.remove('open');
    },

    openInsideView(stepId) {
        openPageA(stepId);
    }
};

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
