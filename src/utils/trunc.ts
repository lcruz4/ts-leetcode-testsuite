const trunc = (str: string): string => {
  const truncStr = str.slice(0, 200);
  return truncStr + (truncStr.length !== str.length ? '...' : '');
};

export default trunc;
