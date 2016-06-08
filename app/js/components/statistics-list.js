import React, { PropTypes } from 'react';

const StatisticsList = ({ statistics }) => {
  let statList = [];

  console.log('statistics', statistics);

  for (let prop in statistics) {
    if (statistics.hasOwnProperty(prop)) {
      const statistic = statistics[prop];
      if (statistic.displayName) {
        statList.push(
          <li key={prop}>{`${statistic.displayName}: ${statistic.value || 0}`}</li>
        );
      }
    }
  }

  return (
    <div className="statistics-list">
      <ul>
        {statList}
      </ul>
    </div>
  );
};

StatisticsList.propTypes = {
  statistics: PropTypes.object.isRequired,
};

export default StatisticsList;
