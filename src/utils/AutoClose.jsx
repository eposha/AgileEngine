import React, { useEffect, useRef, useCallback } from 'react';

const AutoClose = (props) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  });

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  useEffect(() => {
    if (props.isScroll) {
      document.body.style.overflow = 'hidden';
    }
    return () => (document.body.style.overflow = 'visible');
  }, [props.isScroll]);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      props.handleClose(false);
    }
  }, []);

  const handleClickOutside = useCallback((event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      props.handleClose(false);
    }
  });

  return <div ref={wrapperRef}>{props.render()}</div>;
};

export default AutoClose;
