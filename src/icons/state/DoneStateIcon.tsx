import * as React from 'react';
import {SVGProps} from 'react';

const DoneStateIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <path
      fill="#27A972"
      d="M10 1.667a8.333 8.333 0 1 1 0 16.666 8.333 8.333 0 0 1 0-16.666Zm2.946 5.317L8.821 11.11 7.054 9.341a.833.833 0 0 0-1.179 1.179l2.298 2.298a.917.917 0 0 0 1.297 0l4.655-4.655a.833.833 0 1 0-1.179-1.179Z"
    />
  </svg>
);
export default DoneStateIcon;
