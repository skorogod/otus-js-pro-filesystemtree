import * as fs from "fs/promises";
import * as path from "path";
import { Folder } from "./types";


export async function getFiles(filename: string, dir: string, currentDepth: number, depth: number): Promise<Folder> {
  let files: Folder[] = [];
  let promiseArr: ReturnType<typeof getFiles>[] = [];

  const dirents = await fs.readdir(dir, { withFileTypes: true });

  if (currentDepth < depth) {
    promiseArr = dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory()
        ? getFiles(dirent.name, res, currentDepth + 1, depth)
        : new Promise((res) => res({ name: dirent.name, items: []}));
    });
  } else {
    promiseArr = [];
  }

  files = await Promise.all(promiseArr);
  return { name: filename, items: Array.prototype.concat(...files) };
}