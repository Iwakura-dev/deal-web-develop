// eslint-disable-next-line import/no-unresolved
import {JsonFragment} from '@daochild/tronweb-typescript/src/typings/interfaces';

export const TOKEN_ABI: JsonFragment[] = [
  {
    stateMutability: 'Nonpayable',
    type: 'Constructor',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'Event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'Event',
  },
  {
    outputs: [
      {
        type: 'uint256',
      },
    ],
    inputs: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    stateMutability: 'View',
    type: 'Function',
  },
  {
    outputs: [
      {
        type: 'bool',
      },
    ],
    inputs: [
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    stateMutability: 'Nonpayable',
    type: 'Function',
  },
  {
    outputs: [
      {
        type: 'uint256',
      },
    ],
    inputs: [
      {
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    stateMutability: 'View',
    type: 'Function',
  },
  {
    outputs: [
      {
        type: 'uint8',
      },
    ],
    name: 'decimals',
    stateMutability: 'View',
    type: 'Function',
  },
  {
    outputs: [
      {
        type: 'bool',
      },
    ],
    inputs: [
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'subtractedValue',
        type: 'uint256',
      },
    ],
    name: 'decreaseAllowance',
    stateMutability: 'Nonpayable',
    type: 'Function',
  },
  {
    outputs: [
      {
        type: 'bool',
      },
    ],
    inputs: [
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'addedValue',
        type: 'uint256',
      },
    ],
    name: 'increaseAllowance',
    stateMutability: 'Nonpayable',
    type: 'Function',
  },
  {
    outputs: [
      {
        type: 'string',
      },
    ],
    name: 'name',
    stateMutability: 'View',
    type: 'Function',
  },
  {
    outputs: [
      {
        type: 'string',
      },
    ],
    name: 'symbol',
    stateMutability: 'View',
    type: 'Function',
  },
  {
    outputs: [
      {
        type: 'uint256',
      },
    ],
    name: 'totalSupply',
    stateMutability: 'View',
    type: 'Function',
  },
  {
    outputs: [
      {
        type: 'bool',
      },
    ],
    inputs: [
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    stateMutability: 'Nonpayable',
    type: 'Function',
  },
  {
    outputs: [
      {
        type: 'bool',
      },
    ],
    inputs: [
      {
        name: 'from',
        type: 'address',
      },
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    stateMutability: 'Nonpayable',
    type: 'Function',
  },
];
