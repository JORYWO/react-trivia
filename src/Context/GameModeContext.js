import { createContext, useContext, useState } from 'react';

const ModeContext = createContext();

export function useGameModeData(){
  return useContext(ModeContext)
}

export function GameModeContext({ children }){
  const [gameMode, setGameMode] = useState(0);
  
  const changeGameMode = (mode) => {
    setGameMode(mode)
  }

  return(
    <ModeContext.Provider value={{ gameMode, changeGameMode }}>
      {children}
    </ModeContext.Provider>
  )
}