# SmartCity-miriam-ruben
<!--TODO: añadir descripcion-->

## Preparativos:
1. Tener Docker (además del comando `docker-compose`) y Node.js (además de `npm`) instalados y operativos.
2. Descargar el contenido de este repositorio.
3. Ejecutar, dentro de las carpetas [smartcity-miriam-ruben-backend](smartcity-miriam-ruben-backend/) y [smartcity-miriam-ruben-frontend](smartcity-miriam-ruben-frontend/), el comando `npm install`.

## Instrucciones:
#### 1. Preparar la base de datos.
Hay 3 opciones posibles (escoger solo una):
- *Usar la base de datos de MongoDB Atlas*:  
Ésta se ha probado por última vez en enero de 2024, por lo que una ejecución posterior a dicha fecha no asegura su funcionamiento. No hay que preparar nada, [ve al paso 2](#2-ejecutar-el-backend). En caso de no funcionar, pasar a la siguiente opción.
- *Usar la base de datos MongoDB desplegada con Docker* (recomendado):  
Dentro de la carpeta [smartcity-mr-db](smartcity-mr-db/) ejecutar el comando `docker-compose up -d`. Se iniciará la base de datos en el puerto 27018 (en el caso de querer utilizar un puerto distinto habrá que modificar el [docker-compose.yml](smartcity-mr-db/docker-compose.yml)). Tras este paso, la base de datos estará desplegada en `localhost:27018`. [Continuar en el paso 2](#2-ejecutar-el-backend).
- *Crear una base de datos MongoDB con los JSON proporcionados*:  
Será necesario montar una base de datos MongoDB, crear una base de datos "*data*" y una colección por cada [.json de la carpeta proporcionada](smartcity-mr-db/data). Habrá que tomar nota de la dirección y el puerto de la base de datos para el [paso 2](#2-ejecutar-el-backend).  

#### 2. Ejecutar el backend.
El backend cogerá los datos de la base de datos y los pondrá a disposición según sea necesario.  
Primero será necesario preparar el backend para que acceda a la base de datos. Dependiendo de lo realizado en el paso 1, habrá que editar el [.env](smartcity-miriam-ruben-backend/.env) (para así reflejar la opción escogida y/o un puerto modificado).  
El backend está configurado para ejecutarse en el puerto 5000. En caso de error o de ser necesario desplegarlo en otro puerto, habrá que reemplazar en el [package.json](smartcity-miriam-ruben-backend/package.json) todos los valores `PORT=5000` con `PORT=<nuevo puerto>`.  
Dentro de la carpeta [smartcity-miriam-ruben-backend](smartcity-miriam-ruben-backend/), ejecutar finalmente el backend con el siguiente comando dependiendo de la plataforma:
- Windows: `npm run start:dev_windows`
- Linux o Mac: `npm run start:dev_linux`

Por defecto este paso desplegará el backend en `localhost:5000`.

#### 3. Ejecutar el frontend.
El frontend usará todos los datos del backend y los irá renderizando de distintas maneras.  
En el caso de haber desplegado el backend en una dirección/puerto distinto al predeterminado, será necesario modificar el [.env](smartcity-miriam-ruben-frontend/.env).  
El frontend está configurado para ejecutarse en el puerto 3000. Si la ejecución del frontend lanza error o es necesario usar otro puerto, habrá que modificar el [.env](smartcity-miriam-ruben-frontend/.env).  
Dentro de la carpeta [smartcity-miriam-ruben-frontend](smartcity-miriam-ruben-frontend/), ejecutar finalmente el frontend con el siguiente comando `npm run start`.  
Por defecto este paso desplegará el frontend en `localhost:3000`.

#### 4. Disfrutar la aplicación.
Introduciendo la dirección del frontend en un navegador web, se podrán experimentar todas las funciones que ofrece esta aplicación. Más detalles en el apartado [Funciones.Frontend](#frontend).

## Funciones:
### Backend:
Suponiendo que se ejecuta en local y en el puerto 5000:  
<!--TODO: hablar de los GET y PUT disponibles-->


### Frontend:
Suponiendo que se ejecuta en local y en el puerto 3000:
<!--TODO: hablar de los enlaces disponibles-->
