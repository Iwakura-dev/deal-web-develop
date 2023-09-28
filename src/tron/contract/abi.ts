// eslint-disable-next-line import/no-unresolved
import {JsonFragment} from '@daochild/tronweb-typescript/src/typings/interfaces';

export const ABI: JsonFragment[] = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'dealId',
        type: 'uint256',
      },
    ],
    name: 'ArbiterWaiting',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'dealId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum Deals.DealRole',
        name: 'role',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'initiatorAddress',
        type: 'address',
      },
    ],
    name: 'Canceled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'dealId',
        type: 'uint256',
      },
    ],
    name: 'Done',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'dealId',
        type: 'uint256',
      },
    ],
    name: 'InDispute',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'dealId',
        type: 'uint256',
      },
    ],
    name: 'InProgress',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'dealId',
        type: 'uint256',
      },
    ],
    name: 'InReview',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'dealId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountToTaker',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Resolved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'dealId',
        type: 'uint256',
      },
    ],
    name: 'TakerWaiting',
    type: 'event',
  },
  {
    inputs: [],
    name: 'activeDeals',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'dealId',
        type: 'uint256',
      },
    ],
    name: 'approveByArbiter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'dealId',
        type: 'uint256',
      },
    ],
    name: 'approveByTaker',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'dealId',
        type: 'uint256',
      },
    ],
    name: 'cancel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'dealId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'taker',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'arbiter',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'arbiterFeeInNormal',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'arbiterFeeInDispute',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'terms',
        type: 'string',
      },
    ],
    name: 'createDeal',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'deals',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'createdAt',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'terms',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'maker',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'taker',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'arbiter',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'arbiterFeeInNormal',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'arbiterFeeInDispute',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'arbiterSentToTaker',
            type: 'uint256',
          },
        ],
        internalType: 'struct Deals.FeeInfo',
        name: 'feeInfo',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'totalAmount',
        type: 'uint256',
      },
      {
        internalType: 'enum Deals.DealState',
        name: 'state',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'destroy',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        internalType: 'enum Deals.DealRole[]',
        name: 'roles',
        type: 'uint8[]',
      },
      {
        internalType: 'enum Deals.DealState[]',
        name: 'states',
        type: 'uint8[]',
      },
      {
        internalType: 'uint256',
        name: 'offset',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'limit',
        type: 'uint256',
      },
    ],
    name: 'getDeals',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createdAt',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'terms',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'maker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'taker',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'arbiter',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'arbiterFeeInNormal',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'arbiterFeeInDispute',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'arbiterSentToTaker',
                type: 'uint256',
              },
            ],
            internalType: 'struct Deals.FeeInfo',
            name: 'feeInfo',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'totalAmount',
            type: 'uint256',
          },
          {
            internalType: 'enum Deals.DealState',
            name: 'state',
            type: 'uint8',
          },
        ],
        internalType: 'struct Deals.DealInfo[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        internalType: 'enum Deals.DealRole[]',
        name: 'roles',
        type: 'uint8[]',
      },
      {
        internalType: 'enum Deals.DealState[]',
        name: 'states',
        type: 'uint8[]',
      },
    ],
    name: 'getDealsCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isActive',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'dealId',
        type: 'uint256',
      },
    ],
    name: 'releaseDeal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'dealId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountToTaker',
        type: 'uint256',
      },
    ],
    name: 'resolveDispute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'start',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stop',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'dealId',
        type: 'uint256',
      },
    ],
    name: 'toDispute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'dealId',
        type: 'uint256',
      },
    ],
    name: 'toReview',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
