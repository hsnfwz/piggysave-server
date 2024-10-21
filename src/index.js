import pkg from 'pg';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import nocache from 'nocache';
import { messagesRouter } from './messages/messages.router.js';
import { errorHandler } from './middleware/error.middleware.js';
import { notFoundHandler } from './middleware/not-found.middleware.js';

const app = express();
const PORT = process.env.PORT || 5174;
const apiRouter = express.Router();

/* Create a new pool using your Neon database connection string */
const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(express.json());
/* Auth0 */
app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        "default-src": ["'none'"],
        "frame-ancestors": ["'none'"],
      },
    },
    frameguard: {
      action: "deny",
    },
  })
);
app.use((req, res, next) => {
  res.contentType("application/json; charset=utf-8");
  next();
});
app.use(nocache());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN_URL,
    methods: ["GET"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
  })
);
/* Set for Render deployment */
app.set('trust proxy', 1);
// app.use(cors({ origin: ['http://localhost:5173', 'https://piggysave-client.onrender.com'], credentials: true }));

app.use("/api", apiRouter);
apiRouter.use("/messages", messagesRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM sandbox;');
    res.json(rows);
  } catch (error) {
    console.error('Failed to fetch sandbox', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* Start the server */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/* 

  TODO:
  - deploy client and server to test they work with each other
  - authentication method
  - create tables (user, income, expense)
*/