type Direction = 'left' | 'right' | 'up' | 'down';

const directions = {
  left: 'M15 19l-7-7 7-7',
  right: 'M9 5l7 7-7 7',
  up: 'M5 15l7-7 7 7',
  down: 'M19 9l-7 7-7-7',
};

export const SvgArrow = ({ direction }: { direction: Direction }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-5 h-5 text-gray-400"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={directions[direction]} />
    </svg>
  );
};
