import styles from '../styles/Home.module.css';
import Button from '../src/components/Button';

export default function Home() {
  return (
    <div className={styles.container}>
      <Button></Button>
    </div>
  );
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
