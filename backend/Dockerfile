# Etapa 1: Build
FROM node:20-alpine AS builder

# Crear directorio de la app
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./

# Instalar dependencias de producción en la etapa de Build
RUN npm install --production

# Copiar el resto del código
COPY . .

# Compilar la app NestJS
RUN npm run build

# Etapa 2: Runtime
FROM node:20-alpine

# Crear directorio para app
WORKDIR /app

# Copiar solo lo necesario desde el builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instalar solo dependencias de producción
RUN npm install --only=production

# Exponer el puerto (por defecto 3000 para NestJS)
EXPOSE 3000

# Comando para arrancar la app con más memoria
CMD ["node", "--max-old-space-size=4096", "dist/main"]
