const mongoose = require('mongoose');

const dbconeted = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/dbGestorDeTarea");
        console.log("Conectado a MongoDB");
    } catch (err){
        console.error("Error en la conexion a la base de datos ", err);
        process.exit(1); //detectamoes el proceso si hay un error grave en la conexión
    }
}

module.exports = dbconeted;