import path from "path";
import { fileURLToPath } from "url";

// Get directory from import meta
export default function getDirname(meta) {
  return path.dirname(fileURLToPath(meta.url));
}
