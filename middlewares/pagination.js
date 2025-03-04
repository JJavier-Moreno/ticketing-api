export default function pagination(model) {

    return async (req, res, next) => {
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 10;
        const skip = (page - 1) * pageSize;

        const results = {};

        try{
            results.total = await model.countDocuments().exec();
            results.results = await model.find(req.filter).skip(skip).limit(pageSize).exec(); //exec() es para ejecutar la consulta

            results.pages = Math.ceil(results.total / pageSize); //Math.ceil() es para redondear hacia arriba
            results.currentPage = page;
            req.paginatedResults = results;

            next();
 
        }catch(error){
            res.status(500).send({
                status: "fail",
                message: error.message,
            });
        }
    }





}