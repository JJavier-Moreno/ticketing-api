import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header is missing" });
    }
  
    if (typeof authHeader !== "string") {
      return res.status(400).json({ message: "Authorization header is not a string" });
    }
  
    const token = authHeader.split(" ")[1]; // Esperamos que el formato sea "Bearer <token>"
  

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
        return res.status(400).json({
            status: "fail",
            message: "Invalid token",
        })
    }
}

export default auth;