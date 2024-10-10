const cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: "dasomyz8z", 
  api_key: "628647874184263", 
  api_secret: "h7vYWqkhtPXzljRbp4YYP9MiV2c" // Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary;