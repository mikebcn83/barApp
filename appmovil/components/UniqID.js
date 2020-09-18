  
  export const randomId = (type) => {
    let result = type.substring(0, 2); /*los dos primeros chars seran las dos
                                         primeras letras del tipo de plato (para
                                         localizarlos mejor luego)*/
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < 18; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}