import PySimpleGUI as sg

sg.theme('Reddit')

layout = [ # Contenido de la ventana
    [sg.Text('Some text on Row 1')],
    [sg.Text('Enter something on Row 2'), sg.InputText(key='input_text')],
    [sg.ButtonMenu('ButtonMenu', ['MenuChoice', 'MenuChoice2', 'MenuChoice3'])],
    [sg.Checkbox('Checkbox', default=True), sg.Checkbox('My second checkbox!')],
    [sg.Radio('My first Radio', "RADIO1", default=True), sg.Radio('My second Radio!', "RADIO1")],
    [sg.Button('Ok'), sg.Button('Cancel')]]

# Ventana creada
window = sg.Window('Ceretopía: sensor IoT simulado', layout, icon='icon.ico')

# Event Loop to process "events" and get the "values" of the inputs
while True:
    event, values = window.read()
    if event == sg.WIN_CLOSED or event == 'Cancel': # if user closes window or clicks cancel
        break
    print('You entered ', values[0])
    print('El texto introuducido es ', values['input_text'])

window.close()

'''
Generador de estaciones y lecturas
Parámetros de generación:
- Elegir estación (bicicletas o ruido)
- Elegir fecha
- rango de valores
- rango de ubicación:
	rango lat
	rango lon

Delay (en segundos, >0): 
Iteraciones:

URI backend (defaul: localhost:5000)

[Ejecutar] [Cancelar]
'''