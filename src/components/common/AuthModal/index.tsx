import React, {useCallback, useEffect} from 'react';
import {useTronWebService} from '../../../common/hooks';
import {useI18n} from '../../../i18n';
import TronLink from '../../../icons/TronLink';
import {useCryptoStore} from '../../../store/cryptoStore';
import {useUiStore} from '../../../store/uiStore';
import {Portal} from '../Portal';
import styles from './styles.module.scss';
import TelegramWalletIcon from '../../../icons/TelegramWalletIcon';
import TrustWalletIcon from '../../../icons/TrustWalletIcon';
import LedgerIcon from '../../../icons/LedgerIcon';
import ErrorIcon from '../../../icons/ErrorIcon';
interface AuthModalProps {
  closeModalFn: VoidFunction;
}

export const AuthModal = ({closeModalFn}: AuthModalProps) => {
  const i18n = useI18n();
  const {setProfile} = useCryptoStore(state => state);
  const {errorMessage, setErrorMessage, clearErrorMessage} = useUiStore(
    state => state,
  );
  const tronWebService = useTronWebService();

  useEffect(() => {
    return () => {
      clearErrorMessage();
    };
  }, []);

  const onConnect = useCallback(async () => {
    if (tronWebService) {
      try {
        const address = tronWebService.getDefaultAddress();
        const balance = await tronWebService.getBalanceAndConvert();

        setProfile({
          address: address,
          balance: balance,
          network: null,
        });

        closeModalFn();
      } catch (e) {
        setErrorMessage(i18n.t('common.connectionError'));
      }
    } else {
      setErrorMessage(i18n.t('common.extensionError'));
    }
  }, [tronWebService]);

  return (
    <>
      <Portal overlayClickFn={closeModalFn}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <p className={styles.title}>
              {i18n.t('common.connectWalletTitle')}
            </p>
          </div>
          {errorMessage && (
            <div className={styles.errorBlock}>
              <ErrorIcon />
              <span>{errorMessage}</span>
            </div>
          )}
          <div className={styles.linkIcon} onClick={onConnect}>
            <TronLink />
            <span>
              <b>TronLink</b>
            </span>
          </div>
          <div className={styles.linkIcon} onClick={onConnect}>
            <TelegramWalletIcon />
            <span>
              <b>Telegram Wallet</b>
            </span>
          </div>
          <div className={styles.linkIcon} onClick={onConnect}>
            <TrustWalletIcon />
            <span>
              <b>Trust Wallet</b>
            </span>
          </div>
          <div className={styles.linkIcon} onClick={onConnect}>
            <LedgerIcon />
            <span>
              <b>Ledger</b>
            </span>
          </div>
          <div className={styles.closeModal}>
            <button type="button" onClick={closeModalFn}>
              Отмена
            </button>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default AuthModal;
