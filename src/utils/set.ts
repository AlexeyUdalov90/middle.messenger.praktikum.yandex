import merge from './merge';
import isPlainObject from './isPlainObject';

function set(object: PlainObject | unknown, path: string, value: unknown): PlainObject | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (isPlainObject(object)) {
    const obj = path.split('.').reduceRight((acc, item, index, arr) => {
      return index === arr.length - 1 ? { [item]: value } : { [item]: acc };
    }, {});

    return merge(object as PlainObject, obj as PlainObject);
  }

  return object;
}

export default set;
