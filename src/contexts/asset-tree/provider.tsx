import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCompanies, getLocationsAndAssets } from '../../services/api';
import { initialFilters, useTreeStore } from '../../store';
import { Company } from '../../types/api';
import { AssetTreeContext } from './context';

type Props = {
  children: ReactNode;
};

const TEN_MINUTES = 1000 * 60 * 10;

export const AssetTreeProvider = ({ children }: Props) => {
  const navigate = useNavigate();

  const {
    companySelected,
    setCompanySelected,
    setLocations,
    setAssets,
    setFilter,
    setTextInputValue,
    setSelectInputValue,
    setComponentSelected,
  } = useTreeStore();

  const {
    data: companies,
    isLoading: isLoadingCompanies,
    refetch: refetchCompanies,
  } = useQuery({
    queryKey: ['companies'],
    queryFn: () => fetchCompanies(),
  });

  const { isLoading } = useQuery({
    queryKey: ['locationsAndAssets', companySelected?.id],
    queryFn: async () => {
      if (!companySelected) return;
      const { locations, assets } = await getLocationsAndAssets(companySelected.id);
      setLocations(locations);
      setAssets(assets);
    },
    enabled: !!companySelected,
    staleTime: TEN_MINUTES,
  });

  const clearFilters = () => {
    setFilter(initialFilters);
    setTextInputValue('');
    setComponentSelected(undefined);
    setSelectInputValue('all');
  };

  const handleCompanySelection = (company: Company) => {
    if (company === companySelected) return;
    const selectedCompany = companies?.find((companyItem: Company) => companyItem.id === company.id);
    if (!selectedCompany) return;

    setCompanySelected(selectedCompany);
    navigate('/company-assets/');
    clearFilters();
  };

  const handleLogoClick = () => {
    setCompanySelected(undefined);
    clearFilters();
    navigate('/tree-view/');
  };

  const values = {
    isLoading,
    companies,
    isLoadingCompanies,
    refetchCompanies,
    handleCompanySelection,
    handleLogoClick,
    clearFilters,
  };

  return <AssetTreeContext.Provider value={values}>{children}</AssetTreeContext.Provider>;
};
