import { useEffect, useState } from 'react';
import styles from '../styles/components/CountDown.module.css';
export function CountDown() {
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minutesLeft, minutesRight] = String(minutes)
    .padStart(2, '0')
    .split('');
  const [secondsLeft, secondsRight] = String(seconds)
    .padStart(2, '0')
    .split('');

  const startCountDown = () => setActive(true);
  useEffect(() => {
    if (active && time > 0) setTimeout(() => setTime(time - 1), 1000);
  }, [active, time]);
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
      <button
        type="button"
        onClick={startCountDown}
        className={styles.countDownButton}
      >
        Iniciar um ciclo
      </button>
    </div>
  );
}
