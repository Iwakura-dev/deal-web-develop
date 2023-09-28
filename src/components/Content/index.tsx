import {AppProps} from 'next/app';
import React, {useCallback, useEffect, useState} from 'react';
import {
  isAccountsChangedEventData,
  useEndlessRepeater,
  useTronEventListenerEffect,
  useTronWebService,
} from '../../common/hooks';
import {useCryptoStore} from '../../store/cryptoStore';
import {PageStatusesEnum} from '../common/PageStatuses/pageStatuses.types';
import Status from '../Status';

type ContentProps = AppProps;
export default function Content({Component, pageProps}: ContentProps) {
  const tronWebService = useTronWebService();
  const {addOrReplaceNotification, setProfile, resetProfile} = useCryptoStore();
  const [isOnline, setOnline] = useState(true);
  const isWalletConnected = useCryptoStore(state => !!state.profile.address);

  const watchContractNotifications = useCallback(async () => {
    if (tronWebService && isOnline && isWalletConnected) {
      const recipient = tronWebService.getDefaultHexAddress();
      const notifications = await tronWebService.getLatestNotifications();
      notifications.forEach(notification => {
        if (notification.recipient === recipient) {
          addOrReplaceNotification(notification);
        }
      });
    }
  }, [tronWebService, isOnline, isWalletConnected]);

  useEffect(() => {
    void watchContractNotifications();
  }, [watchContractNotifications]);

  useEndlessRepeater(3000, () => {
    void watchContractNotifications();
  });

  useTronEventListenerEffect(
    'accountsChanged',
    event => {
      if (isAccountsChangedEventData(event.data) && event.data.address) {
        setProfile({address: event.data.address, balance: null, network: null});
      }
    },
    [],
  );

  useTronEventListenerEffect(
    'disconnectWeb',
    () => {
      resetProfile();
    },
    [],
  );

  useEffect(() => {
    setOnline(navigator.onLine);

    window.addEventListener('online', () => {
      setOnline(true);
    });

    window.addEventListener('offline', () => {
      setOnline(false);
      resetProfile();
    });
  }, []);

  if (!isOnline) return <Status status={PageStatusesEnum.noInternet} />;

  return (
    <>
      {isOnline ? (
        <Component {...pageProps} />
      ) : (
        <Status status={PageStatusesEnum.noInternet} />
      )}
    </>
  );
}
