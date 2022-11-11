import ContentLoader from 'react-content-loader';
import styles from './styles.module.css';

const SkeletonContainer = () => {
  return (
    <section>
      {[...new Array(5)].map((_, index) => (
        <div key={index} className={styles.item}>
          <ContentLoader
            speed={5}
            width="100%"
            height={60}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="3" ry="4" width="250px" height="20" />
            <rect x="0" y="30" rx="3" ry="3" width="500px" height="16" />
          </ContentLoader>
          <hr className={styles.hr} />
        </div>
      ))}
    </section>
  );
};
export default SkeletonContainer;
