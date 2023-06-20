
export default function geraListaPalavras(){
    const fs = require('fs');
    fs.readFile('./fase1.txt',"utf8", (err,data) => {
        if (err){
          console.error(err)
          return;
        }
        console.log(data)
        return data
      })
}

console.log(geraListaPalavras())