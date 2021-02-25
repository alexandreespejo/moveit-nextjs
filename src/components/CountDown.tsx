import { useContext } from 'react';
import styles from '../styles/components/CountDown.module.css';
import { FaCheckCircle } from 'react-icons/fa';
import { CountDownContext } from '../contexts/CountDownContext';
export function CountDown() {
  const {
    hasFinished,
    isActive,
    minutes,
    resetCountDown,
    seconds,
    startCountDown,
  } = useContext(CountDownContext);
  const [minutesLeft, minutesRight] = String(minutes)
    .padStart(2, '0')
    .split('');
  const [secondsLeft, secondsRight] = String(seconds)
    .padStart(2, '0')
    .split('');

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
