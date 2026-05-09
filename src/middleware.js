const isPlainObject = (val) => {
  return val !== null && typeof val === "object" && !Array.isArray(val);
};

const trimData = (obj) =>
  // Source - https://stackoverflow.com/a/51616282
  // Posted by cнŝdk, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-05-09, License - CC BY-SA 4.0

  Object.keys(obj).forEach(
    (k) => (obj[k] = typeof obj[k] === "string" ? obj[k].trim() : obj[k]),
  );

export {
  isPlainObject,
  trimData,
}