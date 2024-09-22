import { SORT_ORDER } from '../constants/index.js';

const parseSortParams = ({ sortBy, sortFields, sortOrder }) => {
  const parsedSortBy = sortFields.includes(sortBy) ? sortOrder : '_id';
  const parseSortOrder = SORT_ORDER.includes(sortOrder)
    ? sortOrder
    : SORT_ORDER[0];

  return {
    sortBy: parsedSortBy,
    sortOrder: parseSortOrder,
  };
};

export default parseSortParams;
