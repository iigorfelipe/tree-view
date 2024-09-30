import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from '../contexts/theme';
import { useTreeStore } from '../store';
import { TreeNode as TreeNodeType } from '../types/api';
import { SvgArrow } from '../utils/arrow-up-down';
import { isActiveFilters } from '../utils/is-active-filter';
import { StatusIcon } from '../utils/status-icon';

type TreeNodeProps = {
  node: TreeNodeType;
  expandedNodes: Set<string>;
  toggleNode: (id: string) => void;
};

const TreeNode = memo(({ node, expandedNodes, toggleNode }: TreeNodeProps) => {
  const { theme } = useTheme();
  const isExpanded = useMemo(() => expandedNodes.has(node.id), [expandedNodes, node.id]);
  const { componentSelected } = useTreeStore();

  const handleToggle = useCallback(() => {
    toggleNode(node.id);
  }, [node.id, toggleNode]);

  const hoverColor = theme === 'dark' ? 'hover:bg-bg_dark' : 'hover:bg-bg_light';
  const bgColor = theme === 'dark' ? 'bg-bg_dark' : 'bg-bg_light';
  const selectedColor = componentSelected?.id === node.id ? bgColor : 'transparent';
  const nodeIcon =
    node.type === 'asset'
      ? '/tree-view/asset.png'
      : node.type === 'location'
      ? '/tree-view/location.png'
      : '/tree-view/component.png';

  return (
    <li data-id={node.id}>
      <div
        onClick={handleToggle}
        className={`flex items-center cursor-pointer p-1 ${hoverColor} ${selectedColor} rounded-md gap-2`}
        data-expanded={isExpanded}
      >
        {node.children && node.children.length > 0 && <SvgArrow direction={isExpanded ? 'down' : 'right'} />}

        <img src={nodeIcon} alt="icon" className="size-5" />

        <span className={`text-sm ${theme === 'light' ? 'text-section' : 'text-light'}`}>{node.name}</span>

        {node.type === 'component' && <StatusIcon componentSelected={node} />}
      </div>
      {isExpanded && node.children && (
        <ul className={`pl-2 tablet:pl-6 ml-[14px] mt-1 border-l border-gray-300`}>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} expandedNodes={expandedNodes} toggleNode={toggleNode} />
          ))}
        </ul>
      )}
    </li>
  );
});

TreeNode.displayName = 'TreeNode';

type TreeProps = {
  filteredTreeNodes: TreeNodeType[];
  treeNodesMap: Map<string, TreeNodeType>;
  autoExpandNodes: Set<string>;
};

const Tree = ({ filteredTreeNodes, treeNodesMap, autoExpandNodes }: TreeProps) => {
  const { theme, isSmDown } = useTheme();
  const { componentSelected, setComponentSelected, filters } = useTreeStore();

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    setExpandedNodes(isActiveFilters(filters) ? autoExpandNodes : new Set());
  }, [filters]);

  const findChildren = (treeNode: TreeNodeType, id: string) => {
    const node = [treeNode];

    while (node.length > 0) {
      const currentNode = node.pop();

      if (currentNode?.id === id) {
        return currentNode;
      }

      if (currentNode?.children.length) {
        node.push(...currentNode.children);
      }
    }

    return undefined;
  };

  const getTreeNodeById = (id: string) => {
    if (treeNodesMap.get(id)) {
      return treeNodesMap.get(id);
    }

    for (const node of treeNodesMap.values()) {
      const children = findChildren(node, id);
      if (children) return children;
    }

    return undefined;
  };

  const toggleNode = useCallback((id: string) => {
    setExpandedNodes((prev) => {
      const newExpandedNodes = new Set(prev);
      if (newExpandedNodes.has(id)) {
        newExpandedNodes.delete(id);
      } else {
        newExpandedNodes.add(id);
      }
      return newExpandedNodes;
    });

    const component = getTreeNodeById(id);
    if (component?.type === 'component') {
      setComponentSelected(component);
    }
  }, []);

  const borderColor = theme === 'light' ? 'border-border_light' : 'border-border_dark';

  return (
    <ul
      className={`${isSmDown && componentSelected && 'hidden'}
      ${isSmDown && 'h-screen'}
      tablet:max-h-[50vh]
       laptop:max-h-[70vh] w-full max-w-[750px] list-none p-5 overflow-auto border ${borderColor} rounded-md`}
    >
      {filteredTreeNodes.map((node) => (
        <TreeNode key={node.id} node={node} expandedNodes={expandedNodes} toggleNode={toggleNode} />
      ))}
    </ul>
  );
};

export default Tree;
