
function getDataFromBreed(breed){
        const height = breed.height.metric || breed.height;
        const weight = breed.weight.metric || breed.weight;
        const years = breed.life_span || breed.years;
        const { id, name } = breed
        let temperament=[]
        if(breed.temperament){
            let temp=breed.temperament
            let temps=temp.split(',');
            temps.forEach(t=>temperament.push(t.trim()))//le quito espacio inicial y final
        }else{ 
            if(breed.temperaments) 
            breed.temperaments.forEach(temp=>temperament.push(temp.name))
        }        
        const img = breed.image ? breed.image.url : 'No especificado'

        return {id,name,height,weight,years,temperament,img}
}

function capitalize(string){
    
    string=string.toLowerCase();
    string=string.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));            
    return string;
    
 
}

module.exports={
    getDataFromBreed,
    capitalize
}








