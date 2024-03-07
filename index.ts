import { getFiles } from "./modules/getFiles.js";
import { tree } from "./modules/treeFunc.js";
import * as path from 'path'

const argv = process.argv.slice(2)

console.log(argv)

async function mainTree (dir: string, depth: number) {
  console.log(depth)
  const files = await getFiles(path.basename(dir), dir, 0, depth)
  tree(files)
}

await mainTree('C:\\Program Files', Number(argv[0].replace('--depth=', '')))