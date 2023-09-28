import React from 'react';
import NoInternetIcon from './icons/NoInternetIcon';
import ServerErrorIcon from './icons/serverErrorIcon';
import SomethingWentWrongIcon from './icons/SomethingWentWrongIcon';
import NoFoundErrorIcon from './icons/NoFoundErrorIcon';
import ArbiterWaitingStateIcon from './icons/state/ArbiterWaitingStateIcon';
import InReviewStateIcon from './icons/state/InReviewStateIcon';
import TakerWaitingStateIcon from './icons/state/TakerWaitingStateIcon';
import WalletIcon from './icons/WalletIcon';
import DoneStateIcon from './icons/state/DoneStateIcon';
import InDisputeStateIcon from './icons/state/InDisputeStateIcon';
import InProgressStateIcon from './icons/state/InProgressStateIcon';
import CanceledStateIcon from './icons/state/CanceledStateIcon';
import ResolvedStateIcon from './icons/state/ResolvedStateIcon';
import {PageStatusesEnum} from './components/common/PageStatuses/pageStatuses.types';
import {DealState} from './tron/model/dealState';

export const DealStateIcons = {
  [DealState.TakerWaiting]: <TakerWaitingStateIcon />,
  [DealState.ArbiterWaiting]: <ArbiterWaitingStateIcon />,
  [DealState.InProgress]: <InProgressStateIcon />,
  [DealState.InReview]: <InReviewStateIcon />,
  [DealState.InDispute]: <InDisputeStateIcon />,
  [DealState.Done]: <DoneStateIcon />,
  [DealState.Resolved]: <ResolvedStateIcon />,
  [DealState.Canceled]: <CanceledStateIcon />,
};

export const PageStatusIcons = {
  [PageStatusesEnum.noInternet]: <NoInternetIcon />,
  [PageStatusesEnum.serverError]: <ServerErrorIcon />,
  [PageStatusesEnum.somethingWrong]: <SomethingWentWrongIcon />,
  [PageStatusesEnum.notFound]: <NoFoundErrorIcon />,
  [PageStatusesEnum.connectWallet]: <WalletIcon />,
};

export const PageStatusText = {
  [PageStatusesEnum.noInternet]: {
    topText: 'pageStatus.noInternet.topText',
    bottomText: 'pageStatus.noInternet.bottomText',
  },
  [PageStatusesEnum.serverError]: {
    topText: 'pageStatus.serverError.topText',
    bottomText: 'pageStatus.serverError.bottomText',
  },
  [PageStatusesEnum.somethingWrong]: {
    topText: 'pageStatus.somethingWrong.topText',
    bottomText: 'pageStatus.somethingWrong.bottomText',
  },
  [PageStatusesEnum.notFound]: {
    topText: 'pageStatus.notFound.topText',
    bottomText: 'pageStatus.notFound.bottomText',
  },
  [PageStatusesEnum.connectWallet]: {
    topText: 'pageStatus.connectWallet.topText',
    bottomText: 'pageStatus.connectWallet.bottomText',
  },
};

export type ColumnType = {
  readonly name: string;
  readonly style: React.CSSProperties;
};

export const TABLE_COLUMN: ColumnType[] = [
  {name: 'tableColumn.dateTime', style: {width: '20%'}},
  {name: 'tableColumn.id', style: {width: '20%'}},
  {name: 'tableColumn.role', style: {width: '20%'}},
  {name: 'tableColumn.amount', style: {width: '20%', textAlign: 'right'}},
  {name: 'tableColumn.status', style: {width: '20%'}},
];
