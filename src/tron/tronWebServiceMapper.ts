import {
  dealStateFromEventNameFormatter,
  eventMessageFormatter,
} from '../common/formatters';
import {NotificationState} from '../store/cryptoStore.types';
import {DealInfo} from './model/dealInfo';
import {DealRole} from './model/dealRole';
import {DealState} from './model/dealState';
import {
  TronContractEvent,
  TronContractEventPayloadCanceled,
  TronContractEventPayloadResolved,
} from './model/event';

class TronWebServiceMapper {
  toDealInfo(data: any, defaultAddress: string): DealInfo {
    const maker = window.tronWeb.address.fromHex(data.maker);
    const taker = window.tronWeb.address.fromHex(data.taker);
    const arbiter = window.tronWeb.address.fromHex(data.arbiter);

    return {
      id: data.id.toNumber(),
      createdAt: data.createdAt.toNumber(),
      terms: data.terms,
      maker: maker,
      taker: taker,
      arbiter: arbiter,
      token: window.tronWeb.address.fromHex(data.token),
      amount: data.amount.toNumber(),
      totalAmount: data.totalAmount.toNumber(),
      feeInfo: {
        arbiterFeeInNormal: data.feeInfo.arbiterFeeInNormal.toNumber(),
        arbiterFeeInDispute: data.feeInfo.arbiterFeeInDispute.toNumber(),
        arbiterSentToTaker: data.feeInfo.arbiterSentToTaker.toNumber(),
      },
      state: data.state,
      role:
        defaultAddress === maker
          ? DealRole.Maker
          : defaultAddress === taker
          ? DealRole.Taker
          : defaultAddress === arbiter
          ? DealRole.Arbiter
          : undefined,
    };
  }
  toNotification(event: TronContractEvent): NotificationState | undefined {
    const dealId = Number(event.result.dealId);
    const recipient = event.result.recipient;
    const title = eventMessageFormatter(event.name);
    const type = dealStateFromEventNameFormatter(event.name);

    if (!title || !type) return undefined;

    let notification = {
      type: type,
      dealId: dealId,
      title: title,
      recipient: recipient,
      date: Math.round(event.timestamp / 1000),
      trxId: event.transaction,
      read: false,
    };

    if (type === DealState.Resolved) {
      const resolvedData = event.result as TronContractEventPayloadResolved;
      notification = {
        ...notification,
        ...{
          amount: Number(resolvedData.amount),
          amountToTaker: Number(resolvedData.amountToTaker),
        },
      };
    }

    if (type === DealState.Canceled) {
      const canceledData = event.result as TronContractEventPayloadCanceled;
      notification = {
        ...notification,
        ...{
          role: canceledData.role,
          initiatorAddress: canceledData.initiatorAddress,
        },
      };
    }

    return notification;
  }
}

export default TronWebServiceMapper;
