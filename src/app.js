import express from "express";
import webRouter from "./routes/web.js"; // router Express
import path from "path";

const app = express();

// Middleware untuk parsing body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static file (CSS, JS)
app.use("/css", express.static(path.join(process.cwd(), "src/public")));

// Routes
app.use("/", webRouter);

app.use(express.static('src/public'))

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});