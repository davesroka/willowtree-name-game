import fetch from 'isomorphic-fetch';

export default class ApiService {
  static getTeamMembers() {
    return new Promise((resolve, reject) => {
      fetch('http://api.namegame.willowtreemobile.com')
        .then(response => response.json())
        .then(resolve)
        .catch(reject);
    });
  }
}
