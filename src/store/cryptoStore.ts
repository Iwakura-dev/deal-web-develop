import {create, StateCreator, StoreApi, UseBoundStore} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import {StoreMutatorIdentifier} from 'zustand/vanilla';
import {DealState} from '../tron/model/dealState';
import {
  ProfileState,
  ProfileSlice,
  ICryptoStore,
  DealInfoSlice,
  DealInfoState,
  DealListSlice,
  NotificationSlice,
  NotificationState,
} from './cryptoStore.types';

export enum LoadingState {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

const initialStates = {
  profile: {address: null, balance: null, network: null},
  dealInfoLoadingState: LoadingState.IDLE,
  dealInfo: null,
  dealInfoListLoadingState: LoadingState.IDLE,
  dealList: [],
  dealInfoTotalCount: 0,
  dealInfoLimit: 7,
  dealInfoOffset: 0,
  createDealInfoLoadingState: LoadingState.IDLE,
  notificationList: [],
};

const createProfileSlice: StateCreator<
  ProfileSlice,
  [],
  [StoreMutatorIdentifier, unknown][]
> = persist(
  set => ({
    profile: initialStates.profile,
    setProfile: (profile: ProfileState) => set({profile}),
    resetProfile: () =>
      set({profile: {address: null, balance: null, network: null}}),
  }),
  {
    name: 'profile',
    storage: createJSONStorage<ProfileState>(() => sessionStorage),
  },
);

const createDealInfoSlice: StateCreator<DealInfoSlice> = set => ({
  dealInfo: initialStates.dealInfo,
  dealInfoLoadingState: initialStates.dealInfoLoadingState,
  fetchDealInfo: async ({id}, tronWebService) => {
    try {
      set({dealInfoLoadingState: LoadingState.PENDING});
      const dealInfo = await tronWebService.getDeal(id);
      set({dealInfoLoadingState: LoadingState.SUCCEEDED, dealInfo});
    } catch (error) {
      set({dealInfoLoadingState: LoadingState.FAILED});
    }
  },
  silentUpdateDealInfo: async ({id}, tronWebService) => {
    try {
      const dealInfo = await tronWebService.getDeal(id);
      set(state => {
        if (!state.dealInfo || dealInfo.state === state.dealInfo?.state) {
          return state;
        }
        return {dealInfo};
      });
    } catch (error) {
      console.error(error);
    }
  },
  approveDealByTaker: async ({id}, tronWebService) => {
    try {
      set({dealInfoLoadingState: LoadingState.PENDING});
      await tronWebService.approveByTaker(id);
      set({dealInfoLoadingState: LoadingState.SUCCEEDED});
    } catch (error) {
      set({dealInfoLoadingState: LoadingState.FAILED});
    }
  },
  approveDealByArbiter: async ({id}, tronWebService) => {
    try {
      set({dealInfoLoadingState: LoadingState.PENDING});
      await tronWebService.approveByArbiter(id);
      set({dealInfoLoadingState: LoadingState.SUCCEEDED});
    } catch (error) {
      set({dealInfoLoadingState: LoadingState.FAILED});
    }
  },
  cancelDeal: async ({id}, tronWebService) => {
    try {
      set({dealInfoLoadingState: LoadingState.PENDING});
      await tronWebService.cancel(id);
      set({dealInfoLoadingState: LoadingState.SUCCEEDED});
    } catch (error) {
      set({dealInfoLoadingState: LoadingState.FAILED});
    }
  },
  releaseDeal: async ({id}, tronWebService) => {
    try {
      set({dealInfoLoadingState: LoadingState.PENDING});
      await tronWebService.releaseDeal(id);
      set({dealInfoLoadingState: LoadingState.SUCCEEDED});
    } catch (error) {
      set({dealInfoLoadingState: LoadingState.FAILED});
    }
  },
  toDisputeDeal: async ({id}, tronWebService) => {
    try {
      set({dealInfoLoadingState: LoadingState.PENDING});
      await tronWebService.toDispute(id);
      set({dealInfoLoadingState: LoadingState.SUCCEEDED});
    } catch (error) {
      set({dealInfoLoadingState: LoadingState.FAILED});
    }
  },
  toReviewDeal: async ({id}, tronWebService) => {
    try {
      set({dealInfoLoadingState: LoadingState.PENDING});
      await tronWebService.toReview(id);
      set({dealInfoLoadingState: LoadingState.SUCCEEDED});
    } catch (error) {
      set({dealInfoLoadingState: LoadingState.FAILED});
    }
  },
  createDealInfoLoadingState: initialStates.createDealInfoLoadingState,
  createDealInfo: async (
    {
      takerAddress,
      arbiterAddress,
      amount,
      arbiterFeeInNormal,
      arbiterFeeInDispute,
      totalAmount,
      terms,
    },
    tronWebService,
    fulfilledCallback,
    failedCallback,
  ) => {
    try {
      set({createDealInfoLoadingState: LoadingState.PENDING});
      const nextDealId = Date.now();
      await tronWebService.approveTokens(totalAmount);
      await tronWebService.createDeal(
        Date.now(),
        takerAddress,
        arbiterAddress,
        amount,
        arbiterFeeInNormal,
        arbiterFeeInDispute,
        terms,
      );
      fulfilledCallback?.(nextDealId);
      set({createDealInfoLoadingState: LoadingState.SUCCEEDED});
    } catch (error) {
      failedCallback?.();
      set({createDealInfoLoadingState: LoadingState.FAILED});
    }
  },
  setDealInfo: (dealInfo: DealInfoState) => set({dealInfo}),
  resetDealInfo: () => set({dealInfo: null}),
});

const createDealListSlice: StateCreator<DealListSlice> = set => ({
  dealInfoList: initialStates.dealList,
  dealInfoListLoadingState: initialStates.dealInfoListLoadingState,
  dealInfoTotalCount: initialStates.dealInfoTotalCount,
  dealInfoLimit: initialStates.dealInfoLimit,
  dealInfoOffset: initialStates.dealInfoOffset,
  setDealInfoOffset: (offset: number) => {
    set({dealInfoOffset: offset});
  },
  fetchDealInfoList: async (tronWebService, limit, offset) => {
    try {
      set({dealInfoListLoadingState: LoadingState.PENDING});
      const [dealInfoList, dealInfoTotalCount] = await Promise.all([
        await tronWebService.getDeals(
          tronWebService.getDefaultAddress(),
          limit,
          offset,
        ),
        await tronWebService.getDealsCount(tronWebService.getDefaultAddress()),
      ]);
      set(state => {
        const uniqueDealInfoList = Array.from(
          new Map(
            [...state.dealInfoList, ...dealInfoList].map(item => [
              item.id,
              item,
            ]),
          ).values(),
        );
        return {
          dealInfoListLoadingState: LoadingState.SUCCEEDED,
          dealInfoList: uniqueDealInfoList,
          dealInfoTotalCount,
        };
      });
    } catch (error) {
      set({dealInfoListLoadingState: LoadingState.FAILED});
    }
  },
  silentUpdateDealInfoList: async (tronWebService, limit, offset) => {
    try {
      const [dealInfoList, dealInfoTotalCount] = await Promise.all([
        await tronWebService.getDeals(
          tronWebService.getDefaultAddress(),
          limit,
          offset,
        ),
        await tronWebService.getDealsCount(tronWebService.getDefaultAddress()),
      ]);
      set(state => {
        const uniqueDealInfoList = Array.from(
          new Map(
            [...state.dealInfoList, ...dealInfoList].map(item => [
              item.id,
              item,
            ]),
          ).values(),
        );
        return {
          dealInfoList: uniqueDealInfoList,
          dealInfoTotalCount,
        };
      });
    } catch (error) {
      console.error(error);
    }
  },
  setDealList: (dealList: DealInfoState[]) => set({dealInfoList: dealList}),
});

const createNotificationSlice: StateCreator<NotificationSlice> = set => ({
  notificationList: initialStates.notificationList,
  addNotification: (notification: NotificationState) =>
    set(state => ({
      notificationList: [...state.notificationList, notification],
    })),
  addOrReplaceNotification: (notification: NotificationState) =>
    set(state => {
      const existAndRead = !!state.notificationList.find(
        value =>
          value.trxId === notification.trxId &&
          value.type === notification.type &&
          value.read,
      );

      if (existAndRead) return {notificationList: state.notificationList};

      return {
        notificationList: [
          ...state.notificationList.filter(
            value =>
              value.trxId !== notification.trxId &&
              value.type !== notification.type,
          ),
          notification,
        ],
      };
    }),
  readNotification: (trxId: string, type: DealState) =>
    set(state => {
      return {
        notificationList: state.notificationList.map(notification => {
          if (notification.trxId === trxId && notification.type === type) {
            notification.read = true;
          }
          return notification;
        }),
      };
    }),
});

export const useCryptoStore: UseBoundStore<StoreApi<ICryptoStore>> = create<
  ICryptoStore,
  [StoreMutatorIdentifier, unknown][]
>(
  devtools<ICryptoStore>((...rest) => ({
    ...createProfileSlice(...rest),
    ...createDealInfoSlice(...rest),
    ...createDealListSlice(...rest),
    ...createNotificationSlice(...rest),
  })),
);
