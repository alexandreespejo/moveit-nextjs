import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/ChallengeBox.module.css';
export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completedChallenge } = useContext(
    ChallengesContext
  );
  const { resetCountDown } = useContext(CountDownContext);

  const succeededChallenge = () => {
    completedChallenge();
    resetCountDown();
  };

  const failedChallenge = () => {
    resetChallenge();
    resetCountDown();
  };
  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>{`Ganhe ${activeChallenge.amount} xp`}</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="body" />
            <strong>Exercite-se</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.failedButton}
              onClick={() => failedChallenge()}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.succeededButton}
              onClick={() => succeededChallenge()}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>
            Inicie um ciclo para receber desafios a serem completados
          </strong>
          <div>
            <img src="icons/level-up.svg" alt="levelUp" />
            <p>Complete-os e ganhe experiência para avançar de level.</p>
          </div>
        </div>
      )}
    </div>
  );
}
