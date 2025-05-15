//config/paths.js

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT_DIR = path.resolve(__dirname, '..'); // Project root
export const ASSETS_DIR = path.join(ROOT_DIR, 'assets'); // Assets directory
export const SRC_DIR = path.join(ROOT_DIR, 'src'); // Source directory
export const VIEWS_DIR = path.join(SRC_DIR, 'views'); // Views directory
export const DB_DIR = path.join(SRC_DIR,'db'); // Database directory

// you can add more paths as needed

