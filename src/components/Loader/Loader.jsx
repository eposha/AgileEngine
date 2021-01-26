import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loaderWrap}>
      <div className={styles.ldsDefault}>
        {[...Array(12)].map((elem, i) => (
          <div key={i} />
        ))}
      </div>
    </div>
  );
};

export default Loader;
