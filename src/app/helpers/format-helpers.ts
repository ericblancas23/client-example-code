export const isValidEmail = (val: string): boolean => {
  return (
    String(val)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) !== null
  );
};

export const isValidUrl = (val: string): boolean => {
  try {
    new URL(val);
    return true;
  } catch {
    return false;
  }
};
