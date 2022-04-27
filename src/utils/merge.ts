import isPlainObject from './isPlainObject';

function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
  for (const key of Object.keys(rhs)) {
    try {
      if (isPlainObject(rhs[key])) {
        lhs[key] = merge(lhs[key] as PlainObject, rhs[key] as PlainObject);
      } else {
        lhs[key] = rhs[key];
      }
    } catch {
      lhs[key] = rhs[key];
    }
  }

  return lhs;
}

export default merge;
