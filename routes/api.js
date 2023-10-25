import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import * as uuid from "uuid";
import getDirname from "../lib/utils.js";

const dbPath = path.join(getDirname(import.meta), "../db/db.json");

// Initialize db as empty array
let db = [];
try {
  // Try to read the file
  db = JSON.parse(await fs.readFile(dbPath));
} catch (e) {}

const router = Router();

// Send the existing notes
router.get("/notes", (req, res) => {
  res.json(db);
});

router.post("/notes", (req, res) => {
  // Check if there is a body
  if (!req.body) return res.status(400).send();
  const { title, text } = req.body;
  // Ensure proper types of body properties
  if (typeof title !== "string" || typeof text !== "string")
    return res.status(400).send();
  // Ensure the properties are not empty
  if (title.length === 0 || text.length === 0) return res.status(400).send();
  // Add the note with a uuid
  db.push({ title, text, id: uuid.v4() });
  res.sendStatus(201);
  // Save the notes db
  fs.writeFile(dbPath, JSON.stringify(db));
});

router.delete("/notes/:id", (req, res) => {
  // Find the index of the note
  const noteIndex = db.findIndex((n) => n.id == req.params.id);
  // 404 if the note does not exist
  if (noteIndex === -1) return res.sendStatus(404);
  // Remove the note from the db
  db.splice(noteIndex, 1);
  // Save the notes db
  fs.writeFile(dbPath, JSON.stringify(db));
  res.sendStatus(201);
});

export default router;
