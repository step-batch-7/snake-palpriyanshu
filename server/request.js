class Request {
  #url;
  constructor(method, url) {
    this.method = method;
    this.#url = url;
  }

  static parse(requestText) {
    const [request] = requestText.split('\n');
    const [method, url, protocol] = request.split(' ');
    const req = new Request(method, url);
    console.warn(req);
    return req;
  }

  get resource() {
    return this.#url;
  }

  set resource(address) {
    this.#url = address;
  }
}

module.exports = Request;
