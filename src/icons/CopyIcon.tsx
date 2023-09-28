import * as React from 'react';
import {SVGProps} from 'react';

const CopyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <path
      fill="#818384"
      fillRule="evenodd"
      d="M7 0a2 2 0 0 0-2 2v2h2V2h11v11h-2v2h2a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H7ZM2 5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2Z"
      clipRule="evenodd"
    />
  </svg>
);
export default CopyIcon;
