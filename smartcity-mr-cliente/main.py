import PySimpleGUI as sg

sg.theme('Reddit')


layout = [ # Contenido de la ventana
    [sg.Text('Estación: '), sg.Radio('Bicicletas', 'RADIOEST', 'estBici', enable_events=True), sg.Radio('Ruido', 'RADIOEST', 'estRuido', enable_events=True)],
    [sg.Text('Fecha: ')],
    [sg.Text('Rango de valores: ')], 
    [sg.Text('\tMínimo:'), sg.Input(key='varMin', size=(10, 1)), sg.Text('Máximo:'), sg.Input(key='varMax', size=(10, 1)), sg.Text('', key='varText')],
    [sg.Text('Rango de ubicación: ')],
    [sg.Text('\tLatitud:'), sg.Input(key='latMin', size=(10, 1)), sg.Text('-'), sg.Input(key='latMax', size=(10, 1)), sg.Text('Longitud:'), sg.Input(key='lonMin', size=(10, 1)), sg.Text('-'), sg.Input(key='lonMax', size=(10, 1))],
    [sg.Text('Delay (en segundos, >0): '), sg.Input(key='delay', size=(10, 1))],
    [sg.Text('Iteraciones: '), sg.Input(key='iteraciones', size=(10, 1))],
    [sg.Text('URI backend: '), sg.Input(key='backend', size=(40, 1), default_text="localhost:5000")],
    [sg.Button('Ejecutar'), sg.Button('Cancelar')]]

# Ventana creada
window = sg.Window('Ceretopía: sensor IoT simulado', layout, icon='icon.ico')

# Event Loop to process "events" and get the "values" of the inputs
while True:
    event, values = window.read()
    if event == sg.WIN_CLOSED or event == 'Cancelar': # if user closes window or clicks cancel
        break
    elif event == 'estBici':
        window['varText'].update('\t(bicicletas)')
    elif event == 'estRuido':
        window['varText'].update('\t(db)')

    print('You entered ', values[0]),
    print('El texto introuducido es ', values[1])

window.close()

'''
URI backend (defaul: localhost:5000)
    [sg.ButtonMenu('ButtonMenu', ['MenuChoice', 'MenuChoice2', 'MenuChoice3'])],
    [sg.Checkbox('Checkbox', default=True), sg.Checkbox('My second checkbox!')],
    [sg.Radio('My first Radio', "RADIO1", default=True), sg.Radio('My second Radio!', "RADIO1")],
[Ejecutar] [Cancelar]
'''