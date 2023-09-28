import React, {useState, FC, useRef} from 'react';
import {shortenStringFormatter} from '../../../common/formatters';
import {useOutsideClick} from '../../../common/hooks';
import {useI18n} from '../../../i18n';
import ArrowIcon from '../../../icons/ArrowIcon';
import {useCryptoStore} from '../../../store/cryptoStore';
import CopyButton from '../CopyButton';
import styles from './styles.module.scss';
import classNames from 'classnames';

const DropdownUserInformation: FC = () => {
  const i18n = useI18n();
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const {
    profile: {address, network},
    resetProfile,
  } = useCryptoStore();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(wrapperRef, () => setShowInfo(false));

  const toggleList = () => {
    setShowInfo(prev => !prev);
  };

  const disconnectWalletHandler = () => {
    resetProfile();
  };

  return (
    <div ref={wrapperRef} className={styles.profileInfo}>
      <div
        ref={buttonRef}
        className={classNames(styles.profileButton, {
          [styles.active]: showInfo,
        })}
        onClick={toggleList}>
        <div className={styles.profileHeader}>
          <span>{shortenStringFormatter(address || '')}</span>
          {showInfo ? (
            <ArrowIcon style={{transform: 'rotate(180deg)'}} />
          ) : (
            <ArrowIcon />
          )}
        </div>
      </div>

      {showInfo && (
        <div className={styles.profileInformationBlock}>
          <div className={styles.profileInfoRow}>
            <h4 className={styles.title}>{i18n.t('dropdown.wallet')}</h4>
            <div className={styles.addressBlock}>
              <span>{shortenStringFormatter(address ?? '')}</span>
              <CopyButton currentAccount={address ?? ''} />
            </div>
          </div>
          <div className={styles.profileInfoRow}>
            <h4 className={styles.title}>{i18n.t('dropdown.network')}</h4>
            <div className={styles.networkBlock}>
              <span className={styles.dot}></span>
              <span>{network ?? ''}</span>
            </div>
          </div>
          <button
            className={styles.disconnectWalletButton}
            onClick={disconnectWalletHandler}>
            {i18n.t('dropdown.disconnectWallet')}
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownUserInformation;
