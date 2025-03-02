import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {

    const header = req.header("Authorization") || [];
    const token = header.split(" ")[1];

    if(!token){
        return res.status(401).json({
            status: "fail",
            message: "No token provided",
        })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET); //Verificamos el token
        req.user = payload; //Le añadimos al objeto req la propiedad user con el valor payload
        next();
    }catch(error){
        return res.status(403).json({
            status: "fail",
            message: "Invalid token",
        })
    }
}

export default auth;