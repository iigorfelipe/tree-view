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
      <div className="flex items-center p-4 rounded-xl shadow-shape">
        <span className={textColor}>Buscando empresas...</span>
      </div>
    );
  }

  if (!isLoadingCompanies && (!companies || companies.length === 0)) {
    return (
      <div className="flex flex-col gap-9 items-center p-8 rounded-xl shadow-shape">
        <span className={textColor}>Nenhuma empresa encontrada :(</span>
        <Button onClick={() => refetchCompanies()} variant="two">
          Tentar Novamente
          {/* TODO: add reload icon */}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-9 w-11/12 items-center p-8 rounded-xl shadow-shape">
      {companies?.map((company) => (
        <Button key={company.id} size="big" variant="two" onClick={() => handleCompanySelection(company)}>
          <img src="/tree-view/company-icon.svg" alt="icon" className="size-6" />
          <span className="text-xl font-medium">{company.name}</span>
        </Button>
      ))}
    </div>
  );
};
