import {useRouter} from 'next/router';
import React, {useCallback} from 'react';
import {dateFromEpochFormatter} from '../../../../common/formatters';
import {useI18n} from '../../../../i18n';
import {useCryptoStore} from '../../../../store/cryptoStore';
import {NotificationState} from '../../../../store/cryptoStore.types';
import styles from './styles.module.scss';

type NotificationProps = NotificationState;

const NotificationItem = ({
  dealId,
  trxId,
  type,
  title,
  date,
}: NotificationProps) => {
  const router = useRouter();
  const i18n = useI18n();
  const {readNotification} = useCryptoStore(state => state);

  const onClickHandler = useCallback(() => {
    router.push(`/${dealId}/information`);
    readNotification(trxId, type);
  }, [dealId, trxId, type]);

  return (
    <div className={styles.notificationItem} onClick={() => onClickHandler()}>
      <h4 className={styles.title}>{`${i18n.t(title)} (ID: ${dealId})`}</h4>
      <h5 className={styles.date}>{dateFromEpochFormatter(date)}</h5>
    </div>
  );
};

export default NotificationItem;
