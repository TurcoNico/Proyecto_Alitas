#!/bin/sh

# Esperar hasta que MySQL esté disponible
while ! nc -z db_mysql_clinicalproject 3306; do
  echo "Esperando a que MySQL arranque..."
  sleep 1
done

echo "MySQL arrancó. Ejecutando migraciones y arrancando el servidor Django..."

cd /opt/back_end/clinicalproject/

# Ejecutar migraciones
python manage.py migrate

# Arrancar el servidor
python manage.py runserver 0.0.0.0:8000
