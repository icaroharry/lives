const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { authorization: company_id } = req.headers;
    return res.json(
      await connection("lives")
        .where("company_id", company_id)
        .select("*")
    );
  }
};
