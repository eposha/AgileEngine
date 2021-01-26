import axios from 'axios';

export const getCookie = (name) => {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const getData = async (token, pageNumber, id) => {
  document.body.style.overflow = 'hidden';

  const url = id ? `/images/${id}` : '/images';
  const { data, status } = await axios(url, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page: pageNumber && !id ? pageNumber : null },
  });
  document.body.style.overflow = 'visible';
  return { data, status };
};

export const refreshToken = async () => {
  const {
    data: { token },
  } = await axios.post('/auth', {
    apiKey: '23567b218376f79d9415',
  });

  let expireDate = new Date(Date.now() + 86400e3);
  expireDate = expireDate.toUTCString();
  document.cookie = `agileEngineUser=${token}; path=/; expires=${expireDate}`;

  return { token };
};

export const setDataInfo = (prevData, data) => {
  return prevData
    ? {
        ...prevData,
        ...data,
        pictures: [...prevData.pictures, ...data.pictures],
      }
    : data;
};

export const setMainData = async (props) => {
  const { setData, history, pageNumber, id, setImgData, imgIndx } = props;
  const agileEngineToken = getCookie('agileEngineUser');
  try {
    if (agileEngineToken) {
      const { data } = await getData(agileEngineToken, pageNumber, id);
      id
        ? setImgData({ data, imgIndx })
        : setData((prevData) => setDataInfo(prevData, data));
    } else {
      const { token } = await refreshToken();
      const { data } = await getData(token, pageNumber, id);
      return id
        ? setImgData({ data, imgIndx })
        : setData((prevData) => setDataInfo(prevData, data));
    }
  } catch (error) {
    if (error.response.status === 401) {
      const { token } = await refreshToken();
      const { data } = await getData(token, pageNumber, id);
      return id
        ? setImgData({ data, imgIndx })
        : setData((prevData) => setDataInfo(prevData, data));
    }
    history.push('/error');
  }
};
