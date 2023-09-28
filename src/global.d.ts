import {TronWeb} from './types';

declare global {
  interface Window {
    tronWeb: TronWeb;
  }
}
