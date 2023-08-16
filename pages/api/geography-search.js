const elasticsearch = require("elasticsearch");

const username = process.env.ELASTIC_USERNAME;
const password = process.env.ELASTIC_PASSWORD;
const url = process.env.ELASTIC_URL;

const client = new elasticsearch.Client({
  host: url,
  httpAuth: `${username}:${password}`,
});

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

async function geographySearch(req, res) {
  const data = req.body;
  let body;

  if (data.ids) {
    body = {
      size: data.ids.length,
      query: {
        ids: {
          values: data.ids,
        },
      },
    };
  } else {
    body = {
      sort: [
        {
          _geo_distance: {
            geopoint: {
              lat: data.lat,
              lon: data.lon,
            },
            order: "asc",
            unit: "km",
            mode: "min",
            distance_type: "plane",
            ignore_unmapped: true,
          },
        },
      ],
      from: 0,
      size: 50,
      query: {
        bool: {
          filter: {
            term: {
              type: data.type,
            },
          },
        },
      },
    };
  }

  const result = await client.search({
    index: "geographies",
    body,
  });

  res.status(200).json(result);
}

export default allowCors(geographySearch);
