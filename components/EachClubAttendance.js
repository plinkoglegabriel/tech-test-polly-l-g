import React from 'react';
import interactionsData from '../data/interactions.json';

const Attendance = ({ clickedClub, attendedDates }) => {
  // function to format the date of attendance/interaction to exclude the time
  const formattedDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // collects attendance data for the clicked club if exists
  const clickedClubData = attendedDates[clickedClub] || {};

  // iterate over interactionsData relevant to the clicked club
  for (let i = 0; i < interactionsData.length; i++) {
    // stores interaction at current index as interaction
    const interaction = interactionsData[i];
    // extracts club/activity name and member details from interactionsData
    const { name, member } = interaction;

    // checks if the interaction is for the clicked club
    if (name === clickedClub) {
      // if name of activity is not already in clickedClubData then create new property in clickedClubData with that activity name
      if (!clickedClubData[name]) {
        clickedClubData[name] = {};
      }
    // if name of member is not already in clickedClubData[name] then create new property in clickedClubData[name] with that member's name
      if (!clickedClubData[name][member.name]) {
        clickedClubData[name][member.name] = [];
      }
       // add interaction dates to nested object (for specific person for CLICKED club/activity)
      clickedClubData[name][member.name].push(formattedDate(interaction.date));
    }
  }
  return (
    <div className="table-container">
      <h2 className="attendance-title"> Club Attendance </h2>
      {/* iterating over all keys from attendedDates  */}
      {Object.keys(clickedClubData).map((club, clubIndex) => (
        <div key={clubIndex}>
          {/* table for each club name */}
          <h3 className="attendance-table-title">{club}</h3>
          <table>
            <thead>
              <tr>
                <th>Names</th>
                <th>Dates of Attendance</th>
              </tr>
            </thead>
            <tbody>
              {/* iterates over an array of all members attending a specific club */}
              {Object.keys(clickedClubData[club]).map((member, memberIndex) => (
                // for that member it lits their name and the dates they atteded that particular club
                <tr key={memberIndex}>
                  <td>{member}</td>
                  <td>
                    {/* iterates over an array of all the dates a specific members attended a specific club*/}
                    {clickedClubData[club][member].map((date, dateIndex) => (
                      <div key={dateIndex}>{date}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Attendance;


// previous attempts

//   // uses the reduce method to create variable which will store the reduced data from interactions.json 
//   const attendedDates = interactionsData.reduce((accumulator, interaction) => {
//     // extracting the name of activity/club and member from 
//     const { name, member } = interaction;
//     // key to group data (name of member and name of activity)
//     const key = `${name}-${member.name}`;

//     //checks if key is not already in accumulator object
//     if (!accumulator[key]) {
//       // if not create new accumulator object using the current key
//       accumulator[key] = {
//         memberName: member.name,
//         clubName: name,
//         attendanceDates: [],
//       };
//     }

//     //  adds the new dates to attendanceDates array
//     accumulator[key].attendanceDates.push(formatDate(interaction.date));
//     return accumulator;
//   }, {});

//   // const attendedDates = {};

//   // using for loop instead of reducer
// // for (let i = 0; i < interactionsData.length; i++) {
// //   const interaction = interactionsData[i];
// //   const { name, member } = interaction;
// //   const key = `${name}-${member.name}`;

// //   if (!attendedDates[key]) {
// //     attendedDates[key] = {
// //       memberName: member.name,
// //       clubName: name,
// //       attendanceDates: [],
// //     };
// //   }

// //   attendedDates[key].attendanceDates.push(formatDate(interaction.date));
// // }


//   // creates array from object attendedDates
//   const attendedDate = Object.values(attendedDates);

//   return (
//     <div className="bg-white bg-opacity-80 p-16 text-center">
//       <h3 className="table-title">Club Attendance</h3>
//       {/* Creating table */}
//       <table>
//         <thead>
//           <tr>
//             <th>Names</th>
//             <th>Club</th>
//             <th>Attendance Dates</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* iterates over Dates array */}
//           {attendedDate.map((attendedDate, index) => (
//             <tr key={index}>
//               <td>{attendedDate.memberName}</td>
//               <td>{attendedDate.clubName}</td>
//               <td>
//                 {/* looping through attendanceDates array within current attendedDate object which has within in it attendanceDates array which is a list of dates where a particular member attended a particular club */}
//                 {attendedDate.attendanceDates.map((date, dateIndex) => (
//                   <div key={dateIndex}>{date}</div>
//                 ))}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Attendance;