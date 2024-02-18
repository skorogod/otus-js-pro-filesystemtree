import * as fs from "fs/promises";
import * as path from "path";

export async function getFiles(filename, dir, currentDepth, depth) {
  let files = {};
  let promiseArr;

  const dirents = await fs.readdir(dir, { withFileTypes: true });

  if (currentDepth < depth) {
    promiseArr = dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory()
        ? getFiles(dirent.name, res, currentDepth + 1, depth)
        : { name: dirent.name };
    });
  } else {
    promiseArr = [];
  }

  files = await Promise.all(promiseArr);
  return { name: filename, items: Array.prototype.concat(...files) };
}