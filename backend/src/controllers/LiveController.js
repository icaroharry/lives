const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const [count] = await connection("lives").count();
    const lives = await connection("lives")
      .join("companies", "companies.id", "=", "lives.company_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "lives.*",
        "companies.name",
        "companies.instagram",
        "companies.category"
      ]);

    res.header("X-Total-Count", count["count(*)"]);
    return res.json(lives);
  },

  async create(req, res) {
    const { title, description, date } = req.body;

    const { authorization: company_id } = req.headers;

    const [id] = await connection("lives").insert({
      title,
      description,
      date,
      company_id
    });

    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const company_id = req.headers.authorization;

    const live = await connection("lives")
      .where("id", id)
      .select("company_id")
      .first();

    if (live.company_id !== company_id) {
      return res.status(401).json({ error: "Operation not allowed." });
    }

    await connection("lives")
      .where("id", id)
      .delete();
    return res.status(204).send();
  }
};
