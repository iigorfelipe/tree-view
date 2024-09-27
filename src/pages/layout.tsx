import { Outlet } from 'react-router-dom';
import { Footer } from '../components/footer';
import { Header } from '../components/header/mobile';
import { AssetTreeProvider } from '../contexts/asset-tree/provider';

export const Layout = () => {
  return (
    <AssetTreeProvider>
      <Header />
      <Outlet />
      <Footer />
    </AssetTreeProvider>
  );
};
