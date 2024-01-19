from datetime import datetime
import PySimpleGUI as sg

import request

sg.theme('Reddit')


def checkValues(values) -> str:
    message = ""
    estBici, estRuido, dia, mes, hora, varMin, varMax, latMin, latMax, lonMin, lonMax, delay, iteraciones, backend = values.values()
    if not estBici and not estRuido:
        message = "Selecciona una opción de estación\n"
    
    #Comprobar que dia existe
    try:
        datetime(2051, int(mes), int(dia), int(hora), 00)
    except Exception as e:
        message += "Los valores de fecha no son válidos\n"

    #Comprobar varMin y varMax
    try:
        varMin = int(varMin)
        varMax = int(varMax)
        if varMin > varMax:
            message += "varMin es más grande que varMax\n"
        if varMin <= 0 or varMax <= 0:
            message += "varMin/varMax es menor o igual a 0\n"
    except Exception as e:
        message += "Valores no es un valor entero\n"
    
    #comprobacion lat
    try:
        latMin = float(latMin)
        latMax = float(latMax)
        if latMin > latMax:
            message += "latMin es más grande que latMax\n"
        if latMin < latRangeAvailable[0] or latMax > latRangeAvailable[1]:
            message += "Latitud no cumple con el rango\n"
    except Exception as e:
        message += "Latitud no es un valor decimal\n"

    #comprobarcion lon
    try:
        lonMin = float(lonMin)
        lonMax = float(lonMax)
        if lonMin > latMax:
            message += "lonMin es más grande que lonMax\n"
        if lonMin < lonRangeAvailable[0] or lonMax > lonRangeAvailable[1]:
            message += "Longitud no cumple con el rango\n"
    except Exception as e:
        message += "Longitud no es un valor decimal\n"

    try:
        delay = float(delay)
        if delay <= 0:
            message += "No se pueden esperar 0 segundos o menos\n"
    except Exception as e:
        message += "Delay no es un valor decimal\n"

    try:
        iteraciones = int(iteraciones)
        if iteraciones <= 0:
            message += "No se pueden hacer 0 iteraciones o menos\n"
    except Exception as e:
        message += "Iteraciones no es un valor entero\n"

    if backend == "":
        message += "Introduce la URI del backend"

    return message


dias = [str(i).zfill(2) for i in range(1, 32)]
meses = [str(i).zfill(2) for i in range(1, 32)]
horas = [str(i) for i in range(1, 24)]

latRangeAvailable = [38.916897, 41.802697]
lonRangeAvailable = [-0.345458, -7.384931]

request = request.Request

layout = [ # Contenido de la ventana
    [sg.Text('Estación: '), sg.Radio('Bicicletas', 'RADIOEST', key='estBici', enable_events=True), sg.Radio('Ruido', 'RADIOEST', key='estRuido', enable_events=True)],
    [sg.Text('Fecha: '), sg.Combo(dias, key='dia', default_value='01'), sg.Text('/'), sg.Combo(meses, key='mes', default_value='01'), sg.Text("/2051"), sg.Text('\tHora: '), sg.Combo(horas, key='hora', default_value='1'), sg.Text(':00')],
    [sg.Text('(el día y la hora no afecta si se ha seleccionado Ruido)')],
    [sg.Text('Rango de valores: (>0)')], 
    [sg.Text('\tMínimo:'), sg.Input(key='varMin', size=(10, 1)), sg.Text('Máximo:'), sg.Input(key='varMax', size=(10, 1)), sg.Text('', key='varText')],
    [sg.Text('Rango de ubicación: ')],
    [sg.Text('\tLatitud:'), sg.Input(key='latMin', size=(10, 1), default_text=latRangeAvailable[0]), sg.Text('-'), sg.Input(key='latMax', size=(10, 1), default_text=latRangeAvailable[1]), sg.Text('Longitud:'), sg.Input(key='lonMin', size=(10, 1), default_text=lonRangeAvailable[0]), sg.Text('-'), sg.Input(key='lonMax', size=(10, 1), default_text=lonRangeAvailable[1])],
    [sg.Text('\tRango permitido: {} - {}\tRango permitido: {} - {}'.format(latRangeAvailable[0], latRangeAvailable[1], lonRangeAvailable[0], lonRangeAvailable[1]))],
    [sg.Text('Delay (en segundos, >0): '), sg.Input(key='delay', size=(10, 1))],
    [sg.Text('Iteraciones (>0): '), sg.Input(key='iteraciones', size=(10, 1))],
    [sg.Text('URI backend: '), sg.Input(key='backend', size=(40, 1), default_text="localhost:5000")],
    [sg.Text('', key='warningText', text_color='red')],
    [sg.Text('', key='successText', text_color='green')],
    [sg.Button('Ejecutar'), sg.Button('Cancelar')]]

# Ventana creada
window = sg.Window('Ceretopía: sensor IoT simulado', layout, icon='icon.ico')

# Event Loop to process "events" and get the "values" of the inputs
while True:
    event, values = window.read()
    if event == sg.WIN_CLOSED or event == 'Cancelar': # if user closes window or clicks cancel
        break
    if values['estBici'] == True: window['varText'].update("(bicicletas)")
    elif values['estRuido'] == True: window['varText'].update("(dB)")

    if event == 'Ejecutar':
        check = checkValues(values)
        if check != "":
            window['warningText'].update(check)
        else:
            window['warningText'].update("")
            window['successText'].update("Compruebe la ejecución desde la ventana de terminal.")
            #transforma datos
            #llama a la peticion adecuada
            success = ""
            if values['estBici'] == True:
                request.uri = "http://{}".format(values["backend"])
                fecha = "{}/{}/2051".format(values["dia"], values["mes"])
                hora = "{}/00".format(values["hora"])
                success = request.postBicicletas(request,
                    date=fecha,
                    time=hora,
                    latMin=float(values["latMin"]),
                    latMax=float(values["latMax"]),
                    lonMin=float(values["lonMin"]),
                    lonMax=float(values["lonMax"]),
                    valueMin=int(values["varMin"]),
                    valueMax=int(values["varMax"]),
                    delay=float(values["delay"]),
                    iterations=int(values["iteraciones"])
                )
            elif values['estRuido'] == True:
                success = False
            if not success:
                window['warningText'].update("La ejecución ha terminado de forma errónea. Compruebe la terminal.")
                window['successText'].update("")
            else:
                window['successText'].update("Ejecución terminada.")



window.close()



'''
URI backend (defaul: localhost:5000)
    [sg.ButtonMenu('ButtonMenu', ['MenuChoice', 'MenuChoice2', 'MenuChoice3'])],
    [sg.Checkbox('Checkbox', default=True), sg.Checkbox('My second checkbox!')],
    [sg.Radio('My first Radio', "RADIO1", default=True), sg.Radio('My second Radio!', "RADIO1")],
[Ejecutar] [Cancelar]
'''