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
          ? '/tree-view/alert.svg'
          : componentSelected.sensorType === 'energy'
          ? '/tree-view/energy.svg'
          : '/tree-view/operating.svg'
      }
      alt={componentSelected.type}
    />
  );
};
