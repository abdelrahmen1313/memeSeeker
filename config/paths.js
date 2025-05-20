//config/paths.js

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT_DIR = path.resolve(__dirname, '..'); // Project root
export const ASSETS_DIR = path.join(ROOT_DIR, 'assets'); // Assets directory
export const SRC_DIR = path.join(ROOT_DIR, 'src'); // Source directory
export const VIEWS_DIR = path.join(SRC_DIR, 'views'); // Views directory
export const DB_DIR = path.join(SRC_DIR, 'db'); // Database directory

// Helper function to resolve paths from root
export const fromRoot = (...pathSegments) => path.join(ROOT_DIR, ...pathSegments);

// Helper function to resolve paths from src
export const fromSrc = (...pathSegments) => path.join(SRC_DIR, ...pathSegments);

// Export path resolvers for common directories
export const resolvePath = {
    asset: (file) => path.join(ASSETS_DIR, file),
    view: (file) => path.join(VIEWS_DIR, file),
    db: (file) => path.join(DB_DIR, file)
};

