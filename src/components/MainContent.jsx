import React, { useEffect, useState } from 'react';
import { setMainData } from '../utils/getData';
import { onScrollList } from './mainGateway';
import { useHistory } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import ImagePopup from './ImagePopup/ImagePopup';
import AutoClose from '../utils/AutoClose';

import styles from './MainContent.module.scss';

const MainContent = () => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [imgData, setImgData] = useState(null);

  const { hasMore, pictures } = data ?? {};

  useEffect(() => {
    (async () => {
      await setMainData({ setData, history, pageNumber });
    })();
  }, [pageNumber]);

  const setCountImg = (index) => {
    const findCountImg = pictures?.find((picture, i) => index === i);

    return findCountImg
      ? setMainData({
          history,
          setImgData,
          id: findCountImg.id,
          imgIndx: index,
        })
      : null;
  };

  return data ? (
    <div
      className={styles.mainContent}
      onScroll={(event) => onScrollList(event, hasMore, setPageNumber)}>
      <ul className={styles.imagesList}>
        {pictures.map((imgData, imgIndx) => (
          <li
            key={imgData.id}
            className={styles.imageItem}
            onClick={() =>
              setMainData({ history, setImgData, id: imgData.id, imgIndx })
            }>
            <img src={imgData.cropped_picture} alt='image' />
          </li>
        ))}
      </ul>
      {imgData?.data && (
        <div className={styles.imagePopupWrap}>
          <AutoClose
            handleClose={setImgData}
            isScroll={Boolean(imgData)}
            render={() => (
              <ImagePopup imgData={imgData} setCountImg={setCountImg} />
            )}
          />
        </div>
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default MainContent;
