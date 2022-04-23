import { queryStringify } from '../utils'

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type RequestData = string | FormData;
type RequestOptions = {
  data?: RequestData;
  method?: METHOD;
  headers?: Record<string, string>;
  timeout?: number;
};

export default class HTTPTransport {
  protected apiBaseUrl: string | undefined;

  constructor(baseUrl?: string) {
    this.apiBaseUrl = baseUrl
  }

  get = <T>(url: string, options: RequestOptions = {}): Promise<T> => {
    return this.request<T>(url, {...options, method: METHOD.GET}, options.timeout);
  };

  put = <T>(url: string, options: RequestOptions = {}): Promise<T> => {
    return this.request<T>(url, {...options, method: METHOD.PUT}, options.timeout);
  };

  post = <T>(url: string, options: RequestOptions = {}): Promise<T> => {
    return this.request<T>(url, {...options, method: METHOD.POST}, options.timeout);
  };

  delete = <T>(url: string, options: RequestOptions = {}): Promise<T> => {
    return this.request<T>(url, {...options, method: METHOD.DELETE}, options.timeout);
  };

  fetch = <T>(url: string, options: RequestOptions = {}): Promise<T> => {
    return this.request<T>(url, options, options.timeout);
  };

  request = <T>(url: string, options: RequestOptions, timeout = 5000): Promise<T> => {
    const {method = METHOD.GET, data, headers = {}} = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');

        return;
      }
      const xhr = new XMLHttpRequest();
      let requestUrl = url;
      const isGet = method === METHOD.GET;

      if (this.apiBaseUrl) {
        requestUrl = `${this.apiBaseUrl}${requestUrl}`
      }

      xhr.open(method, isGet && !!data ? `${requestUrl}${queryStringify(data)}` : requestUrl)

      xhr.withCredentials = true

      Object.keys(headers).forEach(name => {
        xhr.setRequestHeader(name, headers[name]);
      })

      xhr.onload = function() {
        const isJson = xhr.getResponseHeader('content-type')?.includes('application/json');

        if (isJson) {
          resolve(JSON.parse(xhr.response));
        } else {
          resolve(xhr.response)
        }


      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.timeout = timeout;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
