export function creators(list) {
    const value = 10000 / list.length
    return list.map(account => ({ account, value }))
}
export function parseAbi(abi){                                                      
    let parsed = JSON.parse(JSON.stringify(abi));
    return parsed.abi;
}
export function sliceStr(str){
   return str.slice(0,10)+'...';
}