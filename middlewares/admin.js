
function admin(req, res, next) {

    const {rol} = req.user;

    if(rol !== "admin"){
        return res.status(403).json({
            status: "fail",
            message: "Not authorized",
        });
    }

    next();
}

export default admin;