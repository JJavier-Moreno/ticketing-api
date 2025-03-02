import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const roles = ["user", "admin"];

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  rol: {
    type: String,
    required: true,
    enum: roles,
    default: "user",
  },
   //! SI ESTO LO DEJAMOS ASÍ, CUANDO HAGAMOS UNA PETICIÓN NOS DEVOLVERÁ TODA LA INFORMACIÓN QUE HAY EN MONGODB, COMO EL __V, EL _ID, ETC. POR LO QUE PODEMOS ELEGIR QUE QUEREMOS SELECCIONAR DE LA BASE DE DATOS CON:
},{
  toJSON: {
    //? ESTO ES PARA QUE NO SE MUESTRE EL PASSWORD EN EL JSON, O EL __V o el _ID. Lo que nosotros elijamos. Podemos filtrar
    transform: function (doc, ret) {
      //Esta funcion tiene como parámetros el documento y lo que retornamos. El documento es como una columna de la base de datos en Mongo
      delete ret.password;
      delete ret.__v;
      delete ret._id;
    },
    virtuals: true,
  },
});

//? AQUI AÑADIMOS LOS MIDDLEWARES, QUE SE EJECUTARAN POR EJEMPLO ANTES DE QUE SE GUARDEN LOS DATOS EN LA BASE DE DATOS
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

userSchema.index({ id: 1, email: 1 }); //PARA QUE EN LA BASE DE DATOS SE BUSQUE PRINCIPALMENTE POR ID Y EMAIL

const User = mongoose.model("User", userSchema);

export default User;
