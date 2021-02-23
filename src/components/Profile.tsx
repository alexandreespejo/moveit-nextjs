import styles from '../styles/components/Profile.module.css';
export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://avatars.githubusercontent.com/u/62163105?s=460&u=d5875569bd369dc587037eb7cc580836e2917e24&v=4"
        alt="profileImage"
      />
      <div>
        <strong>Alexandre Espejo</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          Level 01
        </p>
      </div>
    </div>
  );
}
