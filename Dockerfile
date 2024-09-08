# Utiliza la imagen base especificada
FROM python:3.12.5-alpine3.20

RUN apk update && apk add --no-cache \
    mariadb-dev \
    gcc \
    musl-dev \
    linux-headers \
    build-base \
    pkgconfig

# Establece el directorio de trabajo
WORKDIR /opt/back_end/

# Copia los archivos de la aplicación al contenedor
COPY . .

# Dar permisos de ejecución al script de entrada
RUN chmod +x /opt/back_end/entrypoint.sh

# Instala las dependencias necesarias
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto en el que la aplicación correrá (modifícalo según tu aplicación)
EXPOSE 8000