import { Outlet } from 'react-router-dom';
import { AssetTreeProvider } from '../contexts/asset-tree/provider';

export const Layout = () => {
  return (
    <AssetTreeProvider>
      <Outlet />
    </AssetTreeProvider>
  );
};
