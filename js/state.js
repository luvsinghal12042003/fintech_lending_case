// ============================================================
// SHARED STATE MANAGEMENT
// Used by both Page A (teaching) and Page B (demo)
// ============================================================

const AppState = {
    // Current navigation state
    currentStepIndex: 0,
    currentStage: 'acquisition',
    selectedProfile: null,
    mode: 'beginner', // 'beginner' | 'expert'
    presentationMode: false,
    teamMapMode: false,

    // Journey state (tracks the borrower's progress)
    journey: {
        customerProfile: null,
        currentStep: 1,
        applicationData: {
            name: '',
            mobile: '',
            employmentType: 'Salaried',
            income: 0,
            existingEmi: 0,
            loanAmount: 25000,
            tenure: 12
        },
        verificationStatus: {
            pan: false,
            aadhaar: false,
            liveliness: false,
            kycComplete: false
        },
        consentStatus: {
            bureau: false,
            aa: false,
            enach: false,
            terms: false,
            allGranted: false
        },
        bureauData: {
            score: 0,
            grade: '',
            activeLoans: 0,
            paymentHistory: '',
            enquiries: 0,
            fetched: false
        },
        bankData: {
            avgSalary: 0,
            bounces: 0,
            avgBalance: 0,
            fetched: false
        },
        riskMetrics: {
            foir: 0,
            dti: 0,
            pd: 0,
            ecl: 0,
            riskGrade: '',
            calculated: false
        },
        decision: {
            verdict: '', // 'APPROVE' | 'REFER' | 'REJECT'
            reasons: [],
            gates: [],
            factorScores: [],
            made: false
        },
        loanOffer: {
            amount: 0,
            rate: 0,
            tenure: 0,
            emi: 0,
            processingFee: 0,
            netDisbursement: 0,
            accepted: false
        },
        agreementStatus: {
            viewed: false,
            signed: false,
            signedAt: null
        },
        disbursementStatus: {
            initiated: false,
            completed: false,
            reference: '',
            completedAt: null
        },
        repaymentStatus: {
            emisPaid: 0,
            totalEmis: 0,
            nextDueDate: '',
            enachActive: false
        }
    },

    // Page A specific state
    insideView: {
        expandedLayers: [], // which of the 6 layers are expanded
        activeDataFlow: false,
        showTeamMap: false,
        selectedTeam: null,
        showIndiaStack: false,
        showRiskGovernance: false,
        showTechStack: false,
        showVivaMode: false,
        showTraditionalVsDigital: false,
        showRbiInnovation: false
    },

    // Page B specific state
    demoView: {
        currentScreen: 'landing', // landing, profile-select, info, kyc, consent, bureau, aa, risk, decision, offer, agreement, esign, disbursement, dashboard, summary
        animationPhase: 0,
        completedScreens: []
    }
};

// ============================================================
// STATE MANAGEMENT FUNCTIONS
// ============================================================

function selectProfile(profileId) {
    const profile = BORROWER_PROFILES[profileId];
    if (!profile) return;

    AppState.selectedProfile = profileId;
    AppState.journey.customerProfile = profile;
    AppState.journey.applicationData.name = profile.name;
    AppState.journey.applicationData.mobile = profile.mobile;
    AppState.journey.applicationData.employmentType = profile.employmentType;
    AppState.journey.applicationData.income = profile.income;
    AppState.journey.applicationData.existingEmi = profile.existingEmi;
}

function resetJourney() {
    AppState.currentStepIndex = 0;
    AppState.currentStage = 'acquisition';
    AppState.selectedProfile = null;

    AppState.journey = {
        customerProfile: null,
        currentStep: 1,
        applicationData: { name: '', mobile: '', employmentType: 'Salaried', income: 0, existingEmi: 0, loanAmount: 25000, tenure: 12 },
        verificationStatus: { pan: false, aadhaar: false, liveliness: false, kycComplete: false },
        consentStatus: { bureau: false, aa: false, enach: false, terms: false, allGranted: false },
        bureauData: { score: 0, grade: '', activeLoans: 0, paymentHistory: '', enquiries: 0, fetched: false },
        bankData: { avgSalary: 0, bounces: 0, avgBalance: 0, fetched: false },
        riskMetrics: { foir: 0, dti: 0, pd: 0, ecl: 0, riskGrade: '', calculated: false },
        decision: { verdict: '', reasons: [], gates: [], factorScores: [], made: false },
        loanOffer: { amount: 0, rate: 0, tenure: 0, emi: 0, processingFee: 0, netDisbursement: 0, accepted: false },
        agreementStatus: { viewed: false, signed: false, signedAt: null },
        disbursementStatus: { initiated: false, completed: false, reference: '', completedAt: null },
        repaymentStatus: { emisPaid: 0, totalEmis: 0, nextDueDate: '', enachActive: false }
    };

    AppState.demoView.currentScreen = 'landing';
    AppState.demoView.animationPhase = 0;
    AppState.demoView.completedScreens = [];
}

function completeVerification(profile) {
    AppState.journey.verificationStatus = { pan: true, aadhaar: true, liveliness: true, kycComplete: true };
    AppState.journey.bureauData = {
        score: profile.creditScore,
        grade: getRiskGrade(profile.creditScore).grade,
        activeLoans: profile.bureau.activeLoans,
        paymentHistory: profile.bureau.paymentHistory,
        enquiries: profile.bureau.recentEnquiries,
        fetched: true
    };
    AppState.journey.bankData = {
        avgSalary: profile.bankData.avgSalaryCredit,
        bounces: profile.bankData.bounces,
        avgBalance: profile.bankData.avgBalance,
        fetched: true
    };
}

function runDecisionForProfile(profileId) {
    const result = runUnderwriting(profileId);
    if (!result) return null;

    AppState.journey.riskMetrics = {
        foir: result.foir,
        dti: result.dti,
        pd: result.pd,
        ecl: result.ecl,
        riskGrade: result.riskGrade,
        calculated: true
    };

    AppState.journey.decision = {
        verdict: result.decision,
        reasons: result.decisionReasons,
        gates: result.gates,
        factorScores: result.factorScores,
        made: true
    };

    if (result.decision === 'APPROVE') {
        AppState.journey.loanOffer = {
            amount: result.loanAmount,
            rate: result.rate,
            tenure: result.tenure,
            emi: result.proposedEmi,
            processingFee: result.processingFee,
            netDisbursement: result.netDisbursement,
            accepted: false
        };
    }

    return result;
}

function completeDisbursement() {
    AppState.journey.loanOffer.accepted = true;
    AppState.journey.agreementStatus = { viewed: true, signed: true, signedAt: new Date().toISOString() };
    AppState.journey.disbursementStatus = {
        initiated: true,
        completed: true,
        reference: 'TXN-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        completedAt: new Date().toISOString()
    };
    AppState.journey.repaymentStatus = {
        emisPaid: 0,
        totalEmis: AppState.journey.loanOffer.tenure,
        nextDueDate: getNextEmiDate(),
        enachActive: true
    };
}

function getNextEmiDate() {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 5);
    return next.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ============================================================
// URL PARAMETER UTILITIES (Cross-page communication)
// ============================================================

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        profile: params.get('profile'),
        step: params.get('step'),
        mode: params.get('mode'),
        screen: params.get('screen')
    };
}

function buildUrl(page, params) {
    const url = new URL(page, window.location.origin + window.location.pathname.replace(/[^/]*$/, ''));
    Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            url.searchParams.set(key, value);
        }
    });
    return url.toString();
}

function openPageA(stepId) {
    const url = buildUrl('inside.html', { step: stepId, profile: AppState.selectedProfile });
    window.open(url, '_blank');
}

function openPageB(profileId, screen) {
    const params = { profile: profileId || AppState.selectedProfile };
    if (screen) params.screen = screen;
    const url = buildUrl('demo.html', params);
    window.open(url, '_blank');
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function formatCurrency(amount) {
    if (amount === null || amount === undefined) return '—';
    return '₹' + amount.toLocaleString('en-IN');
}

function formatPercent(value) {
    if (value === null || value === undefined) return '—';
    return value.toFixed(1) + '%';
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function animateValue(element, start, end, duration, formatter) {
    const startTime = performance.now();
    const diff = end - start;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = start + diff * eased;

        element.textContent = formatter ? formatter(Math.round(current)) : Math.round(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}
