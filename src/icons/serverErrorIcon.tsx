import * as React from 'react';
import {SVGProps} from 'react';
const ServerErrorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={149}
    height={148}
    fill="none"
    {...props}>
    <path
      fill="#A3ADAF"
      d="M123.833 92.5v24.667c0 6.502-5.031 11.828-11.413 12.299l-.92.034h-74c-6.502 0-11.829-5.031-12.3-11.413l-.033-.92V92.5h98.666Zm-37 12.333a6.167 6.167 0 1 0 0 12.333 6.167 6.167 0 0 0 0-12.333Zm18.5 0A6.166 6.166 0 0 0 99.167 111a6.166 6.166 0 1 0 12.333 0 6.167 6.167 0 0 0-6.167-6.167Zm18.5-49.333v24.667H25.167V55.5h98.666Zm-12.333-37c6.812 0 12.333 5.522 12.333 12.333v12.334H25.167V30.833c0-6.811 5.521-12.333 12.333-12.333h74Z"
    />
  </svg>
);
export default ServerErrorIcon;
