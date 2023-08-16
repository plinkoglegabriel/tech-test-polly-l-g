const fetchGeoJSON = async ({ code, type, lat, lon }) => {
  // fetch geoJSON from API
  // code can be fetched from the postcodes API (codes.admin_district or codes.admin_ward)

  // types are 'lad' (borough) and 'ward' (electoral ward/division), you will need to pass a lat/lon to get the closest one

  const requestBody = code
    ? {
        ids: [code],
      }
    : JSON.stringify({
        type,
        lat,
        lon,
      });

  const data = await fetch(
    "https://tts-tech-test.vercel.app/api/geography-search",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data?.hits?.hits || data?.hits?.hits?.length === 0) {
        return null;
      }
      return data.hits.hits[0]._source.geoshape;
    });

  return data;
};

export default fetchGeoJSON;
