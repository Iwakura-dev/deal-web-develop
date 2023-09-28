import {create, StoreApi, UseBoundStore} from 'zustand';
import {devtools} from 'zustand/middleware';
import {StoreMutatorIdentifier} from 'zustand/vanilla';

import {IUiStore, ModalAction} from './uiStore.types';

const initialStates = {
  isAuthModalOpen: false,
  isConfirmModalOpen: false,
  confirmModalAction: ModalAction.VOID,
};

export const useUiStore: UseBoundStore<StoreApi<IUiStore>> = create<
  IUiStore,
  [StoreMutatorIdentifier, unknown][]
>(
  devtools<IUiStore>(set => ({
    isAuthModalOpen: initialStates.isAuthModalOpen,
    openAuthModal: () => set({isAuthModalOpen: true}),
    closeAuthModal: () => set({isAuthModalOpen: false}),
    isConfirmModalOpen: initialStates.isConfirmModalOpen,
    confirmModalAction: initialStates.confirmModalAction,
    triggerConfirmModal: (message, action) => {
      set({
        confirmModalMessage: message,
        confirmModalAction: action,
        isConfirmModalOpen: true,
      });
    },
    closeConfirmModal: () => {
      set({
        confirmModalMessage: undefined,
        confirmModalAction: ModalAction.VOID,
        isConfirmModalOpen: false,
      });
    },
    setErrorMessage: (message: string) => set({errorMessage: message}),
    clearErrorMessage: () => set({errorMessage: undefined}),
  })),
);
