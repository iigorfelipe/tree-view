import { TreeState } from '../store';

export const isActiveFilters = (filters: TreeState['filters']) =>
  filters.inputValue.trim().length > 0 ||
  filters.selectValue !== 'all' ||
  (filters.inputValue.trim().length > 0 && filters.selectValue === 'all');
