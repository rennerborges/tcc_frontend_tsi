import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import lightTheme from '../src/themes/light';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthCheck from '../src/hooks/privateRoutes';
import { AuthProvider } from '../src/contexts/auth';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NextUIProvider theme={lightTheme}>
        <ToastContainer />
        <AuthCheck>
          <Component {...pageProps} />
        </AuthCheck>
      </NextUIProvider>
    </AuthProvider>
  );
}

export default MyApp;
