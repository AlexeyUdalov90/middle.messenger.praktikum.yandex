import { APIError } from '../api/types';

export default function hasError(response: Record<string, unknown> | Array<unknown> | APIError): boolean {
  return response && !Array.isArray(response) && Boolean(response?.reason);
}
