# SmartCity-miriam-ruben
## Instrucciones:
1. Montar base de datos Mongo proporcionada con Docker  
	Dentro de la carpeta [smartcity-mr-db](/smartcity-mr-db) ejecutar el comando `docker-compose up -d`. Iniciará la base de datos en el puerto 27018 (para editar el puerto es necesario modificar el .yml y los .env). Como alternativa, se puede usar los ficheros de la carpeta [smartcity-mr-db/data](/smartcity-mr-db/data) para importar los datos a otra base de datos Mongo distinta (para ello es necesario crear una collection "data" e importar los ficheros, se recomienda utilizar Studio 3T).
2. Ejecutar backend
3. Ejecutar frontend