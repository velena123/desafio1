const fs = require("fs");

const getAll = function(){
    const texto = fs.readFileSync(__dirname + "/pelis.json");
    return JSON.parse(texto);
}


const searchByTittle = function(textoABuscar ,array){
    const respuesta = array.filter((item)=>{
        var seach = item.title.toLowerCase();
        if(seach.includes(textoABuscar)){
            return item;
        }
    })
    return respuesta;
    
}

function searchByTag(texto, arrayDePelis) {
   const filtra= arrayDePelis.filter((item)=>{
       if(item["tags"].includes(texto)){
           return item;
       }
   })
   return filtra;
}

const sortby = function(propiedadAOrdenar, array){
    const respuesta= array.sort( (a,b)=>{
        if(a[propiedadAOrdenar]> b[propiedadAOrdenar]){
            return 1;
        } if(a[propiedadAOrdenar]< b[propiedadAOrdenar]){
            return -1;
        }return 0;
    })
    return respuesta;
}
const noformat = function( array){
    return JSON.stringify(array);
    
}


const searchCriteria = function(parametro){
    let variablePorDefecto = getAll()
    if(parametro.sort){
        variablePorDefecto = sortby(parametro.sort, variablePorDefecto)
      }
    if(parametro.search){
        variablePorDefecto = searchByTittle(parametro.search, variablePorDefecto)
    }
    if(parametro.tag){
        variablePorDefecto = searchByTag(parametro.tag , variablePorDefecto)
    }
    if (parametro.hasOwnProperty("no-format")){
        variablePorDefecto = noformat(variablePorDefecto);
      }  
      
    {
        return variablePorDefecto
    };
}
exports.searchCriteria = searchCriteria;
