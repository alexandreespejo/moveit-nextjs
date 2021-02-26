import styles from '../styles/components/LevelUpModal.module.css';
interface ModalProps {
  level: number;
  closeLevelUpModal: () => void;
}
export function LevelUpModal({ level, closeLevelUpModal }: ModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>
        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="fecharModal" />
        </button>
      </div>
    </div>
  );
}
