from datetime import datetime
import random
import requests
import time

class Request:
    uri = ""
    headers = ""
    reqBodyToken = { "email": "no@thankyou.com" }
    endpoints = {
        "getToken": "/secure/login",
        "postEstacionAcustica": "/acustica/estacion",
        "postContaminacionAcustica": "/acustica/contaminacion",
        "postAforoBicicletas": "/bicicletasAforo"
    }

    def __init__(self, uri):
        self.token = ""
        self.uri = uri
    
    def requestToken(self):
        print("Obteniendo el token")
        response = requests.post(self.uri+self.endpoints['getToken'], data=self.reqBodyToken)
        response.raise_for_status()
        response_json = response.json()
        self.headers = { "Authorization": "Bearer "+response_json.get("token") }

    def postBicicletas(self, date, timeHour, latMin, latMax, lonMin, lonMax, valueMin, valueMax, delay, iterations):
        for i in range(0, iterations):
            if (i != 0):
                time.sleep(delay)
            actualDate = datetime.now()
            bicicletasBody = {
                "fecha": date, 
                "hora": timeHour, 
                "id": "IoT {}".format(actualDate.strftime("%d/%m/%Y %H:%M")),
                "bicicletas": random.randint(valueMin, valueMax),
                "num_distrito": 0,
                "distrito": "",
                "nombre_vial": "Sensor IoT {}".format(actualDate.strftime("%d/%m/%Y %H:%M")),
                "numero": "",
                "codigo_postal": 0,
                "observaciones_direccion": "generado el {}".format(actualDate.strftime("%d/%m/%Y %H:%M")),
                "lat": str(round(random.uniform(latMin, latMax), 7)),
                "lon": str(round(random.uniform(lonMin, lonMax), 7))
            }

            tries = 4

            while tries > 0:
                try:
                    response = requests.post(self.uri+self.endpoints["postAforoBicicletas"], data=bicicletasBody, headers=self.headers)
                    response.raise_for_status()
                    print("Bicicletas posteada ({fecha} {hora}, bicis={bicis} [{lat},{lon}])".format(
                        fecha=bicicletasBody["fecha"],
                        hora=bicicletasBody["hora"],
                        bicis=bicicletasBody["bicicletas"],
                        lat=bicicletasBody["lat"],
                        lon=bicicletasBody["lon"]
                    ))
                    break
                except requests.RequestException as e:
                    if e.response.status_code == 401:
                        self.requestToken(self)
                    print(f"Intento fallido. Razón: {str(e)}")
                    tries -= 1

            if tries == 0:
                print("Se han agotado los intentos. No se pudo realizar el post de bicicletas")
                return False
        print("Ejecución terminada")
        return True
    

    def postEstacionContaminacion(self, month, latMin, latMax, lonMin, lonMax, valueMin, valueMax, delay, iterations):
        for i in range(0, iterations):
            if (i != 0):
                time.sleep(delay)
            actualDate = datetime.now()
            id = int(actualDate.strftime("%d%m%y%H%M%S"));
            value = round(random.uniform(valueMin, valueMax), 2)
            contaminacionBody = {
                "mes": month,
                "ano": 2051,
                "estacion": id,
                "med_diurno": value,
                "med_vespertino": value,
                "med_nocturno": value,
                "LAeq24": value,
                "med_percentil01": value,
                "med_percentil10": value,
                "med_percentil50": value,
                "med_percentil90": value,
                "med_percentil99": value
            }
            estacionBody = {
                "id": id,
                "nombre": "Sensor IoT {}".format(actualDate.strftime("%d/%m/%Y %H:%M")),
                "codigo_via": "",
                "direccion": "",
                "fecha_alta": actualDate.strftime("%d/%m/%Y"),
                "altura": random.randint(10, 100),
                "lat": str(round(random.uniform(latMin, latMax), 7)),
                "lon": str(round(random.uniform(lonMin, lonMax), 7))
            }

            tries = 4

            while tries > 0:
                try:
                    response = requests.post(self.uri+self.endpoints["postEstacionAcustica"], data=estacionBody, headers=self.headers)
                    response.raise_for_status()
                    print("Estacion posteada (id={id} [{lat},{lon}])".format(
                        id=estacionBody["id"],
                        lat=estacionBody["lat"],
                        lon=estacionBody["lon"]
                    ))
                    break
                except requests.RequestException as e:
                    if e.response.status_code == 401:
                        self.requestToken(self)
                    print(f"Intento fallido. Razón: {str(e)}")
                    tries -= 1

            if tries == 0:
                print("Se han agotado los intentos. No se pudo realizar el post de estación acústica")
                return False
            
            tries = 4

            while tries > 0:
                try:
                    response = requests.post(self.uri+self.endpoints["postContaminacionAcustica"], data=contaminacionBody, headers=self.headers)
                    response.raise_for_status()
                    print("Contaminación posteada ({valor}, {mes}/2051, estacion={estacion})".format(
                        valor=contaminacionBody["LAeq24"],
                        mes=contaminacionBody["mes"],
                        estacion=contaminacionBody["estacion"]
                    ))
                    break
                except requests.RequestException as e:
                    if e.response.status_code == 401:
                        self.requestToken(self)
                    print(f"Intento fallido. Razón: {str(e)}")
                    tries -= 1

            if tries == 0:
                print("Se han agotado los intentos. No se pudo realizar el post de contaminación acústica")
                return False
        print("Ejecución terminada")
        return True
