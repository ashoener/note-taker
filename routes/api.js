import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import * as uuid from "uuid";

const dbPath = path.join(__dirname, "../db/db.json");

let db = [];
try {
  db = JSON.parse(await fs.readFile(dbPath));
} catch (e) {}

const router = Router();

router.get("/notes", (req, res) => {
  res.json(db);
});

router.post("/notes", (req, res) => {
  if (!req.body) return res.status(400).send();
  const { title, text } = req.body;
  if (typeof title !== "string" || typeof text !== "string")
    return res.status(400).send();
  if (title.length === 0 || text.length === 0) return res.status(400).send();
  db.push({ title, text, id: uuid.v4() });
  res.sendStatus(201);
  fs.writeFile(dbPath, JSON.stringify(db));
});

export default router;
