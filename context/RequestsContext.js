import React, { createContext, useState } from 'react';

export const RequestsContext = createContext();

export function RequestsProvider({ children }) {
  const [requests, setRequests] = useState([]);

  const addRequest = (text) => {
    const newReq = { id: Date.now(), text, status: 'open' };
    setRequests((prev) => [newReq, ...prev]);
    console.log('addRequest -> requests now:', requests);
  };

  const acceptRequest = (requestId) => {
    setRequests((prev) =>
      prev.map(r => r.id === requestId ? { ...r, status: 'accepted' } : r)
    );
    console.log('acceptRequest -> requests now:', requests);
  };

  return (
    <RequestsContext.Provider value={{ requests, addRequest, acceptRequest }}>
      {children}
    </RequestsContext.Provider>
  );
}
