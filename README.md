# Práctica Web Backend

## Descripción del Proyecto

Este proyecto consiste en una aplicación backend diseñada para permitir que comercios registrados puedan subir y gestionar su contenido (fotos, textos, etc.), el cual será visible para usuarios que busquen comercios por ciudad y actividad específica. 

## Características

- **API Restful:** Proporciona endpoints para administrar usuarios, comercios y contenido.
- **Base de datos:** Compatible con bases de datos relacionales o NoSQL (mongoose).
- **Autenticación:** Uso de JWT para la autenticación y autorización de usuarios y comercios.
- **Roles y permisos:**
  - **Admins:** Registran y administran los comercios.
  - **Comercios:** Gestionan su propio contenido.
  - **Usuarios anónimos:** Consultan comercios y actividades.
  - **Usuarios registrados:** Pueden dejar reseñas y recibir ofertas personalizadas.

## Funcionalidades Principales

### Para Admins:
1. Registro de nuevos comercios con información básica (Nombre, CIF, Dirección, Email, Teléfono).
2. Generación y entrega de tokens JWT para comercios.
3. Gestión de errores con notificaciones automáticas a Slack.

### Para Comercios:
1. Subida y actualización de contenido propio (Ciudad, Actividad, Fotos, Textos).
2. Consulta de intereses de usuarios locales para envíos de correos personalizados.
3. Capacidad de darse de baja y borrar su página.

### Para Usuarios:
1. Consulta de comercios por ciudad, actividad o identificador único.
2. Registro y actualización de datos personales (Ciudad, Intereses, Configuración de Ofertas).
3. Escribir reseñas para comercios.

### Para Usuarios Registrados:
1. Recibir ofertas personalizadas basadas en sus intereses y ubicación.

## Requisitos Técnicos

- **Documentación:** Swagger para describir todos los endpoints disponibles.
- **Pruebas Unitarias:** Implementadas con JEST.
- **Validación de Datos:** Uso de `validators` y `matchedData` para garantizar datos seguros.
- **Mejoras:** Se valoran mejoras funcionales y técnicas sobre los requisitos básicos.
