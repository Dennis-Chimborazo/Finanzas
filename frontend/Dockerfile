# Etapa 1: Construcción
FROM node:18 AS build

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Compilar la app para producción
RUN npm run build

# Etapa 2: Servir la app con un servidor estático
FROM nginx:stable-alpine

# Copiar los archivos de construcción a la carpeta de NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración de NGINX (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
