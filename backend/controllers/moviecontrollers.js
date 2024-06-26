const Movie = require('../Models/movieModels')



module.exports={
    AddMovie:async (req , res,next )=>{
    
        const {title , posterpath} = req.body 
        const t = title 
        const p = posterpath  
        try{
                    if((await Movie.countDocuments({title:t , posterpath:p}))==0){
                        const movie = await Movie.create({title:t , posterpath:p})
                        res.status(200).json(movie)
                    }
                    else
                    {
                        res.json({"message":"movie allready exists in the database"})
                    }    
            }
             
            catch(error){
             res.status(400).json({"message":"error with the post methode"})
        }
    }
    ,
    ShowMovies:async (req , res , next)=>{
        if((await Movie.countDocuments({})==0)){
            res.status(200).json({"message":"no movies exist here"})
        }else{
            const results = await Movie.find()
            res.json(results)
        }
    }
}