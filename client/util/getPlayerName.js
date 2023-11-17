'use client'

import { createContext, useContext, useState } from 'react'

const PlayerNameContext = createContext();

export function usePlayerName() {
  return useContext(PlayerNameContext);
}

export function PlayerNameProvider({ children }) {
  const [playerName, setPlayerName] = useState(null);

  return (
    <PlayerNameContext.Provider value={{ playerName, setPlayerName }}>
      { children }
    </PlayerNameContext.Provider>
  )
}
