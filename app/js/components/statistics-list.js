import React, { PropTypes } from 'react';

const StatisticsList = ({ statistics }) => {

  let statList = [];

  console.log('statistics', statistics);

  for (let prop in statistics) {
    if (statistics.hasOwnProperty(prop)) {
      statList.push(<li key={prop}>{`${prop}: ${statistics[prop]}`}</li>);
    }
  }

  return (
    <ul>
      {statList}
    </ul>
  );
};

StatisticsList.propTypes = {
  statistics: PropTypes.object.isRequired,
};

export default StatisticsList;
