//Convierto las letras a mayúcula 
function capMiddleware(req,res,next){
    if(req.query.name){
        req.query.name=req.query.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));            
    }
    return next(); 
       
}


module.exports={
    capMiddleware
}

