import { useAssetTree } from '../../contexts/asset-tree';
import { useTreeStore } from '../../store';
import { Autocomplete } from '../autocomplete';
import { Button } from '../button';

export const CompaniesToDesktop = () => {
  const { companies, isLoadingCompanies, handleCompanySelection, refetchCompanies } = useAssetTree();
  const { companySelected } = useTreeStore();

  if (isLoadingCompanies) {
    return <span className="text-white">Buscando empresas...</span>;
  }

  if (!isLoadingCompanies && (!companies || companies.length === 0)) {
    return (
      <div className="flex gap-4 items-center py-2 px-4 rounded-xl shadow-shape bg-gray-800">
        <span className="text-white">Nenhuma empresa encontrada :(</span>
        <Button onClick={() => refetchCompanies()} variant="two">
          Tentar Novamente
          {/* TODO: add reload icon */}
        </Button>
      </div>
    );
  }

  return (
    <Autocomplete
      companies={companies || []}
      onCompanySelect={handleCompanySelection}
      clearInput={companySelected === undefined}
    />
  );
};
