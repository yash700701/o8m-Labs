import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

import app from "./app.js";

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
