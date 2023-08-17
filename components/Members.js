import { useState } from 'react';
import React from 'react';
import freeMealsData from '../data/free_school_meal_eligible_children.json';
import interationsData from '../data/interactions.json';
import Tick from '../media/tick.png'
import Cross from '../media/cross.png'
import Image from 'next/image';


const Members = () => {
  // useState hook creating a set will names already displayed 
  const [namesDisplayed] = useState(new Set());

  // a function sorting members in increasing order of ids into an array.
  const sortedMembers = interationsData.slice().sort((a, b) => {
    return a.member.id - b.member.id;
  });

  // a function using data in the free_school_meal_eligible_children.json to check which children are eligible for free school meals
  const eligibleForFreeMeals = (childName) => {
    return freeMealsData.some(child => child.name === childName);
  };

  return (
    <div className="table-container">
      <h3 className="table-title">Members</h3>
      {/* Creating table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Postcode</th>
            <th>Date of Birth</th>
            <th>Eligible for Free School Meals?</th>
            <th>Attended Clubs</th>
          </tr>
        </thead>
        <tbody>
      {
        // map method to iterate over sorted array
        sortedMembers.map( member => {
          // if member is NOT in namesDisplayed their names are added to the set
          if (!namesDisplayed.has(member.member.name)) {
            namesDisplayed.add(member.member.name);
          
            //  eligibleForFreeMeals function is called
            const isEligible = eligibleForFreeMeals(member.member.name);

            // finds a member's previous interactions
             const attendedInteractions = interationsData.filter(
                (interaction) =>
                  interaction.member.name === member.member.name
              );

              // function that extracts the name of activities/clubs a member participated in and stores them in a set
              const attendedClubs = [
                ...new Set(attendedInteractions.map((interaction) => interaction.name)),
              ].join(', ');
    

          return(
            //  filling the table rows with data 
            <tr key={member.member.id}>
                <td>{ member.member.id }</td>
                <td>{ member.member.name }</td>
                <td>{member.member.postcode}</td>
                <td>{member.member.dateOfBirth}</td>
                {/* renders a tick image or cross image depending on whether the member is in isEligible */}
                <td>{isEligible ? <Image src={Tick} alt="Yes" width={20} height={20} /> : <Image src={Cross} alt="No" width={20} height={20} />}</td>
                <td>{attendedClubs}</td>
            </tr>
          );
          }
        })
      }
        </tbody>
      </table>
    </div>
  );
};

export default Members;