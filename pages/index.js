import styles from '../styles/Home.module.css';
import Button from '../src/components/Button';
import { AuthProvider } from '../src/contexts/auth';

export default function Home() {
  return (
    <AuthProvider>
      <div className={styles.container}>
        <Button></Button>
      </div>
    </AuthProvider>
  );
}
