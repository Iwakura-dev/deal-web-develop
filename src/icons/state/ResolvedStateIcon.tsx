import * as React from 'react';
import {SVGProps} from 'react';

const ResolvedStateIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}>
    <path
      fill="#818384"
      d="M9 .667a8.333 8.333 0 1 1 0 16.666A8.333 8.333 0 0 1 9 .667Zm2.946 5.317L7.821 10.11 6.053 8.341A.833.833 0 0 0 4.875 9.52l2.298 2.298a.917.917 0 0 0 1.296 0l4.655-4.655a.833.833 0 0 0-1.178-1.179Z"
    />
  </svg>
);
export default ResolvedStateIcon;
