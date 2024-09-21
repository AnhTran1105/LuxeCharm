import { validationResult } from "express-validator";
import Product from "../models/product.model.js";
import cloudinary from "cloudinary";
import { metalTypes } from "../constants.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    const expandedProducts = products.flatMap((product) => {
      const totalMetals = product.metals.length;
      return product.metals.map((metal) => ({
        _id: product._id,
        name: `${product.name} ${
          totalMetals > 1 ? `- ${metalTypes[metal.type]}` : ""
        }`,
        price: product.price,
        salePrice: product.salePrice,
        metal: metal,
        category: product.category,
        totalMetals,
      }));
    });

    res.json(expandedProducts);
  } catch (error) {
    next(error);
  }
};

export const getFilteredProducts = async (req, res) => {
  try {
    const { categories, metals, minPrice, maxPrice, sortBy } = req.query;

    let query = {};
    let sort = {};

    if (categories) {
      query.category = { $in: categories.split(",") };
    }

    if (metals) {
      query["metals.type"] = { $in: metals.split(",") };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      const minPriceNum = Number(minPrice) || 0;
      const maxPriceNum = Number(maxPrice) || Infinity;

      query.$or = [
        {
          $and: [
            { salePrice: null },
            { price: { $gte: minPriceNum, $lte: maxPriceNum } },
          ],
        },

        {
          $and: [
            { salePrice: { $ne: null } },
            { salePrice: { $gte: minPriceNum, $lte: maxPriceNum } },
          ],
        },

        {
          $and: [
            { salePrice: { $ne: null } },
            { price: { $gte: minPriceNum, $lte: maxPriceNum } },
            { $expr: { $lt: ["$price", "$salePrice"] } },
          ],
        },
      ];
    }

    switch (sortBy) {
      case "alphabetical_asc":
        sort = { name: 1 };
        break;
      case "alphabetical_desc":
        sort = { name: -1 };
        break;
      case "price_asc":
        sort = { price: 1 };
        break;
      case "price_desc":
        sort = { price: -1 };
        break;
      case "date_asc":
        sort = { createdAt: 1 };
        break;
      case "date_desc":
        sort = { createdAt: -1 };
        break;
      default:
        sort = { "rating.avgRating": -1 };
    }

    const filteredProducts = await Product.find(query).sort(sort);
    const allProducts = await Product.find();

    let highestPrice = 0;

    if (categories === "" && metals === "") {
      highestPrice = Math.max(
        ...allProducts.map((product) =>
          product.salePrice ? product.salePrice : product.price
        )
      );
    } else {
      highestPrice = Math.max(
        ...filteredProducts.map((product) =>
          product.salePrice ? product.salePrice : product.price
        )
      );
    }

    const expandedProducts = filteredProducts.flatMap((product) => {
      const filteredMetals = product.metals.filter(
        (metal) => !metals || metals.split(",").includes(metal.type)
      );

      if (filteredMetals.length === 0) return [];

      const totalMetals = filteredMetals.length;

      return filteredMetals.map((metal) => ({
        _id: product._id,
        name: `${product.name} ${
          totalMetals > 1 ? `- ${metalTypes[metal.type]}` : ""
        }`,
        price: product.price,
        salePrice: product.salePrice,
        metal: metal,
        category: product.category,
        totalMetals: totalMetals,
      }));
    });

    res.json({
      products: expandedProducts,
      highestPrice,
      totalProducts: allProducts.reduce((total, product) => {
        return total + product.metals.length;
      }, 0),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error filtering products", error: error.message });
  }
};

export const getProductsInfo = async (req, res, next) => {
  try {
    const products = await Product.find();

    const highestPrice = Math.max(
      ...products.map((product) =>
        Math.max(product.price, product.salePrice || product.price)
      )
    );

    const categoryCount = {
      bracelets: 0,
      charms: 0,
      earrings: 0,
      necklaces: 0,
      rings: 0,
    };

    const metalCount = {
      gold: 0,
      goldVermeil: 0,
      silver: 0,
      sterlingSilver: 0,
    };

    let totalProducts = 0;

    products.forEach((product) => {
      if (product.category in categoryCount) {
        categoryCount[product.category] += product.metals.length;
      }

      product.metals.forEach((metal) => {
        if (metal.type in metalCount) {
          metalCount[metal.type]++;
        }
      });

      totalProducts += product.metals.length;
    });

    const response = {
      highestPrice,
      categoryCount,
      metalCount,
      totalProducts,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const metals = [];

    for (const key in req.body) {
      const match = key.match(/metals\.(\d+)\.(\w+)/);
      if (match) {
        const index = parseInt(match[1]);
        const field = match[2];

        if (!metals[index]) {
          metals[index] = {
            metal: "",
            quantity: 0,
            material: "",
            images: {
              primary: "",
              secondary: "",
              others: [],
            },
          };
        }

        metals[index][field] = req.body[key];
      }
    }

    const careInstructions = [];
    const dimensions = JSON.parse(req.body.dimensions);

    for (const key in req.body) {
      const match = key.match(/careInstructions\.(\d+)\.(\w+)/);
      if (match) {
        const index = parseInt(match[1]);
        const field = match[2];

        if (!careInstructions[index]) {
          careInstructions[index] = {
            type: "",
            content: "",
          };
        }

        careInstructions[index][field] = req.body[key];
      }
    }

    for (let i = 0; i < metals.length; i++) {
      const metal = metals[i];

      const primaryFile = req.files[`metals.${i}.images.primary`];
      const secondaryFile = req.files[`metals.${i}.images.secondary`];
      const otherFiles = req.files[`metals.${i}.images.others`];

      if (primaryFile) {
        const primaryResult = await cloudinary.v2.uploader.upload(
          primaryFile[0].path,
          {
            folder: "products/images",
          }
        );
        metal.images.primary = primaryResult.secure_url;
      }

      if (secondaryFile) {
        const secondaryResult = await cloudinary.v2.uploader.upload(
          secondaryFile[0].path,
          {
            folder: "products/images",
          }
        );
        metal.images.secondary = secondaryResult.secure_url;
      }

      if (otherFiles && otherFiles.length > 0) {
        const otherImagePromises = otherFiles.map((file) =>
          cloudinary.v2.uploader.upload(file.path, {
            folder: "products/images",
          })
        );

        const otherResults = await Promise.all(otherImagePromises);
        metal.images.others = otherResults.map((result) => result.secure_url);
      }
    }

    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      salePrice: req.body.salePrice,
      metals: metals,
      dimensions: dimensions,
      careInstructions: careInstructions,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully!" });
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
  try {
    const productId = req.params.id;

    const deletedImages = JSON.parse(req.body.deletedImages);
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    for (let i = 0; i < product.metals.length; i++) {
      const metal = product.metals[i];

      for (const imageUrl of deletedImages) {
        if (metal.images.others.includes(imageUrl)) {
          const publicId = imageUrl.split("/").pop().split(".")[0];
          await cloudinary.v2.uploader.destroy(`products/images/${publicId}`);
          metal.images.others = metal.images.others.filter(
            (url) => url !== imageUrl
          );
        }
      }
    }

    const metals = [];
    for (const key in req.body) {
      const match = key.match(/metals\.(\d+)\.(\w+)/);
      if (match) {
        const index = parseInt(match[1]);
        const field = match[2];

        if (!metals[index]) {
          metals[index] = {
            metal: "",
            quantity: 0,
            material: "",
            images: {
              primary: product.metals[index]?.images.primary || "",
              secondary: product.metals[index]?.images.secondary || "",
              others: [...(product.metals[index]?.images.others || [])],
            },
          };
        }

        if (field === "images") {
          const imagesMatch = key.match(/metals\.(\d+)\.images\.(\w+)/);
          if (imagesMatch) {
            const imageField = imagesMatch[2];
            if (imageField === "others") {
              metals[index].images.others =
                product.metals[index]?.images.others || [];
            } else {
              metals[index].images[imageField] =
                product.metals[index]?.images[imageField] || "";
            }
          }
        } else {
          metals[index][field] = req.body[key];
        }
      }
    }

    const updatedMetals = await Promise.all(
      metals.map(async (metal, index) => {
        if (req.files[`metals.${index}.images.primary`]) {
          if (product.metals[index].images.primary) {
            const publicId = product.metals[index].images.primary
              .split("/")
              .pop()
              .split(".")[0];
            await cloudinary.v2.uploader.destroy(`products/images/${publicId}`);
          }
          const primaryResult = await cloudinary.v2.uploader.upload(
            req.files[`metals.${index}.images.primary`][0].path,
            { folder: "products/images" }
          );
          metal.images.primary = primaryResult.secure_url;
        } else {
          metal.images.primary = product.metals[index].images.primary;
        }

        if (req.files[`metals.${index}.images.secondary`]) {
          if (product.metals[index].images.secondary) {
            const publicId = product.metals[index].images.secondary
              .split("/")
              .pop()
              .split(".")[0];
            await cloudinary.v2.uploader.destroy(`products/images/${publicId}`);
          }
          const secondaryResult = await cloudinary.v2.uploader.upload(
            req.files[`metals.${index}.images.secondary`][0].path,
            { folder: "products/images" }
          );
          metal.images.secondary = secondaryResult.secure_url;
        } else {
          metal.images.secondary = product.metals[index].images.secondary;
        }

        if (req.files[`metals.${index}.images.others`]) {
          const otherFiles = req.files[`metals.${index}.images.others`];
          const otherImagePromises = otherFiles.map((file) =>
            cloudinary.v2.uploader.upload(file.path, {
              folder: "products/images",
            })
          );
          const otherResults = await Promise.all(otherImagePromises);
          metal.images.others.push(
            ...otherResults.map((result) => result.secure_url)
          );
        }

        return metal;
      })
    );

    product.metals = updatedMetals;
    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.salePrice =
      req.body.salePrice !== undefined ? req.body.salePrice : product.salePrice;
    product.dimensions = JSON.parse(req.body.dimensions);

    const careInstructions = [];
    for (const key in req.body) {
      const match = key.match(/careInstructions\.(\d+)\.(\w+)/);
      if (match) {
        const index = parseInt(match[1]);
        const field = match[2];
        if (!careInstructions[index]) {
          careInstructions[index] = { type: "", content: "" };
        }
        careInstructions[index][field] = req.body[key];
      }
    }
    product.careInstructions = careInstructions;

    await product.save();
    res.status(200).json({ message: "Product updated successfully!" });
  } catch (error) {
    next(error);
  }
};

export const searchProducts = async (req, res, next) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.json([]);
    }

    const products = await Product.find(
      {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      },
      {
        name: 1,
        metals: 1,
        price: 1,
        salePrice: 1,
        rating: 1,
      }
    ).limit(10);

    res.json(products);
  } catch (error) {
    next(error);
  }
};
