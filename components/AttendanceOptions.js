import BalletIcon from '../media/ballet.png'
import FootballIcon from '../media/football.png'
import HomeworkIcon from '../media/homework.png'
import MentoringIcon from '../media/mentoring.png'
import TutoringIcon from '../media/tutoring.png'
import Image from 'next/image';
import React, { useState } from 'react';
import EachClubAttendance from './EachClubAttendance'


const AttendanceOptions = () => {
  const [selectedDiv, setSelectedDiv] = useState(null);

  // function to make clickable divs updating the selectedDiv state 
  const divClick = (div) => {
    setSelectedDiv(div);
  };

  const attendedDates = {};
  
  return (
    <div className="bg-white bg-opacity-80 p-16 text-center">
      <div className="box-container">
        {/* three divs when clicked will set selectedDiv = to either 'members', 'venues' or 'attendance'*/}
        <div className="box-select" onClick={() => divClick('Ballet')}>
          <h3>Ballet Attendance</h3>
          <Image className="icon" src={BalletIcon} alt="Ballet Icon"/>
        </div>
        <div className="box-select" onClick={() => divClick('Football Club')}>
          <h3>Football Club Attendance</h3>
          <Image className="icon" src={FootballIcon} alt="Football Icon"/>
        </div>
        <div className="box-select" onClick={() => divClick('Homework Club')}>
          <h3>Homework Club Attendance</h3>
          <Image className="icon" src={HomeworkIcon} alt="Homework Icon"/>
        </div>
        <div className="box-select" onClick={() => divClick('Mentoring')}>
          <h3>Mentoring Attendance</h3>
          <Image className="icon" src={MentoringIcon} alt="Mentoring Icon"/>
        </div>
        <div className="box-select" onClick={() => divClick('Tutoring')}>
          <h3>Tutoring</h3>
          <Image className="icon" src={TutoringIcon} alt="Tutoring Icon"/>
        </div>
      </div>
      {/* component will be rendered if image is clicked on */}
      {selectedDiv && (
        <EachClubAttendance
          clickedClub={selectedDiv}
          attendedDates={attendedDates}
        />
        )}
    </div>
  );
};

export default AttendanceOptions;