import fetch from 'isomorphic-fetch';

export const baseUrls = {
  willowTree: 'http://localhost:3000',
  local: 'http://localhost:3000',
};
export const resourceUrls = {
  teamMembers: `${baseUrls.willowTree}/teammembers`,
  statistics: `${baseUrls.local}/statistics`
};

export default class ApiService {


  static fetchResource(resourceType, resourceId) {
    return new Promise((resolve, reject) => {

      let url = resourceUrls[resourceType];
      url += (resourceId) ? `/${resourceId}` : '';

      fetch(url)
        .then(response => {
          console.log('response', response);
          return response.json()
        })
        .then(resolve)
        .catch(reject);
    });
  }

  static fetchTeamMembers() {
    return this.fetchResource('teamMembers');
  }

  static fetchStatistics(statisticId) {
    return this.fetchResource('statistics', statisticId);
  }
}
