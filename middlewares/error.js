import logger from "../helpers/logger.js";
export default function error(err, req, res, next) {
    console.log("Middleware de error ejecutado:", err.message); // Verificar que entra aquí

    logger.error(err.message, {metadata: err});
    res.status(500).send("Something failed.")
}