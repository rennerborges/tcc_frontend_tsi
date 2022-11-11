import { Image, Text } from '@nextui-org/react';
import ContentLoader from 'react-content-loader';
import styles from './styles.module.css';

const NotFoundContainer = () => {
  return (
    <section className={styles.container}>
      <Image
        css={{
          width: 300,
        }}
        src={`/images/search.png`}
        alt="Search"
      />
      <Text>Nenhum objeto foi encontrado</Text>
    </section>
  );
};
export default NotFoundContainer;
