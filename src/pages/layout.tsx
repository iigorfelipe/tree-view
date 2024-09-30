import { Outlet } from 'react-router-dom';
import { Footer } from '../components/footer';
import { Header } from '../components/header/mobile';
import { AssetTreeProvider } from '../contexts/asset-tree/provider';
import { useTheme } from '../contexts/theme';

export const Layout = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <AssetTreeProvider>
      <div
        className={`flex flex-col items-center justify-between h-full ${isDark ? 'bg-dark' : 'bg-light'} ${
          !isDark ? 'text-dark' : 'text-light'
        }`}
      >
        <Header />
        <div className="w-full min-h-[120vh]">
          <Outlet />
        </div>
        <Footer />
      </div>
    </AssetTreeProvider>
  );
};
