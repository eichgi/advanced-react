import {config, createSchema} from "@keystone-next/keystone/schema";
import 'dotenv/config';
import {User} from "./schemas/User";

const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/keystone-sickfits';
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, //How long the should stay signed in
  secret: process.env.COOKIE_SECRET,
};

export default config({
  // @ts-ignore
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseUrl,
    //Add date seeding here
  },
  lists: createSchema({
    //Schema items go in here
    User,
  }),
  ui: {
    //change this for roles
    isAccessAllowed: () => true,
  },
  //Add session values here
});

