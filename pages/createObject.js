import { useRouter } from 'next/router';
import CreateObject from '../src/pages/CreateObject';

export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  return <CreateObject id={id} />;
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
