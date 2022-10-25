import styles from '../styles/Home.module.css';
import Dashboard from '../src/pages/Dashboard';

export default function Home() {
  return <Dashboard />;
}

export const getServerSideProps = async ({ req }) => {
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
