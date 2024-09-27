import { ComponentProps } from 'react';

type IconButtonTypeProps = {
  onClick: () => void;
  icon: string | JSX.Element;
} & ComponentProps<'button'>;

export const IconButton = ({ onClick, icon, ...rest }: IconButtonTypeProps) => {
  return (
    <button className="bg-transparent border-none p-0 cursor-pointer" onClick={onClick} {...rest}>
      {typeof icon === 'string' ? <img src={icon} alt="icon" /> : icon}
    </button>
  );
};
