import config from 'Config';
import processResponse from "Utils/processResponse";

const ENGINE_HOST = config.engine.host;
const sampleHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export default class ApiRequest {
  /**
   * @param route {String} URI of wanted method
   * @param [options] Options of the request
   * @param [options.method] Method of the request, fill if other than 'GET'
   * @param [options.headers] Headers of the request, fill if other than 'application/json'
   * @param [options.body] Datas to send with POST request
   */
  constructor(route, options) {
    this.route = `${ENGINE_HOST}/${route}`;
    this.options = {};
    if (options) {
      this.options.method = options.method ? options.method : 'GET';
      this.options.headers = options.headers ? options.headers : sampleHeaders;
      options.body ? this.options.body = JSON.stringify(options.body) : null;
    }
  }

  fetch() {
    return fetch(this.route, this.options)
      .then(response => processResponse(response))
      .then(datas => ({datas}))
      .catch(error => ({error}));
  }
};