import winston from "winston";

const logger = winston.createLogger({
    level: "error",
    format: winston.format.combine( //Formato de los logs
        winston.format.prettyPrint(), //Se le da un color al log
        winston.format.timestamp(), 
    ),
    transports: [ //Son los archivos donde se guardan los logs
        new winston.transports.File({filename: "error.log", level: "error"}),
        new winston.transports.File({filename: "info.log", level: "info"})
    ]
})

export default logger;