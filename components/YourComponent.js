// You should use the data in /data/interactions.json
// Display, and allow a user to interact with this info in an interesting way.
import AttendanceIcon from '../media/attendance.png'
import MembersIcon from '../media/members.png'
import VenuesIcon from '../media/venues.png'
import Image from 'next/image';
import React, { useState } from 'react';
import Members from './Members';
import Venues from './Venues';
import Attendance from './AttendanceOptions';


const YourComponent = () => {
  const [selectedDiv, setSelectedDiv] = useState(null);

  // function to make clickable divs updating the selectedDiv state 
  const divClick = (div) => {
    setSelectedDiv(div);
  };

  return (
    <div className="bg-white bg-opacity-80 p-16 text-center">
      <div className="box-container">
        {/* three divs when clicked will set selectedDiv = to either 'members', 'venues' or 'attendance'*/}
        <div className="box-select" onClick={() => divClick('members')}>
          <h3 className="font-bold text-xl">Members</h3>
          <Image className="icon" src={MembersIcon} alt="Members Icon"/>
        </div>
        <div className="box-select" onClick={() => divClick('attendance')}>
          <h3 className="font-bold text-xl">Club Attendance</h3>
          <Image className="icon" src={AttendanceIcon} alt="Attendance Icon"/>
        </div>
        <div className="box-select" onClick={() => divClick('venues')}>
          <h3 className="font-bold text-xl">Venues</h3>
          <Image className="icon" src={VenuesIcon} alt="Venues Icon"/>
        </div>
      </div>
      {/* component will be rendered if image is clicked on */}
      {selectedDiv === 'members' && <Members />}
      {selectedDiv === 'attendance' && <Attendance />}
      {selectedDiv === 'venues' && <Venues />}
    </div>
  );
};

export default YourComponent;