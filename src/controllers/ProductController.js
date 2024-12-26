import Clothing from "../models/Clothing";
import Electronics from "../models/Electronics";
import Furniture from "../models/Furniture";

const PRODUCTS_API = "http://localhost:3001/products";

class ProductController {
  static async createProduct(productData) {
    try {
      let product;

      if (!productData.name || !productData.price || !productData.category || !productData.stockQuantity) {
        throw new Error("Name, price, category, and stock quantity are required");
      }

      switch (productData.category) {
        case "Electronics":
          product = new Electronics(
            productData.id,
            productData.name,
            productData.description,
            productData.price,
            productData.category,
            productData.stockQuantity,
            productData.brand,
            productData.warranty
          );
          break;
        case "Clothing":
          product = new Clothing(
            productData.id,
            productData.name,
            productData.description,
            productData.price,
            productData.category,
            productData.stockQuantity,
            productData.size,
            productData.material
          );
          break;
        case "Furniture":
          product = new Furniture(
            productData.id,
            productData.name,
            productData.description,
            productData.price,
            productData.category,
            productData.stockQuantity,
            productData.dimensions,
            productData.weight
          );
          break;
        default:
          throw new Error("Invalid category specified");
      }

      const response = await fetch(PRODUCTS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Could not create product");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating product:", error.message);
      return null;
    }
  }

  static async getProducts() {
    try {
      const response = await fetch(PRODUCTS_API);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const result = await response.json();

      return result.map((productData) => {
        switch (productData.category) {
          case "Electronics":
            return new Electronics(
              productData.id,
              productData.name,
              productData.description,
              productData.price,
              productData.category,
              productData.stockQuantity,
              productData.brand,
              productData.warranty
            );
          case "Clothing":
            return new Clothing(
              productData.id,
              productData.name,
              productData.description,
              productData.price,
              productData.category,
              productData.stockQuantity,
              productData.size,
              productData.material
            );
          case "Furniture":
            return new Furniture(
              productData.id,
              productData.name,
              productData.description,
              productData.price,
              productData.category,
              productData.stockQuantity,
              productData.dimensions,
              productData.weight
            );
          default:
            throw new Error("Invalid category encountered");
        }
      });
    } catch (error) {
      console.error("Error fetching products:", error.message);
      return null;
    }
  }
}

export default ProductController;
