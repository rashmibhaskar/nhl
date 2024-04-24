const express = require("express");
const bodyParser = require("body-parser");
const util = require("util");
const request = require("request");
import cookieParser from "cookie-parser";
import http from "http";

const PORT = process.env.PORT || 3001;
const app = express();
const post = util.promisify(request.post);
const get = util.promisify(request.get);


var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("port", PORT);

module.exports = app;

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

function filterKeys(obj, keysToKeep) {
  const filteredObject = {};
  keysToKeep.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      filteredObject[key] = obj[key]==null?"-":obj[key];
    }
  });
  return filteredObject;
}

function replaceNullsWithDashes(obj) {
  for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === null) {
          obj[key] = "-";
      }
  }
  return obj;
}

app.get("/api/teams/:sid/:gid", async (req, res) => {
  try {
    summaryReqConfig = {
      url: new URL(
        `https://api.nhle.com/stats/rest/en/team/summary?cayenneExp=seasonId=${req.params.sid}%20and%20gameTypeId=${req.params.gid}`
      ),
      json: true,
    };
    const summaryResponse = await get(summaryReqConfig);
    const summary = summaryResponse && summaryResponse.body.data;

    teamReqConfig = {
      url: new URL(`https://api.nhle.com/stats/rest/en/team`),
      json: true,
    };
    // Second API call using data from the first call (user id)
    const teamsResponse = await get(teamReqConfig);
    const teams = teamsResponse && teamsResponse.body.data;

    const finalArray = summary.map((item) => {
      const matchingItem = teams.find(
        (innerItem) => innerItem.fullName === item.teamFullName
      );
      return {
        ...item,
        triCode: matchingItem.triCode,
        gameId: req.params.gid
      };
    });

    const mergedArray = finalArray.map((item) => {
      return{
        ...replaceNullsWithDashes(item)
      }
    });
    res.json({
      mergedArray
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/api/teams/:sid", async (req, res) => {
  try {
    summaryReqConfig = {
      url: new URL(
        `https://api.nhle.com/stats/rest/en/team/summary?cayenneExp=seasonId=${req.params.sid}`
      ),
      json: true,
    };
    const summaryResponse = await get(summaryReqConfig);
    const summary = summaryResponse && summaryResponse.body.data;

    teamReqConfig = {
      url: new URL(`https://api.nhle.com/stats/rest/en/team`),
      json: true,
    };
    // Second API call using data from the first call (user id)
    const teamsResponse = await get(teamReqConfig);
    const teams = teamsResponse && teamsResponse.body.data;

    const mergedArray = summary.map((item) => {
      const matchingItem = teams.find(
        (innerItem) => innerItem.fullName === item.teamFullName
      );
      return {
        ...item,
        triCode: matchingItem.triCode,
      };
    });

    const keysToKeep = ["teamId", "teamFullName","triCode", "points", "gamesPlayed","wins", "losses","ties","seasonId"];

    finalArray = mergedArray.map((item) => {
      const filteredStats = filterKeys(item, keysToKeep)
      return {...filteredStats}
    })

    res.json({
      finalArray,
      mergedArray
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/api/seasons", async (req, res) => {
  const seasonURL = new URL(`https://api-web.nhle.com/v1/season`);
  const requestConfig = {
    url: seasonURL,
    json: true,
  };

  try {
    const response = await get(requestConfig);
    if (response.statusCode !== 200) {
      if (response.statusCode === 403) {
        res.status(403).send(response.body);
      } else {
        throw new Error(response.body.error.message);
      }
    }

    res.send(response);
  } catch (e) {
    res.send(e);
  }
});

app.get("/api/stats/:team/:sid/:gametype", async (req, res) => {
  const statURL = new URL(
    `https://api-web.nhle.com/v1/club-stats/${req.params.team}/${req.params.sid}/${req.params.gametype}`
  );
  const requestConfig = {
    url: statURL,
    json: true,
  };

  try {
    const response = await get(requestConfig);
    if (response.statusCode !== 200) {
      if (response.statusCode === 403) {
        res.status(403).send(response.body);
      } else {
        throw new Error(response.body.error.message);
      }
    }

    res.send(response);
  } catch (e) {
    res.send(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
