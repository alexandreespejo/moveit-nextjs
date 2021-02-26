import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ChallengesContext } from './ChallengesContext';
interface CountDownData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  resetCountDown: () => void;
  startCountDown: () => void;
}
interface CountDownProps {
  children: ReactNode;
}
export const CountDownContext = createContext({} as CountDownData);
export function CountDownContextProvider({ children }: CountDownProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  let countDownTimeOut: NodeJS.Timeout;

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startCountDown = () => setIsActive(true);
  const resetCountDown = () => {
    clearTimeout(countDownTimeOut);
    setHasFinished(false);
    setIsActive(false);
    setTime(25 * 60);
  };

  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeOut = setTimeout(() => setTime(time - 1), 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      startNewChallenge();
    }
  }, [isActive, time]);
  return (
    <CountDownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        resetCountDown,
        startCountDown,
      }}
    >
      {children}
    </CountDownContext.Provider>
  );
}
