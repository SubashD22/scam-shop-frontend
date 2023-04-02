import db from "../../../utils/db";
import Product from "../../../utils/models/product";

const handler = async (req, res) => {
  await db();
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const Products = await Product.findOne({ slug: id });
      if (Products) {
        res.status(200).json(Products);
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
};

export default handler;
