import { contactTypeList } from '../../constants/contacts.js';

const parseType = (type) => {
  if (typeof type !== 'string') return;

  const isType = (type) => contactTypeList.includes(type);

  if (isType(type)) return type;
};

const parseBool = (value) => {
  if (typeof value !== 'string') return;

  if (value.toLowerCase() === 'true' || value === '1') return true;
  if (value.toLowerCase() === 'false' || value === '0') return false;

  return;
};

const parseContactFilterParams = ({ type, isFavourite }) => {
  const parsedType = parseType(type);
  const parsedIsFavourite = parseBool(isFavourite);

  return { type: parsedType, isFavourite: parsedIsFavourite };
};

export default parseContactFilterParams;
