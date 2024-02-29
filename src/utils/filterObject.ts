export const filterObject = (obj: {
  [key in string]: string | undefined | null | boolean;
}) => {
  const keys = Object.keys(obj);
  return keys.reduce((o, key: string) => {
    const val = obj[key];

    if (val !== undefined) {
      o[key] = val;
    }
    return o;
  }, {});
};
