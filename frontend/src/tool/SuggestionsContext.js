// import { createContext, useState } from "react";

// export const SuggestionsContext = createContext();

// export function SuggestionsProvider({ children }) {
//   const [suggestions, setSuggestions] = useState("");

//   return (
//     <>
//     <SuggestionsContext.Provider value={{ suggestions, setSuggestions }}>
//       {children}
//     </SuggestionsContext.Provider>
//     </>
//   );
// }


import { createContext, useState } from "react";

export const SuggestionsContext = createContext();

export const SuggestionsProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState("");
  const [fileName, setFileName] = useState("");

  return (
    <SuggestionsContext.Provider value={{ suggestions, setSuggestions, fileName, setFileName }}>
      {children}
    </SuggestionsContext.Provider>
  );
};
