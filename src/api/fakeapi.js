import axios from 'axios';

const GET_POSTS_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";

class API {
  constructor(api) {
    this.api = api;
  }

  getPosts = () => {
    return this.api.get(GET_POSTS_ENDPOINT);
  };
}

export default new API(axios);