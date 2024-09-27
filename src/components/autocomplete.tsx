import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { Company } from '../types/api';

type AutocompleteProps = {
  companies: Company[];
  onCompanySelect: (company: Company) => void;
  clearInput: boolean;
};

export const Autocomplete = ({ companies, onCompanySelect, clearInput }: AutocompleteProps) => {
  const [query, setQuery] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(companies);
  const [showCompanies, setShowCompanies] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setQuery(userInput);

    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(userInput.toLowerCase()),
    );

    setFilteredCompanies(filtered);
    setShowCompanies(true);
    setSelectedIndex(-1);
  };

  const handleClick = (company: Company) => {
    setQuery(company.name);
    setFilteredCompanies([]);
    setShowCompanies(false);
    onCompanySelect(company);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => (prevIndex < filteredCompanies.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      const selectedCompany = filteredCompanies[selectedIndex];
      setQuery(selectedCompany.name);
      setShowCompanies(false);
      onCompanySelect(selectedCompany);
    }
  };

  const handleFocus = () => {
    setFilteredCompanies(companies);
    setShowCompanies(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowCompanies(false), 100);
  };

  useEffect(() => {
    if (clearInput) {
      setQuery('');
    }
  }, [clearInput]);

  return (
    <div className="relative">
      <input
        type="text"
        className="w-full py-2 rounded-lg text-white bg-section outline-none font-semibold"
        placeholder="Selecione ou digite..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {showCompanies && (
        <ul className="absolute left-0 right-0 bg-section rounded-lg mt-1 max-h-48 overflow-y-auto z-10">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <li
                key={company.id}
                className="flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-primary text-white justify-center"
                onMouseDown={() => handleClick(company)}
              >
                {company.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-white">Nenhuma empresa encontrada</li>
          )}
        </ul>
      )}
    </div>
  );
};
