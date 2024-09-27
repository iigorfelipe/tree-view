import { Loading } from '../components/loading';
import Tree from '../components/tree-node';
import { useAssetTree } from '../contexts/asset-tree';
import { useCreateTreeNode } from '../hooks/useCreateTreeNode';
import { useTreeStore } from '../store';

export const CompanyAssets = () => {
  const { isLoading } = useAssetTree();
  const { locations, assets } = useTreeStore();

  const treeNodesMap = useCreateTreeNode(locations, assets);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col w-full h-[125vh] p-4 gap-4">
      <div className={`flex flex-col laptop:flex-row gap-3`}>
        <Tree treeNodesMap={treeNodesMap} />
      </div>
    </div>
  );
};
