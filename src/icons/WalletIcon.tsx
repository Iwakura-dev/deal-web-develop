import * as React from 'react';
import {SVGProps} from 'react';

const WalletIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="80"
    height="64"
    viewBox="0 0 80 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      opacity="0.3"
      d="M64 24H16C12.64 24 9.80001 26.08 8.60001 29L53.04 39.88C54.28 40.2 55.6 39.88 56.56 39.08L70.52 27.4C69.04 25.36 66.68 24 64 24Z"
      fill="#CAC3DC"
    />
    <path
      opacity="0.3"
      d="M64 8H16C11.6 8 8 11.6 8 16V18.2C10.36 16.84 13.08 16 16 16H64C66.92 16 69.64 16.84 72 18.2V16C72 11.6 68.4 8 64 8Z"
      fill="#CAC3DC"
    />
    <path
      d="M64 0H16C7.16 0 0 7.16 0 16V48C0 56.84 7.16 64 16 64H64C72.84 64 80 56.84 80 48V16C80 7.16 72.84 0 64 0ZM56.56 39.08C55.6 39.88 54.28 40.2 53.04 39.88L8.6 29C9.8 26.08 12.64 24 16 24H64C66.68 24 69.04 25.36 70.52 27.36L56.56 39.08ZM72 18.2C69.64 16.84 66.92 16 64 16H16C13.08 16 10.36 16.84 8 18.2V16C8 11.6 11.6 8 16 8H64C68.4 8 72 11.6 72 16V18.2Z"
      fill="#CAC3DC"
    />
  </svg>
);
export default WalletIcon;
