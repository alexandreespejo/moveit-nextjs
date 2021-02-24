import { useContext, useEffect, useState } from 'react';
import styles from '../styles/components/CountDown.module.css';
import { FaCheckCircle } from 'react-icons/fa';
import { ChallengesContext } from '../contexts/ChallengesContext';
export function CountDown() {
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const { startNewChallenge } = useContext(ChallengesContext);

  let countDownTimeOut: NodeJS.Timeout;

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minutesLeft, minutesRight] = String(minutes)
    .padStart(2, '0')
    .split('');
  const [secondsLeft, secondsRight] = String(seconds)
    .padStart(2, '0')
    .split('');

  const startCountDown = () => setIsActive(true);
  const resetCountDown = () => {
    clearTimeout(countDownTimeOut);
    setIsActive(false);
    setTime(0.1 * 60);
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
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minutesLeft}</span>
          <span>{minutesRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>
      {hasFinished ? (
        <button disabled className={styles.countDownButton}>
          Ciclo encerrado <FaCheckCircle />
        </button>
      ) : isActive ? (
        <button
          type="button"
          onClick={resetCountDown}
          className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
        >
          Abandonar ciclo
        </button>
      ) : (
        <button
          type="button"
          onClick={startCountDown}
          className={styles.countDownButton}
        >
          Iniciar um ciclo
        </button>
      )}
    </div>
  );
}
