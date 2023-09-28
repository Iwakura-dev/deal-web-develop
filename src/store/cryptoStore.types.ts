import {DealInfo} from '../tron/model/dealInfo';
import {DealRole} from '../tron/model/dealRole';
import {DealState} from '../tron/model/dealState';
import TronWebService from '../tron/tronWebService';
import {LoadingState} from './cryptoStore';

export type ProfileState = {
  address: string | null;
  balance: number | null;
  network: string | null;
};

export type DealInfoState = DealInfo;

export type NotificationState = {
  type: DealState;
  dealId: number;
  title: string;
  recipient: string;
  date: number;
  trxId: string;
  read: boolean;
  // Only for resolved event
  amount?: number;
  amountToTaker?: number;
  // Only for canceled event
  role?: DealRole;
  initiatorAddress?: string;
};

export type ProfileSlice = {
  profile: ProfileState;
  setProfile: (profile: ProfileState) => void;
  resetProfile: () => void;
};

export type DealInfoSlice = {
  dealInfo: DealInfoState | null;
  dealInfoLoadingState: LoadingState;
  fetchDealInfo: (
    payload: {id: number},
    tronWebService: TronWebService,
  ) => void;
  silentUpdateDealInfo: (
    payload: {id: number},
    tronWebService: TronWebService,
  ) => void;
  approveDealByTaker: (
    payload: {id: number},
    tronWebService: TronWebService,
  ) => void;
  approveDealByArbiter: (
    payload: {id: number},
    tronWebService: TronWebService,
  ) => void;
  cancelDeal: (payload: {id: number}, tronWebService: TronWebService) => void;
  releaseDeal: (payload: {id: number}, tronWebService: TronWebService) => void;
  toDisputeDeal: (
    payload: {id: number},
    tronWebService: TronWebService,
  ) => void;
  toReviewDeal: (payload: {id: number}, tronWebService: TronWebService) => void;
  createDealInfoLoadingState: LoadingState;
  createDealInfo: (
    payload: {
      takerAddress: string;
      arbiterAddress: string;
      amount: number;
      arbiterFeeInNormal: number;
      arbiterFeeInDispute: number;
      totalAmount: number;
      terms: string;
    },
    tronWebService: TronWebService,
    fulfilledCallback?: (payload?: number) => void,
    failedCallback?: VoidFunction,
  ) => void;
  setDealInfo: (dealInfo: DealInfoState) => void;
  resetDealInfo: () => void;
};

export type DealListSlice = {
  dealInfoListLoadingState: LoadingState;
  dealInfoList: DealInfoState[];
  dealInfoTotalCount: number;
  dealInfoLimit: number;
  dealInfoOffset: number;
  setDealInfoOffset: (offset: number) => void;
  fetchDealInfoList: (
    tronWebService: TronWebService,
    limit: number,
    offset: number,
  ) => void;
  silentUpdateDealInfoList: (
    tronWebService: TronWebService,
    limit: number,
    offset: number,
  ) => void;
  setDealList: (dealList: DealInfoState[]) => void;
};

export type NotificationSlice = {
  notificationList: NotificationState[];
  addNotification: (notification: NotificationState) => void;
  addOrReplaceNotification: (notification: NotificationState) => void;
  readNotification: (trxId: string, type: DealState) => void;
};

export type ICryptoStore = ProfileSlice &
  DealInfoSlice &
  DealListSlice &
  NotificationSlice;
