const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data) {
  // Можно делать трансформацию GET-параметров в отдельной функции
  return Object.entries(data).reduce((res, [key, value], index) => {
    if (value.toString) {
      value = value.toString()
    }

    return index > 0 ?`${res}&${key}=${value}` : `${res}${key}=${value}`
  }, '?')
}

class HTTPTransport {
  get = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };

  put = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };

  post = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };

  delete = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  fetch = (url, options = {}) => {
    return this.request(url, options, options.timeout);
  };

  // PUT, POST, DELETE

  // options:
  // headers — obj
  // data — obj
  request = (url, options, timeout = 5000) => {
    const {method = METHODS.GET, data, headers = {}} = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');

        return;
      }
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

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
        xhr.send(data);
      }
    });
  };
}

function fetchWithRetry(url, options) {
  let { retries = 1 } = options;

  function errorHandler (error) {
    --retries;

    if (retries > 0) {
      return fetchWithRetry(url, {...options, retries: retries});
    }

    throw error;
  }

  return new HTTPTransport().fetch(url, options)
    .catch(errorHandler);
}

new HTTPTransport().get('https://jsonplaceholder.typicode.com/posts');
new HTTPTransport().put('https://jsonplaceholder.typicode.com/posts/1', {
  data: {
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1
  },
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
});
new HTTPTransport().post('https://jsonplaceholder.typicode.com/posts', {
  data: {
    title: 'foo',
    body: 'bar',
    userId: 1,
  },
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})
new HTTPTransport().delete('https://jsonplaceholder.typicode.com/posts/1');
