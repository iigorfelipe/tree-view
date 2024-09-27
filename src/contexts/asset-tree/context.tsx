import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { createContext } from 'react';
import { Company } from '../../types/api';

export type AssetTreeContextType = {
  isLoading: boolean;
  refetchCompanies: (options?: RefetchOptions) => Promise<QueryObserverResult<Company[], Error>> | any; // TODO: remove any
  companies: Company[] | undefined;
  isLoadingCompanies: boolean;
  handleLogoClick: () => void;
  clearFilters: () => void;
  handleCompanySelection: (company: Company) => void;
};

const defaultAssetTreeValue = {
  isLoading: false,
  refetchCompanies: () => {},
  companies: undefined,
  isLoadingCompanies: false,
  handleLogoClick: () => {},
  clearFilters: () => {},
  handleCompanySelection: () => {},
};

export const AssetTreeContext = createContext<AssetTreeContextType>(defaultAssetTreeValue);
