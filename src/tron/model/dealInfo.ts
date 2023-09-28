import {DealRole} from './dealRole';
import {DealState} from './dealState';
import {FeeInfo} from './feeInfo';

export type DealInfo = {
  id: number;
  createdAt: number;
  terms: string;
  maker: string;
  taker: string;
  arbiter: string;
  token: string;
  amount: number;
  totalAmount: number;
  feeInfo: FeeInfo;
  state: DealState;
  role?: DealRole;
};
