enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type RequestData = Record<string, any>;
type RequestOptions = {
  data?: RequestData;
  method?: METHOD;
  headers?: Record<string, string>;
  timeout?: number;
};

function queryStringify(data: RequestData): string {
  return Object.entries(data).reduce((res, [key, value], index) => {
    if (value.toString) {
      value = value.toString()
    }

    return index > 0 ?`${res}&${key}=${value}` : `${res}${key}=${value}`
  }, '?')
}

export default class HTTPTransport {
  get = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(url, {...options, method: METHOD.GET}, options.timeout);
  };

  put = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(url, {...options, method: METHOD.PUT}, options.timeout);
  };

  post = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(url, {...options, method: METHOD.POST}, options.timeout);
  };

  delete = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(url, {...options, method: METHOD.DELETE}, options.timeout);
  };

  fetch = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(url, options, options.timeout);
  };

  request = (url: string, options: RequestOptions, timeout: number = 5000): Promise<XMLHttpRequest> => {
    const {method = METHOD.GET, data, headers = {}} = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');

        return;
      }
      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url)

      Object.keys(headers).forEach(name => {
        xhr.setRequestHeader(name, headers[name]);
      })

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.timeout = timeout;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
