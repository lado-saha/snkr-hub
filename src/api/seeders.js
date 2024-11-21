
export const categories = [
  {
    name: "Tools",
    url_key: "tools",
  },
  {
    name: "Plumbing",
    url_key: "plumbing",
  },
  {
    name: "Electrical",
    url_key: "electrical",
  },
  {
    name: "Paint & Decorating",
    url_key: "paint-decorating",
  },
  {
    name: "Home Improvement",
    url_key: "home-improvement",
  },
  {
    name: "Outdoor & Garden",
    url_key: "outdoor-garden",
  },
];

async function createCategories() {
  try {
    for (const category of categories) {
      const response = await magentoApi.post("/categories", {
        category: {
          name: category.name,
          is_active: true,
          parent_id: 2, // Root category ID
          level: 2,
          include_in_menu: true,
          // product_count: 5, // Update with the correct product count later
          custom_attributes: [
            {
              attribute_code: "url_key",
              value: category.url_key,
            },
          ],
        },
      });

      console.log(`Category created: ${category.name} (ID: ${response.data.id})`);
    }
  } catch (error) {
    console.error("Error creating categories:", error);
  }
}


// Serialize reviews into a string (JSON)
const serializeReviews = (reviews) => {
  return JSON.stringify(reviews); // Convert reviews array to a JSON string
};

// Function to create products
const createProducts = async () => {
  const categories = [
    { id: 4, name: 'Tools' },
    { id: 5, name: 'Plumbing' },
    { id: 6, name: 'Electrical' },
    { id: 7, name: 'Paint & Decorating' },
    { id: 8, name: 'Home Improvement' },
    { id: 9, name: 'Outdoor & Garden' }
  ];



  // Define products data
  const productsData = {
    4: [  // Tools
      { sku: 'tool-hammer-001', name: 'Hammer', price: 12.99, description: 'A durable steel hammer for all your heavy-duty tasks.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'JohnDoe', message: 'Great hammer, very sturdy and feels high quality.' }], quantity: 10, likes: 25, dislikes: 2 },
      { sku: 'tool-screwdriver-set-001', name: 'Screwdriver Set', price: 19.99, description: 'A set of precision screwdrivers for everyday use.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'MarkZ', message: 'Perfect for my DIY projects, very precise.' }], quantity: 10, likes: 15, dislikes: 1 },
      { sku: 'tool-drill-001', name: 'Drill', price: 89.99, description: 'A high-power drill perfect for drilling into wood, metal, and more.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'TomH', message: 'Excellent drill! Very powerful and easy to use.' }], quantity: 10, likes: 40, dislikes: 3 }
    ],
    5: [  // Plumbing
      { sku: 'plumbing-pipe-wrench-001', name: 'Pipe Wrench', price: 24.99, description: 'A heavy-duty wrench for tightening or loosening pipes.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'ChrisJ', message: 'This wrench is a beast! Works on every pipe I’ve tried.' }], quantity: 10, likes: 18, dislikes: 2 },
      { sku: 'plumbing-snake-001', name: 'Plumbing Snake', price: 39.99, description: 'A manual plumbing snake for unclogging pipes.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'DerekC', message: 'Works like a charm. Cleared the blockage in minutes!' }], quantity: 10, likes: 30, dislikes: 1 },
      { sku: 'plumbing-pvc-pipes-001', name: 'PVC Pipes', price: 5.99, description: '10ft long PVC pipes for plumbing projects.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'PaulF', message: 'Great quality PVC pipe, easy to cut and install.' }], quantity: 10, likes: 22, dislikes: 0 }
    ],
    6: [  // Electrical
      { sku: 'electrical-light-bulb-001', name: 'LED Light Bulb', price: 9.99, description: 'Energy-efficient LED light bulb for bright lighting.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'LindaG', message: 'Bright and energy-efficient. Lasts a long time.' }], quantity: 10, likes: 50, dislikes: 4 },
      { sku: 'electrical-extension-cord-001', name: 'Extension Cord', price: 14.99, description: 'Heavy-duty extension cord for home use.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'JohnM', message: 'Very durable and long-lasting extension cord.' }], quantity: 10, likes: 35, dislikes: 1 },
      { sku: 'electrical-battery-001', name: 'Rechargeable Battery', price: 5.49, description: 'Long-lasting rechargeable battery for various devices.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'MikeT', message: 'Holds a charge well and works for hours.' }], quantity: 10, likes: 45, dislikes: 2 }
    ],
    7: [  // Paint & Decorating
      { sku: 'paint-wall-paint-001', name: 'Wall Paint', price: 19.99, description: 'High-quality wall paint in various colors.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'JessicaP', message: 'The color is vibrant and the finish is smooth.' }], quantity: 10, likes: 12, dislikes: 1 },
      { sku: 'paint-brush-set-001', name: 'Brush Set', price: 12.99, description: 'Set of brushes for painting walls and furniture.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'EvaD', message: 'Soft brushes that apply paint evenly.' }], quantity: 10, likes: 20, dislikes: 0 },
      { sku: 'paint-tape-001', name: 'Painter\'s Tape', price: 7.99, description: 'High-quality painter\'s tape for clean edges.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'TomL', message: 'Excellent tape for sharp, clean lines.' }], quantity: 10, likes: 25, dislikes: 2 }
    ],
    8: [  // Home Improvement
      { sku: 'home-improvement-ladder-001', name: 'Ladder', price: 59.99, description: 'Sturdy aluminum ladder for home use.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'AngelaB', message: 'Strong and light, makes home improvement tasks easy.' }], quantity: 10, likes: 40, dislikes: 3 },
      { sku: 'home-improvement-saw-001', name: 'Hand Saw', price: 15.99, description: 'A sharp hand saw for wood cutting.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'DavidR', message: 'Cuts through wood effortlessly.' }], quantity: 10, likes: 18, dislikes: 0 },
      { sku: 'home-improvement-drill-bit-001', name: 'Drill Bit Set', price: 22.99, description: 'High-quality drill bits for wood and metal.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'BenG', message: 'Very durable and accurate bits.' }], quantity: 10, likes: 28, dislikes: 1 }
    ],
    9: [  // Outdoor & Garden
      { sku: 'outdoor-garden-hose-001', name: 'Garden Hose', price: 24.99, description: 'Heavy-duty garden hose for outdoor use.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'NancyP', message: 'Great hose, long-lasting and flexible.' }], quantity: 10, likes: 15, dislikes: 2 },
      { sku: 'outdoor-garden-lawnmower-001', name: 'Lawnmower', price: 199.99, description: 'Electric lawnmower for easy grass cutting.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'CharlieH', message: 'Cuts grass effortlessly and is easy to maneuver.' }], quantity: 10, likes: 50, dislikes: 5 },
      { sku: 'outdoor-garden-plant-food-001', name: 'Plant Food', price: 8.99, description: 'Nutrient-rich plant food for healthier plants.', image_url: 'https://via.placeholder.com/150', reviews: [{ author: 'PatriciaR', message: 'My plants love this, they grow so much faster.' }], quantity: 10, likes: 30, dislikes: 0 }
    ]
  };


  // Loop through each category and create the products
  for (const category of categories) {
    const products = productsData[category.id];

    for (const product of products) {
      const serializedReviews = serializeReviews(product.reviews); // Serialize reviews

      try {
        const response = await magentoApi.post('/products', {
          product: {
            sku: product.sku,
            name: product.name,
            price: product.price,
            // image: product.image_url,
            attribute_set_id: 4, // Replace with the correct attribute_set_id
            extension_attributes: {
              stock_item: {
                qty: product.quantity,
                is_in_stock: true
              }

            },
            custom_attributes: [
              { attribute_code: "quantity", value: product.quantity },
              { attribute_code: "is_in_stock", value: true },
              { attribute_code: "reviews", value: serializedReviews },
              { attribute_code: "category_ids", value: [category.id] },
              { attribute_code: "likes", value: product.likes },
              { attribute_code: "dislikes", value: product.dislikes },
              { attribute_code: "description", value: product.description },
              { attribute_code: "image", value: product.image_url }
            ]
          }
        });

        console.log(`Product ${product.name} created successfully in category ${category.name}!`);
      } catch (error) {
        console.error(`Error creating product ${product.name}:`, error.response ? error.response.data : error.message);
      }
    }
  }
};

// createProducts();
