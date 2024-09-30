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
      <div className="flex items-center py-2 gap-4 px-4 rounded-xl shadow-shape bg-gray-800">
        <span className="hidden tablet:flex tablet:text-sm laptop:text-base text-white">
          Nenhuma empresa encontrada
        </span>
        <Button onClick={() => refetchCompanies()} variant="two">
          <span className='text-base mobile:text-sm'>Tentar Novamente</span>
          <img src="/tree-view/refresh.svg" alt="refresh icon" className="size-5" />
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
