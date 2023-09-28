import * as React from 'react';
import {SVGProps} from 'react';

const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <path
      fill="#fff"
      d="M10.579 19.579a1.421 1.421 0 0 0 2.842 0V13.42h6.158a1.421 1.421 0 0 0 0-2.842H13.42V4.42a1.421 1.421 0 0 0-2.842 0v6.158H4.42a1.421 1.421 0 0 0 0 2.842h6.158v6.158Z"
    />
  </svg>
);
export default PlusIcon;
