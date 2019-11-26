// 固定的key
const KEY="mmtoken";

// 暴露三个方法 
// 设置
// window.localStorage.setItem()
// window.localStorage.getItem()
// window.localStorage.removeItem()
/* 设置 */
export function setItem(value){
    window.localStorage.setItem(KEY,value)
}

/* 获取 */
export function getItem(){
  return  window.localStorage.getItem(KEY)
}

/* 删除 */
export function removeItem(){
    window.localStorage.removeItem(KEY)
}
 
