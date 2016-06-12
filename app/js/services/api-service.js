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
    let url = resourceUrls[resourceType];
    url += (resourceId) ? `/${resourceId}` : '';

    return fetch(url)
      .then(response => response.json())
      .then(this.sanitizeNames);
  }

  static fetchTeamMembers() {
    return this.fetchResource('teamMembers');
  }

  static fetchStatistics(statisticId) {
    return this.fetchResource('statistics', statisticId);
  }

  static sanitizeNames(teamMembers) {
    for (let teamMember of teamMembers) {
      const lastChar = teamMember.name.slice(-1);
      if (lastChar === '-' || !isNaN(parseInt(lastChar))) {
        teamMember.name = teamMember.name.slice(0, -1).trim();
      }
    }
    return teamMembers;
  }
}
