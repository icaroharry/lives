const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    return res.json(await connection("companies").select("*"));
  },

  async create(req, res) {
    const { name, email, instagram, category } = req.body;

    const id = crypto.randomBytes(4).toString("HEX");

    await connection("companies").insert({
      id,
      email,
      name,
      instagram,
      category
    });

    return res.json({ id });
  }
};
