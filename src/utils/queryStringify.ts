import isArray from './isArray';
import isPlainObject from './isPlainObject';

function getKey(key: string, parentKey?: string): string {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = [];

  for(const [key, value] of Object.entries(data)) {
    if (isArray(value) || isPlainObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}


function queryStringify(data: PlainObject): string {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  return getParams(data).map(arr => arr.join('=')).join('&');
}

export default queryStringify;
