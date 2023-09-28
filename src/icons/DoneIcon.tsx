import * as React from 'react';
import {SVGProps} from 'react';

const DoneIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={15}
    fill="none"
    {...props}>
    <path
      fill="#000"
      fillRule="evenodd"
      d="M19.546 1.111a1.5 1.5 0 0 1 0 2.121L8.303 14.475a1.6 1.6 0 0 1-2.263 0L.454 8.89a1.5 1.5 0 1 1 2.121-2.121l4.596 4.596L17.424 1.111a1.5 1.5 0 0 1 2.122 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export default DoneIcon;
