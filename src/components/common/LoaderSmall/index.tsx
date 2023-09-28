import React from 'react';
import Loading from '../../../icons/Loading';
import styles from './styles.module.scss';

export const LoaderSmall = () => {
  return (
    <div className={styles.container}>
      <Loading />
    </div>
  );
};
