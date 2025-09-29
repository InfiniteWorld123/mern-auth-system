import dotenv from 'dotenv';

dotenv.config();

export const { PORT, MONGO_URI, NODE_ENV, FRONTEND_URL } = process.env;