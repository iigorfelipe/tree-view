import { useLocation } from 'react-router-dom';
import { useAssetTree } from '../../contexts/asset-tree';
import { useTheme } from '../../contexts/theme';
import { CompaniesToDesktop } from '../companies/desktop';
import { IconButton } from '../iconButton';

export const HeaderToDesktop = () => {
  const { toggleTheme } = useTheme();
  const { pathname } = useLocation();

  const { handleLogoClick } = useAssetTree();

  return (
    <div className="flex justify-between items-center w-full h-16 bg-section px-5">
      <div className="flex items-center gap-5">
        <IconButton onClick={handleLogoClick} icon="/logo.svg" />
        <span className="text-gray-500">|</span>
        <CompaniesToDesktop />
      </div>
      {pathname !== '/tree-view' && <IconButton onClick={toggleTheme} icon="/theme-icon.svg" />}
    </div>
  );
};
