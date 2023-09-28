import {format, fromUnixTime} from 'date-fns';
import en_US from 'date-fns/locale/en-US';
import {DealRole} from '../tron/model/dealRole';
import {DealState} from '../tron/model/dealState';

export const amountFormatter = (amount: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    useGrouping: true,
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
};

export const dateFromEpochFormatter = (
  epochTime: number,
  pattern = 'MM/dd/yyyy, hh:mm b',
): string => {
  return dateFormatter(fromUnixTime(epochTime), pattern);
};

export const dateFormatter = (
  date: Date,
  pattern = 'MM/dd/yyyy, hh:mm b',
): string => {
  return format(date, pattern, {locale: en_US});
};

const dealStateLabelsMap = new Map<DealState, string>([
  [DealState.TakerWaiting, 'dealState.takerWaiting'],
  [DealState.ArbiterWaiting, 'dealState.arbiterWaiting'],
  [DealState.InProgress, 'dealState.inProgress'],
  [DealState.InReview, 'dealState.inReview'],
  [DealState.InDispute, 'dealState.inDispute'],
  [DealState.Done, 'dealState.done'],
  [DealState.Resolved, 'dealState.resolved'],
  [DealState.Canceled, 'dealState.canceled'],
]);

export const dealStateFormatter = (
  dealState: DealState,
): string | undefined => {
  return dealStateLabelsMap.get(dealState);
};

const dealRoleLabelsMap = new Map<DealRole, string>([
  [DealRole.Maker, 'role.maker'],
  [DealRole.Taker, 'role.taker'],
  [DealRole.Arbiter, 'role.arbiter'],
]);

export const dealRoleFormatter = (dealRole: DealRole): string | undefined => {
  return dealRoleLabelsMap.get(dealRole);
};

const eventNameNotificationMessageMap = new Map<string, string>([
  ['TakerWaiting', 'notificationMessage.takerWaiting'],
  ['ArbiterWaiting', 'notificationMessage.arbiterWaiting'],
  ['InProgress', 'notificationMessage.inProgress'],
  ['InReview', 'notificationMessage.inReview'],
  ['InDispute', 'notificationMessage.inDispute'],
  ['Done', 'notificationMessage.done'],
  ['Resolved', 'notificationMessage.resolved'],
  ['Canceled', 'notificationMessage.canceled'],
]);

export const eventMessageFormatter = (
  eventName: string,
): string | undefined => {
  return eventNameNotificationMessageMap.get(eventName);
};

const eventNameDealStateMap = new Map<string, DealState>([
  ['TakerWaiting', DealState.TakerWaiting],
  ['ArbiterWaiting', DealState.ArbiterWaiting],
  ['InProgress', DealState.InProgress],
  ['InReview', DealState.InReview],
  ['InDispute', DealState.InDispute],
  ['Done', DealState.Done],
  ['Resolved', DealState.Resolved],
  ['Canceled', DealState.Canceled],
]);

export const dealStateFromEventNameFormatter = (
  eventName: string,
): DealState | undefined => {
  return eventNameDealStateMap.get(eventName);
};

export const shortenStringFormatter = (str: string): string => {
  if (str.length <= 10) {
    return str;
  }

  const prefix = str.slice(0, 6);
  const suffix = str.slice(-4);

  return `${prefix}...${suffix}`;
};
