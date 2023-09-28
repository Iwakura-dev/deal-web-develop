import * as React from 'react';
import {SVGProps} from 'react';

const CanceledStateIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <path
      fill="#FF5B50"
      d="M10 1.667a8.333 8.333 0 1 1 0 16.666 8.333 8.333 0 0 1 0-16.666ZM8.232 7.054a.833.833 0 0 0-1.247 1.1l.069.078L8.822 10l-1.768 1.768a.833.833 0 0 0 1.1 1.247l.078-.069L10 11.178l1.768 1.768a.833.833 0 0 0 1.248-1.1l-.07-.078L11.18 10l1.767-1.768a.833.833 0 0 0-1.1-1.248l-.078.07L10 8.82 8.232 7.054Z"
    />
  </svg>
);
export default CanceledStateIcon;
