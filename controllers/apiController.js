function index(req, res) {
 res.json({
   message: "Here you'll find information about available methods for the site's API.",
   documentation_url: "https://github.com/mbd-s/pundit-tracker",
   base_url: "",
   endpoints: [
     {method: "GET", path: "/api", description: "Describes all available endpoints"},
     {method: "GET", path: "/api/pundit", description: "Returns a list of all pundits"},
     {method: "GET", path: "/api/prediction", description: "Returns a list of all predictions"},
     {method: "GET", path: "/api/pundit/:id/prediction", description: "Returns a list of all predictions by a single pundit"},
     {method: "POST", path: "/api/prediction", description: "Adds a new prediction"},
     {method: "POST", path: "/api/pundit", description: "Adds a new pundit"}
   ]
 });
}

module.exports.index = index;
