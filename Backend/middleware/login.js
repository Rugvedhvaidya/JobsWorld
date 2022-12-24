const jwt = require("jsonwebtoken");

// This function/middleware  is used to check if the user is valid or not.
// Here we will convert jwtToken into user_id.
exports.authenticateToken = (req, res, next) => {
  let jwtToken;
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    res.status(401);
    res.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
      if (error) {
        res.status(401);
        res.send("Invalid JWT Token");
      } else {
        req.user_id = payload.user_id;
        next();
      }
    });
  }
};
