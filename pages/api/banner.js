import Banner from "../../utils/models/banner";
import Product from "../../utils/models/product";
import db from "../../utils/db";

const handler = async (req, res) => {
  await db();
  if (req.method === "GET") {
    try {
      const banner = await Banner.find({});
      if (banner) {
        res.status(200).json(banner[0]);
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
  if (req.method === "POST") {
    const { saleName, discount, timePeriod, slug } = req.body;
    const updateproduct = await Product.findOneAndUpdate(
      { slug },
      { discount: parseInt(discount) }
    );
    const banner = await Banner.find({});
    if (banner.length === 1) {
      const newBanner = await Banner.findByIdAndUpdate(
        banner[0]._id,
        {
          saleName,
          discount: parseInt(discount),
          timePeriod,
          slug,
          image: updateproduct.image,
        },
        { new: true }
      );
      if (newBanner) {
        await Product.updateMany(
          { slug: { $ne: newBanner.slug } },
          { discount: 0 }
        );
        res.status(200).json(newBanner);
      } else {
        res.status(400);
        throw new Error("product not found");
      }
    } else if (banner.length === 0) {
      const newBanner = await Banner.create({
        saleName,
        discount: parseInt(discount),
        timePeriod,
        slug,
        image: updateproduct.image,
        imageId: req.files.image[0].filename,
      });
      if (newBanner) {
        await Product.updateMany(
          { slug: { $ne: newBanner.slug } },
          { discount: 0 }
        );
        res.status(200).json(newBanner);
      } else {
        res.status(400);
        throw new Error("product not found");
      }
    }
  }
};
export default handler;
