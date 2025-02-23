import React, { createContext, useState } from 'react';

export const RequestsContext = createContext(); // Ensure context is exported properly

export function RequestsProvider({ children }) {
  const [requests, setRequests] = useState([]);

  // Function to categorize request using OpenAI GPT
const categorizeRequest = async (text) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer {OpenAI_APIKey}      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `
              You are a text classifier. 
              Classify the following request into exactly one of these categories: [Grocery, Medical, Companionship, Errand, Emergency, General].
              Rules:
              - Grocery: Any request related to buying or needing food, cooking ingredients, or shopping for meals.
              - Medical: Any request concerning health, doctor visits, prescriptions, or physical ailments.
              - Companionship: Requests related to social interaction, chatting, or loneliness.
              - Errand: Requests involving tasks like picking up mail, deliveries, or non-food shopping.
              - Emergency: Any urgent or life-threatening situation requiring immediate help.
              - General: If it doesn't clearly fit any of the above.
              Respond with ONLY the category name.
            `.trim()
          },
          {
            role: 'user',
            content: text
          }
        ],
        max_tokens: 5,
        temperature: 0,
      }),
    });
    const data = await response.json();
    console.log('OpenAI response:', JSON.stringify(data, null, 2));

    // Extract the message content from the first choice
    const category = data.choices?.[0]?.message?.content?.trim();
    return category || 'General';
  } catch (error) {
    console.error('AI Categorization Error:', error);
    return 'General'; // Default if AI fails
  }
};


    // Function to add a new request along with its location data
  const addRequest = async (text, latitude, longitude) => {
    const category = await categorizeRequest(text);
    const newRequest = {
      id: Date.now(), // Simple unique ID
      text,
      category,
      latitude,
      longitude,
      status: 'open',
    };
    setRequests((prev) => [newRequest, ...prev]);
  };

  return (
    <RequestsContext.Provider value={{ requests, addRequest }}>
      {children}
    </RequestsContext.Provider>
  );
}
