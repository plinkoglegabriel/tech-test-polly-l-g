import React from 'react';
import interactionsData from '../data/interactions.json';


const Attendance = () => {
  // function to format the date of attendance/interaction to exclude the time
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // uses the reduce method to create variable which will store the reduced data from interactions.json 
  const attendedDates = interactionsData.reduce((accumulator, interaction) => {
    // extracting the name of activity/club and member from 
    const { name, member } = interaction;
    // key to group data (name of member and name of activity)
    const key = `${name}-${member.name}`;

    //checks if key is not already in accumulator object
    if (!accumulator[key]) {
      // if not create new accumulator object using the current key
      accumulator[key] = {
        memberName: member.name,
        clubName: name,
        attendanceDates: [],
      };
    }

    //  adds the new dates to attendanceDates array
    accumulator[key].attendanceDates.push(formatDate(interaction.date));
    return accumulator;
  }, {});

  // creates array from object attendedDates
  const attendedDate = Object.values(attendedDates);

  return (
    <div className="bg-white bg-opacity-80 p-16 text-center">
      <h3 className="table-title">Club Attendance</h3>
      {/* Creating table */}
      <table>
        <thead>
          <tr>
            <th>Names</th>
            <th>Club</th>
            <th>Attendance Dates</th>
          </tr>
        </thead>
        <tbody>
          {/* iterates over Dates array */}
          {attendedDate.map((attendedDate, index) => (
            <tr key={index}>
              <td>{attendedDate.memberName}</td>
              <td>{attendedDate.clubName}</td>
              <td>
                {/* looping through attendanceDates array within current attendedDate object which has within in it attendanceDates array which is a list of dates where a particular member attended a particular club */}
                {attendedDate.attendanceDates.map((date, dateIndex) => (
                  <div key={dateIndex}>{date}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
