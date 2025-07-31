const truncate = (str, max) => {
  if (!str) return "";
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
};

export default truncate;
