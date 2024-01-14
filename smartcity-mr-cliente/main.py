import PySimpleGUI as sg

sg.theme('Reddit')

layout = [ # Contenido de la ventana
    [sg.Text('Some text on Row 1')],
    [sg.Text('Enter something on Row 2'), sg.InputText()],
    [sg.Button('Ok'), sg.Button('Cancel')]]

# Ventana creada
window = sg.Window('Ceretopía: sensor IoT', layout, icon='icon.ico')

# Event Loop to process "events" and get the "values" of the inputs
while True:
    event, values = window.read()
    if event == sg.WIN_CLOSED or event == 'Cancel': # if user closes window or clicks cancel
        break
    print('You entered ', values[0])

window.close()