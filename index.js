const express = require("express");
const fetch = require("node-fetch");
const redis = require("redis");
const axios = require("axios");

const PORT = 3000;
const REDIS_PORT = 6379;

let client;

(async () => {
  client = redis.createClient();

  client.on("error", (error) => console.error(`Error : ${error}`));

  await client.connect();
})();

const app = express();

// Set response
function setResponse(username, repos) {
  return `<h2>${username} has ${repos} Github repos</h2>`;
}

// Make request to Github for data
async function getRepos(req, res, next) {
  try {
    console.log("Fetching Data...");

    const username = req.params.username;

    console.log(username);

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const repos = response.data.public_repos;

    //Set data to Redis
    client.set(username, repos);

    res.send(setResponse(username, repos));
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}


// Cache middleware
async function cache(req, res, next) {
  const { username } = req.params;

  const data = await client.get(username);

  if (data) {
    res.send(setResponse(username, data));
  } else {
    next();
  }
}

app.get("/repos/:username", cache, getRepos);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});   