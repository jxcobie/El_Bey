const express = require("express");
const router = express.Router();
const chatgptController = require('../controllers/chatgptController'); 


// Directly use router methods (get, post, etc.)
router.post("/", chatgptController.getChatGPTResponse);

// Export the router itself (this is the middleware function that Express expects)
module.exports = router; 
