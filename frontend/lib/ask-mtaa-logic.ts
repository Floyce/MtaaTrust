export type Intent =
    | 'PLUMBING_REQUEST'
    | 'ELECTRICAL_REQUEST'
    | 'TIMING_QUESTION'
    | 'PRICING_QUESTION'
    | 'URGENT_REQUEST'
    | 'GENERAL_INQUIRY';

interface ConversationState {
    intent: Intent | null;
    step: number;
    answers: Record<string, string>;
}

const kenyanPhrases = {
    greetings: ["Niaje!", "Karibu!", "Mambo!", "Sasa!"],
    confirmations: ["Sawa sawa!", "Poaa!", "Shwari!", "Imekaa!"],
    misunderstandings: ["Sielewi, tafadhali elezea zaidi", "Hiyo nje ya uwezo wangu", "Naweza kusaidia na huduma za nyumbani tu"]
};

export const conversationFlows = {
    PLUMBING_REQUEST: {
        questions: [
            "What exactly is the plumbing issue? (leak, blockage, installation)",
            "Is this an emergency or can it wait?",
            "Where are you located? (suburb/estate)",
            "Do you need a licensed plumber or any skilled person?"
        ],
        responses: {
            afterAnswers: "Great! I found 3 trusted plumbers in your area. They usually respond within 2 hours. Should I show you their profiles?",
        }
    },
    ELECTRICAL_REQUEST: {
        questions: [
            "What is the electrical problem? (power outage, wiring, appliances)",
            "Is the whole house affected or just one area?",
            "Where in Nairobi are you?",
            "How urgent is this?"
        ],
        responses: {
            afterAnswers: "Safety first! I've located 2 certified electricians near you. Shall I connect you?"
        }
    },
    URGENT_REQUEST: {
        questions: [
            "🚨 Poleni! What is the emergency? (Plumbing, Electrical, Security, Fire)",
            "Where exactly are you located?",
            "Is everyone safe?"
        ],
        responses: {
            afterAnswers: "Connecting you with the nearest emergency responders and top-rated pros immediately."
        }
    }
};

export const quickAnswers: Record<string, string> = {
    'how long': "Jobs usually take 1-8 hours. Want me to find someone available today?",
    'how soon': "Most providers respond within 2 hours. Emergency providers can come in 30-60 mins.",
    'time': "Most providers respond within 2 hours. Emergency providers can come in 30-60 mins.",
    'duration': "Jobs usually take 1-8 hours. Want me to find someone available today?",

    'how much': "Prices vary by job size:\n• Small: KES 1,000-5,000\n• Medium: KES 5,000-20,000\n• Large: KES 20,000+\nTell me your specific need for accurate pricing.",
    'price': "Prices vary by job size:\n• Small: KES 1,000-5,000\n• Medium: KES 5,000-20,000\n• Large: KES 20,000+\nTell me your specific need for accurate pricing.",
    'cost': "Prices vary by job size:\n• Small: KES 1,000-5,000\n• Medium: KES 5,000-20,000\n• Large: KES 20,000+\nTell me your specific need for accurate pricing.",

    'trustworthy': "All providers are verified with:\n✅ ID & License check\n✅ Customer reviews\n✅ Community vouches\n✅ M-Pesa payment protection",
    'trust': "All providers are verified with:\n✅ ID & License check\n✅ Customer reviews\n✅ Community vouches\n✅ M-Pesa payment protection",

    'how it works': "1. Tell me what you need\n2. I find verified local pros\n3. Compare profiles & prices\n4. Book securely via M-Pesa\n5. Leave reviews to help others",

    'area': "We cover all Nairobi suburbs and expanding! Where are you located?",
    'location': "We cover all Nairobi suburbs and expanding! Where are you located?",

    'emergency': "🚨 EMERGENCY MODE 🚨\nI'll find available providers NOW. What's the emergency? (plumbing/electrical/other)"
};

export function detectIntent(message: string): Intent {
    const msg = message.toLowerCase();
    if (msg.includes('plumb') || msg.includes('leak') || msg.includes('pipe') || msg.includes('sink') || msg.includes('toilet'))
        return 'PLUMBING_REQUEST';
    if (msg.includes('electr') || msg.includes('light') || msg.includes('wiring') || msg.includes('power'))
        return 'ELECTRICAL_REQUEST';
    if (msg.includes('how long') || msg.includes('time') || msg.includes('duration') || msg.includes('when'))
        return 'TIMING_QUESTION';
    if (msg.includes('price') || msg.includes('cost') || msg.includes('how much') || msg.includes('pay'))
        return 'PRICING_QUESTION';
    if (msg.includes('urgent') || msg.includes('emergency') || msg.includes('now') || msg.includes('help') || msg.includes('moto'))
        return 'URGENT_REQUEST';
    return 'GENERAL_INQUIRY';
}

function getQuickAnswer(message: string): string | null {
    const lowerMsg = message.toLowerCase();
    for (const [key, answer] of Object.entries(quickAnswers)) {
        if (lowerMsg.includes(key)) {
            return answer;
        }
    }
    return null;
}

function enhanceResponse(baseResponse: string): string {
    if (Math.random() > 0.6) {
        const phrase = kenyanPhrases.confirmations[Math.floor(Math.random() * kenyanPhrases.confirmations.length)];
        return `${phrase} ${baseResponse}`;
    }
    return baseResponse;
}

function getRandomGreeting(): string {
    return kenyanPhrases.greetings[Math.floor(Math.random() * kenyanPhrases.greetings.length)];
}

export function processMessage(
    message: string,
    currentState: ConversationState
): { response: string, newState: ConversationState, isSystemMessage?: boolean } {

    // 1. Check for quick answers first (stateless)
    const quickAnswer = getQuickAnswer(message);
    if (quickAnswer && currentState.step === 0) { // Only provide quick answers if not in a flow
        return {
            response: enhanceResponse(quickAnswer),
            newState: currentState
        };
    }

    // 2. Handle ongoing conversation flow
    if (currentState.intent && currentState.step > 0) {
        // @ts-ignore
        const flow = conversationFlows[currentState.intent];

        if (flow) {
            // Save answer (mock storage)
            const updatedAnswers = { ...currentState.answers, [`step_${currentState.step}`]: message };

            // Move to next step
            if (currentState.step <= flow.questions.length) {
                // If we just finished the last question
                if (currentState.step === flow.questions.length) {
                    return {
                        response: enhanceResponse(flow.responses.afterAnswers),
                        newState: { intent: null, step: 0, answers: {} } // Reset
                    }
                }

                const nextQuestion = flow.questions[currentState.step]; // next question (index is step)
                return {
                    response: nextQuestion,
                    newState: { ...currentState, step: currentState.step + 1, answers: updatedAnswers }
                };
            }
        }
    }

    // 3. Detect new intent
    const intent = detectIntent(message);

    // 4. Start new flow based on intent
    // @ts-ignore
    if (conversationFlows[intent]) {
        // @ts-ignore
        const flow = conversationFlows[intent];
        return {
            // @ts-ignore
            response: `${getRandomGreeting()} ${flow.questions[0]}`,
            newState: { intent: intent, step: 1, answers: {} } // Next step will be index 1
        };
    }

    // 5. Fallback / General Inquiry
    return {
        response: "I'm here to help you find trusted local service providers in Kenya! I can help with plumbing, electrical work, cleaning, and more. What do you need help with?",
        newState: { intent: null, step: 0, answers: {} }
    };
}
