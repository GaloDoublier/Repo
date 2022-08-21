import cv2
import numpy as np
import os

direc = "C:/Users/galod/Documents/ORT/2022/prog-apart/python/IA/reconozcoRostros2/fotos"
lista = os.listdir(direc)

etiquetas = []
rostros= []
cont=0

for nombreDir in lista:
    nombre = direc + "/" + nombreDir
    for fileName in os.listdir(nombre):
        etiquetas.append(cont)
        rostros.append(cv2.imread(nombre + "/" + fileName, 0))
    cont+=1
print(etiquetas)

#modelo
modelo = cv2.face.LBPHFaceRecognizer_create()

#entrenamiento
modelo.train(rostros, np.array(etiquetas))
modelo.write("modelo.xml")
print("modelo creado")