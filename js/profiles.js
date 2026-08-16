// ============================================================
// BORROWER PROFILES & UNDERWRITING ENGINE
// Shared between Page A (teaching) and Page B (demo)
// All values are ILLUSTRATIVE for academic demonstration
// ============================================================

const BORROWER_PROFILES = {
    A: {
        id: 'A',
        name: 'Rahul Sharma',
        label: 'Stable Salaried',
        tagline: 'Strong income, excellent credit history',
        avatar: '👨‍💼',
        color: '#10B981',
        badgeColor: '#DCFCE7',
        income: 80000,
        existingEmi: 8000,
        creditScore: 770,
        employer: 'TechCorp India Pvt Ltd',
        designation: 'Senior Software Engineer',
        experience: '6 years',
        employmentType: 'Salaried',
        mobile: '98765 43210',
        age: 30,
        // Bureau Details
        bureau: {
            score: 770,
            activeLoans: 1,
            activeLoanTypes: ['Car Loan'],
            totalOutstanding: 280000,
            paymentHistory: 'Excellent — 36/36 on-time payments',
            defaults: 0,
            writeOffs: 0,
            recentEnquiries: 2,
            oldestAccount: '5 years',
            creditUtilization: 'Low (18%)'
        },
        // Bank Statement (AA) Details
        bankData: {
            avgSalaryCredit: 80000,
            salaryRegularity: 'Regular — credited between 1st–3rd every month',
            bounces: 0,
            avgBalance: 145000,
            balanceTrend: 'Stable — healthy buffer maintained',
            monthlySpending: 42000,
            existingEmisDetected: 8000
        },
        // Expected Outcome
        expectedDecision: 'APPROVE',
        expectedGrade: 'A',
        expectedRate: 12.5,
        expectedLimit: 400000,
        pd: 1.5,
        // Descriptive
        description: 'High income, pristine credit history, low existing debt. Ideal digital lending customer.',
        whyThisDecision: 'Strong income comfortably absorbs the new EMI. Excellent 5-year credit history with zero defaults proves repayment discipline. Low FOIR means significant headroom for additional debt.',
        teachingPoint: 'This is the "ideal digital lending customer" — fast, automated, profitable. The fintech can acquire, underwrite and disburse in minutes at minimal cost.'
    },

    B: {
        id: 'B',
        name: 'Priya Singh',
        label: 'Thin-File Young',
        tagline: 'Young professional, limited credit history',
        avatar: '👩‍💻',
        color: '#F59E0B',
        badgeColor: '#FEF3C7',
        income: 45000,
        existingEmi: 5000,
        creditScore: 690,
        employer: 'Digital Marketing Agency',
        designation: 'Marketing Executive',
        experience: '2 years',
        employmentType: 'Salaried',
        mobile: '91234 56789',
        age: 24,
        bureau: {
            score: 690,
            activeLoans: 1,
            activeLoanTypes: ['Education Loan'],
            totalOutstanding: 180000,
            paymentHistory: 'Good — 18/18 on-time, but short history',
            defaults: 0,
            writeOffs: 0,
            recentEnquiries: 3,
            oldestAccount: '1.5 years',
            creditUtilization: 'Moderate (45%)'
        },
        bankData: {
            avgSalaryCredit: 45000,
            salaryRegularity: 'Regular — credited between 28th–2nd',
            bounces: 0,
            avgBalance: 28000,
            balanceTrend: 'Variable — drops below ₹10k in 2 of 6 months',
            monthlySpending: 32000,
            existingEmisDetected: 5000
        },
        expectedDecision: 'REFER',
        expectedGrade: 'C',
        expectedRate: 17.0,
        expectedLimit: 180000,
        pd: 7.5,
        description: 'Moderate income, limited credit history, no negative signals. Borderline — needs human review.',
        whyThisDecision: 'Credit score is moderate (690) not because of bad behaviour, but due to short credit history (thin file). Income supports the EMI but with less margin. The system cannot confidently auto-approve, so it routes to manual review.',
        teachingPoint: 'Automation does not mean automatic approval. A responsible fintech routes ambiguous cases to human judgment. The credit analyst may approve with conditions (lower amount, shorter tenure) or decline.'
    },

    C: {
        id: 'C',
        name: 'Amit Kumar',
        label: 'High Debt',
        tagline: 'High existing obligations, stressed finances',
        avatar: '👨‍🏭',
        color: '#EF4444',
        badgeColor: '#FEE2E2',
        income: 60000,
        existingEmi: 25000,
        creditScore: 610,
        employer: 'Metro Manufacturing Ltd',
        designation: 'Production Supervisor',
        experience: '8 years',
        employmentType: 'Salaried',
        mobile: '99887 76655',
        age: 35,
        bureau: {
            score: 610,
            activeLoans: 3,
            activeLoanTypes: ['Home Loan', 'Personal Loan', 'Credit Card EMI'],
            totalOutstanding: 1450000,
            paymentHistory: 'Poor — 1 late payment (30 DPD), high utilization',
            defaults: 0,
            writeOffs: 0,
            recentEnquiries: 4,
            oldestAccount: '6 years',
            creditUtilization: 'High (82%)'
        },
        bankData: {
            avgSalaryCredit: 60000,
            salaryRegularity: 'Regular — credited around 1st',
            bounces: 1,
            avgBalance: 12000,
            balanceTrend: 'Declining — drops to near-zero by month-end',
            monthlySpending: 52000,
            existingEmisDetected: 25000
        },
        expectedDecision: 'REJECT',
        expectedGrade: 'D',
        expectedRate: null,
        expectedLimit: 0,
        pd: 15.0,
        description: 'High existing debt burden, poor credit score, near-zero monthly surplus. Irresponsible to lend further.',
        whyThisDecision: 'Two hard policy rules breached: (1) Credit score 610 < 620 hard floor, (2) FOIR would exceed 60% cap. Adding ₹25,000 of new debt would push this borrower closer to a debt trap. Bureau shows existing payment stress (30 DPD). Rejection protects both borrower and lender.',
        teachingPoint: 'Rejection is not a system failure — it is a policy success. The underwriting engine exists precisely to prevent over-lending. This connects to responsible lending principles and debt-trap prevention.'
    }
};

// ============================================================
// UNDERWRITING ENGINE (Illustrative Simulation)
// ============================================================

const UNDERWRITING_CONFIG = {
    requestedLoanAmount: 25000,
    defaultTenure: 12,
    processingFeeRate: 0.02,

    // Risk Grade Mapping
    gradeThresholds: [
        { grade: 'A', minScore: 750, maxFoir: 40, rate: 12.5, maxLimit: 400000, pd: 1.5, decision: 'APPROVE' },
        { grade: 'B', minScore: 700, maxFoir: 40, rate: 14.5, maxLimit: 300000, pd: 3.5, decision: 'APPROVE' },
        { grade: 'C', minScore: 650, maxFoir: 55, rate: 17.0, maxLimit: 180000, pd: 7.5, decision: 'REFER' },
        { grade: 'D', minScore: 0, maxFoir: 100, rate: null, maxLimit: 0, pd: 15.0, decision: 'REJECT' }
    ],

    // Hard Decline Rules
    hardDeclineRules: [
        { id: 'score-floor', label: 'Credit Score Hard Floor', condition: (score) => score < 620, reason: 'Credit score below minimum threshold (620)' },
        { id: 'foir-cap', label: 'FOIR Hard Cap', condition: (foir) => foir > 60, reason: 'Fixed obligations exceed 60% of income' },
        { id: 'active-default', label: 'Active Default', condition: (defaults) => defaults > 0, reason: 'Active default on credit bureau' }
    ],

    // Factor Weights (Illustrative)
    factorWeights: [
        { factor: 'Credit Score', weight: 30, source: 'Credit Bureau', color: '#3B82F6' },
        { factor: 'FOIR / Affordability', weight: 25, source: 'Income + Existing EMI', color: '#EF4444' },
        { factor: 'Income Stability', weight: 15, source: 'Bank Statement (AA)', color: '#10B981' },
        { factor: 'Repayment History', weight: 15, source: 'Credit Bureau', color: '#8B5CF6' },
        { factor: 'Banking Behaviour', weight: 10, source: 'Bank Statement (AA)', color: '#F59E0B' },
        { factor: 'Fraud / Consistency', weight: 5, source: 'Cross-validation', color: '#6366F1' }
    ],

    // LGD assumption for ECL calculation
    lgd: 0.50
};

// ============================================================
// UNDERWRITING FUNCTIONS
// ============================================================

function calculateEMI(principal, annualRate, tenureMonths) {
    if (!annualRate || annualRate === 0) return 0;
    const monthlyRate = annualRate / (12 * 100);
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    return Math.round(emi);
}

function calculateFOIR(income, existingEmi, proposedEmi) {
    if (income === 0) return 100;
    return ((existingEmi + proposedEmi) / income) * 100;
}

function calculateDTI(income, existingEmi) {
    if (income === 0) return 100;
    return (existingEmi / income) * 100;
}

function calculateECL(pd, lgd, ead) {
    return (pd / 100) * lgd * ead;
}

function getRiskGrade(score) {
    for (const threshold of UNDERWRITING_CONFIG.gradeThresholds) {
        if (score >= threshold.minScore) {
            return threshold;
        }
    }
    return UNDERWRITING_CONFIG.gradeThresholds[UNDERWRITING_CONFIG.gradeThresholds.length - 1];
}

function runUnderwriting(profileId) {
    const profile = BORROWER_PROFILES[profileId];
    if (!profile) return null;

    const loanAmount = UNDERWRITING_CONFIG.requestedLoanAmount;
    const tenure = UNDERWRITING_CONFIG.defaultTenure;
    const gradeInfo = getRiskGrade(profile.creditScore);

    // Calculate proposed EMI (use grade rate if available, else estimate with 15%)
    const rate = gradeInfo.rate || 15;
    const proposedEmi = calculateEMI(loanAmount, rate, tenure);

    // Calculate FOIR
    const foir = calculateFOIR(profile.income, profile.existingEmi, proposedEmi);

    // Calculate DTI (existing only)
    const dti = calculateDTI(profile.income, profile.existingEmi);

    // Calculate ECL
    const ecl = calculateECL(gradeInfo.pd, UNDERWRITING_CONFIG.lgd, loanAmount);

    // Processing fee
    const processingFee = Math.round(loanAmount * UNDERWRITING_CONFIG.processingFeeRate);
    const netDisbursement = loanAmount - processingFee;

    // Run gate checks
    const gates = [
        { id: 'identity', label: 'Identity Verified', passed: true, detail: 'PAN + Aadhaar match, liveliness passed', icon: '🆔' },
        { id: 'policy', label: 'Policy Eligibility', passed: true, detail: `${profile.employmentType}, age/geography eligible`, icon: '📋' },
        { id: 'bureau', label: 'Credit Bureau Assessment', passed: profile.creditScore >= 620, detail: `Score ${profile.creditScore} → Grade ${gradeInfo.grade} → PD ${gradeInfo.pd}%`, icon: '📊', warning: profile.creditScore < 700 },
        { id: 'foir', label: 'FOIR / Affordability', passed: foir <= 60, detail: `FOIR: ${foir.toFixed(1)}% (${foir <= 40 ? 'healthy' : foir <= 55 ? 'elevated' : 'breached'})`, icon: '📈', warning: foir > 40 && foir <= 60 },
        { id: 'bank', label: 'Bank Statement Analysis', passed: true, detail: `Avg salary: ₹${profile.bankData.avgSalaryCredit.toLocaleString('en-IN')}, Bounces: ${profile.bankData.bounces}`, icon: '🏦', warning: profile.bankData.bounces > 0 || profile.bankData.avgBalance < 20000 },
        { id: 'fraud', label: 'Fraud & Consistency', passed: true, detail: 'All data sources consistent', icon: '🔒' }
    ];

    // Determine final decision
    let decision = gradeInfo.decision;
    let decisionReasons = [];

    // Check hard decline rules
    if (profile.creditScore < 620) {
        decision = 'REJECT';
        decisionReasons.push(`Credit score ${profile.creditScore} is below the hard floor of 620`);
    }
    if (foir > 60) {
        decision = 'REJECT';
        decisionReasons.push(`FOIR of ${foir.toFixed(1)}% exceeds the 60% hard cap`);
    }
    if (profile.bureau.defaults > 0) {
        decision = 'REJECT';
        decisionReasons.push('Active default on credit bureau');
    }

    // If not rejected, add positive/refer reasons
    if (decision === 'APPROVE') {
        decisionReasons = [
            `Credit score ${profile.creditScore} qualifies for Grade ${gradeInfo.grade}`,
            `FOIR of ${foir.toFixed(1)}% is within the ${gradeInfo.maxFoir}% threshold`,
            'Clean bureau — no defaults, acceptable enquiry count',
            'Bank data confirms stable income and low bounce rate'
        ];
    } else if (decision === 'REFER') {
        decisionReasons = [
            `Credit score ${profile.creditScore} falls in Grade ${gradeInfo.grade} (borderline)`,
            `Short credit history (${profile.bureau.oldestAccount}) — thin file`,
            'No negative signals, but insufficient data for confident auto-approval',
            'Routed to credit analyst for manual assessment'
        ];
    }

    return {
        profileId,
        profile,
        loanAmount,
        tenure,
        rate: gradeInfo.rate,
        proposedEmi,
        foir: parseFloat(foir.toFixed(1)),
        dti: parseFloat(dti.toFixed(1)),
        riskGrade: gradeInfo.grade,
        pd: gradeInfo.pd,
        ecl: Math.round(ecl),
        maxLimit: gradeInfo.maxLimit,
        processingFee,
        netDisbursement,
        decision,
        decisionReasons,
        gates,
        factorScores: generateFactorScores(profile, foir)
    };
}

function generateFactorScores(profile, foir) {
    // Generate illustrative factor scores (0-100) based on profile
    const scoreNorm = Math.min(100, Math.max(0, ((profile.creditScore - 300) / 600) * 100));
    const foirScore = Math.max(0, 100 - (foir * 1.5));
    const incomeScore = profile.bankData.salaryRegularity.includes('Regular') ? 85 : 60;
    const repaymentScore = profile.bureau.defaults === 0 ? (profile.creditScore > 700 ? 90 : 65) : 20;
    const bankingScore = profile.bankData.bounces === 0 ? (profile.bankData.avgBalance > 50000 ? 90 : 65) : 35;
    const fraudScore = 95; // All profiles pass fraud

    return [
        { factor: 'Credit Score', score: Math.round(scoreNorm), weight: 30, color: '#3B82F6' },
        { factor: 'FOIR / Affordability', score: Math.round(foirScore), weight: 25, color: '#EF4444' },
        { factor: 'Income Stability', score: incomeScore, weight: 15, color: '#10B981' },
        { factor: 'Repayment History', score: repaymentScore, weight: 15, color: '#8B5CF6' },
        { factor: 'Banking Behaviour', score: bankingScore, weight: 10, color: '#F59E0B' },
        { factor: 'Fraud / Consistency', score: fraudScore, weight: 5, color: '#6366F1' }
    ];
}

// ============================================================
// TRADITIONAL VS DIGITAL LENDING COMPARISON
// ============================================================

const TRADITIONAL_VS_DIGITAL = [
    { step: 'Customer Visit', traditional: 'Branch visit during working hours', digital: 'Mobile app — anytime, anywhere', icon: '🏢' },
    { step: 'Application', traditional: 'Fill 10-page paper form', digital: 'Enter 3–5 fields on phone', icon: '📝' },
    { step: 'Identity Check', traditional: 'Submit physical ID copies, officer verifies', digital: 'Aadhaar eKYC + PAN API — seconds', icon: '🆔' },
    { step: 'Income Proof', traditional: 'Submit salary slips, bank passbook, HR letter', digital: 'Account Aggregator fetches bank data digitally', icon: '💰' },
    { step: 'Credit Check', traditional: 'Manual bureau pull and spreadsheet analysis', digital: 'Automated bureau API + risk engine', icon: '📊' },
    { step: 'Decision', traditional: 'Manual review by credit officer — 3–7 days', digital: 'Automated decision engine — seconds', icon: '⚡' },
    { step: 'Agreement', traditional: 'Physical document, wet signature, witness', digital: 'Digital agreement + Aadhaar e-Sign', icon: '✍️' },
    { step: 'Disbursement', traditional: 'Manual NEFT — 1–3 business days', digital: 'IMPS/UPI — minutes', icon: '💸' },
    { step: 'Repayment', traditional: 'Post-dated cheques or manual NEFT', digital: 'eNACH auto-debit', icon: '🔄' }
];

// ============================================================
// RBI INNOVATION SECTION
// ============================================================

const RBI_INNOVATION = {
    sandbox: {
        title: 'RBI Regulatory Sandbox',
        description: 'A controlled environment where fintech companies can test innovative products/services under RBI supervision.',
        process: [
            { step: 'Application', detail: 'Fintech applies to test a new product' },
            { step: 'Evaluation', detail: 'RBI evaluates innovation potential and risk' },
            { step: 'Controlled Testing', detail: 'Limited deployment with real users under supervision' },
            { step: 'Feedback', detail: 'RBI observes outcomes and compliance' },
            { step: 'Decision', detail: 'Product approved for wider launch or sent back for modification' }
        ],
        why: 'Innovation often moves faster than regulation. The sandbox lets RBI learn about new technologies while protecting consumers from untested products.'
    },
    uli: {
        title: 'Unified Lending Interface (ULI)',
        description: 'An RBI/RBIH-backed technology platform based on standardised APIs for authenticated data access from multiple sources.',
        sources: ['Aadhaar / PAN', 'Account Aggregators', 'DigiLocker', 'GSTN', 'Land Records', 'Property Data'],
        benefit: 'Instead of integrating with each data source separately, lenders can access all through one standardised interface — reducing complexity and cost.',
        status: 'Advanced concept — being developed to further streamline digital lending infrastructure'
    }
};
