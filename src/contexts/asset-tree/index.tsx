import { useContext } from 'react';
import { AssetTreeContext } from './context';

export const useAssetTree = () => {
  const context = useContext(AssetTreeContext);

  if (!context) {
    throw new Error('useAssetTree must be used in a AssetTreeProvider');
  }

  return context;
};
