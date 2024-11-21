import { Review } from "./review";

export class Product {
  constructor({
    id,
    name,
    price,
    attributeSetId = 4,
    quantity,
    isInStock,
    reviews = [],
    categoryIds = [],
    likes = 0,
    dislikes = 0,
    description = "",
    imageUrl = "",
  }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.attributeSetId = attributeSetId;
    this.quantity = quantity;
    this.isInStock = isInStock;
    this.reviews = reviews.map((r) => new Review(r.author, r.message)); // Ensure reviews are Review instances
    this.categoryIds = categoryIds;
    this.likes = likes;
    this.dislikes = dislikes;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  static fromJSON(json) {
    console.log(json)
    const customAttributes = json.custom_attributes.reduce((acc, attr) => {
      acc[attr.attribute_code] = attr.value;
      return acc;
    }, {});

    const reviews = JSON.parse(customAttributes.reviews || "[]").map((r) =>
      Review.fromJSON(r)
    );

    return new Product({
      id: json.sku,
      name: json.name,
      price: json.price,
      attributeSetId: json.attribute_set_id,
      quantity: customAttributes.quantity,
      isInStock: customAttributes.is_in_stock === "true",
      reviews,
      categoryIds: customAttributes.category_ids || [],
      likes: customAttributes.likes,
      dislikes: customAttributes.dislikes,
      description: customAttributes.description,
      imageUrl: customAttributes.image,
    });
  }

  toJSON() {
    return {
      sku: this.id,
      name: this.name,
      price: this.price,
      attribute_set_id: this.attributeSetId,
      extension_attributes: {
        stock_item: {
          qty: this.quantity,
          is_in_stock: this.isInStock,
        },
      },
      custom_attributes: [
        { attribute_code: "quantity", value: this.quantity },
        { attribute_code: "is_in_stock", value: this.isInStock.toString() },
        {
          attribute_code: "reviews",
          value: JSON.stringify(this.reviews.map((r) => r.toJSON())),
        },
        { attribute_code: "category_ids", value: this.categoryIds },
        { attribute_code: "likes", value: this.likes },
        { attribute_code: "dislikes", value: this.dislikes },
        { attribute_code: "description", value: this.description },
        { attribute_code: "image", value: this.imageUrl },
      ],
    };
  }
}
