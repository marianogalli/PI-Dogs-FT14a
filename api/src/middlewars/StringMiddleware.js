//Convierto las letras a mayúcula 
function capMiddleware(req,res,next){
    let {name}=req.query;
    if(name){
        name=name.toLowerCase();
        name=name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));            
        req.query.name=name;
    }
    return next();       
}


module.exports={
    capMiddleware
}

