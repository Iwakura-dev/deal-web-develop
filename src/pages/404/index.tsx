import {PageStatusesEnum} from '../../components/common/PageStatuses/pageStatuses.types';
import Status from '../../components/Status';

export default function Custom404() {
  return <Status status={PageStatusesEnum.notFound} />;
}
