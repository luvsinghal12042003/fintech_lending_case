// ============================================================
// INSIDE APP LOGIC (Teaching Interface)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Parse URL params
    const params = getUrlParams();
    if (params.step) {
        const stepIdx = JOURNEY_STEPS.findIndex(s => s.id === params.step);
        if (stepIdx !== -1) {
            AppState.currentStepIndex = stepIdx;
        }
    }
    if (params.mode === 'expert') {
        AppState.mode = 'expert';
    }

    setupEventListeners();
    renderLifecycleRail();
    populateStepSelector();
    updateUI();
}

function setupEventListeners() {
    // Mode toggle
    document.getElementById('btn-toggle-mode').addEventListener('click', toggleMode);
    document.getElementById('mode-beginner').addEventListener('click', () => setMode('beginner'));
    document.getElementById('mode-expert').addEventListener('click', () => setMode('expert'));

    // Navigation
    document.getElementById('btn-prev').addEventListener('click', () => navigateStep(-1));
    document.getElementById('btn-next').addEventListener('click', () => navigateStep(1));
    
    document.getElementById('step-selector').addEventListener('change', (e) => {
        AppState.currentStepIndex = parseInt(e.target.value, 10);
        updateUI();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') navigateStep(1);
        if (e.key === 'ArrowLeft') navigateStep(-1);
        if (e.key === 'Escape' && AppState.presentationMode) togglePresentationMode();
    });

    // Modals
    document.getElementById('btn-team-map').addEventListener('click', () => openModal('modal-team-map', renderTeamMap));
    document.getElementById('btn-india-stack').addEventListener('click', () => openModal('modal-india-stack', renderIndiaStack));
    document.getElementById('btn-qr').addEventListener('click', openQRModal);
    
    document.querySelectorAll('.btn-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal-overlay').classList.add('hidden');
        });
    });

    // Presentation mode
    document.getElementById('btn-present').addEventListener('click', togglePresentationMode);

    // Open demo
    document.getElementById('btn-demo').addEventListener('click', () => {
        openPageB(AppState.selectedProfile || 'A', 'landing');
    });
}

function toggleMode() {
    setMode(AppState.mode === 'beginner' ? 'expert' : 'beginner');
}

function setMode(mode) {
    AppState.mode = mode;
    const isExpert = mode === 'expert';
    document.getElementById('mode-expert').classList.toggle('active', isExpert);
    document.getElementById('mode-beginner').classList.toggle('active', !isExpert);
    document.querySelector('.mode-toggle').classList.toggle('expert', isExpert);
    updateUI();
}

function navigateStep(direction) {
    const newIdx = AppState.currentStepIndex + direction;
    if (newIdx >= 0 && newIdx < JOURNEY_STEPS.length) {
        AppState.currentStepIndex = newIdx;
        updateUI();
    }
}

function renderLifecycleRail() {
    const rail = document.getElementById('lifecycle-rail');
    rail.innerHTML = '';
    
    LIFECYCLE_STAGES.forEach((stage, idx) => {
        const pill = document.createElement('div');
        pill.className = 'rail-pill';
        pill.dataset.stage = stage.id;
        pill.innerHTML = `<span>${stage.icon}</span> ${stage.label}`;
        
        pill.addEventListener('click', () => {
            const firstStepIdx = JOURNEY_STEPS.findIndex(s => s.stage === stage.id);
            if (firstStepIdx !== -1) {
                AppState.currentStepIndex = firstStepIdx;
                updateUI();
            }
        });
        
        rail.appendChild(pill);
    });
}

function populateStepSelector() {
    const selector = document.getElementById('step-selector');
    selector.innerHTML = '';
    
    JOURNEY_STEPS.forEach((step, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = `Step ${idx + 1}: ${step.title}`;
        selector.appendChild(opt);
    });
}

function updateUI() {
    const step = JOURNEY_STEPS[AppState.currentStepIndex];
    
    // Update Rail
    document.querySelectorAll('.rail-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.stage === step.stage);
    });

    // Update Header
    document.getElementById('step-badge').textContent = `Step ${AppState.currentStepIndex + 1} of ${JOURNEY_STEPS.length} • ${step.stage.toUpperCase()}`;
    document.getElementById('step-title').textContent = step.title;
    document.getElementById('step-subtitle').textContent = step.subtitle;
    
    // Update Controls
    document.getElementById('btn-prev').disabled = AppState.currentStepIndex === 0;
    document.getElementById('btn-next').disabled = AppState.currentStepIndex === JOURNEY_STEPS.length - 1;
    document.getElementById('step-indicator').textContent = `Step ${AppState.currentStepIndex + 1} of ${JOURNEY_STEPS.length}`;
    document.getElementById('step-selector').value = AppState.currentStepIndex;
    
    // Render left and right panes
    renderPhoneScreen(step);
    renderBehindScreen(step);
    
    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('step', step.id);
    window.history.pushState({}, '', url);
}function renderPhoneScreen(step) {
    const screen = document.getElementById('phone-screen');
    const content = step.customerScreen;
    
    let html = `<div class="screen-content">`;
    
    if (content.headline) {
        html += `<h2 class="screen-headline">${content.headline}</h2>`;
    }
    if (content.subheadline) {
        html += `<p class="screen-subheadline">${content.subheadline}</p>`;
    }
    
    switch (content.type) {
        case 'case-intro':
            if (content.caseData) {
                const c = content.caseData;
                html += `
                <div class="case-card">
                    <span class="case-tag">BORROWER PROFILE</span>
                    <div style="font-size:16px; font-weight:700; color:var(--gray-900); margin-bottom:4px;">👤 ${c.borrower}</div>
                    <div style="font-size:13px; color:var(--gray-600); margin-bottom:8px;">💼 ${c.occupation} • 💰 ${c.salary}</div>
                    <div style="background:#eff6ff; border-left:3px solid #3b82f6; padding:8px 10px; border-radius:4px; font-size:12px; color:#1e40af; margin-bottom:12px;">
                        <strong>⚡ Urgency:</strong> ${c.urgency}
                    </div>
                    <div class="compare-box">
                        <div style="color:var(--danger); font-weight:600; margin-bottom:4px;">❌ Traditional Bank Friction:</div>
                        <div style="color:var(--gray-600);">${c.traditionalFriction}</div>
                        <div style="color:var(--success); font-weight:600; margin-top:8px; margin-bottom:4px;">✅ Fintech Promise:</div>
                        <div style="color:var(--gray-700); font-weight:500;">${c.fintechPromise}</div>
                    </div>
                </div>`;
            }
            break;

        case 'ad':
            html += `
            <div style="background:linear-gradient(135deg, #1e3a8a, #0284c7); color:white; padding:18px; border-radius:14px; margin-bottom:16px; box-shadow:0 4px 12px rgba(2,132,199,0.3);">
                <div style="font-size:11px; text-transform:uppercase; letter-spacing:1px; opacity:0.8; margin-bottom:4px;">📱 Instagram / Google Sponsored</div>
                <div style="font-size:18px; font-weight:800; margin-bottom:6px;">Need ₹25,000 in 5 Minutes?</div>
                <div style="font-size:12px; opacity:0.9; margin-bottom:12px;">Instant credit for salaried professionals • Zero branch visits</div>
                <div style="background:rgba(255,255,255,0.15); padding:8px 12px; border-radius:8px; font-size:11px;">
                    ✓ 12.5% starting rate &nbsp;|&nbsp; ✓ 100% paperless
                </div>
            </div>`;
            if (content.details) {
                content.details.forEach(d => {
                    html += `<div class="check-item" style="font-size:13px"><span>⚡</span><span>${d}</span></div>`;
                });
            }
            break;
            
        case 'form':
            if (content.fields) {
                content.fields.forEach(f => {
                    html += `<div class="form-group">
                        <label class="form-label">${f.label}</label>
                        <input class="form-input" type="${f.type}" value="${f.placeholder || ''}" readonly>
                    </div>`;
                });
            }
            break;
            
        case 'kyc-consent':
            if (content.checks) {
                html += `<div style="font-size:12px; font-weight:700; color:var(--gray-500); text-transform:uppercase; margin-bottom:8px;">1. Identity Verification</div>`;
                content.checks.forEach(s => {
                    html += `<div class="check-item" style="justify-content:space-between">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span>${s.icon}</span>
                            <span style="font-size:13px; font-weight:500;">${s.label}</span>
                        </div>
                        <span style="color:var(--success); font-size:12px; font-weight:700;">${s.status}</span>
                    </div>`;
                });
            }
            if (content.consents) {
                html += `<div style="font-size:12px; font-weight:700; color:var(--gray-500); text-transform:uppercase; margin-top:14px; margin-bottom:8px;">2. Explicit Granular Consent</div>`;
                content.consents.forEach(c => {
                    html += `<div class="check-item" style="align-items:flex-start">
                        <span>${c.icon}</span>
                        <div>
                            <div style="font-weight:600; font-size:13px">${c.label}</div>
                            <div style="font-size:11px; color:var(--gray-500)">${c.desc}</div>
                        </div>
                    </div>`;
                });
            }
            break;

        case 'underwriting-dashboard':
            if (content.questions) {
                content.questions.forEach(q => {
                    html += `
                    <div class="question-card" style="border-left-color:${q.color}">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div class="question-title">${q.q}</div>
                            <span style="font-size:10px; font-weight:700; color:${q.color}">${q.tag}</span>
                        </div>
                        <div class="question-ans">${q.ans}</div>
                    </div>`;
                });
            }
            if (content.gatesCount) {
                html += `<div style="background:#ecfdf5; border:1px solid #10b981; color:#065f46; padding:10px; border-radius:8px; font-size:12px; font-weight:700; text-align:center; margin-top:10px;">
                    🛡️ ${content.gatesCount}
                </div>`;
            }
            break;

        case 'audience-poll':
            html += `
            <div style="background:white; border-radius:12px; padding:14px; box-shadow:0 2px 8px rgba(0,0,0,0.08);">
                <div style="font-size:14px; font-weight:700; color:var(--gray-900); margin-bottom:12px; line-height:1.4;">
                    ${content.questionText}
                </div>
                <div class="poll-container">
                    ${content.options.map((opt, i) => `
                        <button class="poll-option ${opt.isCorrect ? 'is-target-opt' : ''}" id="poll-opt-${i}" onclick="selectPollOption(${i}, ${opt.isCorrect ? 'true' : 'false'}, '${opt.feedback.replace(/'/g, "\\'")}')">
                            ${opt.text}
                        </button>
                    `).join('')}
                </div>
                <div id="poll-feedback-box" class="poll-feedback hidden"></div>
                <div style="margin-top:12px; font-size:11px; color:var(--gray-500); font-style:italic;">
                    💡 ${content.takeaway}
                </div>
            </div>`;
            break;

        case 'disbursement-journey':
            if (content.stages) {
                content.stages.forEach(s => {
                    html += `
                    <div class="check-item" style="align-items:flex-start">
                        <span style="font-size:20px">${s.icon}</span>
                        <div>
                            <div style="font-weight:700; font-size:14px; color:var(--gray-900)">${s.label}</div>
                            <div style="font-size:12px; color:var(--gray-600)">${s.desc}</div>
                        </div>
                    </div>`;
                });
            }
            break;

        case 'big-reveal':
            html += `
            <div class="reveal-quote-banner">
                <div class="reveal-quote-text">${content.quote}</div>
            </div>
            <div class="reveal-grid">
                ${content.matrix.slice(0, 5).map(m => `
                    <div class="reveal-item" style="border-left-color:${m.color}">
                        <div>
                            <div style="font-weight:700; font-size:13px; color:${m.color}">${m.team}</div>
                            <div style="font-size:11px; color:var(--gray-600)">${m.role}</div>
                        </div>
                        <span style="font-size:10px; background:var(--gray-100); padding:2px 6px; border-radius:4px; font-weight:600;">${m.stage}</span>
                    </div>
                `).join('')}
                <div style="text-align:center; font-size:11px; color:var(--gray-500); margin-top:4px;">+ 4 more teams working post-approval (see right panel)</div>
            </div>`;
            break;

        case 'servicing-dashboard':
            if (content.dashboard) {
                const d = content.dashboard;
                html += `
                <div style="background:linear-gradient(135deg, #1e40af, #3b82f6); color:white; padding:16px; border-radius:12px; margin-bottom:14px;">
                    <div style="font-size:11px; opacity:0.8; text-transform:uppercase;">Outstanding Loan Balance</div>
                    <div style="font-size:28px; font-weight:800; margin-bottom:8px;">${d.outstanding}</div>
                    <div style="display:flex; justify-content:space-between; font-size:12px; border-top:1px solid rgba(255,255,255,0.2); padding-top:8px;">
                        <span>Next EMI: <strong>${d.nextEmi}</strong></span>
                    </div>
                </div>
                <div class="check-item" style="font-size:12px; color:#065f46; background:#ecfdf5; border:1px solid #10b981; font-weight:600;">
                    <span>🔄</span>
                    <span>${d.mandate}</span>
                </div>`;
            }
            if (content.lifecycleNudges) {
                html += `<div style="font-size:11px; font-weight:700; color:var(--gray-500); text-transform:uppercase; margin-top:12px; margin-bottom:6px;">Automated Repayment Lifecycle</div>`;
                content.lifecycleNudges.forEach(n => {
                    html += `<div style="font-size:12px; color:var(--gray-700); margin-bottom:6px;">• ${n}</div>`;
                });
            }
            break;

        case 'final-takeaways':
            if (content.takeaways) {
                content.takeaways.forEach(t => {
                    html += `
                    <div class="takeaway-card">
                        <div class="takeaway-num">INSIGHT ${t.num}</div>
                        <div style="font-weight:700; font-size:13px; color:var(--gray-900); margin-bottom:2px;">${t.title}</div>
                        <div style="font-size:12px; color:var(--gray-600);">${t.desc}</div>
                    </div>`;
                });
            }
            if (content.closingQuote) {
                html += `<div class="takeaway-punchline">${content.closingQuote}</div>`;
            }
            break;
    }
    
    if (content.ctaText) {
        html += `<button class="screen-cta">${content.ctaText}</button>`;
    }
    
    html += `</div>`;
    screen.innerHTML = html;
}

function selectPollOption(idx, isCorrect, feedback) {
    document.querySelectorAll('.poll-option').forEach((btn, i) => {
        btn.classList.remove('selected', 'correct');
        if (i === idx) {
            btn.classList.add('selected');
            if (isCorrect) btn.classList.add('correct');
        }
    });
    const box = document.getElementById('poll-feedback-box');
    if (box) {
        box.innerHTML = `<strong>${isCorrect ? '✅ Excellent Analysis:' : 'ℹ️ Teaching Insight:'}</strong> ${feedback}`;
        box.classList.remove('hidden');
    }
}
window.selectPollOption = selectPollOption;

function renderBehindScreen(step) {
    const container = document.getElementById('layers-container');
    const isExpert = AppState.mode === 'expert';
    
    const layers = [
        {
            id: 1,
            title: 'Customer Action',
            icon: '🎬',
            content: `<p style="font-size:15px; line-height:1.6; color:var(--gray-100);">${step.customerAction}</p>`
        },
        {
            id: 2,
            title: 'Behind the Screen',
            icon: '⚙️',
            content: `<p style="font-size:15px; line-height:1.6; color:var(--teal-200);">${step.behindTheScreen || step.educationalExplanation}</p>`
        },
        {
            id: 3,
            title: 'Teams Responsible',
            icon: '👥',
            content: step.teams.map(t => {
                const teamInfo = TEAM_DIRECTORY[t.key] || { name: t.key, icon: '💼', color: '#6366F1' };
                return `
                <div class="team-item" style="border-left-color: ${teamInfo.color}">
                    <div style="font-weight:700; display:flex; align-items:center; gap:8px; color:${teamInfo.color}; font-size:15px;">
                        ${teamInfo.icon} ${teamInfo.name}
                    </div>
                    <div style="font-size:14px; margin-top:4px; color:var(--gray-200); line-height:1.5;">${t.responsibility}</div>
                    <details style="margin-top:8px; font-size:13px;">
                        <summary style="color:var(--blue-400); cursor:pointer; font-weight:600;">Why it matters</summary>
                        <div style="margin-top:6px; color:var(--gray-300); padding-left:12px; border-left:2px solid var(--gray-600); line-height:1.5;">${t.why}</div>
                    </details>
                </div>
                `;
            }).join('')
        },
        {
            id: 4,
            title: 'Data & Technology Flow',
            icon: '⚡',
            content: `
                <div style="margin-bottom:12px;">
                    <div style="font-size:12px; font-weight:700; color:var(--gray-400); text-transform:uppercase; margin-bottom:6px;">Inputs & APIs:</div>
                    ${step.dataInputs.map(d => `<span class="data-chip">${d}</span>`).join('')}
                </div>
                <div style="font-size:14px; font-weight:700; margin-bottom:12px; color:var(--teal-300)">${step.technology.label}</div>
                <div class="data-flow">
                    ${step.technology.flow.map((node, i, arr) => `
                        <div class="flow-node">
                            <div>${node}</div>
                        </div>
                        ${i < arr.length - 1 ? `<div class="flow-arrow"><div class="data-packet"></div></div>` : ''}
                    `).join('')}
                </div>
                <div style="margin-top:12px; font-size:13px; color:var(--gray-300)">
                    <strong>Examples / Rails:</strong> ${step.technology.examples.join(', ')}
                </div>
            `
        },
        {
            id: 5,
            title: 'Control, Risk & Governance',
            icon: '🛡️',
            content: `<p style="font-size:14px; line-height:1.6; color:var(--gray-200);">${step.riskControl}</p>`
        },
        {
            id: 6,
            title: 'Business Purpose & Economics',
            icon: '💼',
            content: `
                <p style="font-size:14px; line-height:1.6; color:var(--gray-200);">${step.businessPurpose}</p>
                ${step.expertDetail ? `
                <div style="margin-top:12px; padding:12px; background:rgba(255,255,255,0.05); border-radius:8px; font-size:13px; color:var(--gray-300); border-left:3px solid var(--purple-500); line-height:1.5;">
                    <strong>Practitioner Metric:</strong> ${step.expertDetail}
                </div>` : ''}
            `
        }
    ];

    let html = layers.map((layer, i) => `
        <div class="layer-card layer-${layer.id} expanded" id="layer-${layer.id}">
            <div class="layer-header" onclick="document.getElementById('layer-${layer.id}').classList.toggle('expanded')">
                <div class="layer-title">
                    <span class="layer-title-icon">${layer.icon}</span>
                    Layer ${layer.id}: ${layer.title}
                </div>
                <div class="layer-chevron">▼</div>
            </div>
            <div class="layer-content">
                ${layer.content}
            </div>
        </div>
    `).join('');

    // Add Academic Deep-Dive / Backup Content Section (Collapsible Accordion)
    if (step.backupTopic) {
        html += `
        <div class="deep-dive-card">
            <details>
                <summary>${step.backupTopic.title}</summary>
                <p>${step.backupTopic.content}</p>
            </details>
        </div>`;
    }

    container.innerHTML = html;
}

function togglePresentationMode() {
    AppState.presentationMode = !AppState.presentationMode;
    if (AppState.presentationMode) {
        document.body.classList.add('presentation-mode');
        document.getElementById('btn-present').textContent = 'Exit Presentation';
    } else {
        document.body.classList.remove('presentation-mode');
        document.getElementById('btn-present').textContent = 'Presentation Mode';
    }
}

function openModal(modalId, renderFn) {
    if (renderFn) renderFn();
    document.getElementById(modalId).classList.remove('hidden');
}

function renderTeamMap() {
    const body = document.getElementById('team-map-body');
    let html = `<div class="grid grid-3 gap-4">`;
    
    TEAM_MAP.forEach(group => {
        html += `<div class="card" style="background:var(--navy-900); border-left:4px solid ${group.color}">
            <h3 style="margin-bottom:12px; color:${group.color}">${group.function}</h3>
            ${group.teams.map(tKey => {
                const t = TEAM_DIRECTORY[tKey];
                return `<div style="margin-bottom:8px">
                    <div style="font-weight:600">${t.icon} ${t.name}</div>
                    <div style="font-size:12px; color:var(--gray-400)">${t.description}</div>
                </div>`;
            }).join('')}
        </div>`;
    });
    
    html += `</div>`;
    body.innerHTML = html;
}

function renderIndiaStack() {
    const body = document.getElementById('india-stack-body');
    let html = `<div class="grid grid-2 gap-4">`;
    
    INDIA_STACK.forEach(item => {
        html += `<div class="card" style="background:var(--navy-900); border-left:4px solid ${item.color}">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px">
                <span style="font-size:24px">${item.icon}</span>
                <h3 style="color:${item.color}">${item.name}</h3>
            </div>
            <div style="font-size:12px; color:var(--gray-400); margin-bottom:8px">Layer: ${item.layer}</div>
            <p style="font-size:14px; margin-bottom:8px">${item.description}</p>
            <div style="font-size:12px; color:var(--gray-300); background:rgba(255,255,255,0.05); padding:8px; border-radius:4px;">
                <strong>Why it matters:</strong> ${item.why}
            </div>
        </div>`;
    });
    
    html += `</div>`;
    body.innerHTML = html;
}

function openQRModal() {
    const qrContainer = document.getElementById('qr-container');
    const demoUrl = new URL('demo.html', window.location.origin + window.location.pathname.replace(/[^/]*$/, '')).toString();
    
    // Use qrserver.com free API for QR generation
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(demoUrl)}`;
    qrContainer.innerHTML = `<img src="${qrUrl}" alt="QR Code to Demo" style="border-radius:8px" />`;
    
    const profilesDiv = document.getElementById('qr-profiles');
    profilesDiv.innerHTML = ['A', 'B', 'C'].map(pId => {
        const p = BORROWER_PROFILES[pId];
        return `<button class="btn btn-secondary" onclick="generateProfileQR('${pId}')" style="display:flex; flex-direction:column; gap:4px">
            <span style="font-size:24px">${p.avatar}</span>
            <span>Profile ${pId}</span>
            <span style="font-size:10px; color:var(--gray-400)">${p.label}</span>
        </button>`;
    }).join('');
    
    openModal('modal-qr');
}

window.generateProfileQR = function(profileId) {
    const qrContainer = document.getElementById('qr-container');
    const demoUrl = new URL('demo.html', window.location.origin + window.location.pathname.replace(/[^/]*$/, '')).toString() + '?profile=' + profileId;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(demoUrl)}`;
    qrContainer.innerHTML = `<img src="${qrUrl}" alt="QR Code to Profile ${profileId}" style="border-radius:8px" />
    <p style="margin-top:12px; font-size:14px; color:var(--gray-300)">Scanning will open Profile ${profileId}</p>`;
};

