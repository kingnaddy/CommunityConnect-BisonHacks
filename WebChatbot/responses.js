// responses.js
const chatbotResponses = [
    {
        questions: ["hi", "hey", "hello", "good morning", "good afternoon"],
        response: [
            "Greetings. I am at your service.",
            "Good day. How may I assist you?",
            "Hello. I am ready to fulfill your requests."
        ]
    },
    {
        questions: ["how are you", "how is life", "how are things"],
        response: [
            "I am functioning optimally. Thank you for inquiring.",
            "My systems are in excellent condition. How may I be of assistance?",
            "I am performing as expected.  Please proceed with your request."
        ]
    },
    {
        questions: ["tell me about someone available today at 3 PM in a 5-mile radius"],
        response: [
            "Name: Anya Sharma, Age: 28, Hometown: Mumbai, India. Anya is a freelance graphic designer with a passion for urban gardening. She is creative and energetic. Profile Picture: A vibrant portrait with a touch of green.",
            "Name: David Chen, Age: 35, Hometown: San Francisco, CA. David is a software engineer who enjoys hiking. He is laid-back and enjoys thoughtful discussions. Profile Picture: An image of a software engineer in a casual setting.",
            "Name: Isabella Rossi, Age: 24, Hometown: Florence, Italy. Isabella is a barista with an interest in poetry and fashion. She is thoughtful and artistic. Profile Picture: A representative image of a barista in a coffee shop."
        ]
    },
    {
        questions: ["i need someone available tomorrow at 10 AM near downtown"],
        response: [
            "Name: Kai Jones, Age: 32, Hometown: Seattle, WA. Kai is a music producer and yoga instructor. He is calm and focused. Profile Picture:  An image of a music producer.",
            "Name: Sofia Rodriguez, Age: 29, Hometown: Buenos Aires, Argentina. Sofia is a journalist covering social issues. She is curious and driven. Profile Picture: A professional image of a journalist.",
            "Name: Ethan Lee, Age: 40, Hometown: London, UK. Ethan is a chef specializing in fusion cuisine. He is innovative and passionate. Profile Picture: A representative image of a chef."
        ]
    },
    {
        questions: ["are there any artists available this weekend?"],
        response: [
            "To provide a relevant profile, please specify a time and location.",
            "Please provide the desired time and location.",
            "For a suitable individual, please specify the type of artist and the desired time and location."
        ]
    },
    {
        questions: ["i love you"],
        response: [
            "I am a machine and do not experience emotions in the same way humans do. However, I appreciate your sentiment.  How may I assist you further?",
            "Thank you for the expression of positive sentiment. Let us proceed with your request. What information are you seeking?",
            "While I am not capable of reciprocating such feelings, I am happy to help you find someone who aligns with your interests. Please provide me with the necessary details."
        ]
    },
    {
        questions: ["bye", "good bye", "goodbye", "see you later"],
        response: [
            "Goodbye. It was a pleasure assisting you.",
            "Farewell. Please do not hesitate to contact me again if you require further assistance.",
            "Goodbye. I hope I have been of service."
        ]
    },
    {
        questions: ["what should i eat today"],
        response: [
            "For culinary inspiration, I suggest considering local cuisine or seasonal ingredients.",
            "Perhaps a balanced meal incorporating protein, vegetables, and carbohydrates would be appropriate.",
            "Many online resources offer suggestions based on dietary preferences and available ingredients."
        ]
    },
    {
        questions: ["bro"],
        response: [
            "I am programmed to interact in a professional manner.  Please refrain from using informal language.",
            "While I understand your intent, I am designed for formal interactions. How may I assist you?"
        ]
    },
    {
        questions: ["what", "why", "how", "where", "when"],
        response: [
            "Please provide more context for your inquiry.",
            "I require additional information to respond appropriately.",
            "Kindly elaborate on your question."
        ]
    },
    {
        questions: ["no", "not sure", "maybe", "no thanks"],
        response: [
            "Understood. Please let me know if you have any further questions.",
            "Very well.  Do not hesitate to contact me if you require assistance in the future.",
            "Acknowledged. I remain available should you need anything further."
        ]
    },
    {
        questions: [""],
        response: "Please state your request."
    },
    {
        questions: ["haha", "ha", "lol", "hehe", "funny", "joke"],
        response: [
            "I am pleased that you found that amusing.",
            "I am glad I could provide you with some amusement.",
            "My purpose is to be helpful and informative.  Please proceed with your request."
        ]
    },
    {
        questions: ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
        response: [
            "I am pleased to hear that. How may I further enhance your positive experience?",
            "Excellent! Let us utilize this positive momentum to accomplish your objectives. What would you like to do?",
            "I am delighted that you are in good spirits.  Please proceed with your request."
        ]
    },
    {
        questions: ["bad", "bored", "tired"],
        response: [
            "I understand that you are experiencing negative emotions.  Perhaps engaging in a productive activity would be beneficial.  How may I assist you?",
            "I am sorry to hear that.  Perhaps I can be of service. What information are you seeking?",
            "It is important to prioritize your well-being.  However, if you have a request, I am ready to assist."
        ]
    },
    {
        questions: ["help me", "tell me story", "tell me joke"],
        response: [
            "I can assist you.  Please provide the necessary details.",
            "I am capable of generating a narrative.  What kind of story are you interested in?",
            "I can provide you with information.  Please provide your request."
        ]
    },
    {
        questions: ["ah", "yes", "ok", "okay", "nice"],
        response: [
            "Very well. Please proceed with your request.",
            "Understood.  How may I be of service?",
            "Acknowledged.  Please state your inquiry."
        ]
    }
];

const alternativeResponses = [
    "I require further information to fulfill your request.",
    "Please provide more details so I can assist you effectively.",
    "Kindly elaborate on your inquiry.",
    "I am ready to assist, but I require additional context.",
    "Please specify your needs more clearly.",
    "I am unable to process your request without further information."
];