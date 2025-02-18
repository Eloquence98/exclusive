server/
├── config/
│ ├── db.js # Database configuration
│ └── config.js # Environment variables and app config
├── controllers/
│ └── userController.js # Controller functions for user routes
├── middleware/
│ ├── auth.js # Authentication middleware
│ ├── error.js # Error handling middleware
│ └── validate.js # Request validation middleware
├── models/
│ └── userModel.js # MongoDB schema models
├── routes/
│ ├── index.js # Route aggregator
│ └── userRoutes.js # User-related routes
├── services/
│ └── userService.js # Business logic layer
├── utils/
│ ├── logger.js # Logging utility
│ └── apiResponse.js # Response formatter
├── .env # Environment variables
├── .gitignore
├── package.json
└── server.js # Entry point
