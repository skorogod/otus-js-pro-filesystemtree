import { Folder } from "./types";

export function tree(obj: Folder): void {
    let indent = -1;
  
    function getName(obj: Folder): string {
      let str = "";
  
      for (let key in obj) {
        if (key === "name") {
          str += obj[key];
        } else if (key === "items") {
          indent += 1;
  
          obj['items'].forEach((el, index) => {
            const isLast = index === obj['items'].length - 1;
            str += `\n${
              indent >= 0 ? "|" : ""
            }${"  |".repeat(indent)}__`;
            str += `${getName(el)}`;
          });
  
          indent -= 1;
        }
      }
      return str;
    }
  
    console.log(getName(obj));
  }