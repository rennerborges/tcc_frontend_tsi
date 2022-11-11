import '../styles/globals.css';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Head from 'next/head';

const lightTheme = createTheme({
  type: 'light',
  theme: {},
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {},
});

function MyApp({ Component, pageProps }) {
  return (
    <NextThemesProvider
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <Head>
        <title>Dashboard | NuPPGIN</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <NextUIProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
