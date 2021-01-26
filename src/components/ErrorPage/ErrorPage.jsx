import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

const ErrorPage = ({ notFound }) => {
  const message = notFound
    ? 'This page not found'
    : 'Something was gonna wrong';

  return (
    <div className={styles.errorPage}>
      <span className={styles.errorIcon}>
        {notFound ? (
          <i className='fas fa-blind' />
        ) : (
          <i className='fas fa-exclamation-triangle' />
        )}
      </span>
      <div className={styles.title}>Error</div>
      <div className={styles.message}>{message}</div>
      <div className={styles.goBack}>
        <Link to='/'>Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
