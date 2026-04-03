const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Finance Backend API',
    version: '1.0.0',
    description: 'API documentation for Finance Dashboard Backend',
  },

  servers: [
    {
      url: 'https://financialbe.onrender.com', // 
    },
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

  //  Global Auth (applies to all routes)
  security: [
    {
      bearerAuth: [],
    },
  ],

  paths: {
    // ================= AUTH =================
    '/api/auth/register': {
      post: {
        summary: 'Register User',
        security: [], //  no auth required
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
          201: { description: 'User registered successfully' },
        },
      },
    },

    '/api/auth/login': {
      post: {
        summary: 'Login User',
        security: [], //  no auth required
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
          200: { description: 'Login successful (returns JWT token)' },
        },
      },
    },

    // ================= CATEGORY =================
    '/api/categories': {
      get: {
        summary: 'Get all categories',
        responses: {
          200: { description: 'List of categories' },
        },
      },

      post: {
        summary: 'Create category (Admin only)',
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

    // ================= TRANSACTIONS =================
    '/api/transactions': {
      get: {
        summary: 'Get transactions with filters',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer' } },
          { name: 'limit', in: 'query', schema: { type: 'integer' } },
          { name: 'type', in: 'query', schema: { type: 'string' } },
          { name: 'categoryId', in: 'query', schema: { type: 'string' } },
          { name: 'startDate', in: 'query', schema: { type: 'string', format: 'date' } },
          { name: 'endDate', in: 'query', schema: { type: 'string', format: 'date' } },
        ],
        responses: {
          200: { description: 'Transactions list' },
        },
      },

      post: {
        summary: 'Create transaction',
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

    '/api/transactions/{id}': {
      put: {
        summary: 'Update transaction',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                amount: 600,
                type: 'expense',
                categoryId: 'CATEGORY_ID',
                date: '2026-04-03',
                notes: 'Updated Lunch',
              },
            },
          },
        },
        responses: {
          200: { description: 'Transaction updated' },
        },
      },

      delete: {
        summary: 'Delete transaction (Admin only)',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Transaction deleted' },
        },
      },
    },

    // ================= DASHBOARD =================
    '/api/dashboard/summary': {
      get: {
        summary: 'Get dashboard summary (income, expense, balance)',
        responses: {
          200: { description: 'Summary data' },
        },
      },
    },

    '/api/dashboard/trends': {
      get: {
        summary: 'Get monthly income/expense trends',
        responses: {
          200: { description: 'Trends data' },
        },
      },
    },
  },
};

export default swaggerDocument;