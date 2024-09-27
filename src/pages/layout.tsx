import { Outlet } from 'react-router-dom';
import { Header } from '../components/header/mobile';
import { AssetTreeProvider } from '../contexts/asset-tree/provider';

export const Layout = () => {
  return (
    <AssetTreeProvider>
      <Header />
      <Outlet />
    </AssetTreeProvider>
  );
};
