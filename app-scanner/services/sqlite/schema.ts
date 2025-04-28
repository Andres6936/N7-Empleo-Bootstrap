import {int, sqliteTable, text} from "drizzle-orm/sqlite-core";

export const ProductsTable = sqliteTable("Products", {
    SKU: text().primaryKey(),
    TypeBarCode: text().notNull(),
    Currency: text().notNull(),
    Name: text().notNull(),
    Amount: int().notNull(),
    Value: int().notNull(),
});
