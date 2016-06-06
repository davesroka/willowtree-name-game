import fetch from 'isomorphic-fetch';

export default class ApiService {
  static getTeamMembers() {
    return new Promise((resolve, reject) => {
      // fetch('http://api.namegame.willowtreemobile.com')
      fetch('http://localhost:3000/db')
        .then(response => response.json())
        .then(resolve)
        .catch(reject);
    });
  }
}
