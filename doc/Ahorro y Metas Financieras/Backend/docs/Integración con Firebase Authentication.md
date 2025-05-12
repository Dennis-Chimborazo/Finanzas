# Introducción

Este documento describe el mecanismo de autenticación implementado en el sistema bancario utilizando Firebase Authentication. El sistema utiliza Firebase para verificar las credenciales de los usuarios y generar tokens seguros que se utilizan para autenticar las solicitudes entre el frontend y el backend.

## Propósito

Garantizar una autenticación segura, escalable y confiable para los usuarios del sistema bancario mediante los servicios de Firebase.

## Visión General

Firebase Authentication proporciona servicios de identidad como:
- Inicio de sesión con correo electrónico y contraseña
- Generación segura de tokens JWT
- Gestión de sesiones mediante ID tokens
- Integración con componentes frontend y backend

## Arquitectura

### Resumen del Flujo

1. El frontend presenta un formulario de inicio de sesión al usuario.
2. El usuario envía su correo electrónico y contraseña.
3. Firebase Auth valida las credenciales y, si son correctas, devuelve un token JWT (ID Token).
4. El frontend almacena el token (por ejemplo, en `localStorage`).
5. El token se envía en el encabezado de autorización (`Authorization: Bearer <token>`) de cada solicitud HTTP al backend.
6. El backend verifica el token utilizando Firebase Admin SDK.
7. Si el token es válido, la solicitud continúa. De lo contrario, se rechaza con un error 401 Unauthorized.

## Servicios de Firebase Utilizados

- **Firebase Authentication**
  - Proveedor de autenticación con correo y contraseña
  - Generación de tokens de autenticación

- **Firebase Admin SDK** (en el backend)
  - Verificación de tokens
  - Extracción de UID

## Validación de Token en el Backend

El backend utiliza Firebase Admin SDK que despues valida el `token` obtenido a través del frontend.

---
**Autor:** Llerena Gabriel
**Fecha:** 2025-04-24