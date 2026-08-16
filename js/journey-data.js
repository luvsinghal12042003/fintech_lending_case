// ============================================================
// JOURNEY DATA — Single Source of Truth
// Used by both Page A (teaching) and Page B (borrower demo)
// ============================================================

const LIFECYCLE_STAGES = [
    { id: 'acquisition', label: 'Acquisition', icon: '📢', color: '#14B8A6', description: 'Finding and attracting potential borrowers through digital channels' },
    { id: 'underwriting', label: 'Underwriting', icon: '🔍', color: '#F59E0B', description: 'Assessing borrower risk using data, analytics and automated decision engines' },
    { id: 'onboarding', label: 'Onboarding', icon: '📋', color: '#3B82F6', description: 'Completing agreements, e-signing and disbursing the loan' },
    { id: 'customer-management', label: 'Customer Mgmt', icon: '💼', color: '#8B5CF6', description: 'Managing the active loan, EMI tracking and borrower relationship' },
    { id: 'collections', label: 'Collections', icon: '🔄', color: '#EF4444', description: 'Automated repayment collection via eNACH and managing delinquency' }
];

const TEAM_DIRECTORY = {
    marketing: {
        name: 'Marketing',
        function: 'Growth / Acquisition',
        color: '#14B8A6',
        icon: '📢',
        description: 'Drives borrower acquisition through digital campaigns, targeting and channel optimization.',
        owns: 'Customer acquisition strategy, ad spend, channel performance',
        inputs: ['Target segment definition', 'Budget allocation', 'Product positioning'],
        outputs: ['Qualified leads', 'App installs', 'Brand awareness']
    },
    product: {
        name: 'Product',
        function: 'Customer Experience',
        color: '#6366F1',
        icon: '🎯',
        description: 'Defines the customer experience, application flow and feature roadmap.',
        owns: 'User journey, feature prioritization, conversion optimization',
        inputs: ['Market research', 'User feedback', 'Business objectives'],
        outputs: ['Product requirements', 'User stories', 'Journey maps']
    },
    frontendTech: {
        name: 'Frontend Technology',
        function: 'Technology',
        color: '#3B82F6',
        icon: '📱',
        description: 'Builds the mobile app and web interfaces that borrowers interact with.',
        owns: 'Mobile app, web portal, UI components, user interface performance',
        inputs: ['Product requirements', 'Design specifications'],
        outputs: ['Working application screens', 'User interfaces']
    },
    backendTech: {
        name: 'Backend Technology',
        function: 'Technology',
        color: '#0EA5E9',
        icon: '⚙️',
        description: 'Builds and maintains APIs, integrations and server-side systems.',
        owns: 'APIs, microservices, database, third-party integrations, system reliability',
        inputs: ['Product requirements', 'Risk rules', 'Integration specifications'],
        outputs: ['Working APIs', 'Data pipelines', 'System integrations']
    },
    complianceRisk: {
        name: 'Compliance / Risk',
        function: 'Control',
        color: '#F59E0B',
        icon: '🛡️',
        description: 'Ensures regulatory compliance (RBI norms, KYC/AML, data privacy).',
        owns: 'Regulatory compliance, KYC policy, consent frameworks, audit readiness',
        inputs: ['RBI regulations', 'Data privacy laws', 'Industry guidelines'],
        outputs: ['Compliance policies', 'Audit reports', 'Regulatory filings']
    },
    legal: {
        name: 'Legal & Compliance',
        function: 'Control',
        color: '#D97706',
        icon: '⚖️',
        description: 'Drafts loan agreements, manages consent, ensures legal enforceability.',
        owns: 'Loan agreements, consent language, terms of service, dispute resolution',
        inputs: ['Regulatory requirements', 'Product terms', 'Risk policies'],
        outputs: ['Legal agreements', 'Consent frameworks', 'T&C documents']
    },
    riskAnalytics: {
        name: 'Risk / Analytics / Data Science',
        function: 'Credit',
        color: '#EF4444',
        icon: '📊',
        description: 'Designs underwriting frameworks, scorecards, risk models and credit policies.',
        owns: 'Credit policy, risk models, scorecards, FOIR thresholds, pricing strategy',
        inputs: ['Bureau data', 'Bank data', 'Income data', 'Portfolio performance'],
        outputs: ['Risk grades', 'Credit decisions', 'Pricing recommendations', 'Policy rules']
    },
    operations: {
        name: 'Operations',
        function: 'Operations',
        color: '#10B981',
        icon: '🔧',
        description: 'Handles disbursement, reconciliation, manual reviews and operational processes.',
        owns: 'Disbursement process, reconciliation, manual review queue, operational SLAs',
        inputs: ['Approved applications', 'Disbursement instructions', 'Referral cases'],
        outputs: ['Disbursed loans', 'Reconciliation reports', 'Review decisions']
    },
    collections: {
        name: 'Collections',
        function: 'Post-disbursement',
        color: '#DC2626',
        icon: '🔄',
        description: 'Manages repayment collection, reminders, and delinquency handling.',
        owns: 'Collection strategy, reminder workflows, escalation matrix, recovery',
        inputs: ['EMI schedules', 'Payment status', 'Delinquency data'],
        outputs: ['Collection actions', 'Recovery reports', 'Borrower communications']
    },
    partnerships: {
        name: 'Partnerships / Business',
        function: 'Business',
        color: '#7C3AED',
        icon: '🤝',
        description: 'Manages lending partner relationships with NBFCs and banks. Negotiates FLDG terms, co-lending arrangements and portfolio allocation.',
        owns: 'NBFC/Bank partnerships, FLDG arrangements, co-lending agreements, partner compliance',
        inputs: ['Portfolio performance data', 'RBI guidelines', 'Partner requirements'],
        outputs: ['Partnership agreements', 'FLDG commitments', 'Co-lending structures']
    }
};

const JOURNEY_STEPS = [
    // ========== STEP 1: ACQUISITION ==========
    {
        id: 'step-1',
        stage: 'acquisition',
        stepNumber: 1,
        substep: null,
        title: 'Digital Acquisition',
        subtitle: 'Customer Encounters a Loan Ad',
        customerScreen: {
            type: 'ad',
            headline: 'Need Quick Cash?',
            subheadline: 'Get up to ₹5,00,000 in minutes',
            ctaText: 'Apply Now',
            visual: 'loan-ad',
            details: ['No paperwork', 'Instant approval', '100% digital']
        },
        customerAction: 'Rohan sees a targeted Instagram ad for Nova Credit while browsing. The ad promises quick digital loans. He taps "Apply Now".',
        teams: [
            {
                key: 'marketing',
                responsibility: 'Created and targeted this digital ad campaign using demographic and behavioural data.',
                why: 'Digital acquisition costs ₹100–300 per lead compared to ₹2,000+ for branch walk-ins. Targeted ads reach the right borrowers at the right moment.'
            },
            {
                key: 'product',
                responsibility: 'Designed the landing experience and the Apply Now flow to minimize drop-offs.',
                why: 'Every extra tap loses 20–30% of potential borrowers. Product must balance information collection with conversion speed.'
            }
        ],
        dataInputs: ['Ad impression data', 'Click-through rate', 'User demographic', 'Channel source'],
        technology: {
            label: 'Ad Platform → Deep Link → App / Web Landing',
            flow: ['Ad Platform', 'Deep Link', 'Mobile App', 'Landing Screen'],
            examples: ['Meta/Google Ads', 'Branch.io / Adjust (attribution)', 'Firebase Analytics']
        },
        riskControl: 'No sensitive data collected yet. Attribution tracking only. Privacy-compliant ad targeting.',
        businessPurpose: 'Acquire borrowers at low cost through scalable digital channels, reducing dependence on physical branches.',
        educationalExplanation: 'Digital lending starts before the app. Marketing and Product teams design the entire acquisition funnel — from ad creative to the first app screen — to maximize quality leads while minimizing cost per acquisition.',
        expertDetail: 'Cost per acquisition (CPA) in digital lending typically ranges from ₹150–500 depending on channel, compared to ₹1,500–5,000 for branch-based acquisition. Conversion from ad click to completed application is typically 5–15%.'
    },

    // ========== STEP 2: APP REGISTRATION ==========
    {
        id: 'step-2',
        stage: 'acquisition',
        stepNumber: 2,
        substep: null,
        title: 'App Registration',
        subtitle: 'Customer Enters Basic Details',
        customerScreen: {
            type: 'form',
            headline: 'Let\'s Get Started',
            subheadline: 'Tell us a little about yourself',
            fields: [
                { label: 'Full Name (as per PAN)', type: 'text', placeholder: 'Rohan Mehta' },
                { label: 'Mobile Number', type: 'tel', placeholder: '98765 43210' },
                { label: 'Employment Type', type: 'select', options: ['Salaried', 'Self-Employed'] },
                { label: 'Monthly Income', type: 'number', placeholder: '₹' }
            ],
            ctaText: 'Continue',
            visual: 'registration-form'
        },
        customerAction: 'Rohan enters his name, mobile number, employment type and monthly income. He taps Continue.',
        teams: [
            {
                key: 'product',
                responsibility: 'Designed minimal form fields to reduce drop-off while collecting essential qualification data.',
                why: 'Asking too many questions upfront kills conversion. Product must identify the minimum viable information to begin processing.'
            },
            {
                key: 'frontendTech',
                responsibility: 'Built the responsive form with input validation, auto-formatting and error handling.',
                why: 'A clunky form on a small phone screen frustrates users. Frontend ensures smooth data capture across hundreds of device types.'
            }
        ],
        dataInputs: ['Full name', 'Mobile number', 'Employment type', 'Monthly income (self-declared)'],
        technology: {
            label: 'Mobile App → Input Validation → Secure API → User Database',
            flow: ['Mobile App', 'Input Validation', 'API Gateway', 'User Service', 'Database'],
            examples: ['React Native / Flutter (illustrative)', 'REST APIs', 'Encrypted storage']
        },
        riskControl: 'Mobile number verified via OTP. Basic input validation. No credit data accessed yet.',
        businessPurpose: 'Capture minimum qualifying information to begin the journey, balancing conversion with data quality.',
        educationalExplanation: 'The app collects only what is strictly needed to start. More detailed information will be gathered digitally through APIs (Aadhaar, Bureau, Bank) rather than asking the customer to fill long forms.',
        expertDetail: 'Best-practice fintech onboarding collects 3–5 fields on screen one. Income is self-declared at this stage and will be cross-validated against bank statement data from the Account Aggregator later.'
    },

    // ========== STEP 3: VERIFICATION ==========
    {
        id: 'step-3',
        stage: 'underwriting',
        stepNumber: 3,
        substep: null,
        title: 'Identity Verification',
        subtitle: 'PAN / Aadhaar Verification & Liveliness Check',
        customerScreen: {
            type: 'verification',
            headline: 'Verify Your Identity',
            subheadline: 'Quick digital KYC — no branch visit needed',
            steps: [
                { label: 'PAN Verification', status: 'verifying', icon: '🪪' },
                { label: 'Aadhaar OTP', status: 'pending', icon: '🆔' },
                { label: 'Selfie Match', status: 'pending', icon: '🤳' }
            ],
            ctaText: 'Verify via Aadhaar OTP',
            visual: 'kyc-verification'
        },
        customerAction: 'Rohan enters his PAN, verifies Aadhaar via OTP, and takes a selfie for liveliness check. The system confirms his identity in seconds.',
        teams: [
            {
                key: 'backendTech',
                responsibility: 'Integrates with identity verification services for PAN validation, Aadhaar OTP and liveliness detection.',
                why: 'The backend must coordinate multiple verification APIs in sequence, handle timeouts, retries and error states — all within seconds so the customer does not drop off.'
            },
            {
                key: 'complianceRisk',
                responsibility: 'Defines KYC requirements as per RBI norms. Ensures the process meets regulatory standards.',
                why: 'RBI mandates KYC for all financial products. Non-compliance can result in penalties or license revocation. The compliance team ensures every verification meets the regulatory bar.'
            }
        ],
        dataInputs: ['PAN number', 'Aadhaar number', 'OTP', 'Selfie image', 'Device metadata'],
        technology: {
            label: 'App → API Gateway → PAN/Aadhaar Service → Liveliness AI → Verification Result',
            flow: ['Mobile App', 'API Gateway', 'PAN Verification', 'Aadhaar eKYC', 'Liveliness Detection', 'Verification Result'],
            examples: ['NSDL PAN Verification', 'UIDAI Aadhaar eKYC (via KUA/KSA)', 'AI-based liveliness detection']
        },
        riskControl: 'Identity fraud prevention. Liveliness check prevents photo/video spoofing. PAN-Aadhaar cross-match validates identity consistency.',
        businessPurpose: 'Replace physical document verification with instant digital KYC — reducing onboarding time from days to seconds while maintaining regulatory compliance.',
        educationalExplanation: 'Digital KYC uses India Stack infrastructure (Aadhaar + PAN + DigiLocker). The customer does one simple step, but behind the screen, the platform verifies identity against government databases in real-time.',
        expertDetail: 'Aadhaar eKYC via OTP provides name, address, date of birth and photo. PAN provides tax identity. Cross-matching these catches identity fraud. Liveliness detection (blink/turn head) prevents spoofing with photographs.'
    },

    // ========== STEP 4A: CONSENT CAPTURE ==========
    {
        id: 'step-4a',
        stage: 'underwriting',
        stepNumber: 4,
        substep: 'A',
        title: 'Consent Capture',
        subtitle: 'Borrower Grants Data Access Permissions',
        customerScreen: {
            type: 'consent',
            headline: 'Permissions Required',
            subheadline: 'We need your consent to proceed',
            consents: [
                { id: 'bureau', label: 'Check credit history', description: 'Allow us to fetch your credit report from the bureau', icon: '📊' },
                { id: 'aa', label: 'Share bank statements', description: 'Securely share 6 months of banking data via Account Aggregator', icon: '🏦' },
                { id: 'enach', label: 'Set up auto-repayment', description: 'Authorize automatic EMI deduction from your bank account', icon: '🔄' },
                { id: 'terms', label: 'Terms & Privacy', description: 'Accept terms of service and privacy policy', icon: '📜' }
            ],
            ctaText: 'I Agree & Continue',
            visual: 'consent-capture'
        },
        customerAction: 'Rohan reviews and grants consent for credit bureau access, bank data sharing via Account Aggregator, eNACH auto-debit setup, and terms acceptance.',
        teams: [
            {
                key: 'legal',
                responsibility: 'Drafted consent language ensuring legal enforceability and regulatory compliance.',
                why: 'Every data access must have explicit, informed consent. Poor consent design can invalidate the entire loan agreement and attract regulatory penalties.'
            },
            {
                key: 'product',
                responsibility: 'Designed clear, non-intimidating consent screens that explain each permission in plain language.',
                why: 'If consent screens are confusing or scary, borrowers abandon the application. Product must make legal requirements feel simple.'
            },
            {
                key: 'backendTech',
                responsibility: 'Records consent with timestamps, stores securely, and triggers downstream data-fetch workflows.',
                why: 'Consent must be auditable — regulators may ask for proof that the borrower explicitly agreed before any data was accessed.'
            }
        ],
        dataInputs: ['Bureau consent flag', 'AA consent flag', 'eNACH consent flag', 'Terms acceptance', 'Consent timestamps', 'Device fingerprint'],
        technology: {
            label: 'Consent UI → Consent Service → Audit Log → Trigger Data Fetch',
            flow: ['Mobile App', 'Consent Service', 'Audit Logger', 'Bureau Trigger', 'AA Trigger'],
            examples: ['Digital consent framework', 'Immutable audit logs', 'Event-driven architecture (illustrative: Kafka)']
        },
        riskControl: 'Explicit opt-in for each data source. Consent is time-stamped, logged and auditable. Borrower can revoke consent for future data access.',
        businessPurpose: 'Consent is both a legal requirement and a trust-building moment. Transparent data access builds borrower confidence in the platform.',
        educationalExplanation: 'Before accessing any financial data, the lender must get explicit consent. This is not just good practice — it is mandated by RBI regulations and data protection norms. Each consent enables a specific data flow.',
        expertDetail: 'Account Aggregator consent follows the ReBIT (RBI) consent artefact standard — specifying purpose, data range, frequency and expiry. Bureau consent triggers a "hard enquiry" which is visible on the borrower\'s credit report.'
    },

    // ========== STEP 4B: CREDIT BUREAU PULL ==========
    {
        id: 'step-4b',
        stage: 'underwriting',
        stepNumber: 4,
        substep: 'B',
        title: 'Credit Bureau Pull',
        subtitle: 'Fetching Credit History & Score',
        customerScreen: {
            type: 'loading',
            headline: 'Checking Credit History',
            subheadline: 'Securely fetching your credit profile...',
            loadingSteps: [
                'Connecting to credit bureau...',
                'Fetching credit report...',
                'Analysing credit history...'
            ],
            visual: 'bureau-loading'
        },
        customerAction: 'Rohan waits a few seconds while the system fetches his credit report. He sees a loading animation.',
        teams: [
            {
                key: 'riskAnalytics',
                responsibility: 'Designed the credit assessment framework — which bureau fields to use, score thresholds, risk grade mapping and what constitutes a red flag.',
                why: 'The Risk team decides WHAT to look for in a credit report. A 720 score means different things depending on bureau flags, enquiry patterns and credit mix. Risk translates raw data into lending intelligence.'
            },
            {
                key: 'backendTech',
                responsibility: 'Integrates with bureau APIs, handles request/response, parses the report and stores results securely.',
                why: 'The Backend team builds HOW to get the data. Bureau APIs have specific formats, authentication, rate limits and error handling that must be managed programmatically.'
            }
        ],
        dataInputs: ['Credit score (300–900)', 'Active loan count', 'Repayment history', 'Defaults/write-offs', 'Recent enquiry count', 'Credit utilization', 'Oldest account age'],
        technology: {
            label: 'App → Backend → Bureau API → Credit Report → Risk Engine',
            flow: ['Consent Trigger', 'Backend API', 'Credit Bureau (CIBIL/Experian)', 'Credit Report', 'Risk Engine'],
            examples: ['CIBIL / Experian / Equifax APIs', 'Credit report parsing', 'Score-to-grade mapping']
        },
        riskControl: 'Bureau data reveals existing obligations, defaults and credit-seeking behaviour. A "hard enquiry" is logged on the borrower\'s report.',
        businessPurpose: 'Credit bureau data is the primary risk signal for unsecured lending. It reveals whether the borrower has historically repaid obligations — the single strongest predictor of future repayment.',
        educationalExplanation: 'The credit bureau maintains a record of all your loans, credit cards and repayment history. Your credit score (300–900) summarizes this history into a single number that lenders use as a starting point for risk assessment.',
        expertDetail: 'Bureau pull returns: CIBIL score, number of active accounts, total outstanding, DPD (Days Past Due) history, enquiry count (last 30/90/180 days), written-off accounts. Each is mapped to risk model inputs.'
    },

    // ========== STEP 4C: ACCOUNT AGGREGATOR ==========
    {
        id: 'step-4c',
        stage: 'underwriting',
        stepNumber: 4,
        substep: 'C',
        title: 'Account Aggregator Fetch',
        subtitle: 'Consent-Based Bank Data Sharing',
        customerScreen: {
            type: 'loading',
            headline: 'Analysing Bank Statements',
            subheadline: 'Securely fetching 6 months of banking data...',
            loadingSteps: [
                'Connecting to Account Aggregator...',
                'Fetching bank transactions...',
                'Analysing cash flow patterns...',
                'Calculating income stability...'
            ],
            visual: 'aa-loading'
        },
        customerAction: 'Rohan\'s banking data is securely fetched via the Account Aggregator framework. He sees an analysis in progress.',
        teams: [
            {
                key: 'backendTech',
                responsibility: 'Integrates with Account Aggregator APIs to fetch consented bank data. Parses transaction data into structured categories.',
                why: 'Raw bank statement data is messy — thousands of transactions with varied descriptions. Backend must parse, categorize and structure this data for the analytics engine.'
            },
            {
                key: 'riskAnalytics',
                responsibility: 'Designs cash-flow analysis models that extract lending signals from bank transactions.',
                why: 'Bank data reveals the borrower\'s TRUE financial position — not just what they declared. Salary regularity, spending patterns, bounce history and balance trends tell a richer story than credit score alone.'
            }
        ],
        dataInputs: ['6-month transaction history', 'Salary credit amounts & dates', 'Recurring debits (existing EMIs)', 'Bounce/return count', 'Average monthly balance', 'Spending category breakdown'],
        technology: {
            label: 'AA Framework → Bank APIs → Transaction Data → Cash-Flow Analytics',
            flow: ['AA Consent', 'Account Aggregator', 'Bank Systems', 'Transaction Data', 'Cash-Flow Engine'],
            examples: ['Account Aggregator framework (ReBIT standard)', 'Bank statement parsers', 'Cash-flow scoring models']
        },
        riskControl: 'Consent-based access only — borrower explicitly authorizes data sharing. Data is fetched through regulated Account Aggregator intermediaries. Borrower can revoke consent.',
        businessPurpose: 'Bank statement analysis enables lending to customers who lack traditional documentation. It validates self-declared income and reveals actual financial behaviour — a key fintech advantage over traditional banks.',
        educationalExplanation: 'Account Aggregators are RBI-regulated entities that enable secure, consent-based sharing of financial data between banks and lenders. The lender never gets your login credentials — only the transaction data you authorized.',
        expertDetail: 'AA operates on the "data empowerment" principle — the customer owns their data and controls who can access it. The framework follows FIP (Financial Information Provider) → AA → FIU (Financial Information User) architecture with end-to-end encryption.'
    },

    // ========== STEP 4D: UNDERWRITING DECISION ==========
    {
        id: 'step-4d',
        stage: 'underwriting',
        stepNumber: 4,
        substep: 'D',
        title: 'Underwriting Decision',
        subtitle: 'Credit Engine Evaluates All Data',
        customerScreen: {
            type: 'decision-pending',
            headline: 'Evaluating Your Application',
            subheadline: 'Our credit engine is analysing your profile...',
            checks: [
                { label: 'Identity Verified', icon: '🆔' },
                { label: 'Income Assessed', icon: '💰' },
                { label: 'Credit History Checked', icon: '📊' },
                { label: 'Affordability Calculated', icon: '📈' },
                { label: 'Risk Policy Applied', icon: '🛡️' },
                { label: 'Fraud Checks Passed', icon: '🔒' }
            ],
            visual: 'decision-engine'
        },
        customerAction: 'Rohan sees an animated sequence of checks running. The credit engine combines all data sources to make a lending decision.',
        teams: [
            {
                key: 'riskAnalytics',
                responsibility: 'DESIGNED the underwriting framework — score thresholds, FOIR caps, risk grades, pricing matrix and decision rules.',
                why: 'This is the most critical team in lending. Risk & Analytics decides WHO gets credit, HOW MUCH and at WHAT PRICE. They balance growth (approving more) against risk (potential defaults).'
            },
            {
                key: 'backendTech',
                responsibility: 'IMPLEMENTED the decision engine — converting risk policies into executable rules that run in milliseconds.',
                why: 'Technology operationalizes the risk framework. The backend runs the policy rules against all collected data and produces a decision within seconds — something a manual underwriter would take days to do.'
            }
        ],
        dataInputs: ['Credit score & grade', 'FOIR calculation', 'Income verification result', 'Bank cash-flow analysis', 'Fraud check results', 'Policy rule outputs'],
        technology: {
            label: 'All Data → Decision Engine → Policy Rules → Risk Grade → Approve/Refer/Reject',
            flow: ['Bureau Data', 'Bank Data', 'Income Data', 'Decision Engine', 'Policy Rules', 'Credit Decision'],
            examples: ['Rule engine', 'Scorecard models', 'Decision tree / waterfall logic']
        },
        riskControl: 'Multiple hard-stop rules: credit score floor (620), FOIR cap (60%), fraud signals, active defaults. Ambiguous cases route to manual review (REFER).',
        businessPurpose: 'Automated underwriting enables consistent, fast, scalable lending decisions. It removes human bias, applies policy uniformly and costs a fraction of manual underwriting.',
        educationalExplanation: 'The decision engine is NOT just one number. It combines credit score, income, existing debt, bank behaviour and fraud signals. The engine applies business rules designed by the Risk team to produce APPROVE, REFER or REJECT.',
        expertDetail: 'Decision engine evaluates: (1) Hard rules — score floor, FOIR cap, active default = instant reject; (2) Soft rules — weighted scorecard across 6 factors; (3) Policy overlay — exposure limits, sector caps, geography restrictions. REFER cases go to manual queue for human judgment.'
    },

    // ========== STEP 5: AGREEMENT & E-SIGN ==========
    {
        id: 'step-5',
        stage: 'onboarding',
        stepNumber: 5,
        substep: null,
        title: 'Agreement & e-Sign',
        subtitle: 'Digital Loan Agreement Execution',
        customerScreen: {
            type: 'agreement',
            headline: 'Loan Agreement',
            subheadline: 'Review and sign your loan agreement digitally',
            agreementHighlights: [
                'Loan Amount: ₹25,000',
                'Interest Rate: 12.5% p.a.',
                'Tenure: 12 months',
                'EMI: ₹2,224',
                'Processing Fee: ₹500 (2%)'
            ],
            ctaText: 'Sign with Aadhaar e-Sign',
            visual: 'agreement-esign'
        },
        customerAction: 'Rohan reviews the loan agreement with all terms clearly displayed. He signs digitally using Aadhaar e-Sign (OTP-based).',
        teams: [
            {
                key: 'legal',
                responsibility: 'Drafted the loan agreement template ensuring legal enforceability, regulatory compliance and borrower protection clauses.',
                why: 'The agreement is a legally binding contract. It must comply with RBI fair practices code, clearly disclose all charges, and protect both lender and borrower rights.'
            },
            {
                key: 'backendTech',
                responsibility: 'Integrates with e-Sign service provider, generates the agreement document with dynamic data, and stores the signed copy securely.',
                why: 'e-Sign replaces physical wet signatures. The backend must generate personalized agreements, trigger Aadhaar OTP, capture the signature and create a tamper-proof signed document.'
            }
        ],
        dataInputs: ['Approved loan terms', 'Borrower details', 'e-Sign OTP', 'Agreement document', 'Digital signature certificate'],
        technology: {
            label: 'Agreement Generator → e-Sign Service → Aadhaar OTP → Signed Document',
            flow: ['Loan Terms', 'Agreement Generator', 'e-Sign Service', 'Aadhaar OTP', 'Signed Document', 'Document Store'],
            examples: ['Aadhaar e-Sign (via licensed ASP)', 'PDF generation', 'Digital signature certificate']
        },
        riskControl: 'Aadhaar e-Sign provides legally valid electronic signature. Agreement includes cooling-off period, grievance redressal and prepayment terms as per RBI guidelines.',
        businessPurpose: 'Digital agreements eliminate physical paperwork, reduce turnaround from days to minutes, and create instantly verifiable, tamper-proof contracts.',
        educationalExplanation: 'Aadhaar e-Sign allows you to digitally sign legal documents using just an OTP — no physical signature needed. This is legally equivalent to a wet signature under the IT Act.',
        expertDetail: 'e-Sign uses a licensed Application Service Provider (ASP) connected to UIDAI. The signed document carries a Digital Signature Certificate (DSC) that makes it legally valid and tamper-evident.'
    },

    // ========== STEP 5b: NBFC PARTNERSHIP & FLDG ==========
    {
        id: 'step-5b',
        stage: 'onboarding',
        stepNumber: 5,
        substep: 'b',
        title: 'NBFC Partnership & FLDG',
        subtitle: 'Who Actually Lends the Money?',
        customerScreen: {
            type: 'loading',
            headline: 'Processing Your Loan...',
            subheadline: 'Coordinating with our lending partner',
            loadingSteps: [
                'Routing to lending partner...',
                'Partner NBFC reviewing terms...',
                'Loan booked on partner books...',
                'Ready for disbursement!'
            ],
            ctaText: null,
            visual: 'partner-routing'
        },
        customerAction: 'Rohan sees "Processing your loan..." — behind the screen, the fintech is routing the approved loan to its NBFC lending partner (e.g., Bajaj Finance). The customer never knows this step exists.',
        teams: [
            {
                key: 'partnerships',
                responsibility: 'Manages the relationship with the lending NBFC. Negotiates the commercial terms — interest rate split, FLDG percentage, portfolio limits, and co-lending ratios.',
                why: 'Most fintechs are NOT lenders. They are Loan Service Providers (LSPs) who originate loans on behalf of licensed NBFCs or banks. The partnership team ensures this relationship is commercially viable and regulatory compliant.'
            },
            {
                key: 'complianceRisk',
                responsibility: 'Ensures the NBFC partnership complies with RBI Digital Lending Guidelines (Sept 2022) and FLDG norms (June 2023). Monitors that FLDG does not exceed 5% of the portfolio.',
                why: 'RBI mandates that the NBFC (not the fintech) must be the lender of record. All loan disbursements must come FROM the NBFC and all collections must go TO the NBFC. The fintech cannot hold borrower funds. FLDG is capped at 5% to prevent fintechs from becoming shadow lenders.'
            },
            {
                key: 'riskAnalytics',
                responsibility: 'Tracks portfolio performance (NPA rates, default rates, collection efficiency) shared with the NBFC partner. The fintech\'s FLDG liability depends on actual portfolio quality.',
                why: 'The NBFC trusts the fintech\'s underwriting quality. If defaults rise, the fintech\'s FLDG guarantee gets invoked — meaning the fintech pays the NBFC for bad loans. This creates skin in the game for responsible lending.'
            },
            {
                key: 'backendTech',
                responsibility: 'API integration with the NBFC\'s Loan Management System (LMS). Loan booking, repayment routing, and reconciliation all flow through the NBFC\'s system.',
                why: 'The fintech\'s system must be tightly integrated with the NBFC — loan accounts are created on the NBFC\'s books, KYC data is shared, and every transaction is logged on the NBFC\'s ledger.'
            },
            {
                key: 'legal',
                responsibility: 'Drafts the LSP-NBFC partnership agreement, FLDG deed, co-lending framework and escrow arrangements.',
                why: 'The legal structure defines who bears the risk, how defaults are shared, and what happens if the partnership ends. This is the commercial backbone of the fintech lending model.'
            }
        ],
        dataInputs: [
            'Approved loan application',
            'Borrower KYC data (shared with NBFC)',
            'Credit decision & risk grade',
            'FLDG commitment (% of portfolio)',
            'NBFC loan booking confirmation',
            'Co-lending ratio (if applicable)',
            'RBI Digital Lending compliance checklist'
        ],
        technology: {
            label: 'Fintech (LSP) → NBFC API → Loan Booking → NBFC LMS → Disbursement Trigger',
            flow: ['Fintech LSP', 'NBFC API', 'Loan Booking Engine', 'NBFC LMS', 'Disbursement Trigger'],
            examples: ['NBFC Partner API (Bajaj Finance, Lendingkart, etc.)', 'Co-lending platform', 'FLDG escrow account', 'RBI CERSAI registration']
        },
        riskControl: 'RBI Digital Lending Guidelines (Sept 2022): Loan must be on NBFC\'s books. FLDG capped at 5% of incremental portfolio (June 2023 circular). All customer-facing comms must disclose the NBFC\'s name. Disbursement must come from NBFC\'s account. Collections must go to NBFC\'s account. The fintech cannot touch borrower money at any point.',
        businessPurpose: 'This is the CORE of the fintech lending model. The fintech brings customers + technology + data. The NBFC brings the lending license + capital + regulatory compliance. FLDG aligns incentives — if the fintech originates bad loans, it pays from its own pocket. This partnership model has enabled India\'s digital lending revolution.',
        educationalExplanation: 'Most "fintech lenders" you see advertised (Slice, KreditBee, MoneyTap, etc.) are NOT lenders. They are Loan Service Providers (LSPs) who partner with licensed NBFCs or banks. When you take a loan from a fintech app, the money actually comes from an NBFC like Bajaj Finance, and the loan account exists on the NBFC\'s books. The fintech handles the technology and customer experience.',
        expertDetail: 'FLDG (First Loss Default Guarantee): The fintech promises to cover the first X% of loan defaults in a portfolio. RBI capped this at 5% (DLG guidelines, June 2023) to prevent moral hazard — if FLDG is too high, the fintech is effectively the lender without a license. Example: If a fintech originates ₹100 Cr of loans and has 5% FLDG, it must set aside ₹5 Cr in an escrow. If defaults exceed 5%, the NBFC bears the remaining loss. This creates a powerful incentive for responsible underwriting. Co-lending (CLM): RBI also allows a 80:20 co-lending model where the NBFC funds 80% and the bank/another NBFC funds 20%, further distributing risk.'
    },

    // ========== STEP 6: DISBURSEMENT ==========
    {
        id: 'step-6',
        stage: 'onboarding',
        stepNumber: 6,
        substep: null,
        title: 'Loan Disbursement',
        subtitle: 'Money Credited to Borrower\'s Account',
        customerScreen: {
            type: 'disbursement',
            headline: '🎉 Loan Disbursed!',
            subheadline: 'Money has been sent to your bank account',
            details: [
                { label: 'Loan Amount', value: '₹25,000' },
                { label: 'Processing Fee', value: '- ₹500' },
                { label: 'Net Disbursement', value: '₹24,500', highlight: true },
                { label: 'Credited To', value: 'Account ending ****4821' },
                { label: 'Reference', value: 'TXN-2024-XXXX' }
            ],
            ctaText: 'View My Loan',
            visual: 'disbursement-success'
        },
        customerAction: 'Rohan receives a confirmation — ₹24,500 (after processing fee) has been credited to his bank account via IMPS.',
        teams: [
            {
                key: 'backendTech',
                responsibility: 'Triggers the payment transfer via banking APIs (IMPS/UPI), handles success/failure states and records the transaction.',
                why: 'Disbursement must be instant, reliable and auditable. The backend handles payment routing, failure retries, duplicate prevention and transaction reconciliation.'
            },
            {
                key: 'operations',
                responsibility: 'Manages the disbursement queue, handles failed transfers, ensures reconciliation between lending system and bank.',
                why: 'Not every transfer succeeds on the first attempt. Operations monitors the disbursement pipeline, resolves stuck payments and ensures every rupee is accounted for.'
            },
            {
                key: 'frontendTech',
                responsibility: 'Displays the real-time disbursement status and confirmation to the borrower.',
                why: 'The borrower is anxious at this moment — did the money actually arrive? Frontend must show clear, real-time status updates and a confirmation screen.'
            }
        ],
        dataInputs: ['Approved loan amount', 'Processing fee', 'Borrower bank account', 'IFSC code', 'Payment reference'],
        technology: {
            label: 'Lending System → Payment Gateway → IMPS/UPI → Borrower Bank → Confirmation',
            flow: ['Lending System', 'Payment Gateway', 'IMPS / UPI', 'Borrower Bank', 'Confirmation'],
            examples: ['IMPS (Immediate Payment Service)', 'UPI', 'Payment gateway integration']
        },
        riskControl: 'Disbursement only to verified, KYC-matched bank account. Amount reconciled against approved loan. Processing fee deducted at source.',
        businessPurpose: 'Instant disbursement is the "wow moment" for digital lending — money in account within minutes of approval. This speed is the core value proposition vs traditional banks.',
        educationalExplanation: 'After the agreement is signed, the lender transfers the loan amount (minus processing fee) directly to your bank account using instant payment rails like IMPS or UPI. This typically happens within minutes.',
        expertDetail: 'Disbursement reconciliation is critical — the lending system must confirm the payment reached the borrower\'s account. Failed disbursements are retried automatically with exponential backoff, and stuck transactions are escalated to operations.'
    },

    // ========== STEP 7: EMI / LOAN MANAGEMENT ==========
    {
        id: 'step-7',
        stage: 'customer-management',
        stepNumber: 7,
        substep: null,
        title: 'EMI & Loan Management',
        subtitle: 'Active Loan Dashboard & EMI Tracking',
        customerScreen: {
            type: 'dashboard',
            headline: 'My Loan',
            subheadline: 'Your active loan details',
            loanDetails: [
                { label: 'Outstanding', value: '₹25,000' },
                { label: 'Next EMI', value: '₹2,224', subtext: 'Due 5th next month' },
                { label: 'Rate', value: '12.5% p.a.' },
                { label: 'Tenure', value: '12 months remaining' },
                { label: 'EMIs Paid', value: '0 / 12' }
            ],
            ctaText: 'Make Payment',
            visual: 'loan-dashboard'
        },
        customerAction: 'Rohan checks his loan dashboard showing outstanding amount, next EMI date, repayment progress and payment history.',
        teams: [
            {
                key: 'backendTech',
                responsibility: 'Built and maintains the Loan Management System (LMS) — the system of record for all active loans.',
                why: 'The LMS tracks every loan from disbursement to closure — EMI schedules, payments received, outstanding balance, interest accrual, prepayments, and overdue status. It is the "source of truth" for the lending business.'
            },
            {
                key: 'operations',
                responsibility: 'Monitors the active loan portfolio, handles borrower queries, processes prepayments and manages exceptions.',
                why: 'Not everything is automated. Borrowers call with questions, request restructuring, make partial payments, or dispute charges. Operations is the human layer that handles exceptions.'
            },
            {
                key: 'collections',
                responsibility: 'Monitors repayment patterns and initiates outreach for delayed payments.',
                why: 'Early intervention for missed payments dramatically reduces default rates. The collections team uses data-driven triggers (payment delay, balance drop) to proactively engage borrowers.'
            }
        ],
        dataInputs: ['EMI schedule', 'Payment receipts', 'Outstanding principal', 'Interest accrual', 'Days past due (DPD)', 'Borrower payment behaviour'],
        technology: {
            label: 'LMS → EMI Scheduler → Payment Tracker → Borrower Dashboard',
            flow: ['Loan Management System', 'EMI Scheduler', 'Payment Tracker', 'Borrower App', 'Dashboard'],
            examples: ['Loan Management System (LMS)', 'EMI amortization engine', 'Payment reconciliation']
        },
        riskControl: 'Early warning system monitors DPD, balance trends, salary credits. Traffic-light system: Green (on-time), Amber (1–29 DPD), Red (30+ DPD).',
        businessPurpose: 'Active loan management drives profitability — reducing NPAs through early intervention, enabling cross-sell to good borrowers, and maintaining healthy portfolio quality.',
        educationalExplanation: 'Once a loan is disbursed, the Loan Management System (LMS) takes over. It calculates EMIs, tracks payments, accrues interest and provides both the borrower and the lender with a real-time view of the loan.',
        expertDetail: 'The LMS maintains an amortization schedule, calculates principal vs interest split for each EMI, handles prepayment recalculation, applies late fees per policy, and generates regulatory reports (NPA classification, provisioning).'
    },

    // ========== STEP 8: AUTO-DEBIT / eNACH ==========
    {
        id: 'step-8',
        stage: 'collections',
        stepNumber: 8,
        substep: null,
        title: 'Auto-Debit / eNACH',
        subtitle: 'Automated Recurring Repayment',
        customerScreen: {
            type: 'enach',
            headline: 'Auto-Pay Active',
            subheadline: 'Your EMI will be debited automatically',
            mandateDetails: [
                { label: 'Mandate Type', value: 'eNACH' },
                { label: 'Debit Amount', value: '₹2,224' },
                { label: 'Frequency', value: 'Monthly' },
                { label: 'Debit Date', value: '5th of every month' },
                { label: 'Bank Account', value: '****4821' },
                { label: 'Status', value: 'Active ✓' }
            ],
            ctaText: 'Manage Auto-Pay',
            visual: 'enach-active'
        },
        customerAction: 'Rohan\'s EMI of ₹2,224 is automatically debited from his bank account on the 5th of every month via eNACH mandate.',
        teams: [
            {
                key: 'backendTech',
                responsibility: 'Integrates with NPCI eNACH system for mandate registration, execution and bounce handling.',
                why: 'eNACH integration is technically complex — mandate registration, presentation for debit, handling bounces, retry logic and reconciliation all must work flawlessly at scale.'
            },
            {
                key: 'operations',
                responsibility: 'Monitors mandate execution, handles bounced debits, coordinates with banking partners for resolution.',
                why: 'When an eNACH debit bounces (insufficient funds), operations must decide: retry immediately? Wait? Contact the borrower? Each bounce has cost and customer experience implications.'
            }
        ],
        dataInputs: ['eNACH mandate ID', 'Debit amount', 'Debit date', 'Bank response (success/bounce)', 'Bounce reason code', 'Retry attempt count'],
        technology: {
            label: 'LMS → eNACH System → NPCI → Borrower Bank → Payment Status',
            flow: ['LMS', 'eNACH Presenter', 'NPCI', 'Borrower Bank', 'Payment Status', 'LMS Update'],
            examples: ['NPCI eNACH', 'Mandate management', 'Bounce handling & retry logic']
        },
        riskControl: 'eNACH bounce rate is a key early-warning indicator. Multiple bounces trigger collections workflow. Mandate cancellation flags operational risk.',
        businessPurpose: 'Automated repayment reduces collection costs, improves on-time payment rates and provides predictable cash flow. eNACH costs a fraction of manual follow-up.',
        educationalExplanation: 'eNACH (Electronic National Automated Clearing House) allows the lender to automatically debit your EMI from your bank account each month. This means you never miss a payment accidentally — it happens automatically.',
        expertDetail: 'eNACH mandates are registered via NPCI with the borrower\'s bank. Each month, the lender "presents" the debit. The bank processes it if funds are available. Bounce reason codes (insufficient funds, account closed, mandate revoked) drive different operational workflows.'
    }
];

// ========== TEAM MAP ORGANIZATIONAL STRUCTURE ==========
const TEAM_MAP = [
    {
        function: 'Growth / Acquisition',
        color: '#14B8A6',
        teams: ['marketing', 'product'],
        journeySteps: ['step-1', 'step-2']
    },
    {
        function: 'Customer Experience',
        color: '#6366F1',
        teams: ['product', 'frontendTech'],
        journeySteps: ['step-1', 'step-2', 'step-4a', 'step-6']
    },
    {
        function: 'Credit',
        color: '#EF4444',
        teams: ['riskAnalytics'],
        journeySteps: ['step-4b', 'step-4c', 'step-4d']
    },
    {
        function: 'Technology',
        color: '#3B82F6',
        teams: ['frontendTech', 'backendTech'],
        journeySteps: ['step-2', 'step-3', 'step-4a', 'step-4b', 'step-4c', 'step-4d', 'step-5', 'step-6', 'step-7', 'step-8']
    },
    {
        function: 'Control',
        color: '#F59E0B',
        teams: ['legal', 'complianceRisk'],
        journeySteps: ['step-3', 'step-4a', 'step-5', 'step-5b']
    },
    {
        function: 'Business / Partnerships',
        color: '#7C3AED',
        teams: ['partnerships'],
        journeySteps: ['step-5b']
    },
    {
        function: 'Operations',
        color: '#10B981',
        teams: ['operations'],
        journeySteps: ['step-6', 'step-7', 'step-8']
    },
    {
        function: 'Post-Disbursement',
        color: '#DC2626',
        teams: ['collections'],
        journeySteps: ['step-7', 'step-8']
    }
];

// ========== INDIA STACK COMPONENTS ==========
const INDIA_STACK = [
    {
        id: 'aadhaar',
        name: 'Aadhaar',
        icon: '🆔',
        layer: 'Identity',
        description: 'Unique biometric identity for 1.3B+ Indians. Enables instant digital KYC.',
        usedAt: ['step-3'],
        team: 'backendTech',
        why: 'Replaces physical ID verification. Enables remote, paperless KYC in seconds.',
        color: '#3B82F6'
    },
    {
        id: 'digilocker',
        name: 'DigiLocker',
        icon: '📁',
        layer: 'Documents',
        description: 'Government-backed digital document wallet. Provides verified documents without physical copies.',
        usedAt: ['step-3'],
        team: 'backendTech',
        why: 'Eliminates fake documents. Verified documents directly from issuing authorities.',
        color: '#6366F1'
    },
    {
        id: 'account-aggregator',
        name: 'Account Aggregator',
        icon: '🏦',
        layer: 'Financial Data',
        description: 'RBI-regulated framework for consent-based financial data sharing between institutions.',
        usedAt: ['step-4a', 'step-4c'],
        team: 'backendTech',
        why: 'Gives lenders access to bank data without asking for passwords. Customer controls their own data.',
        color: '#14B8A6'
    },
    {
        id: 'credit-bureau',
        name: 'Credit Bureau',
        icon: '📊',
        layer: 'Credit History',
        description: 'Maintains credit history and scores (CIBIL, Experian, Equifax, CRIF) for all borrowers.',
        usedAt: ['step-4b'],
        team: 'riskAnalytics',
        why: 'Reveals past borrowing and repayment behaviour — the strongest predictor of future credit risk.',
        color: '#EF4444'
    },
    {
        id: 'upi',
        name: 'UPI / Payment Rails',
        icon: '💸',
        layer: 'Payments',
        description: 'Unified Payments Interface enables instant money transfers between bank accounts.',
        usedAt: ['step-6'],
        team: 'backendTech',
        why: 'Instant loan disbursement directly to borrower\'s bank account. Real-time settlement.',
        color: '#10B981'
    },
    {
        id: 'enach',
        name: 'eNACH',
        icon: '🔄',
        layer: 'Recurring Payments',
        description: 'Electronic National Automated Clearing House for automated recurring debits.',
        usedAt: ['step-4a', 'step-8'],
        team: 'backendTech',
        why: 'Automates EMI collection. Reduces missed payments. Lower collection costs.',
        color: '#F59E0B'
    },
    {
        id: 'esign',
        name: 'Aadhaar e-Sign',
        icon: '✍️',
        layer: 'Legal',
        description: 'Legally valid electronic signature using Aadhaar OTP authentication.',
        usedAt: ['step-5'],
        team: 'legal',
        why: 'Replaces physical signature. Legally binding under IT Act. Instant execution.',
        color: '#D97706'
    },
    {
        id: 'uli',
        name: 'Unified Lending Interface (ULI)',
        icon: '🔗',
        layer: 'Infrastructure (Advanced)',
        description: 'RBI/RBIH-backed standardized API platform for authenticated data access across multiple sources.',
        usedAt: [],
        team: 'backendTech',
        why: 'Creates a unified interface for lenders to access Aadhaar, PAN, AA, DigiLocker, GSTN, land records and more through standardized APIs. Reduces integration complexity.',
        color: '#8B5CF6',
        isAdvanced: true,
        sources: ['Aadhaar / PAN', 'Account Aggregators', 'DigiLocker', 'GSTN', 'Land Records', 'Property Data']
    }
];

// ========== RISK & GOVERNANCE ==========
const RISK_GOVERNANCE = [
    {
        id: 'data-privacy',
        title: 'Data Privacy',
        icon: '🔐',
        question: 'Was customer data accessed with appropriate consent?',
        explanation: 'Every data access must be explicitly consented to by the borrower. Consent must specify purpose, scope and duration. The lender must protect data with encryption and access controls.',
        color: '#3B82F6'
    },
    {
        id: 'explainability',
        title: 'Explainability',
        icon: '🔍',
        question: 'Can the lender explain why a decision was made?',
        explanation: 'Automated decisions must be explainable. If a borrower asks "why was I rejected?", the lender must provide clear, specific reasons — not just "algorithm decided". This is both good practice and increasingly a regulatory expectation.',
        color: '#6366F1'
    },
    {
        id: 'fair-treatment',
        title: 'Fair Treatment',
        icon: '⚖️',
        question: 'Does the automated system avoid inappropriate discrimination?',
        explanation: 'Credit algorithms must not discriminate based on gender, religion, caste or other protected characteristics. If alternative data sources correlate with protected attributes, the model must be tested for fairness.',
        color: '#F59E0B'
    },
    {
        id: 'debt-trap',
        title: 'Debt Trap Prevention',
        icon: '🚫',
        question: 'Is the borrower being over-leveraged?',
        explanation: 'A responsible lender must assess whether the borrower can reasonably service additional debt. FOIR caps (e.g., 60%) exist to prevent borrowers from taking on more debt than they can handle. Rejecting a high-debt borrower is responsible lending, not system failure.',
        color: '#EF4444'
    }
];

// ========== VIVA QUESTIONS ==========
const VIVA_QUESTIONS = [
    { question: 'Why is Account Aggregator consent required before fetching bank data?', topic: 'Consent & Data Privacy', difficulty: 'Beginner' },
    { question: 'Why does the Risk team design the underwriting framework instead of the Backend team?', topic: 'Organizational Design', difficulty: 'Intermediate' },
    { question: 'Why might a fintech use alternative data sources like device data or UPI transactions?', topic: 'Alternative Data', difficulty: 'Intermediate' },
    { question: 'Why is FOIR important in unsecured lending? What happens if it is too high?', topic: 'Credit Risk', difficulty: 'Beginner' },
    { question: 'Why does a fintech need a Loan Management System (LMS)?', topic: 'Operations', difficulty: 'Beginner' },
    { question: 'Why is eNACH useful for both the lender and borrower?', topic: 'Collections', difficulty: 'Beginner' },
    { question: 'Why might a fintech approve a customer that a traditional bank would reject?', topic: 'Fintech vs Bank', difficulty: 'Intermediate' },
    { question: 'What happens when a customer is referred for manual review instead of auto-approved?', topic: 'Decision Engine', difficulty: 'Intermediate' },
    { question: 'What is the difference between a Fintech, an NBFC and a Bank in the lending context?', topic: 'Industry Structure', difficulty: 'Advanced' },
    { question: 'Where does RBI fit into the fintech lending ecosystem? What is the RBI Sandbox?', topic: 'Regulation', difficulty: 'Advanced' },
    { question: 'How does risk-based pricing work? Why does Profile B pay a higher rate than Profile A?', topic: 'Pricing', difficulty: 'Intermediate' },
    { question: 'What are the four governance concerns in automated lending?', topic: 'Governance', difficulty: 'Advanced' },
    { question: 'How does the Account Aggregator framework protect the borrower\'s data?', topic: 'India Stack', difficulty: 'Intermediate' },
    { question: 'What is ULI and how does it differ from individual API integrations?', topic: 'Advanced Infrastructure', difficulty: 'Advanced' },
    { question: 'Why is the rejection of Profile C considered a "policy success" rather than a "system failure"?', topic: 'Responsible Lending', difficulty: 'Advanced' }
];

// ========== TECH STACK (ILLUSTRATIVE) ==========
const TECH_STACK = [
    { category: 'Frontend', examples: ['React Native', 'Flutter'], note: 'Illustrative — cross-platform mobile frameworks', icon: '📱' },
    { category: 'APIs', examples: ['REST / GraphQL'], note: 'Connect app to verification, data and payment services', icon: '🔌' },
    { category: 'Identity', examples: ['Aadhaar eKYC', 'PAN Verification', 'DigiLocker'], note: 'Government identity infrastructure', icon: '🆔' },
    { category: 'Credit Bureau', examples: ['CIBIL', 'Experian', 'Equifax'], note: 'Credit history and scoring', icon: '📊' },
    { category: 'Account Aggregator', examples: ['AA Framework (ReBIT)'], note: 'Consent-based financial data sharing', icon: '🏦' },
    { category: 'Event Streaming', examples: ['Kafka'], note: 'Illustrative — real-time data movement between services', icon: '📡' },
    { category: 'e-Sign', examples: ['Aadhaar e-Sign via licensed ASP'], note: 'Legally valid digital agreement execution', icon: '✍️' },
    { category: 'Payments', examples: ['IMPS', 'UPI', 'eNACH'], note: 'Disbursement and recurring collection', icon: '💸' },
    { category: 'LMS', examples: ['Loan Management System'], note: 'Loan lifecycle — EMI, balance, repayment tracking', icon: '💼' },
    { category: 'Cloud', examples: ['AWS', 'GCP', 'Azure'], note: 'Illustrative — scalable and resilient infrastructure', icon: '☁️' },
    { category: 'DevOps', examples: ['CI/CD', 'Monitoring', 'Auto-scaling'], note: 'Deployment, monitoring, scaling and reliability', icon: '🔧' },
    { category: 'Security', examples: ['Encryption (rest + transit)', 'RBAC', 'Audit logs'], note: 'Data protection and access control', icon: '🔒' }
];

// ========== DATA SECURITY ==========
const DATA_SECURITY = [
    { layer: 'At Rest', description: 'All sensitive data encrypted in storage', icon: '💾', detail: 'AES-256 encryption for PII, financial data and documents.' },
    { layer: 'In Transit', description: 'All API communication encrypted', icon: '🔒', detail: 'TLS 1.2+ for all data transmission. Certificate pinning on mobile.' },
    { layer: 'Audit', description: 'All actions logged immutably', icon: '📋', detail: 'Login, consent, KYC, data access, decisions — all timestamped and logged.' },
    { layer: 'Access Control', description: 'Role-based access to systems and data', icon: '👤', detail: 'Principle of least privilege. Operations cannot access risk models. Marketing cannot access bureau data.' }
];
