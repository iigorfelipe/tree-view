import { useLocation, useNavigate } from 'react-router-dom';
import { useAssetTree } from '../../contexts/asset-tree';
import { useTheme } from '../../contexts/theme';
import { initialFilters, useTreeStore } from '../../store';
import { IconButton } from '../iconButton';
import { HeaderToDesktop } from './desktop';

export const Header = () => {
  const { toggleTheme, isSmDown } = useTheme();
  const { handleLogoClick } = useAssetTree();
  const { companySelected, setFilter, setCompanySelected } = useTreeStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (!isSmDown) return <HeaderToDesktop />;

  const handleBackClick = () => {
    navigate('/companies');
    setFilter(initialFilters);
    setCompanySelected(undefined);
  };

  return (
    <div className={`flex justify-between items-center w-full h-16 bg-section px-5`}>
      <div className="flex items-center">
        {companySelected ? <IconButton onClick={handleBackClick} icon="/tree-view/arrow-back.svg" /> : ''}
      </div>
      <>
        {companySelected ? (
          <span className="font-normal text-lg text-white">{companySelected.name}</span>
        ) : (
          <IconButton onClick={handleLogoClick} icon="/tree-view/logo.svg" />
        )}
      </>
      {pathname === '/tree-view' ? (
        <div />
      ) : (
        <IconButton onClick={toggleTheme} icon="/tree-view/theme-icon.svg" />
      )}
    </div>
  );
};
