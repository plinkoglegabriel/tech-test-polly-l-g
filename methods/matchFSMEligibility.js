import people from "../data/free_school_meal_eligible_children.json" assert { type: "JSON" };

const matchFSMEligibility = ({ name, postcode, dateOfBirth }) => {
  let eligibility = false;
  if (
    people.find(
      (person) =>
        person.name === name &&
        person.postcode === postcode &&
        person.dateOfBirth === dateOfBirth
    )
  ) {
    eligibility = true;
  }
  return eligibility;
};

export default matchFSMEligibility;
