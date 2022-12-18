import ContentLoader from 'react-content-loader';
import styles from './styles.module.css';

const SkeletonContainer = () => {
  return (
    <section className={styles.container}>
      <ContentLoader
        speed={5}
        width="100%"
        height={60}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="3" ry="4" width="250px" height="20" />
        <rect x="0" y="30" rx="3" ry="3" width="500px" height="50" />
      </ContentLoader>
      {[...new Array(2)].map((_, index) => (
        <div key={index} className={styles.item}>
          <ContentLoader
            speed={5}
            width="100%"
            height={150}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="3" ry="4" width="100%" height="500" />
          </ContentLoader>
        </div>
      ))}
    </section>
  );
};
export default SkeletonContainer;
