// ##### AUTO-GEN CONFIG ##### 

let TYPE_HASH = {};
let TYPE_COLOR = {};
let MAIN_TYPE_CMB = '';

TYPE_LIST.forEach((t) => {
  TYPE_HASH[t.name] = t.sub;
  TYPE_COLOR[t.name] = t.color;
  MAIN_TYPE_CMB += `<option value='${t.name}'>${t.name}</option>`;
});

// ##### TOOL ##### 

function find_type(sub_type){
  for(let i=0; i<TYPE_LIST.length; i++){
    let cur = TYPE_LIST[i];
    if(cur.sub.includes(sub_type)){
      return [ cur.name, cur.sub ];
    }
  }
  return null;
}
