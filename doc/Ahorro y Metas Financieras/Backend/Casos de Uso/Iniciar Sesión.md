## Nombre

Iniciar Sesión

## Descripción

Este caso de uso permite a los usuarios autenticarse en el sistema bancario proporcionando sus credenciales válidas. Una vez autenticados, los usuarios pueden acceder a las funcionalidades disponibles según sus roles y permisos asignados.

## Actores

- **Usuario Registrado**: Persona que posee una cuenta activa en el sistema.
- **Sistema de Autenticación**: Módulo encargado de verificar las credenciales y gestionar las sesiones de usuario. 

## Precondiciones
- El usuario debe estar **previamente registrado en el sistema**.
- El usuario debe contar con **credenciales válidas (nombre de usuario y contraseña)**.
- El sistema de autenticación debe estar operativo.

## Flujo Principal

1. El usuario accede a la interfaz de inicio de sesión.
2. El sistema presenta el formulario de autenticación solicitando nombre de usuario y contraseña.
3. El usuario ingresa sus credenciales y envía la solicitud.
4. El sistema verifica la existencia del usuario.
5. El sistema valida que la contraseña ingresada coincida con la registrada.
6. Si las credenciales son válidas, el sistema inicia una sesión para el usuario.
7. El sistema redirige al usuario al panel principal.

## Flujos Alternativos

#### Credenciales Incorrectas

 **Condición**: El usuario ingresa un nombre de usuario o contraseña incorrectos.  
 **Acción**:
- El sistema muestra un mensaje de error indicando que las credenciales son inválidas. 
- El sistema permite al usuario reintentar el inicio de sesión.

## Postcondiciones

- El usuario ha iniciado sesión exitosamente y tiene acceso a las funcionalidades permitidas por su rol.

## Observaciones Técnicas

La implementación de un registrado de log de la sesión iniciada para fines de auditoría y seguridad.

---
**Autor:** Llerena Gabriel
**Fecha:** 2025-04-24