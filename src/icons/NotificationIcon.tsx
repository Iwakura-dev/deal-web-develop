import * as React from 'react';
import {SVGProps} from 'react';

const NotificationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <path
      fill="#000"
      d="M12 17a2 2 0 0 1-1.85 1.994L10 19H8a2 2 0 0 1-1.995-1.85L6 17h6ZM9 0a7 7 0 0 1 6.996 6.76L16 7v3.764l1.822 3.644a1.1 1.1 0 0 1-.869 1.586l-.115.006H1.162a1.1 1.1 0 0 1-1.03-1.487l.046-.105L2 10.764V7a7 7 0 0 1 7-7Z"
    />
  </svg>
);
export default NotificationIcon;
