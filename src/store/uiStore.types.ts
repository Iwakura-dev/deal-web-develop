export enum ModalAction {
  VOID,
  APPROVE_DEAL_BY_TAKER,
  APPROVE_DEAL_BY_ARBITER,
  CANCEL_DEAL,
  RELEASE_DEAL,
  SEND_DEAL_TO_REVIEW,
  SEND_DEAL_TO_DISPUTE,
}

export type IUiStore = {
  // Auth Modal
  isAuthModalOpen: boolean;
  openAuthModal: VoidFunction;
  closeAuthModal: VoidFunction;
  // Confirm Modal
  isConfirmModalOpen: boolean;
  confirmModalAction: ModalAction;
  confirmModalMessage?: string;
  triggerConfirmModal: (message: string, action: ModalAction) => void;
  closeConfirmModal: VoidFunction;
  // Error
  errorMessage?: string;
  setErrorMessage: (error: string) => void;
  clearErrorMessage: VoidFunction;
};
