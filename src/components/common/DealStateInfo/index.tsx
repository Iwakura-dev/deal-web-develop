import React, {FC} from 'react';
import {dealStateFormatter} from '../../../common/formatters';
import {useI18n} from '../../../i18n';
import {DealState} from '../../../tron/model/dealState';
import styles from './styles.module.scss';
import classNames from 'classnames';
import {DealStateIcons} from '../../../constants';

interface DealStateInfoProps {
  value: DealState;
}

const DealStateInfo: FC<DealStateInfoProps> = ({value}) => {
  const i18n = useI18n();

  const dealStateKey = dealStateFormatter(value);

  return (
    <div
      className={classNames(styles.status, {
        [styles.takerWaiting]: value === DealState.TakerWaiting,
        [styles.arbiterWaiting]: value === DealState.ArbiterWaiting,
        [styles.inProgress]: value === DealState.InProgress,
        [styles.inReview]: value === DealState.InReview,
        [styles.inDispute]: value === DealState.InDispute,
        [styles.done]: value === DealState.Done,
        [styles.resolved]: value === DealState.Resolved,
        [styles.canceled]: value === DealState.Canceled,
      })}>
      {DealStateIcons[value]}
      {dealStateKey && i18n.t(dealStateKey)}
    </div>
  );
};

export default DealStateInfo;
