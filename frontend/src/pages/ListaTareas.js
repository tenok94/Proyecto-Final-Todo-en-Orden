import React, { useEffect, useState } from "react";
import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";
import { getTareas } from "../services/api";
import AgregarTarea from "../components/AgregarTarea";

const ListaTareas = () => {
  const [tareas, setTareas] = useState([]);

  const cargarTareas = () => {
    getTareas()
      .then((data) => setTareas(data))
      .catch((error) => console.error("Error al obtener tareas:", error));
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Lista de Tareas
      </Typography>

      {/* Formulario para agregar tarea */}
      <AgregarTarea onTareaAgregada={cargarTareas} />

      {/* Lista de tareas */}
      <List>
        {tareas.map((tarea) => (
          <ListItem key={tarea._id} divider>
            <ListItemText
              primary={`Tarea: ${tarea.tarea}`}
              secondary={`Prioridad: ${tarea.prioridad} | Estado: ${tarea.estado}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ListaTareas;

