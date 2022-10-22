import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';
export const AuthCheck = ({ children }) => {
  const router = useRouter();
  const user = useContext(AuthContext); // you need to implement this. In this example, undefined means things are still loading, null means user is not signed in, anything truthy means they're signed in

  console.log('user', user.authState, ' ', typeof window);
  if (!user) return <div>Carregando</div>; // a loading component that prevents the page from rendering

  if (typeof window !== 'undefined' && user && user.authState.token === null) {
    if (window.location.pathname !== '/login') {
      router.push('/login');
    }
  }

  return children;
};

export default AuthCheck;
