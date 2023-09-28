import {
  NodeInfo,
  TronAccountResource,
  TronContract,
  TrxAccount,
  // eslint-disable-next-line import/no-unresolved
} from '@daochild/tronweb-typescript/src/typings/interfaces';
import BigNumber from 'bignumber.js';
import {subMinutes} from 'date-fns';
import {NotificationState} from '../store/cryptoStore.types';
import {ABI} from './contract/abi';
import {TOKEN_ABI} from './contract/tokenAbi';
import {DealInfo} from './model/dealInfo';
import {DealRole} from './model/dealRole';
import {DealState} from './model/dealState';
import {TronContractEvent} from './model/event';
import TronWebServiceMapper from './tronWebServiceMapper';

class TronWebService {
  private contract?: TronContract;
  private tokenContract?: TronContract;
  private mapper = new TronWebServiceMapper();
  constructor(
    private readonly contractAddress: string,
    private readonly tokenAddress: string,
  ) {}

  getContract = async (): Promise<TronContract> => {
    if (this.contract) {
      return this.contract;
    }

    this.contract = window.tronWeb.contract(ABI, this.contractAddress);

    return this.contract as TronContract;
  };

  getTokenContract = async (): Promise<TronContract> => {
    if (this.tokenContract) {
      return this.tokenContract;
    }

    this.tokenContract = window.tronWeb.contract(TOKEN_ABI, this.tokenAddress);

    return this.tokenContract as TronContract;
  };

  getDefaultAddress = (): string => {
    return window.tronWeb.defaultAddress.base58;
  };

  getDefaultHexAddress = (): string => {
    return window.tronWeb.address
      .toHex(this.getDefaultAddress())
      .replace(/^(41)/, '0x');
  };

  getCurrentAccount = async (): Promise<TrxAccount> => {
    return await window.tronWeb.trx.getAccount(this.getDefaultAddress());
  };

  getCurrentAccountResources = async (): Promise<TronAccountResource> => {
    return await window.tronWeb.trx.getAccountResources(
      this.getDefaultAddress(),
    );
  };

  getNodeInfo = async (): Promise<NodeInfo | any> => {
    return await window.tronWeb.trx.getNodeInfo(this.getDefaultAddress());
  };

  getBalanceAndConvert = async (converted = true): Promise<number> => {
    const balance = await window.tronWeb.trx.getBalance(
      this.getDefaultAddress(),
    );

    if (!converted) {
      return balance;
    }

    return window.tronWeb.fromSun(balance);
  };

  getLatestNotifications = async (): Promise<NotificationState[]> => {
    const events: TronContractEvent[] =
      await window.tronWeb.event.getEventsByContractAddress(
        this.contractAddress,
        {
          since: subMinutes(new Date(), 100000).getTime(),
          sort: '-block_timestamp',
        },
      );

    return events
      .map(event => this.mapper.toNotification(event))
      .filter(notification => notification) as NotificationState[];
  };

  getActiveDeals = async (): Promise<number> => {
    const contract = await this.getContract();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const activeDeal: BigNumber = await contract.methods.activeDeals().call();
    return activeDeal.toNumber();
  };

  getDeal = async (id: number): Promise<DealInfo> => {
    const contract = await this.getContract();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const response = await contract.methods.deals(id.toString()).call();

    return this.mapper.toDealInfo(response, this.getDefaultAddress());
  };

  getDeals = async (
    address: string,
    limit = 10,
    offset = 0,
    roles: DealRole[] = [],
    states: DealState[] = [],
  ): Promise<DealInfo[]> => {
    const contract = await this.getContract();

    const response = await contract.methods
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .getDeals(
        address,
        roles,
        states,
        window.tronWeb.toBigNumber(offset).toString(),
        window.tronWeb.toBigNumber(limit).toString(),
      )
      .call();

    return (Array.isArray(response) ? response : []).map(item =>
      this.mapper.toDealInfo(item, this.getDefaultAddress()),
    );
  };

  getDealsCount = async (
    address: string,
    roles: DealRole[] = [],
    states: DealState[] = [],
  ): Promise<number> => {
    const contract = await this.getContract();

    const response = await contract.methods
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .getDealsCount(address, roles, states)
      .call();

    return response.toNumber();
  };

  approveTokens = async (amount: number) => {
    const contract = await this.getTokenContract();

    await contract.methods
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .approve(
        this.contractAddress,
        window.tronWeb.toBigNumber(amount).toString(),
      )
      .send();
  };

  createDeal = async (
    id: number,
    takerAddress: string,
    arbiterAddress: string,
    amount: number,
    arbiterFeeInNormal: number,
    arbiterFeeInDispute: number,
    terms = '',
  ) => {
    const contract = await this.getContract();

    return await contract.methods
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .createDeal(
        window.tronWeb.toBigNumber(id).toString(),
        window.tronWeb.address.toHex(takerAddress),
        window.tronWeb.address.toHex(arbiterAddress),
        window.tronWeb.address.toHex(this.tokenAddress),
        window.tronWeb.toBigNumber(amount).toString(),
        window.tronWeb.toBigNumber(arbiterFeeInNormal).toString(),
        window.tronWeb.toBigNumber(arbiterFeeInDispute).toString(),
        terms,
      )
      .send({
        feeLimit: 300_000_000,
      });
  };

  approveByArbiter = async (id: number) => {
    const contract = await this.getContract();

    return await contract.methods
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .approveByArbiter(window.tronWeb.toBigNumber(id).toString())
      .send();
  };

  approveByTaker = async (id: number) => {
    const contract = await this.getContract();

    const result = await contract.methods
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .approveByTaker(window.tronWeb.toBigNumber(id).toString())
      .send();
  };

  cancel = async (id: number) => {
    const contract = await this.getContract();

    return await contract.methods
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .cancel(window.tronWeb.toBigNumber(id).toString())
      .send();
  };

  destroy = async (id: number) => {
    const contract = await this.getContract();

    return await contract.methods
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .destroy(window.tronWeb.toBigNumber(id).toString())
      .send();
  };

  releaseDeal = async (id: number) => {
    const contract = await this.getContract();

    return await contract.methods
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .releaseDeal(window.tronWeb.toBigNumber(id).toString())
      .send();
  };

  resolveDispute = async (id: number, amountToTaker: number) => {
    const contract = await this.getContract();

    return await contract.methods
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .resolveDispute(
        window.tronWeb.toBigNumber(id).toString(),
        window.tronWeb.toBigNumber(amountToTaker).toString(),
      )
      .send();
  };

  start = async () => {
    const contract = await this.getContract();

    return await contract.methods
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .start()
      .send();
  };

  stop = async () => {
    const contract = await this.getContract();

    return await contract.methods
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .stop()
      .send();
  };

  toDispute = async (id: number) => {
    const contract = await this.getContract();

    return await contract.methods
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .toDispute(window.tronWeb.toBigNumber(id).toString())
      .send();
  };

  toReview = async (id: number) => {
    const contract = await this.getContract();

    return await contract.methods
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .toReview(window.tronWeb.toBigNumber(id).toString())
      .send();
  };
}

export default TronWebService;
