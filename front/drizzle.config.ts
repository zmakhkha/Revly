import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  dbCredentials: {
    url: './drizzle/db.sqlite',
  },
  schema: './src/db/schema.ts',
  out: './drizzle',
});
