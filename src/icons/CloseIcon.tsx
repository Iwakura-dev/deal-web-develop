import * as React from 'react';
import {SVGProps} from 'react';

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}>
    <path
      fill="#000"
      fillRule="evenodd"
      d="m8 10.121 5.303 5.304a1.5 1.5 0 0 0 2.122-2.122L10.12 8l5.304-5.303A1.5 1.5 0 1 0 13.303.576L8 5.879 2.697.576a1.5 1.5 0 1 0-2.122 2.12L5.88 8 .575 13.303a1.5 1.5 0 1 0 2.122 2.122L8 10.12Z"
      clipRule="evenodd"
    />
  </svg>
);
export default CloseIcon;
