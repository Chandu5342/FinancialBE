const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Finance Backend API',
    version: '1.0.0',
    description: 'API documentation for Finance Dashboard Backend',
  },
  servers: [
    {
      url: 'http://localhost:5000',
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },

  paths: {
    // AUTH
    '/api/auth/register': {
      post: {
        summary: 'Register User',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                name: 'Chandu',
                email: 'chandu@test.com',
                password: '123456',
                role: 'admin',
              },
            },
          },
        },
        responses: {
          201: { description: 'User registered' },
        },
      },
    },

    '/api/auth/login': {
      post: {
        summary: 'Login User',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                email: 'chandu@test.com',
                password: '123456',
              },
            },
          },
        },
        responses: {
          200: { description: 'Login successful' },
        },
      },
    },

    //  CATEGORY
    '/api/categories': {
      get: {
        summary: 'Get all categories',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'List of categories' },
        },
      },
      post: {
        summary: 'Create category (Admin only)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                name: 'Food',
                type: 'expense',
              },
            },
          },
        },
        responses: {
          201: { description: 'Category created' },
        },
      },
    },

    //  TRANSACTIONS
    '/api/transactions': {
      get: {
        summary: 'Get transactions with filters',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Transactions list' },
        },
      },
      post: {
        summary: 'Create transaction',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                amount: 500,
                type: 'expense',
                categoryId: 'CATEGORY_ID',
                date: '2026-04-03',
                notes: 'Lunch',
              },
            },
          },
        },
        responses: {
          201: { description: 'Transaction created' },
        },
      },
    },

    //  DASHBOARD
    '/api/dashboard/summary': {
      get: {
        summary: 'Get dashboard summary',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Summary data' },
        },
      },
    },

    '/api/dashboard/trends': {
      get: {
        summary: 'Get monthly trends',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Trends data' },
        },
      },
    },
  },
};

export default swaggerDocument;