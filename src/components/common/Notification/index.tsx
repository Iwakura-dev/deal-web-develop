import classNames from 'classnames';
import React, {useState, FC, useRef, useMemo} from 'react';
import {useI18n} from '../../../i18n';
import NotificationIcon from '../../../icons/NotificationIcon';
import {useCryptoStore} from '../../../store/cryptoStore';
import NotificationItem from './NotificationItem';
import styles from './styles.module.scss';
import {useOutsideClick} from '../../../common/hooks';

const Notification: FC = () => {
  const i18n = useI18n();
  const [showList, setShowList] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const {notificationList} = useCryptoStore(state => state);
  useOutsideClick(wrapperRef, () => setShowList(false));

  const toggleList = () => {
    setShowList(!showList);
  };

  const unreadNotificationList = useMemo(
    () => notificationList.filter(({read}) => !read),
    [notificationList],
  );

  return (
    <div ref={wrapperRef} className={styles.notificationContainer}>
      <div
        className={classNames(styles.notificationButton, {
          [styles.active]: showList,
        })}
        onClick={toggleList}>
        <NotificationIcon height={'19px'} width={'17px'} />
      </div>

      {showList && (
        <div className={styles.notificationList}>
          <div className={styles.header}>
            <h3 className={styles.title}>{i18n.t('notification.title')}</h3>
            <span className={styles.amount}>
              ({unreadNotificationList.length})
            </span>
          </div>
          {unreadNotificationList.map(notification => {
            return (
              <NotificationItem {...notification} key={notification.trxId} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notification;
