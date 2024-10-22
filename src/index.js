import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import nocache from 'nocache';

// routers
import { messagesRouter } from './messages/messages.router.js';
import { transactionsRouter } from './transactions/transactions.router.js';

// middleware
import { errorHandler } from './middleware/error.middleware.js';
import { notFoundHandler } from './middleware/not-found.middleware.js';

const app = express();
const PORT = process.env.PORT || 5174;
const apiRouter = express.Router();

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
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
  })
);
/* Set for Render deployment */
app.set('trust proxy', 1);
// app.use(cors({ origin: ['http://localhost:5173', 'https://piggysave-client.onrender.com'], credentials: true }));

app.use('/api', apiRouter);
apiRouter.use('/messages', messagesRouter);
apiRouter.use('/transactions', transactionsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.get('/', async (req, res) => {
  try {
    res.status(200).json({ message: 'Hello World' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* Start the server */
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
