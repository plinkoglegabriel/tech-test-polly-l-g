const getPostcodeData = (postcode) => {
  const url = `https://api.postcodes.io/postcodes/${postcode}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.result);
};

export default getPostcodeData;
