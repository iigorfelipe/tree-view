import { useMemo } from 'react';
import { Asset, Location, TreeNode } from '../types/api';

type LocationMap = Location & {
  type: string;
  children: TreeNode[];
};

type AssetMap = Asset & {
  type: string;
  children: TreeNode[];
};

const createTree = (locations: Location[], assets: Asset[]) => {
  const locationsMap = new Map<string, LocationMap>();
  const assetsMap = new Map<string, AssetMap>();

  locations.forEach((location) => {
    locationsMap.set(location.id, {
      ...location,
      type: 'location',
      children: [],
    });
  });

  assets.forEach((asset) => {
    assetsMap.set(asset.id, {
      ...asset,
      type: asset.sensorType ? 'component' : 'asset',
      children: [],
    });
  });

  const treeNodeMap = new Map<string, TreeNode>();

  for (const [id, location] of locationsMap) {

    if (location.parentId) {
      const father = locationsMap.get(location.parentId);
      father?.children.push(location);
    }

    if (!location.parentId) {
      treeNodeMap.set(id, location);
    }
  }

  for (const [id, asset] of assetsMap) {

    if (!asset.locationId && !asset.parentId) {
      treeNodeMap.set(id, asset);
    }

    const fatherLocation = asset.locationId && locationsMap.get(asset.locationId);
    fatherLocation && fatherLocation.children.push(asset);

    const fatherAsset = asset.parentId && assetsMap.get(asset.parentId);
    fatherAsset && fatherAsset.children.push(asset);
  }

  return treeNodeMap;
};

export const useCreateTreeNode = (locations: Location[], assets: Asset[]) => {
  return useMemo(() => {
    return createTree(locations, assets);
  }, [locations, assets]);
};
