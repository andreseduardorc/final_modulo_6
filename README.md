﻿# final_modulo_6

ejemplos para probar agregar y eliminar del listado 

agregar 

Invoke-WebRequest -Uri http://localhost:3001/animes -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"nombre": "prueba", "genero": "prueba", "año": "11111", "autor": "prueba"}'

eliminar 

Invoke-WebRequest -Uri http://localhost:3001/animes/6 -Method DELETE


 
