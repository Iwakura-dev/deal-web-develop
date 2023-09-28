import * as React from 'react';
import {SVGProps} from 'react';

const NoInternetIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={149}
    height={148}
    fill="none"
    {...props}>
    <path
      fill="#A3ADAF"
      d="M26.535 19.868a6.168 6.168 0 0 1 8.14-.513l.58.513L50.028 34.64a80.105 80.105 0 0 1 24.472-3.806c22.136 0 42.187 8.98 56.687 23.48a6.167 6.167 0 0 1-8.721 8.721c-12.282-12.282-29.232-19.867-47.966-19.867a68.31 68.31 0 0 0-11.604.988l-2.808.545 10.91 10.909a56.213 56.213 0 0 1 3.502-.109c15.325 0 29.208 6.22 39.245 16.255a6.168 6.168 0 0 1-8.721 8.722 43.11 43.11 0 0 0-18.852-11.048l-1.822-.468 38.117 38.117a6.167 6.167 0 0 1-8.14 9.234l-.581-.513-87.21-87.21a6.166 6.166 0 0 1 0-8.72ZM74.5 104.833l.72.042a6.167 6.167 0 1 1-1.44 0l.72-.042Zm-7.691-23.698 11.829 11.829a18.59 18.59 0 0 0-4.139-.464c-5.11 0-9.726 2.064-13.08 5.419a6.167 6.167 0 1 1-8.722-8.721A30.842 30.842 0 0 1 65.2 81.596l1.61-.461ZM47.935 62.26l9.204 9.205a43.23 43.23 0 0 0-13.163 9.012 6.167 6.167 0 0 1-8.72-8.722 55.67 55.67 0 0 1 12.679-9.494ZM29.99 44.317l8.923 8.923a68.148 68.148 0 0 0-12.379 9.795 6.167 6.167 0 0 1-8.72-8.72 80.52 80.52 0 0 1 12.176-9.998Z"
    />
  </svg>
);
export default NoInternetIcon;
