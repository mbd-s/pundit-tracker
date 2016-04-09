function index(req, res) {
 res.json({
   message: "Here you'll find information about Pundit Tracker's API.",
   documentation_url: "https://github.com/mbd-s/pundit-tracker",
   base_url: "",
   endpoints: [
     {method: "GET", path: "/api", description: "Describes all available endpoints."},
     {method: "GET", path: "/api/pundit", description: "Returns a list of all pundits."},
     {method: "GET", path: "/api/pundit/:punditId", description: "Shows a single pundit."},
     {method: "POST", path: "/api/pundit", description: "Adds a new pundit, or adds a " +
      "prediction to an existing pundit."},
     {method: "POST", path: "/api/prediction", description: "Adds a new prediction."},
     {method: "DELETE", path: "/api/pundit/:punditId", description: "Delete a pundit."}
   ]
 });
}

module.exports.index = index;
