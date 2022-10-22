import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import lightTheme from '../src/themes/light';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider theme={lightTheme}>
      <ToastContainer />
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
