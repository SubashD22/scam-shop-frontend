import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    price: 0,
  });
  const { name, image, description, price } = formData;
  const onInputChange = (e, type) => {
    console.log(e.target.files);
    let value;
    if (type === "img") {
      value = e.target.files[0];
    } else if (type === "num") {
      value = parseInt(e.target.value);
      console.log(value);
    } else value = e.target.value;
    setFormData((pdata) => ({
      ...pdata,
      [e.target.name]: value,
    }));
  };
  let disable = false;
  const submit = async (e) => {
    e.preventDefault();
    disable = true;
    const Data = new FormData();
    for (let key in formData) {
      Data.append(key, formData[key]);
    }
    const domain =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_DEV_URL
        : process.env.NEXT_PUBLIC_PROD_URL;
    const response = await axios.post(`${domain}/api/products`, Data);
    if (response) {
      setFormData({
        name: "",
        image: "",
        description: "",
        price: 0,
      });
      disable = false;
      toast.success("product added");
    }
  };
  return (
    <div>
      <Link href="/admin" style={{ margin: "0 auto", color: "gray" }}>
        Banner
      </Link>
      <div class="container">
        <form onSubmit={submit}>
          <div class="row">
            <div class="col-25">
              <label for="name">Name</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e, "text")}
                required
                disabled={disable}
              />
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="description">Description</label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e, "text")}
                required
                disabled={disable}
              />
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="price">Price</label>
            </div>
            <div class="col-75">
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e, "num")}
                required
                min={10}
                disabled={disable}
              />
            </div>
          </div>
          <div class="row">
            <div className="col-25">
              <label className="uploadButton" for="image">
                Upload
              </label>
            </div>
            <div className="col-75">
              <img
                style={{ width: "200px", height: "200px" }}
                src={image !== "" ? URL.createObjectURL(image) : null}
                alt=""
              />
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => onInputChange(e, "img")}
                style={{ display: "none" }}
                required
                disabled={disable}
              />
            </div>
          </div>
          <div class="row">
            <button className="bannerButton" type="submit" disabled={disable}>
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
