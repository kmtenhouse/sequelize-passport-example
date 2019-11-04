// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
    // If the user is logged in, continue with the request to the restricted api route
    if (req.user) {
      return next();
    }
  
    // If the user isn't logged in, send a 403 forbidden 
    return res.sendStatus(403);
  };