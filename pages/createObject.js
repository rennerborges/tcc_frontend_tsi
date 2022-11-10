import CreateObject from '../src/pages/CreateObject';

export default function Home() {
  return <CreateObject />;
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
