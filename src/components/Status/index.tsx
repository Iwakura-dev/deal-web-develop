import {PageStatusesEnum} from '../common/PageStatuses/pageStatuses.types';
import PageStatus from '../../components/common/PageStatuses';
import styles from './styles.module.scss';

type StatusProps = {
  status: PageStatusesEnum;
};

export default function Status({status}: StatusProps) {
  return (
    <div className={styles.container}>
      <PageStatus status={status} />
    </div>
  );
}
