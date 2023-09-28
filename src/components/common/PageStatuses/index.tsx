import React, {FC} from 'react';
import {PageStatusIcons, PageStatusText} from '../../../constants';
import {useI18n} from '../../../i18n';
import {useUiStore} from '../../../store/uiStore';
import {PageStatusesEnum} from './pageStatuses.types';
import styles from './styles.module.scss';
import {ButtonTypes} from '../Button/button.types';
import Button from '../Button';

interface PageStatusesProps {
  status: PageStatusesEnum;
}

const PageStatus: FC<PageStatusesProps> = ({status}) => {
  const i18n = useI18n();
  const {openAuthModal} = useUiStore(state => state);

  return (
    <div className={styles.status}>
      <div
        className={
          status === PageStatusesEnum.notFound ? styles.notFound : styles.image
        }>
        {PageStatusIcons[status]}
      </div>
      <h2>{i18n.t(PageStatusText[status].topText)}</h2>
      <p>{i18n.t(PageStatusText[status].bottomText)}</p>
      {status === PageStatusesEnum.connectWallet && (
        <Button buttonColor={ButtonTypes.gray} onClick={openAuthModal}>
          {i18n.t('pageStatus.connectWallet.button')}
        </Button>
      )}
    </div>
  );
};

export default PageStatus;
