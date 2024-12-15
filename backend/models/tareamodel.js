const mongoose = require("mongoose");
const tareaSchema = new mongoose.Schema(
    {
        tarea: { 
            type: String, 
            required: true 
        },

        descripcion: 
        {
            type: String,
        },

        prioridad: 
        { 
            type: String, 
            enum: ["Alta", "Media", "Baja",],
            default:["Baja"],
        },

        estado:{
            type: String,
            enum: ["Pendiente", "En Progreso", "Finalizada"],
            default:["Pendiente"],
        },
        fechaCreacion: 
        { 
            type: Date,
        },

        fechaFinalizada:
        {
            type: Date,
        }
    },
    {   
        timestamps: true,
    }
    
);

const ModelTarea = mongoose.model("tareas", tareaSchema);
module.exports = ModelTarea;