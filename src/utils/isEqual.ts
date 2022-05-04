import isArray from './isArray';
import isPlainObject from './isPlainObject';

function isEqual<L extends object | [], R extends object | []>(lhs: L, rhs: R): boolean {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key as keyof R];

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
