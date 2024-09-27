import { FormEvent } from 'react';
import { InputFiltersToDesktop } from '../components/input-filters/desktop';
import { InputFiltersToMobile } from '../components/input-filters/mobile';
import { Loading } from '../components/loading';
import Tree from '../components/tree-node';
import { useAssetTree } from '../contexts/asset-tree';
import { useTheme } from '../contexts/theme';
import { useCreateTreeNode } from '../hooks/useCreateTreeNode';
import { useTreeStore } from '../store';
import { SelectOptionKeys } from '../utils/selectOptions';

export const CompanyAssets = () => {
  const { isSmDown } = useTheme();
  const { isLoading } = useAssetTree();
  const { locations, assets, filters, setFilter, selectInputValue, textInputValue } = useTreeStore();

  const treeNodesMap = useCreateTreeNode(locations, assets);

  const submitFilter = (event: FormEvent) => {
    event.preventDefault();

    if (filters.inputValue !== textInputValue) {
      setFilter({
        ...filters,
        inputValue: textInputValue,
      });
    }

    if (filters.selectValue !== selectInputValue) {
      setFilter({
        ...filters,
        selectValue: selectInputValue as SelectOptionKeys,
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col w-full h-[125vh] p-4 gap-4">
      {isSmDown ? (
        <InputFiltersToMobile submitFilter={submitFilter} />
      ) : (
        <InputFiltersToDesktop submitFilter={submitFilter} />
      )}
      <div className={`flex flex-col laptop:flex-row gap-3`}>
        <Tree treeNodesMap={treeNodesMap} />
      </div>
    </div>
  );
};
