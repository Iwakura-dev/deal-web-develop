import * as React from 'react';
import {SVGProps} from 'react';

const InDisputeStateIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <path
      fill="#FFA600"
      d="M15.833 8.333a2.5 2.5 0 0 1 2.5 2.5v2.5a2.5 2.5 0 0 1-2.5 2.5v.806c0 .883-1.03 1.365-1.708.8l-1.927-1.606H10a2.5 2.5 0 0 1-2.5-2.5v-2.5a2.5 2.5 0 0 1 2.5-2.5h5.833Zm-2.5-5a2.5 2.5 0 0 1 2.5 2.5v.834H9.167A3.333 3.333 0 0 0 5.833 10v3.333c0 .87.334 1.663.88 2.257l-.88.66a1.042 1.042 0 0 1-1.666-.833v-1.25a2.5 2.5 0 0 1-2.5-2.5V5.833a2.5 2.5 0 0 1 2.5-2.5h9.166Z"
    />
  </svg>
);
export default InDisputeStateIcon;
