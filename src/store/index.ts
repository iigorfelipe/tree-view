import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Asset, Company, Location, TreeNode } from '../types/api';

export type TreeState = {
  companySelected: Company | undefined;
  locations: Location[];
  assets: Asset[];
  filters: {
    inputValue: string;
    selectValue: 'energy' | 'alert' | 'operating' | 'vibration' | 'all';
  };
  textInputValue: string;
  componentSelected: TreeNode | undefined;
  setTextInputValue: (inputValue: string) => void;
  setComponentSelected: (companySelected: TreeNode | undefined) => void;
  setCompanySelected: (companySelected: Company | undefined) => void;
  setLocations: (locations: Location[]) => void;
  setAssets: (assets: Asset[]) => void;
  setFilter: (filter: TreeState['filters']) => void;
  selectInputValue: string;
  setSelectInputValue: (selectValue: string) => void;
};

export const initialFilters: TreeState['filters'] = {
  inputValue: '',
  selectValue: 'all',
};

export const useTreeStore = create<TreeState>()(
  devtools((set) => ({
    companySelected: undefined,
    locations: [],
    assets: [],
    filters: initialFilters,
    textInputValue: '',
    selectInputValue: 'all',
    componentSelected: undefined,
    setTextInputValue: (textInputValue) => set(() => ({ textInputValue })),
    setCompanySelected: (companySelected) => set(() => ({ companySelected })),
    setComponentSelected: (componentSelected) => set(() => ({ componentSelected })),
    setLocations: (locations) => set(() => ({ locations })),
    setAssets: (assets) => set(() => ({ assets })),
    setFilter: (filter) => set((state) => ({ filters: { ...state.filters, ...filter } })),
    setSelectInputValue: (selectInputValue) => set(() => ({ selectInputValue })),
  })),
);
