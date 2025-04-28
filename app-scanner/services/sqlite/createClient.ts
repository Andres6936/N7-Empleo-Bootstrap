import * as SQLite from 'expo-sqlite';
import {drizzle} from 'drizzle-orm/expo-sqlite';

export const scannerConnection = SQLite.openDatabaseSync('scanner.sqlite');
export const db = drizzle(scannerConnection);
