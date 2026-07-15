📚 Documentación de la API - TaskFlow
Esta sección detalla los endpoints de la API de TaskFlow para la gestión de tareas.

POST /api/tasks
Descripción: Crea una nueva tarea en el sistema.
Auth requerida: Sí
Body (JSON):

JSON
{
  "title": "Diseñar pantalla login",
  "projectId": "123abc",
  "assignedTo": "456bob"
}
Respuesta exitosa: 201 Created

JSON
{
  "data": {
    "id": "uuid-tarea",
    "title": "Diseñar pantalla login",
    "status": "TODO"
  }
}
Errores:

400: Error de validación en los campos requeridos.

401: No autorizado.

PUT /api/tasks/{id}
Descripción: Actualiza los detalles de una tarea existente.
Auth requerida: Sí
Body (JSON):

JSON
{
  "title": "Nuevo título",
  "description": "Descripción actualizada",
  "status": "IN_PROGRESS",
  "assignedTo": "456bob"
}
Respuesta exitosa: 200 OK

JSON
{
  "message": "Tarea actualizada correctamente"
}
Errores:

404: Tarea no encontrada.

401: No autorizado.

DELETE /api/tasks/{id}
Descripción: Elimina una tarea del sistema.
Auth requerida: Sí
Body (JSON): N/A
Respuesta exitosa: 200 OK

JSON
{
  "message": "Tarea eliminada"
}
Errores:

404: Tarea no encontrada.

401: No autorizado.

GET /api/tasks/project/{projectId}
Descripción: Obtiene todas las tareas asociadas a un proyecto específico.
Auth requerida: Sí
Body (JSON): N/A
Respuesta exitosa: 200 OK

JSON
[
  {
    "id": "1",
    "title": "Tarea 1",
    "status": "TODO"
  }
]
Errores:

401: No autorizado.

GET /api/tasks/{id}
Descripción: Obtiene los detalles de una tarea específica por su ID.
Auth requerida: Sí
Body (JSON): N/A
Respuesta exitosa: 200 OK

JSON
{
  "id": "1",
  "title": "Tarea 1",
  "description": "...",
  "status": "TODO"
}
Errores:

404: Tarea no encontrada.

401: No autorizado.