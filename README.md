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
Dentro de la carpeta [smartcity-mr-db](smartcity-mr-db/) ejecutar el comando `docker-compose up -d`. Se iniciará la base de datos en el puerto 27018 (en el caso de querer utilizar un puerto distinto habrá que modificar el [docker-compose.yml](smartcity-mr-db/docker-compose.yml)). Tras este paso, la base de datos estará desplegada en `mongodb://localhost:27018`. [Continuar en el paso 2](#2-ejecutar-el-backend).
- *Crear una base de datos MongoDB con los JSON proporcionados*:  
Será necesario montar una base de datos MongoDB, crear una base de datos "*data*" y una colección por cada [.json de la carpeta proporcionada](smartcity-mr-db/data). Habrá que tomar nota de la dirección y el puerto de la base de datos para el [paso 2](#2-ejecutar-el-backend).  

#### 2. Ejecutar el backend.
El backend cogerá los datos de la base de datos y los pondrá a disposición según sea necesario.  
Primero será necesario preparar el backend para que acceda a la base de datos. Dependiendo de lo realizado en el paso 1, habrá que editar el [.env](smartcity-miriam-ruben-backend/.env) (para así reflejar la opción escogida y/o un puerto modificado).  
El backend está configurado para ejecutarse en el puerto 5000. En caso de error o de ser necesario desplegarlo en otro puerto, habrá que reemplazar en el [package.json](smartcity-miriam-ruben-backend/package.json) todos los valores `PORT=5000` con `PORT=<nuevo puerto>`.  
Dentro de la carpeta [smartcity-miriam-ruben-backend](smartcity-miriam-ruben-backend/), ejecutar finalmente el backend con el siguiente comando dependiendo de la plataforma:
- Windows: `npm run start:dev_windows`
- Linux o Mac: `npm run start:dev_linux`

Por defecto este paso desplegará el backend en `http://localhost:5000`.

#### 3. Ejecutar el frontend.
El frontend usará todos los datos del backend y los irá renderizando de distintas maneras.  
En el caso de haber desplegado el backend en una dirección/puerto distinto al predeterminado, será necesario modificar el [.env](smartcity-miriam-ruben-frontend/.env).  
El frontend está configurado para ejecutarse en el puerto 3000. Si la ejecución del frontend lanza error o es necesario usar otro puerto, habrá que modificar el [.env](smartcity-miriam-ruben-frontend/.env).  
Dentro de la carpeta [smartcity-miriam-ruben-frontend](smartcity-miriam-ruben-frontend/), ejecutar finalmente el frontend con el siguiente comando `npm run start`.  
Por defecto este paso desplegará el frontend en `http://localhost:3000`.

#### 4. Disfrutar la aplicación.
Introduciendo la dirección del frontend en un navegador web, se podrán experimentar todas las funciones que ofrece esta aplicación. Más detalles en el apartado [Funciones.Frontend](#frontend).


## Funciones:
### Backend:
Suponiendo que se ejecuta en local y en el puerto 5000 (http://localhost:5000):  
- Paradas:
    - GET `/paradas/:tipo`: Obtener todas las paradas de un tipo de transporte público.  
    `tipo` debe ser `'autobus'`, `'cercanias'`, `'interurbano'`, `'metro'` o `'metroLigero'`.

    - GET `/paradas/:tipo/desh=:deshabilitado`: Obtener todas las paradas habilitadas o deshabilitadas de un tipo de transporte.  
    `tipo` debe ser `'autobus'`, `'cercanias'`, `'interurbano'`, `'metro'` o `'metroLigero'`.  
    `deshabilitado` debe ser `0` (false) o `1` (true).

    - GET `/paradas/:tipo/:linea`: Obtener todas las paradas de la línea de un tipo de transporte.  
    `tipo` debe ser `'autobus'`, `'cercanias'`, `'interurbano'`, `'metro'` o `'metroLigero'`. 

    - PUT `/paradas/:tipo/:linea/:parada`: Actualizar una parada para habilitarla/deshabilitarla.  
      Ejemplo de cuerpo de la petición:
      ```
      {
        "deshabilitado": false,
        "motivo": ""
      }
      ```
      `tipo` debe ser `'autobus'`, `'cercanias'`, `'interurbano'`, `'metro'` o `'metroLigero'`.
      `deshabilitado` debe ser `true` si se va a deshabilitar, o `false` si se va a habilitar.  
      `motivo` contiene el motivo de la deshabilitación. Debe tener algún texto si se va a deshabilitar (opcional), o ser un String vacío si se va a habilitar.
  
- Aforo de bicicletas:
    - GET `/bicicletasAforo/id=:id`: Obtener todos los valores leídos de una estación de aforo.

    - GET `/bicicletasAforo/:dia/:mes/:año/:hora`: Obtener los valores de una fecha y hora determinadas de todas las estaciones de aforo.  
    Los valores `dia/mes/año` deben estar entre el `01/01/2051` y el `31/12/2051`.  
    El valor `hora` está compuesto por dos dígitos, `hora:minuto`. `hora` debe ser un valor entre `'0'` y `'23'`, y `minuto` debe ser `00`.

- Disponibilidad de bicicletas:
    - GET `/bicicletasDisponibilidad/:dia/:mes/:año`: Obtener la información de disponibilidad de bicicletas de una fecha determinada.  
    Los valores `dia/mes/año` deben estar entre el `01/01/2051` y el `31/12/2051`.  

- Acústica
    - GET `/acustica/contaminacion/:mes/:año`: Obtener los valores de intensidad de sonido leídos por cada estación de medición en una fecha determinada.  
    Los valores `mes/año` deben estar entre el `01/2051` y el `12/2051`.

    - GET `/acustica/riesgos`: Obtener la lista de riesgos posibles de un alto ruido en las calles.

### Frontend:
Suponiendo que se ejecuta en local y en el puerto 3000 (http://localhost:3000):
- [`/`](http://localhost:3000): página de inicio
- [`/paradas`](http://localhost:3000/paradas): muestra un mapa con todas las paradas y líneas del tipo de transporte seleccionado. Al hacer clic en las paradas o en las líneas, se muestra breve información de las mismas. Permite deshabilitar y volver a habilitar las paradas al seleccionarlas en el mapa.
- [`/bicicletas`](http://localhost:3000/bicicletas): muestra información útil sobre las bicicletas de préstamo en la ciudad. Por una parte, permite al usuario elegir una fecha y muestra las estadísticas de disponibilidad y uso de las bicicletas. Por otra parte, el usuario además puede escoger una hora, y el mapa se mostrará con el aforo de bicicletas en dicha fecha y hora. Además, dicho mapa tiene sus puntos diferenciados según la disponibilidad de bicicletas, y al seleccionarlos muestra la cantidad de bicicletas, información del punto y un enlace para mostrar las direcciones de cómo llegar a través de Google Maps.
- [`/contaminacion`](http://localhost:3000/contaminacion): muestra la intensidad de ruido en distintos puntos de la ciudad. Luego de que el usuario seleccione un mes y el periodo en el que se midieron los datos, un mapa se muestra con los distintos puntos diferenciados según el riesgo de la intensidad de ruido medida. El mapa permite mostrar más datos de la medición al hacer clic en sus puntos, como la altura de la estación de medida y el nombre de la calle.
