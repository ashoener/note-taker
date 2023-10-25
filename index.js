import express from "express";
import path from "path";

import api from "./routes/api.js";
import getDirname from "./lib/utils.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// Serve the public folder
app.use(express.static("public"));

// Serve the API routes
app.use("/api", api);

// Server /notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(getDirname(import.meta), "public/notes.html"))
);

// Catch-all to return index.html if there is no other route
app.get("*", (req, res) =>
  res.sendFile(path.join(getDirname(import.meta), "public/index.html"))
);

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server listening on 127.0.0.1:${PORT}`);
});
