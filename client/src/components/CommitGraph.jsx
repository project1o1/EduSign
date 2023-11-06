import React from 'react';

const CommitGraph = ({ commitDates }) => {
  if (!commitDates) return <div></div>;

  const renderGraph = () => {
    const currentDate = new Date();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const commitData = {};
    commitDates.forEach((date) => {
      const commitDate = new Date(date);
      if (
        commitDate.getMonth() === startDate.getMonth() &&
        commitDate.getFullYear() === startDate.getFullYear()
      ) {
        const day = commitDate.getDate();
        commitData[day] = (commitData[day] || 0) + 1;
      }
    });

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const commitCount = commitData[day] || 0;

      const styles = {
        commitGraphCell: {
          flex: '0 0 calc(100% / 7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40px',
        },
        commitGraphRectangle: {
          width: '20px',
          height: '20px',
        },
        commitGraphActive: {
          backgroundColor: '#3ac000',
        },
        commitGraphInactive: {
          backgroundColor: '#797979',
        },
      };

      return (
        <div key={day} style={styles.commitGraphCell}>
          <div
            style={{
              ...styles.commitGraphRectangle,
              ...(commitCount > 0 ? styles.commitGraphActive : styles.commitGraphInactive),
            }}
          />
        </div>
      );
    });
  };

  const styles = {
    commitGraphContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: '420px',
      margin: 'auto',
      marginBottom: '20px',
    },
    monthText: {
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentMonth = months[new Date().getMonth()];

  return (
    <div>
      <div style={styles.monthText}>{currentMonth}</div>
      <div style={styles.commitGraphContainer}>{renderGraph()}</div>
    </div>
  );
};

export default CommitGraph;
