import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssetTree } from '../../contexts/asset-tree';
import { useTreeStore } from '../../store';
import { SelectOptionKeys, selectOptions } from '../../utils/selectOptions';
import { Button } from '../button';
import { IconButton } from '../iconButton';

type InputFiltersToMobileProps = {
  submitFilter: (event: FormEvent) => void;
};

export const InputFiltersToMobile = ({ submitFilter }: InputFiltersToMobileProps) => {
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

  const showClearFilters =
    filters.inputValue.trim().length > 0 ||
    filters.selectValue !== 'all' ||
    (filters.inputValue.trim().length > 0 && filters.selectValue === 'all');

  return (
    <div className="relative flex flex-col">
      <div
        className={`flex ${
          showInputFilters && 'flex-none'
        } ml-auto items-center justify-center bg-secondary p-1 rounded-s-2xl fixed right-0 top-20 gap-1`}
      >
        <IconButton icon="/search-box.svg" onClick={() => setShowInputFilters(true)} />
      </div>

      {showClearFilters && (
        <div
          className={`flex ${
            showInputFilters && 'flex-none'
          } ml-auto items-center justify-centerp-1 bg-secondary px-2 rounded-s-2xl fixed right-0 top-32 gap-1`}
        >
          <IconButton onClick={clearFilters} icon={<span className="text-light">X</span>} />
        </div>
      )}

      <form
        className={`fixed right-0 w-full h-full p-5 gap-5 flex flex-col bg-[#EAEAEA] ${
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
          className="w-full outline-none px-3 py-7 rounded-xl text-text text-center text-lg font-medium"
          value={textInputValue}
          onChange={({ target: { value } }) => setTextInputValue(value)}
        />
        <select
          className="w-full outline-none px-3 py-7 rounded-xl text-text appearance-none text-center text-lg font-medium"
          value={selectInputValue}
          onChange={({ target: { value } }) => setSelectInputValue(value as SelectOptionKeys)}
        >
          {Object.entries(selectOptions).map((option) => (
            <option key={option[0]} value={option[0]} className="text-lg font-medium">
              {option[1]}
            </option>
          ))}
        </select>

        <Button
          variant="three"
          size="big"
          type="submit"
          className="rounded-md"
          onClick={() => setShowInputFilters(false)}
        >
          <img src="/search-box.svg" alt="" className="size-7" />
          <span className="text-xl font-medium">Filtrar</span>
        </Button>
      </form>
    </div>
  );
};
