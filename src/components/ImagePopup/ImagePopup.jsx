import React from 'react';

import styles from './ImagePopup.module.scss';

const ImagePopup = ({ imgData, setCountImg }) => {
  const {
    data: { author, camera, full_picture, tags },
  } = imgData;

  return (
    <div className={styles.imagePopup}>
      <div className={styles.photoData}>
        <div className={styles.photographer}>{author}</div>
        <div className={styles.photographer}>{camera}</div>
        <div className={styles.photographer}>{tags}</div>
      </div>
      <button
        className={styles.prevPage}
        onClick={() => setCountImg(imgData.imgIndx - 1)}>
        Prev Page
      </button>
      <img src={full_picture} alt='full size image' className={styles.image} />
      <button
        className={styles.nextPage}
        onClick={() => setCountImg(imgData.imgIndx + 1)}>
        Next page
      </button>
    </div>
  );
};

export default ImagePopup;
