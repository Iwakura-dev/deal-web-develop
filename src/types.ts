import {
  TronWeb as TronWebTypes,
  default as TronWebSubTypes,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line import/no-unresolved
} from '@types/tronweb';

export type TronWeb = Omit<
  TronWebTypes,
  'transactionBuilder' | 'address' | 'trx' | 'utils'
> & {
  readonly ready: boolean;
  readonly transactionBuilder: TronWebSubTypes.transactionBuilder;
  readonly address: TronWebSubTypes.address;
  readonly trx: TronWebSubTypes.trx;
  readonly utils: TronWebSubTypes.utils;
};
