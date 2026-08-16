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
}

function renderPhoneScreen(step) {
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
        case 'ad':
            html += `<div style="background:var(--gray-200); height:200px; border-radius:12px; margin-bottom:20px; display:flex; align-items:center; justify-content:center;">AD IMAGE Placeholder</div>`;
            if (content.details) {
                content.details.forEach(d => {
                    html += `<p style="margin-bottom:8px">✓ ${d}</p>`;
                });
            }
            break;
            
        case 'form':
            if (content.fields) {
                content.fields.forEach(f => {
                    html += `<div class="form-group">
                        <label class="form-label">${f.label}</label>
                        <input class="form-input" type="${f.type}" placeholder="${f.placeholder || ''}" readonly>
                    </div>`;
                });
            }
            break;
            
        case 'verification':
            if (content.steps) {
                content.steps.forEach(s => {
                    let color = s.status === 'verifying' ? 'var(--blue-500)' : 'var(--gray-400)';
                    html += `<div class="check-item">
                        <span>${s.icon}</span>
                        <span style="flex:1">${s.label}</span>
                        <span style="color:${color}; font-size:12px">${s.status}</span>
                    </div>`;
                });
            }
            break;
            
        case 'consent':
            if (content.consents) {
                content.consents.forEach(c => {
                    html += `<div class="check-item" style="align-items:flex-start">
                        <span>${c.icon}</span>
                        <div>
                            <div style="font-weight:600; font-size:14px">${c.label}</div>
                            <div style="font-size:12px; color:var(--gray-500)">${c.description}</div>
                        </div>
                    </div>`;
                });
            }
            break;
            
        case 'loading':
            html += `<div class="loading-view">
                <div class="spinner"></div>
                <div style="font-size:14px; color:var(--gray-600)">
                    ${content.loadingSteps ? content.loadingSteps[0] : 'Loading...'}
                </div>
            </div>`;
            break;
            
        case 'decision-pending':
            if (content.checks) {
                content.checks.forEach(c => {
                    html += `<div class="check-item">
                        <span>${c.icon}</span>
                        <span>${c.label}</span>
                    </div>`;
                });
            }
            break;
            
        case 'agreement':
            html += `<div style="background:white; padding:16px; border-radius:8px; border:1px solid var(--gray-200); font-size:12px; margin-bottom:20px;">`;
            if (content.agreementHighlights) {
                content.agreementHighlights.forEach(h => {
                    html += `<div style="margin-bottom:8px; border-bottom:1px solid var(--gray-100); padding-bottom:4px;">${h}</div>`;
                });
            }
            html += `</div>`;
            break;
            
        case 'disbursement':
            if (content.details) {
                content.details.forEach(d => {
                    html += `<div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:14px; ${d.highlight ? 'font-weight:700; font-size:16px; color:var(--success)' : ''}">
                        <span>${d.label}</span>
                        <span>${d.value}</span>
                    </div>`;
                });
            }
            break;
            
        case 'dashboard':
            if (content.loanDetails) {
                html += `<div style="background:var(--blue-600); color:white; padding:20px; border-radius:12px; margin-bottom:20px;">
                    <div style="font-size:12px; opacity:0.8">Outstanding</div>
                    <div style="font-size:32px; font-weight:700">${content.loanDetails[0].value}</div>
                </div>`;
                content.loanDetails.slice(1).forEach(d => {
                    html += `<div class="check-item" style="justify-content:space-between">
                        <span>${d.label}</span>
                        <span style="font-weight:600">${d.value}</span>
                    </div>`;
                });
            }
            break;
            
        case 'enach':
            if (content.mandateDetails) {
                content.mandateDetails.forEach(d => {
                    html += `<div class="check-item" style="justify-content:space-between">
                        <span style="color:var(--gray-500); font-size:14px">${d.label}</span>
                        <span style="font-weight:600; font-size:14px">${d.value}</span>
                    </div>`;
                });
            }
            break;
    }
    
    if (content.ctaText) {
        html += `<button class="screen-cta">${content.ctaText}</button>`;
    }
    
    html += `</div>`;
    screen.innerHTML = html;
}

function renderBehindScreen(step) {
    const container = document.getElementById('layers-container');
    const isExpert = AppState.mode === 'expert';
    
    const layers = [
        {
            id: 1,
            title: 'Customer Action',
            icon: '🎬',
            content: `<p>${step.customerAction}</p>`
        },
        {
            id: 2,
            title: 'Teams Responsible',
            icon: '👥',
            content: step.teams.map(t => {
                const teamInfo = TEAM_DIRECTORY[t.key];
                return `
                <div class="team-item" style="border-left-color: ${teamInfo.color}">
                    <div style="font-weight:600; display:flex; align-items:center; gap:8px;">
                        ${teamInfo.icon} ${teamInfo.name}
                    </div>
                    <div style="font-size:14px; margin-top:4px; color:var(--gray-300)">${t.responsibility}</div>
                    <details style="margin-top:8px; font-size:13px;">
                        <summary style="color:var(--blue-400); cursor:pointer;">Why it matters</summary>
                        <div style="margin-top:4px; color:var(--gray-400); padding-left:12px; border-left:2px solid var(--gray-600)">${t.why}</div>
                    </details>
                </div>
                `;
            }).join('')
        },
        {
            id: 3,
            title: 'Data / Input',
            icon: '📥',
            content: step.dataInputs.map(d => `<span class="data-chip">${d}</span>`).join('')
        },
        {
            id: 4,
            title: 'Technology & Flow',
            icon: '⚡',
            content: `
                <div style="font-size:14px; font-weight:600; margin-bottom:12px; color:var(--teal-300)">${step.technology.label}</div>
                <div class="data-flow">
                    ${step.technology.flow.map((node, i, arr) => `
                        <div class="flow-node">
                            <div>${node}</div>
                        </div>
                        ${i < arr.length - 1 ? `<div class="flow-arrow"><div class="data-packet"></div></div>` : ''}
                    `).join('')}
                </div>
                <div style="margin-top:12px; font-size:13px; color:var(--gray-400)">
                    <strong>Examples:</strong> ${step.technology.examples.join(', ')}
                </div>
            `
        },
        {
            id: 5,
            title: 'Control / Risk',
            icon: '🛡️',
            content: `<p>${step.riskControl}</p>`
        },
        {
            id: 6,
            title: 'Business Purpose',
            icon: '💼',
            content: `<p>${step.businessPurpose}</p>
                      ${isExpert && step.expertDetail ? `<div style="margin-top:12px; padding:12px; background:rgba(255,255,255,0.05); border-radius:8px; font-size:13px; color:var(--gray-300); border-left:3px solid var(--purple-500)"><strong>Expert Detail:</strong> ${step.expertDetail}</div>` : ''}
            `
        }
    ];

    container.innerHTML = layers.map((layer, i) => `
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

