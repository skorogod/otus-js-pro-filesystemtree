export function tree(obj) {
    let indent = -1;
  
    function getName(obj) {
      let str = "";
  
      for (let key in obj) {
        if (key === "name") {
          str += obj[key];
        } else if (key === "items") {
          indent += 1;
  
          obj[key].forEach((el, index) => {
            const isLast = index === obj[key].length - 1;
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