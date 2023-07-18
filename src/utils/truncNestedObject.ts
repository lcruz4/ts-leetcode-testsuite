const truncNestedObject = <T extends Record<string, any>>(obj: T) => {
  const keys = Object.keys(obj);
  const nestedKeys: string[] = [];

  for (const key of keys) {
    const subKeys = Object.keys(obj[key]);

    for (const subKey of subKeys) {
      if (keys.includes(subKey)) {
        nestedKeys.push(subKey);
      }
    }
  }

  for (const key of nestedKeys) {
    if (obj?.[key]?.[key]?.[key]?.[key]?.[key]?.[key]) {
      obj[key][key][key][key][key][key] = '[nested object]...';
    }
  }

  return obj;
};

export default truncNestedObject;
