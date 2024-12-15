// require("dotenv").config();
// const express = require("express");
// const app = express();
// const dbconnect = require("./config/db.js");
// const TareasRouter = require("./routes/tareas.js");
// const cors = require("cors");

// app.use(cors());
// app.use(express.json());
// app.use(TareasRouter);

// app.get("/", (req, res) => {
//     res.send("Servidor de API de tareas en servicio");
// })

// dbconnect().then(() => {
//     app.listen(3000, () => {
//         console.log("Server corriendo en el puerto 3000");
//     });
// }).catch(err  => {
//     console.error("no se pudo iniciar el servido debido a un error en la base de datos")
// });
require("dotenv").config(); // Importar dotenv para usar variables de entorno
const express = require("express");
const app = express();
const dbconnect = require("./config/db.js");
const TareasRouter = require("./routes/tareas.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(TareasRouter);

// Iniciar servidor en el puerto configurado
dbconnect().then(() => {
    const PORT = process.env.PORT || 3000; // Usa el puerto desde el .env o el 3000 por defecto
    app.listen(PORT, () => {
        console.log(`Server corriendo en el puerto ${PORT}`);
    });
}).catch(err  => {
    console.error("No se pudo iniciar el servidor debido a un error en la base de datos");
});
