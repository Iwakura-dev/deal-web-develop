import React, {useState} from 'react';
import CopyIcon from '../../../icons/CopyIcon';
import DoneIcon from '../../../icons/DoneIcon';

interface CopyButtonProps {
  currentAccount: string;
}

const CopyButton = ({currentAccount}: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleClick = () => {
    try {
      navigator.clipboard
        .writeText(currentAccount)
        .then(() => setIsCopied(true));
    } catch (e) {}
  };

  return (
    <div onClick={handleClick} style={{cursor: 'pointer'}}>
      {isCopied ? <DoneIcon /> : <CopyIcon />}
    </div>
  );
};

export default CopyButton;
