import {defineConfig} from 'drizzle-kit';

export default defineConfig({
    dialect: 'sqlite',
    driver: 'expo',
    schema: './services/sqlite/schema.ts',
    out: './drizzle',
});
