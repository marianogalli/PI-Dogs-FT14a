export function getSort(array, attribute, order) {
    let copia = [...array];

    if(attribute==="weight"){
        sortByWeight(copia,order)
    }else{
        copia.sort(function (a, b) {
            if (order === 'asc') {
                if (a[attribute] > b[attribute]) {
                    return 1;
                }
                if (a[attribute] < b[attribute]) {
                    return -1;
                }
                return 0;
            } else {
                if (a[attribute] < b[attribute]) {
                    return 1;
                }
                if (a[attribute] > b[attribute]) {
                    return -1;
                }
                return 0;
            }
        })       
    }
    return copia;
}

function sortByWeight(arreglo, order) {
    for (let i = 0; i < arreglo.length; i++) {
        for (let j = i + 1; j < arreglo.length; j++) {
            let pesoI = parseInt(arreglo[i].weight.split('-')[0])
            //console.log(pesoI);
            let pesoJ = parseInt(arreglo[j].weight.split('-')[0])
            if (order === "asc") {
                if (pesoI > pesoJ) {
                    let aux = arreglo[i];
                    arreglo[i] = arreglo[j];
                    arreglo[j] = aux;
                }
            } else {
                if (pesoI < pesoJ) {
                    let aux = arreglo[i];
                    arreglo[i] = arreglo[j];
                    arreglo[j] = aux;
                }
            }

        }
    }
}

