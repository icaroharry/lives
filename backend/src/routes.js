const { Router } = require("express");

const CompanyController = require("./controllers/CompanyController");
const CompanyProfileController = require("./controllers/CompanyProfileController");
const LiveController = require("./controllers/LiveController");
const SessionController = require("./controllers/SessionController");

const routes = Router();

routes.post("/sessions", SessionController.create);

routes.get("/companies", CompanyController.index);
routes.post("/companies", CompanyController.create);

routes.get("/company/profile", CompanyProfileController.index);

routes.get("/lives", LiveController.index);
routes.post("/lives", LiveController.create);
routes.delete("/lives/:id", LiveController.delete);

module.exports = routes;
