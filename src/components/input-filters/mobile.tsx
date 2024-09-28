import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssetTree } from '../../contexts/asset-tree';
import { useTheme } from '../../contexts/theme';
import { useTreeStore } from '../../store';
import { isActiveFilters } from '../../utils/is-active-filter';
import { SelectOptionKeys, selectOptions } from '../../utils/selectOptions';
import { Button } from '../button';
import { IconButton } from '../iconButton';

type InputFiltersToMobileProps = {
  submitFilter: (event: FormEvent) => void;
};

export const InputFiltersToMobile = ({ submitFilter }: InputFiltersToMobileProps) => {
  const { theme } = useTheme();
  const [showInputFilters, setShowInputFilters] = useState(false);
  const navigate = useNavigate();
  const { clearFilters } = useAssetTree();
  const {
    filters,
    companySelected,
    textInputValue,
    selectInputValue,
    componentSelected,
    setTextInputValue,
    setSelectInputValue,
  } = useTreeStore();

  if (!companySelected) {
    navigate('/companies');
  }

  if (componentSelected) return null;

  const handleClearFilter = () => {
    clearFilters();
    setShowInputFilters(false);
  };

  const inputStyle = `w-full outline-none border border-bg_${theme} px-3 py-7 rounded-xl text-text text-center text-lg font-medium`;

  return (
    <div className="relative flex flex-col">
      <div
        className={`flex ${
          showInputFilters && 'hidden'
        } ml-auto items-center justify-center bg-secondary p-1 rounded-s-2xl fixed right-0 top-20 gap-1`}
      >
        <IconButton icon="/search-box.svg" onClick={() => setShowInputFilters(true)} />
      </div>

      {isActiveFilters(filters) && (
        <div
          className={`flex ${
            showInputFilters && 'flex-none'
          } ml-auto items-center justify-centerp-1 bg-secondary px-2 rounded-s-2xl fixed right-0 top-32 gap-1`}
        >
          <IconButton onClick={clearFilters} icon={<span className="text-light">X</span>} />
        </div>
      )}

      <form
        className={`fixed right-0 w-full h-full p-5 gap-5 flex flex-col bg-${theme} ${
          showInputFilters ? 'opacity-1' : 'opacity-0'
        }`}
        style={{
          transform: showInputFilters ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s ease-in-out',
        }}
        onSubmit={submitFilter}
      >
        <input
          type="text"
          placeholder="Buscar Ativo ou Local..."
          className={inputStyle}
          value={textInputValue}
          onChange={({ target: { value } }) => setTextInputValue(value)}
        />
        <select
          className={`${inputStyle} appearance-none `}
          value={selectInputValue}
          onChange={({ target: { value } }) => setSelectInputValue(value as SelectOptionKeys)}
        >
          {Object.entries(selectOptions).map((option) => (
            <option key={option[0]} value={option[0]} className="text-lg font-medium">
              {option[1]}
            </option>
          ))}
        </select>

        <div className="flex gap-5">
          <Button
            variant="three"
            size="big"
            type="submit"
            className="rounded-md"
            onClick={() => setShowInputFilters(false)}
          >
            <img src="./search-box.svg" alt="" className="size-7" />
            <span className="text-xl font-medium">Filtrar</span>
          </Button>

          <Button variant="three" size="big" onClick={handleClearFilter} style={{ width: '35%' }}>
            <span className="text-xl font-medium">X</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
