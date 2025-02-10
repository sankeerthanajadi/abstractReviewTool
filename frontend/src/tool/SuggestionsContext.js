import { createContext, useState } from "react";

export const SuggestionsContext = createContext();

export function SuggestionsProvider({ children }) {
  const [suggestions, setSuggestions] = useState("");

  return (
    <>
    <SuggestionsContext.Provider value={{ suggestions, setSuggestions }}>
      {children}
    </SuggestionsContext.Provider>
    </>
  );
}
