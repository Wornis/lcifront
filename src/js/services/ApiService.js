import ApiRequest from 'Services/ApiRequest'

export default {
  form: {
      post: (body) => new ApiRequest('compta/add', {method: 'POST', body}).fetch()
  },
  compta: {
      get: ({month, year}) => new ApiRequest(`compta/${month}&${year}`).fetch()
  }
};