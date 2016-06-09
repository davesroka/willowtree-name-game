import React, { PropTypes } from 'react';
import Table from 'react-bootstrap';

const StatisticsList = ({ statistics }) => {
  let statList = [];

  console.log('statistics', statistics);

  for (let prop in statistics) {
    if (statistics.hasOwnProperty(prop)) {
      const statistic = statistics[prop];
      if (statistic.displayName) {
        statList.push(
          <tr key={prop}>
            <td>{statistic.displayName}</td>
            <td>{statistic.value || 0}</td>
          </tr>
        );
      }
    }
  }

  return (
    <div className="statistics-list">
      <table className="statistics-table">
        <tbody>
        {statList}
        </tbody>
      </table>
    </div>
  );
};

StatisticsList.propTypes = {
  statistics: PropTypes.object.isRequired,
};

export default StatisticsList;
