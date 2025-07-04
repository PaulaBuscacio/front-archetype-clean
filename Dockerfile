# Etapa 1: Build da aplicação Angular
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:clean-archetype -- --output-path=dist

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos buildados para o diretório do Nginx
COPY --from=build /app/dist/browser /usr/share/nginx/html/clean-archetype

# Copia uma configuração customizada do Nginx (opcional)
COPY nginx.conf /usr/share/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]