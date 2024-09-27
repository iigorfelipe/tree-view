import { ComponentProps, ReactNode } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'cursor-pointer flex items-center no-underline outline-none border-none rounded-md',

  variants: {
    variant: {
      one: 'bg-white text-text',
      two: 'bg-primary text-white',
      three: 'bg-secondary text-white',
      disabled: 'bg-gray-400 text-gray-700 cursor-not-allowed',
    },

    size: {
      default: 'py-2 px-4 gap-2',
      full: 'w-full h-11 px-2',
      big: 'py-7 rounded-xl gap-4 justify-center w-full',
    },
  },

  defaultVariants: {
    variant: 'one',
    size: 'default',
  },
});

type ButtonProps = {
  children: ReactNode;
} & ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>;

export const Button = ({ children, variant, size, ...props }: ButtonProps) => {
  return (
    <button {...props} className={buttonVariants({ variant, size })}>
      {children}
    </button>
  );
};
