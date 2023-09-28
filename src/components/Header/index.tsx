import React, {FC, useCallback} from 'react';
import {useI18n} from '../../i18n';
import {useUiStore} from '../../store/uiStore';
import styles from './styles.module.scss';
import LogoIcon from '../../icons/LogoIcon';
import DealsButton from '../../components/common/DealsButton';
import Suitcase from '../../icons/Suitcase';
import Link from 'next/link';
import Button from '../../components/common/Button';
import {AuthModal} from '../common/AuthModal';
import Notification from '../../components/common/Notification';
import DropdownUserInformation from '../../components/common/DropdownUserInformation';
import {ButtonTypes} from '../common/Button/button.types';
import {useCryptoStore} from '../../store/cryptoStore';
import USDIcon from '../../icons/USDCIcon';
import EtheriumIcon from '../../icons/EtheriumIcon';
import ArrowIcon from '../../icons/ArrowIcon';
import ResponsiveWalletIcon from '../../icons/ResponsiveWalletIcon';

const Header: FC = () => {
  const i18n = useI18n();
  const isWalletConnected = useCryptoStore(state => !!state.profile.address);
  const {isAuthModalOpen, openAuthModal, closeAuthModal} = useUiStore(
    state => state,
  );

  const toggleModal = useCallback(
    () => (isAuthModalOpen ? closeAuthModal() : openAuthModal()),
    [isAuthModalOpen],
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.leftSide}>
          <Link href={'/'}>
            <LogoIcon />
            <h1>Ascro</h1>
          </Link>
          <div className={styles.deals}>
            <DealsButton href={'/'}>
              <Suitcase />
              {i18n.t('common.deals')}
            </DealsButton>
          </div>
        </div>
        <div className={styles.rightSide}>
          {isWalletConnected ? (
            <div style={{display: 'flex', flexDirection: 'row', gap: '8px'}}>
              <Notification />
              <DropdownUserInformation />
            </div>
          ) : (
            <>
              <div className={styles['rightSide__dropdown']}>
                <div className={styles['rightSide__dropdown--icon']}>
                  <div>
                    <USDIcon />
                  </div>
                  <div className={styles['rightSide__dropdown--eth']}>
                    <EtheriumIcon />
                  </div>
                </div>
                <div className={styles['rightSide__dropdown--currency']}>
                  <Button buttonColor={ButtonTypes.gray}>
                    <span>USDC</span>
                  </Button>
                  <Button buttonColor={ButtonTypes.dark}>
                    <span>Ethereum</span>
                  </Button>
                  <Button buttonColor={ButtonTypes.dark}>
                    <ArrowIcon />
                  </Button>
                </div>
              </div>
              <div className={styles.connectWallet}>
                <Button buttonColor={ButtonTypes.lilac} onClick={toggleModal}>
                  {i18n.t('common.connectWallet')}
                </Button>
              </div>
              <div
                className={styles.connectWalletResponsive}
                onClick={toggleModal}>
                <ResponsiveWalletIcon />
              </div>
            </>
          )}
        </div>
      </header>
      {isAuthModalOpen && <AuthModal closeModalFn={toggleModal} />}
    </>
  );
};

export default Header;
