// ============================================================
// JOURNEY DATA — Single Source of Truth
// Used by both Page A (teaching) and Page B (borrower demo)
// ============================================================

const LIFECYCLE_STAGES = [
    { id: 'acquisition', label: '1. Acquisition & Funnel', icon: '📢', color: '#14B8A6', description: 'The ₹25,000 borrower problem, ad targeting, and low-friction application' },
    { id: 'underwriting', label: '2. Underwriting & Risk Engine', icon: '🔍', color: '#F59E0B', description: 'Digital KYC, Bureau, Account Aggregator, 8-gate model, and live audience dilemma' },
    { id: 'onboarding', label: '3. Decision to Disbursement', icon: '💸', color: '#10B981', description: 'Offer generation, KFS disclosures, Aadhaar e-Sign, and instant IMPS settlement' },
    { id: 'organization', label: '4. The Big Reveal', icon: '👥', color: '#8B5CF6', description: 'Mapping 9 cross-functional teams directly to the borrower journey' },
    { id: 'servicing', label: '5. Servicing & Final Takeaways', icon: '🔄', color: '#EC4899', description: 'LMS, eNACH auto-debit, ethical collections, and the 3 executive takeaways' }
];

const TEAM_DIRECTORY = {
    marketing: {
        name: 'Marketing',
        function: 'Growth / Acquisition',
        color: '#14B8A6',
        icon: '📢',
        description: 'Drives borrower acquisition through targeted digital campaigns, optimizing CAC (Customer Acquisition Cost) vs. CPI (Cost Per Install).',
        owns: 'Customer acquisition campaigns, ad creative, channel attribution, conversion tracking',
        inputs: ['Target customer persona', 'Acquisition budget', 'Product terms'],
        outputs: ['Qualified app installs', 'Deep-linked leads', 'Attribution analytics']
    },
    product: {
        name: 'Product',
        function: 'Customer Experience',
        color: '#6366F1',
        icon: '🎯',
        description: 'Designs the user journey to minimize friction, eliminate drop-offs, and balance speed with data capture.',
        owns: 'App UX/UI flows, onboarding funnel, conversion optimization, feature roadmap',
        inputs: ['User feedback', 'Drop-off analytics', 'Regulatory requirements'],
        outputs: ['Frictionless screen flows', 'User stories', 'A/B test experiments']
    },
    frontendTech: {
        name: 'Frontend Technology',
        function: 'Technology',
        color: '#3B82F6',
        icon: '📱',
        description: 'Builds responsive, lightweight mobile interfaces with client-side validation and smooth animations.',
        owns: 'Mobile app, client-side input validation, error handling, performance optimization',
        inputs: ['Product designs', 'API contracts'],
        outputs: ['Production mobile app screens', 'Instant client feedback']
    },
    backendTech: {
        name: 'Backend Technology',
        function: 'Technology',
        color: '#0EA5E9',
        icon: '⚙️',
        description: 'Orchestrates API gateways, microservices, third-party integrations (India Stack, Bureau, Banks), and payment rails.',
        owns: 'APIs, microservices, databases, India Stack integrations, system reliability',
        inputs: ['Business logic', 'Security standards', 'Partner API specs'],
        outputs: ['High-speed API pipelines', 'Event streaming', 'Secure transaction processing']
    },
    complianceRisk: {
        name: 'Compliance / Risk',
        function: 'Control & Governance',
        color: '#F59E0B',
        icon: '🛡️',
        description: 'Ensures strict compliance with RBI Digital Lending Guidelines, KYC Master Directions, AML screening, and data privacy.',
        owns: 'Regulatory compliance, KYC policies, consent architecture, regulatory audit readiness',
        inputs: ['RBI Circulars', 'PMLA guidelines', 'DPDP Act requirements'],
        outputs: ['Compliance policies', 'Audit trails', 'Statutory regulatory filings']
    },
    legal: {
        name: 'Legal & Regulatory',
        function: 'Control & Contracts',
        color: '#D97706',
        icon: '⚖️',
        description: 'Drafts digital loan agreements, standardized Key Fact Statements (KFS), and ensures e-Sign legal enforceability under the IT Act.',
        owns: 'Loan agreements, KFS templates, digital consent language, dispute frameworks',
        inputs: ['RBI Fair Practices Code', 'IT Act 2000', 'Lending terms'],
        outputs: ['Legally binding contracts', 'KFS disclosure templates', 'e-Sign certificates']
    },
    riskAnalytics: {
        name: 'Risk & Analytics / Data Science',
        function: 'Credit Intelligence',
        color: '#EF4444',
        icon: '📊',
        description: 'Architects underwriting frameworks, scorecards, FOIR limits, risk grades, and automated 8-gate decision rules.',
        owns: 'Credit risk policy, scoring models, FOIR thresholds, risk-based pricing matrix',
        inputs: ['Bureau history', 'Bank statement cash flows', 'Portfolio delinquency data'],
        outputs: ['Risk grades (A/B/C/D)', 'Automated credit decisions', 'Pricing recommendations']
    },
    operations: {
        name: 'Operations',
        function: 'Execution & Servicing',
        color: '#10B981',
        icon: '🔧',
        description: 'Manages disbursement queues, reconciliation, bank transfer failures, and manual review of borderline referral cases.',
        owns: 'Disbursement execution, bank reconciliation, manual review queue, operational SLAs',
        inputs: ['Approved loans', 'Disbursement triggers', 'Referral cases'],
        outputs: ['Settled disbursements', 'Reconciliation reports', 'Manual review decisions']
    },
    collections: {
        name: 'Collections & Recovery',
        function: 'Post-Disbursement',
        color: '#DC2626',
        icon: '🔄',
        description: 'Manages automated eNACH recurring debits, early warning delinquency triggers, and ethical, RBI-compliant repayment workflows.',
        owns: 'eNACH debit presentation, bounce retry rules, borrower communications, ethical recovery',
        inputs: ['EMI schedules', 'Bank balance alerts', 'Payment status'],
        outputs: ['Automated collections', 'Bounce resolution actions', 'Portfolio health reports']
    },
    partnerships: {
        name: 'NBFC Partnerships',
        function: 'Balance Sheet & Capital',
        color: '#7C3AED',
        icon: '🤝',
        description: 'Manages relationships with balance-sheet NBFCs/banks (e.g. Bajaj Finance), negotiating FLDG terms (capped at 5% by RBI) and co-lending.',
        owns: 'Lending partner agreements, FLDG default guarantees, capital allocation, partner compliance',
        inputs: ['Portfolio risk metrics', 'RBI FLDG guidelines', 'NBFC credit policies'],
        outputs: ['Co-lending facilities', 'FLDG escrow deeds', 'Balance-sheet liquidity']
    }
};

const JOURNEY_STEPS = [
    // ========== STEP 1: BORROWER PROBLEM ==========
    {
        id: 'step-1',
        stage: 'acquisition',
        stepNumber: 1,
        title: 'The Borrower Problem',
        subtitle: 'A ₹25,000 Need: Why Speed, Convenience & Minimal Friction Matter',
        customerScreen: {
            type: 'case-intro',
            headline: 'Need ₹25,000 in 5 Minutes?',
            subheadline: 'The Real-World Borrower Persona',
            caseData: {
                borrower: 'Rohan Mehta, 26',
                occupation: 'Software Engineer, Bangalore',
                salary: '₹65,000 / month',
                urgency: 'Immediate ₹25,000 needed for urgent laptop repair & medical expense',
                traditionalFriction: 'Traditional bank requires branch visit, 10-page form, physical salary slips & 5–7 day wait time',
                fintechPromise: '100% digital, 5-minute approval, direct-to-bank instant disbursement'
            },
            ctaText: 'Start Application'
        },
        customerAction: 'Rohan faces an urgent ₹25,000 cash requirement. He opens his phone looking for a fast, paperless, trustworthy credit solution without visiting a bank branch.',
        behindTheScreen: 'Fintech strategy begins with customer empathy: identifying high-intent borrowers experiencing short-term liquidity crunches and designing an instant, mobile-first alternative to slow traditional banking.',
        teams: [
            {
                key: 'product',
                responsibility: 'Defined the core value proposition: ₹25,000 in 5 minutes with zero physical paperwork and transparent pricing.',
                why: 'Friction kills conversion. The product must solve the borrower\'s pain point faster and with less effort than any traditional alternative.'
            },
            {
                key: 'marketing',
                responsibility: 'Identified the target demographic (young salaried urban professionals) and mapped their digital touchpoints.',
                why: 'Reaching borrowers at the exact moment of financial intent lowers Customer Acquisition Cost (CAC).'
            }
        ],
        dataInputs: ['Target borrower persona', 'Market liquidity need (₹25,000 ticket size)', 'Customer time sensitivity'],
        technology: {
            label: 'Customer Intent → Mobile Channel → Frictionless Entry Point',
            flow: ['Borrower Need (₹25k)', 'Mobile Search / Social Media', 'Landing Experience'],
            examples: ['Mobile Web', 'App Store / Play Store', 'Progressive Web App (PWA)']
        },
        riskControl: 'Clear and responsible product positioning. No misleading "0% interest" claims; upfront disclosure of standard APR and processing fees.',
        businessPurpose: 'Positioning for speed and convenience captures high-quality salaried borrowers who value their time over traditional branch banking.',
        educationalExplanation: 'Digital lending is fundamentally about removing friction. A customer who needs ₹25,000 today cannot wait 5 days for a physical credit committee.',
        expertDetail: 'Unsecured personal loan demand in India is driven by short-tenure (3–12 months), small-ticket (₹10,000–₹50,000) liquidity needs. Traditional bank unit economics cannot support manual underwriting for sub-₹50,000 loans due to high operational cost per file (₹1,500–₹3,000).',
        backupTopic: {
            title: '🎓 Deep-Dive: Traditional Banking vs. Fintech Unit Economics',
            content: 'Traditional banks incur ₹1,500–₹3,500 in operational costs per loan file (branch staff, verification agents, document collection). On a ₹25,000 loan with ₹500 fee, a bank loses money on Day 1. Digital fintechs operate at marginal servicing costs of < ₹100 per file via automation.'
        }
    },

    // ========== STEP 2: ACQUISITION & FUNNEL ==========
    {
        id: 'step-2',
        stage: 'acquisition',
        stepNumber: 2,
        title: 'Acquisition & Funnel',
        subtitle: 'Marketing → Digital Campaign → Deep Link → App Install',
        customerScreen: {
            type: 'ad',
            headline: 'Targeted Digital Campaign',
            subheadline: 'Customer sees ad on Instagram / Google / Partner',
            details: [
                'Instant ₹25,000 credit for salaried professionals',
                'Transparent 12.5% p.a. starting rate',
                'Zero physical paperwork — money in 5 minutes'
            ],
            ctaText: 'Apply in 5 Minutes',
            visual: 'loan-ad'
        },
        customerAction: 'Rohan sees a targeted Nova Credit ad while browsing social media. Intrigued by the transparent terms and speed, he taps "Apply in 5 Minutes".',
        behindTheScreen: 'Marketing runs programmatic campaigns optimized for CAC vs. CPI, while deep-linking preserves user campaign context directly into the mobile app onboarding funnel.',
        teams: [
            {
                key: 'marketing',
                responsibility: 'Manages digital acquisition campaigns across Google, Meta and affiliates, optimizing Cost Per Install (CPI) and Customer Acquisition Cost (CAC).',
                why: 'Marketing is the growth engine. If CAC exceeds Lifetime Value (LTV), the fintech is unprofitable. Marketing ensures acquisition spend attracts creditworthy leads.'
            },
            {
                key: 'product',
                responsibility: 'Implemented deferred deep linking to ensure ad click drops the borrower directly onto the registration screen without redundant landing pages.',
                why: 'Every extra tap or detour in the funnel loses 20–30% of potential borrowers. Seamless attribution preserves intent.'
            }
        ],
        dataInputs: ['Ad impression & click data', 'Channel source attribution (Google/Meta)', 'Campaign UTM parameters', 'Device fingerprint'],
        technology: {
            label: 'Ad Network → Attribution SDK → Deferred Deep Link → Mobile App Screen',
            flow: ['Targeted Ad Click', 'Attribution Engine (Branch/AppsFlyer)', 'Deferred Deep Link', 'Mobile App Launch'],
            examples: ['Branch.io / AppsFlyer attribution', 'Meta / Google Ads APIs', 'Firebase Analytics']
        },
        riskControl: 'Strict compliance with ASCI advertising standards and RBI fair marketing directives. No predatory promises or obscured fees.',
        businessPurpose: 'Scale customer acquisition digitally at ₹150–₹350 per qualified lead, compared to ₹2,000+ for bank physical branch/agent sourcing.',
        educationalExplanation: 'Fintech acquisition is driven by conversion science: Marketing brings the qualified user to the door, and Product ensures the door opens instantly without cognitive load.',
        expertDetail: 'Key SaaS metrics: CPI (Cost Per Install, ₹20–₹60), CQA (Cost Per Qualified Application, ₹150–₹400), CAC (Cost Per Disbursed Borrower, ₹600–₹1,200). A healthy digital lending model requires an LTV:CAC ratio > 3.0x.',
        backupTopic: {
            title: '🎓 Deep-Dive: Funnel Conversion Physics & Unit Economics',
            content: 'Typical lending funnel conversion rates: 1,000 Ad Clicks → 200 App Installs (20%) → 100 KYC Starts (50%) → 60 Bureau Pulls (60%) → 25 Approvals (42%) → 18 Disbursals (72%). Total funnel conversion: 1.8% of clicks become active loans.'
        }
    },

    // ========== STEP 3: CUSTOMER APPLICATION ==========
    {
        id: 'step-3',
        stage: 'acquisition',
        stepNumber: 3,
        title: 'Customer Application',
        subtitle: 'Minimal Form Design: Reducing Drop-offs with Smart UX',
        customerScreen: {
            type: 'form',
            headline: 'Let\'s Get Started',
            subheadline: 'Confirm basic details in 30 seconds',
            fields: [
                { label: 'Full Name (as per PAN)', type: 'text', placeholder: 'Rohan Mehta' },
                { label: 'Mobile Number', type: 'tel', placeholder: '98765 43210' },
                { label: 'Employment Type', type: 'select', options: ['Salaried – Private Sector', 'Salaried – Govt', 'Self-Employed'] },
                { label: 'Monthly Income', type: 'number', placeholder: '₹65,000' }
            ],
            ctaText: 'Continue to Verification',
            visual: 'registration-form'
        },
        customerAction: 'Rohan enters just 4 basic details: Name, Mobile, Employment Type, and Monthly Income. The form is pre-filled where possible, taking under 30 seconds.',
        behindTheScreen: 'Product and Frontend Engineering apply the principle of "Minimum Viable Data Entry": ask the user for only 4 fields, then retrieve the remaining 100+ underwriting data points automatically via backend APIs.',
        teams: [
            {
                key: 'product',
                responsibility: 'Designed a minimal 4-field registration form to maximize onboarding completion and reduce user fatigue.',
                why: 'Traditional loan applications ask for 40+ fields. Fintech philosophy: collect the absolute minimum from the user, and fetch the rest digitally via APIs.'
            },
            {
                key: 'frontendTech',
                responsibility: 'Built client-side input validation, auto-formatting, and instant error feedback across thousands of Android & iOS device types.',
                why: 'Form lag or keyboard layout bugs on mobile cause immediate user drop-offs. Frontend ensures lightning-fast data entry.'
            }
        ],
        dataInputs: ['Full name', 'Mobile number', 'Self-declared employment type', 'Self-declared monthly income'],
        technology: {
            label: 'Mobile Client → Real-Time Validation → API Gateway → Registration Service',
            flow: ['Mobile Client UI', 'Client Validation', 'Secure API Gateway', 'Customer Service', 'Encrypted DB'],
            examples: ['REST / GraphQL APIs', 'Client-side regex validation', 'TLS 1.3 encrypted transit']
        },
        riskControl: 'Mobile number verified via SMS OTP to prevent automated bot sign-ups and establish verified communication channel.',
        businessPurpose: 'Maximize conversion rate at the top of the funnel while gathering initial parameters to seed the underwriting pipeline.',
        educationalExplanation: 'The best fintech UX doesn\'t feel like a bank application. It feels like a 30-second sign-up, because the heavy lifting happens behind the screen.',
        expertDetail: 'Self-declared income at this stage is treated as a temporary hypothesis. It is mathematically verified later against actual bank statement deposits fetched via Account Aggregator.',
        backupTopic: {
            title: '🎓 Deep-Dive: Progressive Profiling & Data Hydration',
            content: 'Progressive Profiling captures high-level intent first. Once the customer is hooked, the platform uses data hydration — enriching a single identifier (PAN/Aadhaar) into a 150-variable credit profile via third-party APIs.'
        }
    },

    // ========== STEP 4: DIGITAL KYC & CONSENT ==========
    {
        id: 'step-4a',
        stage: 'underwriting',
        stepNumber: 4,
        title: 'Digital KYC & Consent',
        subtitle: 'Customer → App → KYC/Identity → Bureau/AA → Risk',
        customerScreen: {
            type: 'kyc-consent',
            headline: 'Identity Verification & Permissions',
            subheadline: 'Instant paperless verification & explicit granular consent',
            checks: [
                { icon: '🪪', label: 'PAN Verification (NSDL Database)', status: 'Verified ✓' },
                { icon: '🆔', label: 'Aadhaar eKYC via OTP (UIDAI)', status: 'Verified ✓' },
                { icon: '🤳', label: 'AI Selfie Liveness Check', status: 'Passed ✓' }
            ],
            consents: [
                { icon: '📊', label: 'Credit Bureau Access', desc: 'Fetch credit history & score from CIBIL/Experian' },
                { icon: '🏦', label: 'Account Aggregator Bank Data', desc: 'Securely fetch 6-month bank statements' },
                { icon: '🔄', label: 'eNACH Auto-Debit Setup', desc: 'Authorize recurring monthly EMI deduction' }
            ],
            ctaText: 'Grant Consent & Proceed',
            visual: 'kyc-consent-flow'
        },
        customerAction: 'Rohan verifies his PAN, authenticates Aadhaar via OTP, snaps a 2-second selfie, and grants explicit permissions for credit bureau, bank data, and auto-debit.',
        behindTheScreen: 'The backend coordinates identity APIs (NSDL, UIDAI) and AI liveness models in under 3 seconds, while recording legally mandated, timestamped, audit-logged consent artefacts before accessing any financial records.',
        teams: [
            {
                key: 'backendTech',
                responsibility: 'Integrates with NSDL, UIDAI Aadhaar eKYC, and AI face liveness APIs, orchestrating parallel verification in < 3 seconds.',
                why: 'Backend coordinates multi-system API calls with automated retry logic and timeout handling to ensure the user never experiences a frozen screen.'
            },
            {
                key: 'complianceRisk',
                responsibility: 'Ensures KYC meets RBI Master Directions, prevents synthetic identity fraud, and enforces strict AML/CFT screening.',
                why: 'Non-compliant KYC attracts heavy RBI penalties and opens the door to fraud rings. Compliance ensures identity integrity.'
            },
            {
                key: 'legal',
                responsibility: 'Drafted granular, unbundled consent language complying with RBI Digital Lending Guidelines and Data Protection laws.',
                why: 'RBI strictly prohibits bundled consent. Each permission (Bureau, Bank Statements, eNACH) must be separate, explicit, and revocable.'
            }
        ],
        dataInputs: ['PAN number', 'Aadhaar number & OTP', 'Live selfie vector', 'Device geolocation', 'Granular consent flags & timestamps'],
        technology: {
            label: 'App → Identity APIs (NSDL/UIDAI) → AI Liveness → Consent Engine → Audit Ledger',
            flow: ['User Mobile', 'API Gateway', 'NSDL PAN Check', 'UIDAI Aadhaar OTP', 'AI Liveness API', 'Consent Service', 'Immutable Audit Log'],
            examples: ['NSDL / Income Tax API', 'UIDAI KUA/KSA eKYC', 'AI Liveness Engine', 'ReBIT Consent Artefact']
        },
        riskControl: 'Anti-spoofing liveness check prevents photo/video impersonation. PAN-Aadhaar name and DOB cross-matching catches synthetic identities.',
        businessPurpose: 'Replaces 48 hours of physical document collection and manual branch verification with a 10-second automated digital workflow, cutting onboarding cost by 90%.',
        educationalExplanation: 'Digital KYC uses India Stack rails. Behind those simple checkboxes, the platform validates identity against national databases and logs immutable consent before touching financial data.',
        expertDetail: 'Account Aggregator consent follows the ReBIT (Reserve Bank Information Technology) specification — an encrypted, digitally signed consent artefact specifying data scope (6 months), purpose (credit underwriting), frequency (one-time fetch), and expiry date.',
        backupTopic: {
            title: '🎓 Deep-Dive: RBI Digital Lending Guidelines (2022) on Consent',
            content: 'Under RBI DLG: (1) Consent must be explicit, granular and unbundled; (2) Lending apps cannot access mobile contacts, call logs, or media; (3) Borrowers have the right to revoke consent and request data deletion; (4) All consent logs must be preserved for audit.'
        }
    },

    // ========== STEP 5: UNDERWRITING (THE 4 QUESTIONS) ==========
    {
        id: 'step-4d',
        stage: 'underwriting',
        stepNumber: 5,
        title: 'Credit Underwriting & Risk Engine',
        subtitle: 'Bureau + Bank Statements (AA) + 8-Gate Automated Decisioning',
        customerScreen: {
            type: 'underwriting-dashboard',
            headline: 'The 4 Core Underwriting Questions',
            subheadline: 'Synthesizing Credit Bureau, Account Aggregator & Income Data',
            questions: [
                {
                    q: '1. Who is the borrower?',
                    ans: 'Rohan Mehta (PAN & Aadhaar matched, Zero fraud matches)',
                    tag: 'IDENTITY ✓',
                    color: 'var(--blue-400)'
                },
                {
                    q: '2. How has he behaved historically?',
                    ans: 'Credit Score 770 (Grade A) • 1 active loan • 36/36 on-time repayments',
                    tag: 'BUREAU ✓',
                    color: 'var(--success)'
                },
                {
                    q: '3. Can he afford this ₹25,000 loan?',
                    ans: '₹65,000 verified salary • ₹5,000 existing EMI • FOIR = 7.7% (Safe < 50%)',
                    tag: 'CASH FLOW ✓',
                    color: 'var(--teal-400)'
                },
                {
                    q: '4. Does he fit the lender\'s risk policy?',
                    ans: 'Cleared all 8 sequential gates → Approved for ₹25,000 @ 12.5% p.a.',
                    tag: 'POLICY APPROVED ✓',
                    color: 'var(--gold-400)'
                }
            ],
            gatesCount: '8 of 8 Automated Risk Gates Passed in 1.4 seconds'
        },
        customerAction: 'Rohan sees an animated status: "Evaluating your profile...". In the background, the multi-factor risk engine evaluates his application in real time.',
        behindTheScreen: 'The credit engine ingests bureau history (past track record) and Account Aggregator bank cash flows (present affordability), passing the profile through 8 sequential risk gates to produce an instant credit decision.',
        teams: [
            {
                key: 'riskAnalytics',
                responsibility: 'Architected the credit risk policy, scorecard weights, FOIR caps (50%), risk grading matrix, and 8-gate sequential underwriting rules.',
                why: 'Risk & Analytics is the brain of the fintech. They balance growth (approval rate) against credit loss (NPA rate), ensuring the portfolio remains profitable.'
            },
            {
                key: 'backendTech',
                responsibility: 'Implemented the high-speed decision engine, executing 8 policy gates against bureau and bank statement JSON feeds in milliseconds.',
                why: 'The risk model must execute in real time without lag, allowing instantaneous decisioning while the customer is engaged on the app.'
            }
        ],
        dataInputs: [
            'Credit Bureau Score (770)',
            'Repayment history (36/36 on-time)',
            'Verified monthly salary (₹65,000)',
            'Existing monthly EMIs (₹5,000)',
            'Calculated FOIR (7.7%)',
            'SIM & device risk score'
        ],
        technology: {
            label: 'Bureau Feed + AA Bank Data → 8-Gate Decision Engine → Risk Grade A → Instant Approval',
            flow: ['Bureau Data (CRIF/CIBIL)', 'Bank Data (AA JSON)', '8-Gate Rule Engine', 'FOIR & Debt Calculator', 'Decision: APPROVE (Grade A)'],
            examples: ['Credit Bureau APIs', 'Account Aggregator Cash Flow Parser', 'Rule Engine (Drools / Python)', 'FOIR Calculation Engine']
        },
        riskControl: 'Hard-stop policy rules: Minimum credit score floor (620), maximum FOIR cap (60%), zero active 90+ DPD defaults, and anti-fraud device checks.',
        businessPurpose: 'Automates 90%+ of credit decisions with mathematical precision, eliminating human bias, reducing underwriting turnaround from days to seconds, and scaling loan volume without adding operational headcount.',
        educationalExplanation: 'Underwriting answers 4 fundamental questions: Who are you? How did you pay in the past? Can you afford it today? Do you fit our risk policy? The 8-gate engine combines all data sources into a single verdict.',
        expertDetail: 'FOIR Formula: FOIR = (Existing Monthly Obligations + Proposed EMI) / Net Monthly Income * 100. For Rohan: (₹5,000 + ₹2,224) / ₹65,000 = 11.1%, well below the 50% risk threshold. Risk Grade A qualifies him for 12.5% p.a. pricing.',
        backupTopic: {
            title: '🎓 Deep-Dive: The 8-Gate Sequential Credit Architecture',
            content: 'Gate 1: Identity & Dedupe → Gate 2: Age/City/Policy → Gate 3: Bureau Score Floor (620) → Gate 4: Debt Burden (FOIR ≤ 50%) → Gate 5: Salary Stability (AA) → Gate 6: Device & Fraud → Gate 7: Loan Sizing → Gate 8: Risk-Based Pricing Matrix.'
        }
    },

    // ========== STEP 6: AUDIENCE QUESTION (THE DILEMMA) ==========
    {
        id: 'step-audience-poll',
        stage: 'underwriting',
        stepNumber: 6,
        title: 'Audience Question: The Credit Dilemma',
        subtitle: '“Weak Bureau Score vs. Strong Cash Flow — What Should the Lender Do?”',
        customerScreen: {
            type: 'audience-poll',
            headline: 'Live Classroom Discussion Question',
            questionText: '“Suppose a borrower\'s credit score is relatively weak (e.g. 640), but their Account Aggregator data shows strong and stable cash flows (₹85,000/month, zero recent bounces). Should the lender automatically reject them?”',
            options: [
                {
                    id: 'opt-a',
                    text: '❌ Option A: Reject Immediately (Credit score is king; 640 is too risky)',
                    feedback: 'Too rigid! Credit scores are backward-looking. A 640 score may reflect an old medical dispute from 2 years ago, while current repayment ability is excellent.'
                },
                {
                    id: 'opt-b',
                    text: '⚠️ Option B: Auto-Approve on Prime Terms (Cash flow is high, ignore the past)',
                    feedback: 'Too aggressive! Ignoring past delinquency increases portfolio default risk (NPA). History cannot be disregarded completely.'
                },
                {
                    id: 'opt-c',
                    text: '🎯 Option C: Refer for Review & Risk-Based Pricing (Recommended)',
                    isCorrect: true,
                    feedback: 'Correct! Lending decisions must not be reduced to a single metric. Modern fintechs route borderline cases to manual review or apply risk-based pricing (higher interest / lower ticket size).'
                }
            ],
            takeaway: 'Key Lesson: Bureau score is backward-looking (past behavior), while Account Aggregator is forward-looking (current cash flow). Holistic credit underwriting balances both.'
        },
        customerAction: 'The audience debates a real-world underwriting dilemma: how should a fintech handle conflicting data signals where credit history and cash flow disagree?',
        behindTheScreen: 'Modern fintech risk policy does not rely on a single binary metric. Borderline profiles are routed to human underwriting queues (REFER) or priced dynamically via Risk-Based Pricing.',
        teams: [
            {
                key: 'riskAnalytics',
                responsibility: 'Designed the referral thresholds and risk-based pricing matrix to ensure near-prime borrowers are monetized safely without taking catastrophic credit losses.',
                why: 'Rejecting all borderline borrowers leaves money on the table (Type I error). Approving everyone creates bad debt (Type II error). Risk designs policy tiers to balance the trade-off.'
            },
            {
                key: 'operations',
                responsibility: 'Manages the manual review queue, inspecting bank statements and contextual anomalies to make final credit judgment on referred files within a 15-minute SLA.',
                why: 'Automation handles the obvious 80% (clear approvals & hard rejects). Operations provides expert human judgment for the critical 20% borderline cases.'
            }
        ],
        dataInputs: ['Conflicting credit signals', 'Bureau score vs. cash flow variance', 'Recent 90-day banking trajectory', 'Dispute notes on bureau report'],
        technology: {
            label: 'Exception Trigger → Referral Queue → Human Underwriter Dashboard → Risk-Adjusted Offer',
            flow: ['Rule Engine: REFER Flag', 'Operations LMS Queue', 'Underwriter Inspection', 'Risk-Based Pricing Engine', 'Adjusted Loan Offer'],
            examples: ['Underwriter Portal', 'Risk Scorecard Override Log', 'Risk-Based Pricing Matrix']
        },
        riskControl: 'Risk-based pricing: charging higher interest (e.g. 17.5% vs 12.5%) or capping loan size (e.g. ₹15,000 instead of ₹25,000) provides credit cushion for higher-risk profiles.',
        businessPurpose: 'Expands the Total Addressable Market (TAM) by serving "near-prime" and "thin-file" borrowers who are routinely rejected by traditional banks.',
        educationalExplanation: 'Never reduce credit decisions to a single number. A credit bureau score tells you what happened in the past; bank cash flow tells you what can happen today. Responsible lending synthesizes both.',
        expertDetail: 'Risk-Based Pricing formula: Interest Rate = Cost of Funds (8.5%) + Opex (2.5%) + Expected Credit Loss (PD * LGD = 3.5%) + Target Profit Margin (3.0%) = 17.5% APR for Profile B (Referred), vs 12.5% APR for Profile A (Prime).',
        backupTopic: {
            title: '🎓 Deep-Dive: IFRS 9 Expected Credit Loss (ECL) Model',
            content: 'Expected Credit Loss (ECL) = Probability of Default (PD) × Loss Given Default (LGD) × Exposure at Default (EAD). For Profile A: 1.5% PD × 45% LGD × ₹25,000 = ₹168.75 provision. For Profile B: 5.5% PD × 55% LGD × ₹25,000 = ₹756.25 provision.'
        }
    },

    // ========== STEP 7: DECISION TO DISBURSEMENT ==========
    {
        id: 'step-5',
        stage: 'onboarding',
        stepNumber: 7,
        title: 'Decision to Disbursement',
        subtitle: 'Decision → Loan Offer → KFS → Aadhaar e-Sign → Instant IMPS Cash',
        customerScreen: {
            type: 'disbursement-journey',
            headline: 'From Approval to Cash in 2 Minutes',
            subheadline: 'The Seamless Onboarding & Funding Pipeline',
            stages: [
                { icon: '🎉', label: 'Instant Approval', desc: 'Approved for ₹25,000 @ 12.5% p.a. (12 months)' },
                { icon: '📋', label: 'Key Fact Statement (KFS)', desc: 'Standardized RBI disclosure: APR 14.5%, Fee ₹500, EMI ₹2,224' },
                { icon: '✍️', label: 'Aadhaar e-Sign', desc: 'Legally binding digital contract signed via OTP' },
                { icon: '💸', label: 'Instant Disbursement', desc: '₹24,500 credited to HDFC Bank ****4821 via IMPS' }
            ],
            ctaText: 'View Disbursement Receipt'
        },
        customerAction: 'Rohan accepts his customized ₹25,000 loan offer, reviews the Key Fact Statement, enters an Aadhaar OTP to execute the digital contract, and receives ₹24,500 in his bank account within 60 seconds.',
        behindTheScreen: 'Backend generates the digital loan agreement with dynamic KFS terms, executes a legally binding digital signature certificate under the IT Act, and fires an instant IMPS payment gateway transfer.',
        teams: [
            {
                key: 'legal',
                responsibility: 'Drafted the loan contract template and Key Fact Statement (KFS) in strict compliance with the RBI Digital Lending Guidelines and the Information Technology Act 2000.',
                why: 'The loan agreement is the legally enforceable asset. The KFS must clearly state the All-Inclusive Annual Percentage Rate (APR), cooling-off period, and grievance officer details.'
            },
            {
                key: 'backendTech',
                responsibility: 'Integrated with licensed e-Sign service providers (ASP/ESP) and instant banking payment gateways (IMPS/UPI) with automated retry logic.',
                why: 'Instant disbursement is the critical "magic moment". Backend ensures money moves in seconds without stuck transactions.'
            },
            {
                key: 'operations',
                responsibility: 'Monitors real-time disbursement pipelines, handles failed payment bank retries, and performs daily ledger reconciliation.',
                why: 'If a bank transfer fails due to an IFSC outage, operations ensures automated retry or customer notification within minutes.'
            }
        ],
        dataInputs: ['Approved loan parameters', 'Borrower KYC data', 'KFS schedule', 'e-Sign OTP token', 'Bank account & IFSC', 'Payment reference number'],
        technology: {
            label: 'Offer Engine → PDF Contract Generator → UIDAI e-Sign → Payment Gateway (IMPS) → Borrower Bank',
            flow: ['Loan Offer Accepted', 'Dynamic KFS Generator', 'Aadhaar e-Sign Service', 'Signed PDF Vault', 'Payment Gateway (IMPS/UPI)', 'Bank Account Credited'],
            examples: ['Aadhaar e-Sign (CDAC / Protean ASP)', 'PDF generation microservice', 'Bank IMPS / UPI APIs', 'Automated reconciliation engine']
        },
        riskControl: 'Disbursement is strictly restricted to the verified, KYC-matched bank account of the borrower. Third-party account payouts are blocked by banking rails.',
        businessPurpose: 'Instant disbursement delivers the core value proposition of fintech: moving from application to cash in bank in under 5 minutes with zero branch visits.',
        educationalExplanation: 'Aadhaar e-Sign provides legal parity with a physical wet signature under the IT Act. The Key Fact Statement (KFS) ensures the borrower understands every single rupee charged before signing.',
        expertDetail: 'Disbursement funds flow directly from the balance-sheet lender (NBFC/Bank) to the borrower\'s account as mandated by RBI. The fintech platform never pools or holds customer loan funds.',
        backupTopic: {
            title: '🎓 Deep-Dive: NBFC Partnership Model & RBI FLDG Guidelines',
            content: 'Most fintech apps (Slice, KreditBee, MoneyTap) are Lending Service Providers (LSPs). Regulated NBFCs (e.g. Bajaj Finance) provide the balance sheet. Under RBI FLDG rules (June 2023), fintech default guarantees are strictly capped at 5% of the portfolio to prevent shadow banking.'
        }
    },

    // ========== STEP 8: THE BIG REVEAL (THE INVISIBLE ORGANIZATION) ==========
    {
        id: 'step-big-reveal',
        stage: 'organization',
        stepNumber: 8,
        title: 'The Big Reveal: The Invisible Organization',
        subtitle: '“The customer thinks they are interacting with an app. In reality, they are interacting with an organization.”',
        customerScreen: {
            type: 'big-reveal',
            headline: 'Behind the Screen: The 9 Fintech Teams',
            quote: '“The customer thinks they are interacting with an app. In reality, they are interacting with an organization.”',
            matrix: [
                { team: 'Marketing', stage: 'Acquisition', role: 'Targeted ads, CAC optimization & lead generation', color: '#14B8A6' },
                { team: 'Product', stage: 'Onboarding Funnel', role: 'Frictionless UI, minimal form & drop-off reduction', color: '#6366F1' },
                { team: 'Frontend Tech', stage: 'Client Experience', role: 'Fast mobile app, client validation & responsiveness', color: '#3B82F6' },
                { team: 'Backend Tech', stage: 'Data & Rails', role: 'API gateway, India Stack, bureau & payment integration', color: '#0EA5E9' },
                { team: 'Risk Analytics', stage: 'Credit Engine', role: '8-gate underwriting model, FOIR caps & scorecards', color: '#EF4444' },
                { team: 'Legal', stage: 'Contracts & Terms', role: 'Loan agreements, KFS disclosures & e-Sign validity', color: '#D97706' },
                { team: 'Compliance', stage: 'Governance', role: 'RBI Digital Lending Guidelines, KYC & AML rules', color: '#F59E0B' },
                { team: 'Operations', stage: 'Fulfillment', role: 'Disbursement queue, reconciliation & manual review', color: '#10B981' },
                { team: 'Collections', stage: 'Servicing & Recovery', role: 'eNACH auto-debit, reminders & ethical recovery', color: '#DC2626' }
            ]
        },
        customerAction: 'The audience steps back from the customer journey to view the complete organizational architecture working behind every single screen tap.',
        behindTheScreen: 'A 3-minute, 10-tap customer loan experience is the synchronized output of 9 distinct specialized departments, interconnected through automated software pipelines.',
        teams: [
            {
                key: 'product',
                responsibility: 'Acts as the orchestrator, aligning Marketing, Technology, Risk, Legal, and Operations around a unified customer journey.',
                why: 'Without strong product orchestration, different teams build disconnected silos, creating a broken, slow user experience.'
            },
            {
                key: 'complianceRisk',
                responsibility: 'Enforces organizational checks and balances so that growth targets never compromise credit risk and regulatory standards.',
                why: 'High growth without compliance leads to regulatory bans. Compliance ensures sustainable, audit-proof longevity.'
            }
        ],
        dataInputs: ['Cross-functional SLAs', 'System-wide event streams', 'Customer journey telemetry', 'Audit logs'],
        technology: {
            label: 'Front-End Experience ↔ Microservices Layer ↔ Regulated Banking Rails ↔ Core Ledger',
            flow: ['Mobile App (Product/Frontend)', 'API Gateway (Backend)', 'Risk Engine (Data Science)', 'Compliance & Legal Guardrails', 'Banking Rails (Operations/LMS)'],
            examples: ['Microservices Architecture', 'Enterprise Event Bus (Kafka)', 'Centralized Monitoring (Datadog/NewRelic)']
        },
        riskControl: 'Organizational separation of duties: Marketing cannot access bureau data, Engineering cannot alter credit policy rules without Risk sign-off, and Operations follows audited SOPs.',
        businessPurpose: 'Organizational alignment is the true competitive moat of fintech: transforming cross-disciplinary complexity into effortless customer simplicity.',
        educationalExplanation: 'When you take a loan on a phone, you are not interacting with code alone. You are interacting with lawyers, risk modelers, software engineers, marketers, compliance officers, and operations specialists working in real-time harmony.',
        expertDetail: 'Organizational scalability metric: Loans Disbursed Per Employee. Traditional Indian NBFCs operate at 50–150 active loans per employee. Top digital fintech lenders achieve 2,500–10,000+ active loans per employee due to end-to-end automation.',
        backupTopic: {
            title: '🎓 Deep-Dive: Fintech Governance & Ethical Lending Frameworks',
            content: 'The 4 Governance Pillars in Automated Lending: (1) Data Privacy (Explicit consent & encryption); (2) Algorithmic Explainability (Adverse action notices with clear reasons); (3) Fair Treatment (No demographic bias); (4) Debt-Trap Prevention (Hard FOIR caps).'
        }
    },

    // ========== STEP 9: POST-DISBURSEMENT & SERVICING ==========
    {
        id: 'step-7',
        stage: 'servicing',
        stepNumber: 9,
        title: 'Post-Disbursement & Collections',
        subtitle: 'LMS → EMI Schedule → eNACH Auto-Debit → Ethical Servicing',
        customerScreen: {
            type: 'servicing-dashboard',
            headline: 'Active Loan Servicing & Auto-Debit',
            subheadline: 'Lending Does Not End at Disbursement',
            dashboard: {
                outstanding: '₹25,000',
                nextEmi: '₹2,224 (Due 5th next month)',
                tenure: '12 Months (0 of 12 Paid)',
                mandate: 'eNACH Mandate Active on HDFC Bank ****4821 ✓'
            },
            lifecycleNudges: [
                'T-3 Days: Gentle WhatsApp / SMS reminder before EMI date',
                'T-0 Day: Automated eNACH debit presentation to NPCI',
                'T+1 Day: Instant payment receipt & credit score update'
            ]
        },
        customerAction: 'Rohan monitors his active loan on the mobile dashboard. On the 5th of each month, his EMI of ₹2,224 is debited automatically via eNACH mandate.',
        behindTheScreen: 'The Loan Management System (LMS) tracks the amortization ledger, accrues interest, and automatically executes recurring debit presentations across the NPCI banking network.',
        teams: [
            {
                key: 'backendTech',
                responsibility: 'Maintains the Loan Management System (LMS) core ledger and integrates with NPCI eNACH rails for automated recurring debits.',
                why: 'The LMS is the financial source of truth. It manages interest calculations, prepayments, penalty waivers, and accounting reconciliation.'
            },
            {
                key: 'collections',
                responsibility: 'Monitors portfolio repayment patterns, executes early-warning delinquency alerts, and conducts ethical, RBI-compliant outreach for missed payments.',
                why: 'Proactive digital reminders 3 days before the EMI date reduce accidental bounces by over 35%, keeping portfolio NPAs low.'
            },
            {
                key: 'operations',
                responsibility: 'Manages eNACH bounce exception handling, mandate re-presentations, and customer service queries.',
                why: 'Handles bank clearing failures, customer bank account changes, and loan closure No-Objection Certificates (NOC).'
            }
        ],
        dataInputs: ['Amortization schedule', 'Monthly EMI debit amount (₹2,224)', 'Bank balance pre-debit signals', 'NPCI eNACH response codes'],
        technology: {
            label: 'LMS Core Ledger → Automated eNACH Presenter → NPCI Clearing → Settlement & NOC',
            flow: ['LMS Ledger', 'EMI Scheduler', 'NPCI eNACH Presenter', 'Borrower Bank Debit', 'Settlement & Ledger Update'],
            examples: ['Loan Management System (LMS)', 'NPCI eNACH / NACH Rails', 'Automated WhatsApp API Nudges']
        },
        riskControl: 'Strict adherence to RBI Fair Debt Collection practices: zero harassment, no calls before 8 AM or after 7 PM, and transparent customer grievance redressal.',
        businessPurpose: 'Automated recurring collections reduce collection operational costs by 80%, maintain low NPA rates (< 2%), and transform on-time borrowers into prime repeat customers.',
        educationalExplanation: 'Disbursement is just the beginning. The life of a loan lasts 12 months. The LMS and automated eNACH rails ensure repayments happen smoothly without manual collection agents.',
        expertDetail: 'Early Warning System (EWS): The LMS tracks leading indicators of default (e.g. Account Aggregator balance drops below EMI 3 days prior, multiple bureau enquiries on other apps). Borrowers with EWS triggers receive soft digital reminders to prevent delinquency.',
        backupTopic: {
            title: '🎓 Deep-Dive: DPD Buckets & NPA Provisioning Norms',
            content: 'RBI Delinquency Classification: SMA-0 (1–30 DPD, 5% provisioning), SMA-1 (31–60 DPD, 10%), SMA-2 (61–90 DPD, 15%), NPA / Stage 3 (90+ DPD, 25–100% provisioning). Keeping loans in Current / 0 DPD via eNACH is the primary driver of fintech net interest margins.'
        }
    },

    // ========== STEP 10: FINAL TAKEAWAYS ==========
    {
        id: 'step-takeaways',
        stage: 'servicing',
        stepNumber: 10,
        title: 'Final Synthesis & Key Takeaways',
        subtitle: 'Three Practical Lessons for Fintech Practitioners',
        customerScreen: {
            type: 'final-takeaways',
            headline: 'Three Practical Takeaways',
            subheadline: 'The Core Lessons of Modern Digital Lending',
            takeaways: [
                {
                    num: '1',
                    title: 'The App is Just the Visible Tip of the Iceberg',
                    desc: '90% of fintech value is in the invisible technology stack — India Stack rails, real-time data pipelines, and automated underwriting engines.'
                },
                {
                    num: '2',
                    title: 'Automation Enables Speed, but Risk Management Decides Survival',
                    desc: 'Speed and UX win customer acquisition, but rigorous credit underwriting (FOIR, bureau floors, cash flow analysis) prevents catastrophic portfolio default.'
                },
                {
                    num: '3',
                    title: 'Frictionless Experience Demands Cross-Functional Harmony',
                    desc: 'Product, Engineering, Risk, Legal, Compliance, Operations, and Partnerships must operate as a synchronized machine behind every customer tap.'
                }
            ],
            closingQuote: '“One loan. Many teams. One invisible technology stack.”'
        },
        customerAction: 'The presentation concludes with three actionable executive insights connecting customer experience, technology automation, and organizational design.',
        behindTheScreen: 'The master architecture of digital lending: turning multi-disciplinary complexity, heavy regulation, and big data into a 3-minute, frictionless customer blessing.',
        teams: [
            {
                key: 'product',
                responsibility: 'Delivered an intuitive, delightful borrowing experience for Rohan Mehta.',
                why: 'Frictionless UX builds trust and customer loyalty.'
            },
            {
                key: 'riskAnalytics',
                responsibility: 'Protected the lending capital with robust mathematical underwriting.',
                why: 'Disciplined risk management ensures sustainable long-term profitability.'
            },
            {
                key: 'backendTech',
                responsibility: 'Connected government, banking, and payment rails into a seamless 2-second pipeline.',
                why: 'Reliable technology enables infinite operational scalability.'
            }
        ],
        dataInputs: ['End-to-end customer journey metrics', 'Portfolio unit economics', 'Risk-adjusted return on capital (RAROC)'],
        technology: {
            label: 'Customer Problem Solved ↔ Scalable Technology ↔ Disciplined Risk ↔ Regulatory Compliance',
            flow: ['Borrower (₹25k Need)', 'Mobile App', 'Invisible Stack', 'Funded Loan', 'Profitable Repeat Lifecycle'],
            examples: ['India Stack', '8-Gate Risk Engine', 'LMS Core', 'RBI Compliance Architecture']
        },
        riskControl: 'Responsible lending governance ensures long-term systemic stability across economic cycles.',
        businessPurpose: 'Democratize access to credit for creditworthy Indians through high-speed, transparent, and ethically governed digital infrastructure.',
        educationalExplanation: 'Digital lending is not just an app. It is a complete financial institution engineered into a high-speed software pipeline.',
        expertDetail: 'Key Takeaway for MBA/PGDM: The competitive moat in digital finance is never just a pretty UI (easily copied) or capital (a commodity) — it is the proprietary risk algorithms, India Stack integration velocity, and cross-functional operational discipline.',
        backupTopic: {
            title: '🎓 Deep-Dive: The Future of Indian Lending (ULI & Beyond)',
            content: 'The Reserve Bank Innovation Hub\'s Unified Lending Interface (ULI) will do for credit what UPI did for payments — standardizing land records, satellite crop data, GSTN, and credit data into a plug-and-play national lending infrastructure.'
        }
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
