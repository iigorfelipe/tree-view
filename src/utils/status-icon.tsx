import { TreeNode } from '../types/api';

type StatusIconProps = {
  componentSelected: TreeNode | undefined;
};

export const StatusIcon = ({ componentSelected }: StatusIconProps) => {
  if (!componentSelected) return undefined;

  return (
    <img
      src={
        componentSelected.status === 'alert'
          ? 'alert.svg'
          : componentSelected.sensorType === 'energy'
          ? 'energy.svg'
          : 'operating.svg'
      }
      alt={componentSelected.type}
    />
  );
};
