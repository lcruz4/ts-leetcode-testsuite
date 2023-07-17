const importDefault = async (path: string) => {
  try {
    const { default: index } = await import(path);
    return index;
  } catch (e) {}
};

export default importDefault;
