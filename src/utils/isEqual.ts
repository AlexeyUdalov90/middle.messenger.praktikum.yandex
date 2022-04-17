import isArray from './isArray';
import isPlainObject from './isPlainObject';

function isEqual(lhs: PlainObject | [], rhs: PlainObject | []) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];

    if (isArray(value) && isArray(rightValue) || isPlainObject(value) && isPlainObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }

      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export default isEqual;
