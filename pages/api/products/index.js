import db from "../../../utils/db";
import Product from "../../../utils/models/product";

const handler = async (req, res) => {
  await db();
  if (req.method === "GET") {
    try {
      const Products = await Product.find({}).limit(3);
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
