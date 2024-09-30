import { FormEvent, useMemo } from 'react';
import { ComponentDetails } from '../components/component-details';
import { InputFiltersToDesktop } from '../components/input-filters/desktop';
import { InputFiltersToMobile } from '../components/input-filters/mobile';
import { Loading } from '../components/loading';
import Tree from '../components/tree-node';
import { useAssetTree } from '../contexts/asset-tree';
import { useTheme } from '../contexts/theme';
import { useCreateTreeNode } from '../hooks/useCreateTreeNode';
import { useTreeStore } from '../store';
import { TreeNode } from '../types/api';
import { SelectOptionKeys } from '../utils/selectOptions';

export const CompanyAssets = () => {
  const { isSmDown } = useTheme();
  const { isLoading } = useAssetTree();
  const { locations, assets, filters, setFilter, selectInputValue, textInputValue, componentSelected } =
    useTreeStore();

  const treeNodesMap = useCreateTreeNode(locations, assets);
  const autoExpandNodes = new Set<string>();

  const useFilterNodes = useMemo(() => {
    const filteredTreeNodes = (treeNodes: TreeNode[]) => {
      const isTextMatch = (nodeName: string) =>
        nodeName.toLowerCase().includes(filters.inputValue.toLowerCase());

      const isSelectMatch = (node: TreeNode) => {
        switch (filters.selectValue) {
          case 'alert':
            return node.status === 'alert';
          case 'operating':
            return node.status === 'operating';
          case 'energy':
            return node.sensorType === 'energy';
          case 'vibration':
            return node.sensorType === 'vibration';
          case 'all':
          default:
            return true;
        }
      };

      let filteredNodes = [] as TreeNode[];

      for (const node of treeNodes) {
        const childNode = filteredTreeNodes(node.children);

        if ((isTextMatch(node.name) && isSelectMatch(node)) || childNode.length > 0) {
          filteredNodes.push({
            ...node,
            children: childNode.length > 0 ? childNode : node.children,
          });
          autoExpandNodes.add(node.id);
        }
      }

      return filteredNodes;
    };

    return filteredTreeNodes([...treeNodesMap.values()] as unknown as TreeNode[]);
  }, [filters.inputValue, [...treeNodesMap.values()]]);

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
    <div className="flex flex-col w-full p-4 gap-4 h-screen">
      {isSmDown ? (
        <InputFiltersToMobile submitFilter={submitFilter} />
      ) : (
        <InputFiltersToDesktop submitFilter={submitFilter} />
      )}
      <div>
        {useFilterNodes.length === 0 ? (
          <span className="p-2 text-lg shadow-shape w-fit rounded-lg flex items-center">
            Nenhum resultado encontrado.
          </span>
        ) : (
          <div className={`flex flex-col laptop:flex-row gap-3`}>
            <Tree
              filteredTreeNodes={useFilterNodes}
              treeNodesMap={treeNodesMap}
              autoExpandNodes={autoExpandNodes}
            />
            {componentSelected && <ComponentDetails />}
          </div>
        )}
      </div>
    </div>
  );
};
