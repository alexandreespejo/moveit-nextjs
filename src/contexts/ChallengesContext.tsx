import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

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
  completedChallenge: () => void;
  closeLevelUpModal: () => void;
}
interface ChallengesProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesData);

export function ChallengesContextProvider({
  children,
  ...rest
}: ChallengesProps) {
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState(null);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  const levelUp = () => {
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  };

  const closeLevelUpModal = () => setIsLevelModalOpen(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);
    if (Notification.permission === 'granted') {
      new Audio('/notification.mp3').play();
      new Notification('Novo Desafio!', {
        body: `Valendo ${challenge.amount}xp !`,
      });
    }
  };

  const resetChallenge = () => setActiveChallenge(null);

  const completedChallenge = () => {
    if (!activeChallenge) return;
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    resetChallenge();
    setChallengesCompleted(challengesCompleted + 1);
  };

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
        completedChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelModalOpen && (
        <LevelUpModal level={level} closeLevelUpModal={closeLevelUpModal} />
      )}
    </ChallengesContext.Provider>
  );
}
