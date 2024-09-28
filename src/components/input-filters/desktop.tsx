import { FormEvent } from 'react';
import { useAssetTree } from '../../contexts/asset-tree';
import { useTreeStore } from '../../store';
import { isActiveFilters } from '../../utils/is-active-filter';
import { SelectOptionKeys, selectOptions } from '../../utils/selectOptions';
import { Button } from '../button';

type InputFiltersToDesktopProps = {
  submitFilter: (event: FormEvent) => void;
};

export const InputFiltersToDesktop = ({ submitFilter }: InputFiltersToDesktopProps) => {
  const { clearFilters } = useAssetTree();
  const { filters, textInputValue, setTextInputValue, selectInputValue, setSelectInputValue } =
    useTreeStore();

  return (
    <form onSubmit={submitFilter} className="flex w-full max-w-[750px] gap-4 items-center justify-start">
      <input
        type="text"
        placeholder="Buscar Ativo ou Local..."
        className="py-2 px-3 rounded-md text-text mobile:min-w-[193px] laptop:min-w-[360px] outline-none border"
        value={textInputValue}
        onChange={({ target: { value } }) => setTextInputValue(value)}
      />

      <select
        className="outline-none py-2 rounded-md px-3 text-text appearance-none tablet:min-w-[193px] border"
        value={selectInputValue}
        onChange={({ target: { value } }) => setSelectInputValue(value as SelectOptionKeys)}
      >
        {Object.entries(selectOptions).map((option) => (
          <option key={option[0]} value={option[0]}>
            {option[1]}
          </option>
        ))}
      </select>

      <Button variant="three" type="submit">
        <img src="./search-box.svg" alt="filter icon" />
        <span>Filtrar</span>
      </Button>

      {isActiveFilters(filters) && (
        <Button variant="three" onClick={clearFilters}>
          <span>X</span>
        </Button>
      )}
    </form>
  );
};
