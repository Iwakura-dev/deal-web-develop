import type {AppProps} from 'next/app';
import Head from 'next/head';
import React from 'react';
import {useHasMounted} from '../common/hooks';
import {Loader} from '../components/common/Loader';
import Content from '../components/Content';

import Header from '../components/Header';
import styles from '../styles/app.module.scss';
import '../styles/globals.scss';
import {TronWebServiceProvider} from '../tron/tronWebServiceProvider';

export default function App(props: AppProps) {
  const hasMounted = useHasMounted();

  if (!hasMounted) return <Loader />;

  return (
    <>
      <Head>
        <title>Ascro</title>
        <meta name="description" content="Ascro" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className={styles.container}>
        <div className={styles.content}>
          <TronWebServiceProvider>
            <Header />
            <Content {...props} />
          </TronWebServiceProvider>
        </div>
      </div>
    </>
  );
}
