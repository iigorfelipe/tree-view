import { useAssetTree } from '../../contexts/asset-tree';
import { useTheme } from '../../contexts/theme';
import { Button } from '../button';

export const Companies = () => {
  const { isSmDown, theme } = useTheme();
  const { companies, isLoadingCompanies, handleCompanySelection, refetchCompanies } = useAssetTree();

  if (!isSmDown) return;
  const textColor = theme === 'dark' ? 'text-light' : 'text-dark';

  if (isLoadingCompanies) {
    return (
      <div className="flex justify-center items-center p-8 rounded-xl shadow-shape mt-28 mx-4">
        <span className={`${textColor} text-xl`}>Buscando empresas...</span>
      </div>
    );
  }

  if (!isLoadingCompanies && (!companies || companies.length === 0)) {
    return (
      <div className="flex flex-col gap-9 items-center p-8 rounded-xl shadow-shape mt-28 mx-4">
        <span className={`${textColor} text-xl`}>Nenhuma empresa encontrada</span>
        <Button onClick={() => refetchCompanies()} variant="two" size='big'>
          <span className="text-xl">Tentar Novamente</span>
          <img src="/tree-view/refresh.svg" alt="refresh icon" className="size-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-9 w-11/12 mx-auto mt-12 items-center p-8 rounded-xl shadow-shape">
      {companies?.map((company) => (
        <Button key={company.id} size="big" variant="two" onClick={() => handleCompanySelection(company)}>
          <img src="/tree-view/company-icon.svg" alt="icon" className="size-6" />
          <span className="text-xl font-medium">{company.name}</span>
        </Button>
      ))}
    </div>
  );
};
