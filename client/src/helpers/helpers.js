export function getSort(array, attribute, order) {
    let copia = [...array];

    copia.sort(function (a, b) {

        if(attribute==='name'){
            if(order==='asc'){
                if (a[attribute] > b[attribute]) {
                    return 1;
                }
                if (a[attribute] < b[attribute]) {
                    return -1;
                }
                return 0;
            }else{
                if (a[attribute] < b[attribute]) {
                    return 1;
                }
                if (a[attribute] > b[attribute]) {
                    return -1;
                }
                return 0;
            }
        }      
    })

    return copia;
}
