import React from 'react';
import {useI18n} from '../../../i18n';

import {Portal} from '../Portal';
import styles from './styles.module.scss';

interface ConfirmModalProps {
  isOpen: boolean;
  closeModalFn: () => void;
  confirmModalFn: () => void;
  confirmText: string;
}

export const ConfirmModal = ({
  isOpen,
  confirmModalFn,
  closeModalFn,
  confirmText,
}: ConfirmModalProps) => {
  const i18n = useI18n();
  return isOpen ? (
    <Portal overlayClickFn={closeModalFn}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <p className={styles.title}>{confirmText}</p>
        <div className={styles.buttonsBlock}>
          <button onClick={confirmModalFn}>
            {i18n.t('modal.confirmButton')}
          </button>
          <button onClick={closeModalFn}>{i18n.t('modal.closeButton')}</button>
        </div>
      </div>
    </Portal>
  ) : null;
};
