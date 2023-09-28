import React, {useCallback, useContext, useEffect, useState} from 'react';
import {config} from '../../config';
import TronWebService from '../tron/tronWebService';
import {TronWebServiceContext} from '../tron/tronWebServiceProvider';

export const useOutsideClick = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: VoidFunction,
) => {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !ref.current?.contains(e.target)) {
        callback();
      }
    },
    [ref],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
};

export const useTronWebService = () => {
  const {ready, tronWebService, setReady, setService} = useContext(
    TronWebServiceContext,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.tronWeb && window.tronWeb.ready) {
        console.info('TronWeb is ready');
        setReady?.();
        clearInterval(interval);
      } else {
        console.info('TronWeb is NOT ready');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (ready && !tronWebService) {
      console.info('Init tronWeb service');
      setService?.(
        new TronWebService(config.tronContractAddress, config.tronTokenAddress),
      );
    }
  }, [ready, tronWebService]);

  return tronWebService;
};

export const useEndlessRepeater = (
  intervalMs: number,
  callback: () => void,
  onCleanCallback?: () => void,
) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      callback();
    }, intervalMs);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      onCleanCallback?.();
    };
  }, [intervalMs, callback]);
};

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export interface EventRoot {
  data: EventRootData;
}

export interface EventRootData {
  message: EventMessage;
}

export interface EventMessage {
  action:
    | 'tabReply'
    | 'setAccount'
    | 'setNode'
    | 'connect'
    | 'disconnect'
    | 'accountsChanged'
    | 'connectWeb'
    | 'acceptWeb'
    | 'disconnectWeb'
    | 'rejectWeb';
  data: WebEventData | AccountsChangedEventData | never;
}

export interface WebEventData {
  websiteName: string;
  websiteIcon: string;
  origin: string;
  hostname: string;
}

export interface AccountsChangedEventData {
  address: string;
}

export const isAccountsChangedEventData = (
  data: EventMessage['data'],
): data is AccountsChangedEventData => {
  return data && Object.hasOwn(data, 'address');
};

export const useTronEventListenerEffect = (
  action: EventMessage['action'],
  handleEvent: (message: EventMessage) => void,
  deps: readonly unknown[],
) => {
  const handler = useCallback(
    (e: Event & EventRoot) => {
      if (e?.data?.message && e.data.message.action == action) {
        handleEvent(e.data.message);
      }
    },
    [action, handleEvent],
  );

  useEffect(() => {
    window.addEventListener('message', handler);

    return () => {
      window.removeEventListener('message', handler);
    };
  }, deps);
};
