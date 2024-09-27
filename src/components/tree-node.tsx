import { useMemo, useCallback, memo, useState } from 'react';
import { TreeNode as TreeNodeType } from '../types/api';
import { SvgArrow } from '../utils/arrow-up-down';
import { useTheme } from '../contexts/theme';
import { useTreeStore } from '../store';
import { StatusIcon } from '../utils/status-icon';

type TreeNodeProps = {
  node: TreeNodeType;
  expandedNodes: Set<string>;
  toggleNode: (id: string) => void;
};

const TreeNode = memo(({ node, expandedNodes, toggleNode }: TreeNodeProps) => {
  const { theme } = useTheme();
  const isExpanded = useMemo(() => expandedNodes.has(node.id), [expandedNodes, node.id]);

  const handleToggle = useCallback(() => {
    toggleNode(node.id);
  }, [node.id, toggleNode]);

  const hoverColor = theme === 'dark' ? 'hover:bg-bg_dark' : 'hover:bg-bg_light';
  const nodeIcon = (
    node.type === 'asset'
      ? '/asset.png'
      : node.type === 'location'
        ? '/location.png'
        : '/component.png'
  );

  return (
    <li data-id={node.id}>
      <div
        onClick={handleToggle}
        className={`flex items-center cursor-pointer p-1 ${hoverColor} rounded-md gap-2`}
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
  treeNodesMap: Map<string, TreeNodeType>;
};

const Tree = ({ treeNodesMap }: TreeProps) => {
  const { theme, isSmDown } = useTheme();
  const { componentSelected } = useTreeStore();

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

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
  }, []);

  const borderColor = theme === 'light' ? 'border-border_light' : 'border-border_dark';

  return (
    <ul
      className={`${
        isSmDown && componentSelected && 'hidden'
      } mobile:max-h-[100vh] laptop:max-h-[70vh] w-full max-w-[750px] list-none p-5 overflow-auto border ${borderColor} rounded-md`}
    >
      {[...treeNodesMap.values()].map((node) => (
        <TreeNode key={node.id} node={node} expandedNodes={expandedNodes} toggleNode={toggleNode} />
      ))}
    </ul>
  );
};

export default Tree;
