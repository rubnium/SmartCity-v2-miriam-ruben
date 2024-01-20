# Ceretopía V2 - Proyecto Smart City de Miriam y Rubén
Ceretopía es un sistema gestor de ciudad inteligente basada en la capital española de Madrid. Tiene como objetivo combatir con las cuestiones medioambientales y accesibilidad de la información sobre el transporte público tan denostado en nuestra sociedad. Este repositorio alberga una modificación del [proyecto original](https://github.com/rubnium/SmartCity-miriam-ruben) que implementa el uso de API securizada mediante JWT y un cliente que simula lecturas como un sensor IoT.


## Preparativos:
1. Realizar los [preparativos originales](https://github.com/rubnium/SmartCity-miriam-ruben).
2. Descargar este repositorio.
3. Tener Python >=3.10.
4. Instalar los módulos de Python necesarios:
    - Dentro de la carpeta [smartcity-mr-cliente](smartcity-mr-cliente/), ejecutar el comando `pip install -r requirements.txt`.


## Instrucciones:
### 1. Preparar la base de datos, ejecutar el backend y ejecutar el frontend
Seguir las [instrucciones originales](https://github.com/rubnium/SmartCity-miriam-ruben).


### Ejecutar el sensor IoT simulado
Para poder utilizar el cliente, primero debe estar desplegada la base de datos y en ejecución el backend. Posteriormente, hay que realizar los siguientes pasos:
1. Acceder a la carpeta [smartcity-mr-cliente](smartcity-mr-cliente/).
2. Ejecutar `python main.py`
    - Dependiendo del sistema que lo ejecute, podría ser `python` o `python3`.
3. Rellenar la ventana de interfaz con los datos deseados (tipo de dato a generar, rango de valores, latitud, longitud, URI de backend...).
4. Presionar el botón "Ejecutar" y disfrutar de los resultados. Durante la ejecución se puede comprobar el estado observando la terminal desde la que fue ejecutado.


## Funciones:
### Backend:
Para utilizarlas, casi todas requieren introducir el token en la cabecera. Suponiendo que se ejecuta en local y en el puerto 5000 (http://localhost:5000):  
- 🆕Seguridad:
	- POST `/secure/login`: Enviar una dirección de correo electrónico para recibir un token de uso (no necesita token en la cabecera, ya que es para obtener uno).
	  Ejemplo de cuerpo de la petición:
      ```
      {
        "email": "example@example.com"
      }
      ```
	  
	- GET `/secure/test`: Comprobar si el token es válido.
	
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

    - 🆕POST `/bicicletasAforo`: Insertar nuevas lecturas de bicicletas.  
      Ejemplo de cuerpo de la petición:
      ```
      {
        "fecha": "01/01/2051",
        "hora": "7:00",
        "id": "PERM_BICI01_PM01",
        "bicicletas": 0,
        "num_distrito": 2,
        "distrito": "Arganzuela",
        "nombre_vial": "Calle Toledo ",
        "numero": "133",
        "codigo_postal": 28005,
        "observaciones_direccion": "Sentido Gta. Pirámides ",
        "lat": "40.40547173",
        "lon": "-3.711960704"
      }
      ```

- Disponibilidad de bicicletas:
    - GET `/bicicletasDisponibilidad/:dia/:mes/:año`: Obtener la información de disponibilidad de bicicletas de una fecha determinada.  
    Los valores `dia/mes/año` deben estar entre el `01/01/2051` y el `31/12/2051`.  

- Acústica
    - GET `/acustica/contaminacion/:mes/:año`: Obtener los valores de intensidad de sonido leídos por cada estación de medición en una fecha determinada.  
    Los valores `mes/año` deben estar entre el `01/2051` y el `12/2051`.

    - GET `/acustica/riesgos`: Obtener la lista de riesgos posibles de un alto ruido en las calles.

    - 🆕POST `/acustica/estacion`: Insertar una nueva estación.  
      Ejemplo de cuerpo de la petición:
      ```
      {
        "id": 1,
        "nombre": "Pº Recoletos",
        "codigo_via": "633005",
        "direccion": "Frente calle Almirante",
        "fecha_alta": "07/03/2011",
        "altura": 648,
        "lat": "40.42262",
        "lon": "-3.6919264"
      }
      ```

    - 🆕POST `/acustica/contaminacion`: Insertar nuevos datos de contaminación.  
      Ejemplo de cuerpo de la petición:
      ```
      {
        "mes": 1,
        "ano": 2051,
        "estacion": 6,
        "med_diurno": 71.9,
        "med_vespertino": 71.6,
        "med_nocturno": 67.1,
        "LAeq24": 70.8,
        "med_percentil01": 77.7,
        "med_percentil10": 74.3,
        "med_percentil50": 67.7,
        "med_percentil90": 60,
        "med_percentil99": 51.3
      }
      ```

### Frontend:
Suponiendo que se ejecuta en local y en el puerto 3000 (http://localhost:3000):
- [`/`](http://localhost:3000): página de inicio
- 🆕[`/login`](http://localhost:3000/login): muestra si el usuario está autenticado, además de un formulario para realizar la autenticación, en el cual el usuario introduce sus datos y acepta las cookies. Esta parte del sistema permite acceder al resto de páginas.
- [`/paradas`](http://localhost:3000/paradas): muestra un mapa con todas las paradas y líneas del tipo de transporte seleccionado. Al hacer clic en las paradas o en las líneas, se muestra breve información de las mismas. Permite deshabilitar y volver a habilitar las paradas al seleccionarlas en el mapa.
- [`/bicicletas`](http://localhost:3000/bicicletas): muestra información útil sobre las bicicletas de préstamo en la ciudad. Por una parte, permite al usuario elegir una fecha y muestra las estadísticas de disponibilidad y uso de las bicicletas. Por otra parte, el usuario además puede escoger una hora, y el mapa se mostrará con el aforo de bicicletas en dicha fecha y hora. Además, dicho mapa tiene sus puntos diferenciados según la disponibilidad de bicicletas, y al seleccionarlos muestra la cantidad de bicicletas, información del punto y un enlace para mostrar las direcciones de cómo llegar a través de Google Maps.
- [`/contaminacion`](http://localhost:3000/contaminacion): muestra la intensidad de ruido en distintos puntos de la ciudad. Luego de que el usuario seleccione un mes y el periodo en el que se midieron los datos, un mapa se muestra con los distintos puntos diferenciados según el riesgo de la intensidad de ruido medida. El mapa permite mostrar más datos de la medición al hacer clic en sus puntos, como la altura de la estación de medida y el nombre de la calle.
