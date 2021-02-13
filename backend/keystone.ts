import {config, createSchema} from "@keystone-next/keystone/schema";
import 'dotenv/config';
import {User} from "./schemas/User";
import {createAuth} from "@keystone-next/auth";
import {statelessSessions, withItemData} from "@keystone-next/keystone/session";

const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/keystone-sickfits';
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, //How long the should stay signed in
  secret: process.env.COOKIE_SECRET,
};

const {withAuth} = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    //Todo: add in initial roles
  }
});

export default withAuth(config({
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
    // Show UI only for people who pass this test
    isAccessAllowed: ({session}) => {
      //console.log(session);
      return !!session?.data;
    },
  },
  session: withItemData(statelessSessions(sessionConfig), {
    User: `id`,
  }),
}));

