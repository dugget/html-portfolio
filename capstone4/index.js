import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const CLIENT_ID = "182206";
const CLIENT_SECRET = "7f1cb3900d7a98e41d368b839248618df657656c";
const REDIRECT_URI = "http://localhost:3000/auth/strava/callback";

// Handle auth
app.get("/auth/strava", (req, res) => {
  const authURL = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code&approval_prompt=force&scope=read,read_all,profile:read_all`;
  res.redirect(authURL);
});

// Handle callback
app.get("/auth/strava/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code received");
  // Exchange code for access token
  try {
    const tokenResponse = await axios.post(
      "https://www.strava.com/oauth/token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
      }
    );
    // Get athlete data
    const { access_token } = tokenResponse.data;
    const athleteResponse = await axios.get(
      "https://www.strava.com/api/v3/athlete",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    const athlete = athleteResponse.data;
    const gear = {
      bikes: athlete.bikes || [],
      shoes: athlete.shoes || [],
    };
    res.render("gear.ejs", { gear: gear });
  } catch (error) {
    console.error(error.response?.data);
    return res.status(500).send("Authentication failed");
  }
});
// Handle home page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
