import LoginPage from '../src/pages/Login';
import { AuthProvider } from '../src/contexts/auth';

export default function Home() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}
