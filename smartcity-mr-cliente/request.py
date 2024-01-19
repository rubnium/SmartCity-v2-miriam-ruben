from datetime import datetime
import random
import requests
import time

class Request:
    uri = ""
    token = ""
    reqBodyToken = { "emai": "no@thankyou.com" }
    endpoints = {
        "getToken": "/secure/login",
        "postEstacionAcustica": "/acustica/estacion",
        "postContaminacionAcustica": "/acustica/contaminacion",
        "postAforoBicicletas": "/bicicletasAforo"
    }
    headers = { "Authorization": "Bearer " + token }

    def __init__(self, uri):
        self.token = ""
        self.uri = uri
    
    def requestToken(self):
        print("Obteniendo el token")
        response = requests.post(self.uri+self.endpoints['getToken'], data=self.reqBodyToken)
        response.raise_for_status()
        response_json = response.json()
        self.token = response_json.get("token")

    def postBicicletas(self, date, time, latMin, latMax, lonMin, lonMax, valueMin, valueMax, delay, iterations):
        for i in range(0, iterations):
            if (i != 0):
                time.sleep(delay)
            actualDate = datetime.now()
            bicicletasBody = {
                "fecha": date, 
                "hora": time, 
                "id": "IoT {}".format(actualDate.strftime("%d/%m/%Y %H:%M")),
                "bicicletas": random.randint(valueMin, valueMax),
                "num_distrito": 0,
                "distrito": "",
                "nombre_vial": "Sensor IoT",
                "numero": "",
                "codigo_postal": 0,
                "observaciones_direccion": "generado el {}".format(actualDate.strftime("%d/%m/%Y %H:%M")),
                "lat": str(round(random.uniform(latMin, latMax), 7)),
                "lon": str(round(random.uniform(lonMin, lonMax), 7))
            }

            tries = 3

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
                    print(f"Intento fallido. Razón: {str(e)}")
                    tries -= 1

            if tries == 0:
                print("Se han agotado los intentos. No se pudo realizar el post de bicicletas")
                return False

        return True
    

    def postEstacion(self, lat, lon):
        actualDate = datetime.now()
        estacionBody = {
            "id": int(actualDate.strftime("%d%m%y%H%M%S")),
            "nombre": "IoT {}".format(actualDate.strftime("%d/%m/%Y %H:%M")),
            "codigo_via": "",
            "direccion": "",
            "fecha_alta": actualDate.strftime("%d/%m/%Y"),
            "altura": random.randint(10, 100),
            "lat": lat,
            "lon": lon
        }



    