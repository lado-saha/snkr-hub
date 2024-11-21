import { Category } from "../model/category";
import { Product } from "../model/product";
// import { Review } from "../model/review";
import magentoApi from "./magento-api";


// export class Category {
//   constructor({
//     name,
//     isActive = true,
//     parentId = 2,
//     level = 2,
//     includeInMenu = true,
//     // urlKey,
//   }) {
//     this.name = name;
//     this.isActive = isActive;
//     this.parentId = parentId;
//     this.level = level;
//     this.includeInMenu = includeInMenu;
//     // this.urlKey = urlKey;
//   }

//   static fromJSON(json) {
//     // const customAttributes = json.custom_attributes.reduce((acc, attr) => {
//     //   acc[attr.attribute_code] = attr.value;
//     //   return acc;
//     // }, {});


//     return new Category({
//       name: json.name,
//       isActive: json.is_active,
//       parentId: json.parent_id,
//       level: json.level,
//       includeInMenu: json.include_in_menu,
//       // urlKey: customAttributes.url_key,
//     });
//   }

//   toJSON() {
//     return {
//       name: this.name,
//       is_active: this.isActive,
//       parent_id: this.parentId,
//       level: this.level,
//       include_in_menu: this.includeInMenu,
//       custom_attributes: [
//         {
//           attribute_code: "url_key",
//           value: this.urlKey,
//         },
//       ],
//     };
//   }
// }


// // import { Review } from "./review";
// export class Review {
//   constructor(author, message) {
//     this.author = author;
//     this.message = message;
//   }

//   static fromJSON(json) {
//     return new Review(json.author, json.message);
//   }

//   toJSON() {
//     return {
//       author: this.author,
//       message: this.message,
//     };
//   }
// }
// export class Product {
//   constructor({
//     sku,
//     name,
//     price,
//     attributeSetId = 4,
//     quantity,
//     isInStock,
//     reviews = [],
//     categoryIds = [],
//     likes = 0,
//     dislikes = 0,
//     description = "",
//     imageUrl = "",
//   }) {
//     this.sku = sku;
//     this.name = name;
//     this.price = price;
//     this.attributeSetId = attributeSetId;
//     this.quantity = quantity;
//     this.isInStock = isInStock;
//     this.reviews = reviews.map((r) => new Review(r.author, r.message)); // Ensure reviews are Review instances
//     this.categoryIds = categoryIds;
//     this.likes = likes;
//     this.dislikes = dislikes;
//     this.description = description;
//     this.imageUrl = imageUrl;
//   }

//   static fromJSON(json) {
//     const customAttributes = json.custom_attributes.reduce((acc, attr) => {
//       acc[attr.attribute_code] = attr.value;
//       return acc;
//     }, {});

//     const reviews = JSON.parse(customAttributes.reviews || "[]").map((r) =>
//       Review.fromJSON(r)
//     );

//     return new Product({
//       sku: json.sku,
//       name: json.name,
//       price: json.price,
//       attributeSetId: json.attribute_set_id,
//       quantity: customAttributes.quantity,
//       isInStock: customAttributes.is_in_stock === "true",
//       reviews,
//       categoryIds: customAttributes.category_ids || [],
//       likes: customAttributes.likes,
//       dislikes: customAttributes.dislikes,
//       description: customAttributes.description,
//       imageUrl: customAttributes.image,
//     });
//   }

//   toJSON() {
//     return {
//       sku: this.sku,
//       name: this.name,
//       price: this.price,
//       attribute_set_id: this.attributeSetId,
//       extension_attributes: {
//         stock_item: {
//           qty: this.quantity,
//           is_in_stock: this.isInStock,
//         },
//       },
//       custom_attributes: [
//         { attribute_code: "quantity", value: this.quantity },
//         { attribute_code: "is_in_stock", value: this.isInStock.toString() },
//         {
//           attribute_code: "reviews",
//           value: JSON.stringify(this.reviews.map((r) => r.toJSON())),
//         },
//         { attribute_code: "category_ids", value: this.categoryIds },
//         { attribute_code: "likes", value: this.likes },
//         { attribute_code: "dislikes", value: this.dislikes },
//         { attribute_code: "description", value: this.description },
//         { attribute_code: "image", value: this.imageUrl },
//       ],
//     };
//   }
// }



// const agent = new https.Agent({
//   rejectUnauthorized: false // Disable certificate validation
// });

// const magentoApi = axios.create({
//   baseURL: "https://bricostore.test/rest/default/V1", // Replace with your Magento URL
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer vq2w1hwuymdlykcx02p9fes8n65j210r`, // Replace with your Magento token
//   },
//   httpsAgent: agent, // Add this line
// });

// export default magentoApi;

// Get all products with pagination
export const getAllProducts = async (pageSize = 10, currentPage = 1) => {
  try {
    const response = await magentoApi.get("/products", {
      params: {
        "searchCriteria[pageSize]": pageSize,
        "searchCriteria[currentPage]": currentPage
      }
    }
    );
    const products = response.data.items.map(item => Product.fromJSON(item));
    console.log(products)
    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
};

// getAllProducts()

// Search product by category and/or product name
// Search product by category and/or product name using the /V1/categories/{categoryId}/products endpoint
export const searchProduct = async (categoryId, productName, pageSize = 10, currentPage = 1) => {
  try {
    // Prepare the query parameters for pagination and search
    const filter = []
    if (productName) {
      filter.push({
        field: 'name',
        value: `%${productName}%`,
        condition_type: 'like'
      });
    }

    if (categoryId)
      filter.push({
        field: 'category_id',
        value: categoryId,
        condition_type: 'eq'
      });

    const params = {
      "searchCriteria[pageSize]": pageSize,
      "searchCriteria[currentPage]": currentPage,
      "searchCriteria[filter_groups]": [{ filters: filter }]
    };


    // Make the request to get products for the specific category
    const response = await magentoApi.get(`/products`, {
      params
    });
    const products = response.data.items.map(item => Product.fromJSON(item));
    return products;

    // return response.data;
  } catch (error) {
    console.error("Error searching product: ", error);
    throw error;
  }
};

// import { magentoApi } from "./magentoApi"; // Assuming you have a pre-configured Magento API instance

export const fetchProduct = async (productSku) => {
  try {
    // Step 1: Fetch the product by its SKU
    const productResponse = await magentoApi.get(`/products/${productSku}`);
    const product = Product.fromJSON(productResponse.data)

    console.log(product)
    // If no product is found, return null
    if (!product) {
      console.error(`Product with SKU ${productSku} not found`);
      return null;
    }

    // Step 2: Fetch the category object based on the product's category IDs
    const categoryIds = product.categoryIds
    const categoryResponses = await Promise.all(
      categoryIds.map(categoryId => magentoApi.get(`/categories/${categoryId}`))
    );

    const categories = categoryResponses.map(response => response.data);

    console.log(categories)
    // Step 3: Return the product and its categories
    return {
      product,
      categories
    };
  } catch (error) {
    console.error("Error fetching product or categories: ", error);
    throw error;
  }
};

// console.log(await searchProduct("6", "Rec"))

// Update product (likes and reviews) with increment/decrement functionality
export const updateProduct = async (sku, likes, dislikes, reviews = null) => {
  try {
    // Prepare custom attributes for likes and dislikes
    const customAttributes = [];

    if (likes !== undefined) {
      customAttributes.push({ attribute_code: "likes", value: likes });
    }

    if (dislikes !== undefined) {
      customAttributes.push({ attribute_code: "dislikes", value: dislikes });
    }

    // Optionally handle reviews, if provided (it can be null)
    if (reviews !== null) {
      customAttributes.push({ attribute_code: "reviews", value: JSON.stringify(reviews) });
    }

    const productData = {
      product: {
        sku,
        custom_attributes: customAttributes,
      }
    };

    const response = await magentoApi.put(`/products/${sku}`, productData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};



// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await magentoApi.get("/categories");
    const categories = response.data.children_data.map(item => {
      return Category.fromJSON(item)
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    throw error;
  }
};
// console.log(await getAllCategories())


export const getAllProductsCount = async () => {
  try {
    const response = await magentoApi.get("/products", {
      params: {
        "searchCriteria[pageSize]": 1, // Only fetch one product
        "searchCriteria[currentPage]": 0 // First page
      }
    });

    // The total count of products is returned in the total_count field
    return response.data.total_count;
  } catch (error) {
    console.error("Error fetching total product count: ", error);
    throw error;
  }
};



// console.log(await getAllProductsCount())