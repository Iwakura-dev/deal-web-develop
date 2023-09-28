import React, {FC} from 'react';
import {
  amountFormatter,
  dateFromEpochFormatter,
  dealRoleFormatter,
} from '../../../common/formatters';
import {useI18n} from '../../../i18n';
import {DealInfo} from '../../../tron/model/dealInfo';
import styles from './styles.module.scss';
import {useRouter} from 'next/router';
import DealStateInfo from '../DealStateInfo';

interface RowProps {
  dealInfo: DealInfo;
}

const Row: FC<RowProps> = ({dealInfo}) => {
  const router = useRouter();
  const i18n = useI18n();
  const onClickHandler = (id: number) => {
    router.push(`/${id}/information`);
  };

  const dealRoleKey =
    dealInfo.role !== undefined ? dealRoleFormatter(dealInfo.role) : undefined;

  const dealRole = dealRoleKey ? i18n.t(dealRoleKey) : undefined;

  return (
    <tr className={styles.row} onClick={() => onClickHandler(dealInfo.id)}>
      <td>{dateFromEpochFormatter(dealInfo.createdAt)}</td>
      <td>{dealInfo.id}</td>
      <td>{dealRole ?? '-'}</td>
      <td style={{textAlign: 'right'}}>{amountFormatter(dealInfo.amount)}</td>
      <td>
        <DealStateInfo value={dealInfo.state} />
      </td>
    </tr>
  );
};

export default Row;
