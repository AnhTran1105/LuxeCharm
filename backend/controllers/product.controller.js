import { validationResult } from "express-validator";
import Product from "../models/product.model.js";
import cloudinary from "cloudinary";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort("-lastUpdated");
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const backgroundImage = await cloudinary.v2.uploader.upload(
      req.files.backgroundImage[0].path,
      {
        folder: "products/backgrounds",
      }
    );
    const hoverImage = await cloudinary.v2.uploader.upload(
      req.files.hoverImage[0].path,
      {
        folder: "products/hovers",
      }
    );
    const imageUrls = await Promise.all(
      req.files.imageUrls.map(async (file) => {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: "products/images",
        });
        return result.secure_url;
      })
    );

    const quantities = req.body.metals.map((metal, index) => ({
      metal: metal,
      quantity: req.body.quantities[index],
    }));

    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      metals: req.body.metals,
      quantities: quantities,
      backgroundImage: backgroundImage.secure_url,
      hoverImage: hoverImage.secure_url,
      imageUrls,
    });

    await newProduct.save();
    res.status(201).json("Product created successfully!");
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.params.id.toString();
  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProducts = async (req, res, next) => {
  const { productIds } = req.body;

  if (!Array.isArray(productIds) || productIds.length === 0) {
    return res.status(400).json({ message: "Invalid productIds array." });
  }

  try {
    const result = await Product.deleteMany({ _id: { $in: productIds } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No products found to delete." });
    }

    return res.status(200).json({
      message: `${result.deletedCount} product(s) successfully deleted.`,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  console.log(req.body);

  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (
      req.body.imagesToDelete &&
      Array.isArray(JSON.parse(req.body.imagesToDelete))
    ) {
      const imagesToDelete = JSON.parse(req.body.imagesToDelete);
      for (const imageUrl of imagesToDelete) {
        await cloudinary.v2.uploader.destroy(imageUrl);
        product.imageUrls = product.imageUrls.filter((url) => url !== imageUrl);
      }
    }

    if (req.files && req.files.imageUrls) {
      const newImageUrls = await Promise.all(
        req.files.imageUrls.map(async (file) => {
          const result = await cloudinary.v2.uploader.upload(file.path, {
            folder: "products/images",
          });
          return result.secure_url;
        })
      );
      product.imageUrls.push(...newImageUrls);
    }

    const quantities = req.body.metals.map((metal, index) => ({
      metal: metal,
      quantity: req.body.quantities[index],
    }));

    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.quantities = quantities || product.quantities;
    product.metals = req.body.metals || product.metals;

    if (req.files && req.files.backgroundImage) {
      product.backgroundImage = (
        await cloudinary.v2.uploader.upload(req.files.backgroundImage[0].path, {
          folder: "products/backgrounds",
        })
      ).secure_url;
    }

    if (req.files && req.files.hoverImage) {
      product.hoverImage = (
        await cloudinary.v2.uploader.upload(req.files.hoverImage[0].path, {
          folder: "products/hovers",
        })
      ).secure_url;
    }

    await product.save();
    res.status(200).json({ message: "Product updated successfully!" });
  } catch (error) {
    next(error);
  }
};
