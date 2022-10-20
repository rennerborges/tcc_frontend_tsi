import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import lightTheme from '../src/themes/light';

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider theme={lightTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
