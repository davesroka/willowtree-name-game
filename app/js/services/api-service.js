import fetch from 'isomorphic-fetch';

export const baseUrls = {
  willowTree: 'http://api.namegame.willowtreemobile.com',
  local: 'http://localhost:3000',
};
export const resourceUrls = {
  teamMembers: `${baseUrls.willowTree}`,
  statistics: `${baseUrls.local}/statistics`
};

export default class ApiService {


  static fetchResource(resourceType, resourceId) {
    return new Promise((resolve, reject) => {

      let url = resourceUrls[resourceType];
      url += (resourceId) ? `/${resourceId}` : '';

      fetch(url)
        .then(response => response.json())
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
