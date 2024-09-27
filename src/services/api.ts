import { Asset, Company, Location } from "../types/api";

const API_URL = 'https://fake-api.tractian.com';

export const fetchCompanies = async (): Promise<Company[]> => {
  const response = await fetch(`${API_URL}/companies`);
  return response.json();
};

export const fetchLocations = async (companyId: string): Promise<Location[]> => {
  const response = await fetch(`${API_URL}/companies/${companyId}/locations`);
  return response.json();
};

export const fetchAssets = async (companyId: string): Promise<Asset[]> => {
  const response = await fetch(`${API_URL}/companies/${companyId}/assets`);
  return response.json();
};

export const getLocationsAndAssets = async (companyId: string) => {
  const [locations, assets] = await Promise.all([fetchLocations(companyId), fetchAssets(companyId)]);

  return {
    locations,
    assets,
  };
};
