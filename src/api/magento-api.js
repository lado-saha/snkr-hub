// src/api/magentoApi.js
import axios from "axios";
import https from "https";


// const agent = new https.Agent({
//   rejectUnauthorized: false // Disable certificate validation
// });

const magentoApi = axios.create({
  baseURL: "https://192.168.226.129/rest/default/V1", // Replace with your Magento URL
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer vq2w1hwuymdlykcx02p9fes8n65j210r`, // Replace with your Magento token
  },
  // httpsAgent: agent, // Add this line
});

// export default magentoApi;
export default magentoApi;

