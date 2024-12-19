import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchTareas, deleteTarea, updateTarea } from "../redux/tasksSlice";
import AgregarTarea from "../components/AgregarTarea";

const ListaTareas = () => {
  const dispatch = useDispatch();
  const { tareas, status, error } = useSelector((state) => state.tareas);

  const [editando, setEditando] = useState(null); // Estado para manejar el modo de edición
  const [nuevaPrioridad, setNuevaPrioridad] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  const mostrarMensaje = (texto, tipo) => {
    setMensaje({ texto, tipo });
    setOpenSnackbar(true);
  };

  // Cargar tareas al montar el componente
  useEffect(() => {
    dispatch(fetchTareas());
  }, [dispatch]);

  const handleEliminarTarea = (id) => {
    dispatch(deleteTarea(id))
      .then(() => mostrarMensaje("Tarea eliminada correctamente", "success"))
      .catch(() => mostrarMensaje("Error al eliminar la tarea", "error"));
  };

  const handleActualizarTarea = (id) => {
    dispatch(
      updateTarea({
        id,
        tareaActualizada: { prioridad: nuevaPrioridad, estado: nuevoEstado },
      })
    )
      .then((result) => {
        const tareaActualizada = result.payload; // La respuesta del backend
        mostrarMensaje("Tarea actualizada correctamente", "success");
  
        // Actualizar el estado global directamente
        dispatch(fetchTareas()); // Opcional, si prefieres recargar desde el backend
        setEditando(null);
      })
      .catch(() => mostrarMensaje("Error al actualizar la tarea", "error"));
  };
  
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Lista de Tareas
      </Typography>

      {/* Formulario para agregar tarea */}
      <AgregarTarea
        onTareaAgregada={() => {
          dispatch(fetchTareas());
          mostrarMensaje("Tarea agregada correctamente", "success");
        }}
      />

      {/* Estado de carga */}
      {status === "loading" && <Typography>Cargando tareas...</Typography>}
      {status === "failed" && (
        <Typography color="error">Error: {error}</Typography>
      )}

      {/* Lista de tareas */}
      <List>
        {tareas.map((tarea) => (
          <ListItem key={tarea._id} divider>
            {editando === tarea._id ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <TextField
                  label="Nueva Prioridad"
                  variant="outlined"
                  size="small"
                  value={nuevaPrioridad}
                  onChange={(e) => setNuevaPrioridad(e.target.value)}
                  placeholder="Alta, Media o Baja"
                />
                <TextField
                  label="Nuevo Estado"
                  variant="outlined"
                  size="small"
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                  placeholder="Pendiente, En Progreso, Completado"
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleActualizarTarea(tarea._id)}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditando(null)}
                  >
                    Cancelar
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <ListItemText
                  primary={`Tarea: ${tarea.tarea}`}
                  secondary={`Prioridad: ${tarea.prioridad} | Estado: ${tarea.estado}`}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setEditando(tarea._id);
                      setNuevaPrioridad(tarea.prioridad);
                      setNuevoEstado(tarea.estado);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleEliminarTarea(tarea._id)}
                  >
                    Eliminar
                  </Button>
                </Box>
              </>
            )}
          </ListItem>
        ))}
      </List>

      {/* Feedback visual con Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={mensaje.tipo}
          sx={{ width: "100%" }}
        >
          {mensaje.texto}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ListaTareas;

