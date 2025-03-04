export default function buildFilter(req, res, next){

    const {priority, state, search} = req.query;

    const filter = {};

    if(priority) filter.priority = priority;
    if(state) filter.state = state;
    if(search){
        filter.$or = [
            {title: {$regex: search, $options: "i"}}, //i es para que no distinga entre mayúsculas y minúsculas
            {description: {$regex: search, $options: "i"}}
        ]
    }

    req.filter = filter;
    next();
}