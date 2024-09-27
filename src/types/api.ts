export type Company = {
  id: string;
  name: string;
};

export type Asset = {
  id: string;
  name: string;
  parentId: string | null;
  sensorId?: string;
  sensorType?: string;
  status?: string;
  locationId?: string | null;
  gatewayId?: string | null;
};

export type Location = {
  id: string;
  name: string;
  parentId: string | null;
};

export type TreeNode = {
  id: string;
  name: string;
  parentId: string | null;
  type: string;
  children: TreeNode[];
  sensorId?: string;
  sensorType?: string;
  status?: string;
  locationId?: string | null;
  gatewayId?: string | null;
};
