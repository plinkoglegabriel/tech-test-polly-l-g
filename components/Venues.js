import { useState } from 'react';
import React from 'react';
import VenuesData from '../data/venues.json';
import interactionsData from '../data/interactions.json';


const Venues = () => {
  // stores previously displayed venues in a set
  const [venuesDisplayed] = useState(new Set());

  // sorts the names if the venues alphabetically (easier to read)
  const  alphabetised = VenuesData.slice().sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  // gets activities held at a venue using venueId from interactionsData.json
  const activitiesAtVenue = (venueId) => {
    const activities = interactionsData.filter(
      // checks if parameter venueId === venueId held in a specific interaction in interactionsData.json
      (interaction) => interaction.venueId === venueId
    );
    // create array of unique club names  
    return [...new Set(activities.map((club) => club.name))].join(', ');
  };

  return (
    // Creating table
    <div className="bg-white bg-opacity-80 p-16 text-center">
      <h3 className="table-title">Venues</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Venue Names</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Clubs held here</th>

            </tr>
          </thead>
          <tbody>
        {
          // map function (allows for iteration over alphabetised array)
          alphabetised.map( venue => {
            // conditional statement: if the venue name had not been previously displayed then add it
            if (!venuesDisplayed.has(venue.name)) {
              venuesDisplayed.add(venue.name);

          // retrieve clubs/activities at a specific venue using venues.json
          const clubsAtVenue = activitiesAtVenue(venue.id);


            return(
              <tr key={venue.id}>
                {/* table contents rendering from venues.json */}
                  <td>{ venue.name }</td>
                  <td>{venue.lat}</td>
                  <td>{venue.lon}</td>
                  <td>{clubsAtVenue}</td>
              </tr>
            );
            }
          })
        }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Venues;