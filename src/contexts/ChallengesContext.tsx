import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenges {
  type: string;
  description: string;
  amount: number;
}
interface ChallengesData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenges;
  resetChallenge: () => void;
  levelUp: () => void;
  startNewChallenge: () => void;
}
interface ChallengesProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesData);

export function ChallengesContextProvider({ children }: ChallengesProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(30);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const levelUp = () => setLevel(level + 1);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);
  };

  const resetChallenge = () => setActiveChallenge(null);

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        experienceToNextLevel,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
