# API de Gastos entre Roomies

## Descripción

Esta API permite gestionar los gastos compartidos entre compañeros de habitación (roomies). Proporciona dos rutas principales para manejar los datos de los roommates y sus gastos.

## Endpoints

### `/roommates`

#### GET `/roommates`
Obtiene la lista de todos los roommates.

- **URL**: `/roommates`
- **Método HTTP**: `GET`
- **Respuesta Exitosa**:
  - **Código**: `200 OK`
  - **Cuerpo**: Lista de roommates en formato JSON.

- **Ejemplo de Respuesta**:
  ```json
  [
    {
      "id": 1,
      "nombre": "Juan Perez",
      "debe": 0,
      "recibe": 0
    },
    {
      "id": 2,
      "nombre": "Maria Gomez",
      "debe": 0,
      "recibe": 0
    }
  ]