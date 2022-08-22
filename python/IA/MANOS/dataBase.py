import cv2
import mediapipe as mp
import os

cont=0
letra = "A"
direc="C:/Users/galod/Documents/ORT/2022/prog-apart/python/IA/MANOS/fotos"
carpeta= direc+"/"+letra

if not os.path.exists(carpeta):
    print("carpeta creada")
    os.makedirs(carpeta)

detector = mp.solutions.hands
dibujo = mp.solutions.drawing_utils

camara = cv2.VideoCapture(0)

clase_manos  =  mp.solutions.hands
manos = clase_manos.Hands()

while True:
    fine,imagen = camara.read()
    if not fine:
        print("no se pudo conectar a la camara")
        continue
    color = cv2.cvtColor(imagen, cv2.COLOR_BGR2RGB)
    copia = imagen.copy()
    resultado = manos.process(color)
    posiciones = []  # En esta lista vamos a almacenar las coordenadas de los puntos
    #print(resultado.multi_hand_landmarks) #Si queremos ver si existe la deteccion

    if resultado.multi_hand_landmarks: #Si hay algo en los resultados entramos al if
        for mano in resultado.multi_hand_landmarks:  #Buscamos la mano dentro de la lista de manos que nos da el descriptor
            for id, lm in enumerate(mano.landmark):  #Vamos a obtener la informacion de cada mano encontrada por el ID
                #print(id,lm) #Como nos entregan decimales (Proporcion de la imagen) debemos pasarlo a pixeles
                alto, ancho, c = imagen.shape  #Extraemos el ancho y el alto de los fotpgramas para multiplicarlos por la proporcion
                corx, cory = int(lm.x*ancho), int(lm.y*alto) #Extraemos la ubicacion de cada punto que pertence a la mano en coordenadas
                posiciones.append([id,corx,cory])
                dibujo.draw_landmarks(imagen, mano, clase_manos.HAND_CONNECTIONS)
            if len(posiciones) != 0:
                pto_i1 = posiciones[4] #5 Dedos: 4 | 0 Dedos: 3 | 1 Dedo: 2 | 2 Dedos: 3 | 3 Dedos: 4 | 4 Dedos: 8
                pto_i2 = posiciones[20]#5 Dedos: 20| 0 Dedos: 17| 1 Dedo: 17| 2 Dedos: 20| 3 Dedos: 20| 4 Dedos: 20
                pto_i3 = posiciones[12]#5 Dedos: 12| 0 Dedos: 10 | 1 Dedo: 20|2 Dedos: 16| 3 Dedos: 12| 4 Dedos: 12
                pto_i4 = posiciones[0] #5 Dedos: 0 | 0 Dedos: 0 | 1 Dedo: 0 | 2 Dedos: 0 | 3 Dedos: 0 | 4 Dedos: 0
                pto_i5 = posiciones[9] #Punto central
                x1,y1 = (pto_i5[1]-80),(pto_i5[2]-80) #Obtenemos el punto incial y las longitudes
                ancho, alto = (x1+80),(y1+80)
                x2,y2 = x1 + ancho, y1 + alto
                dedos_reg = copia[y1:y2, x1:x2]
                cv2.rectangle(imagen, (x1, y1), (x2, y2), (0, 255, 0), 3)
            dedos_reg = cv2.resize(dedos_reg,(200,200), interpolation = cv2.INTER_CUBIC) #Redimensionamos las fotos
            cv2.imwrite(carpeta + "/Mano_{}.jpg".format(cont),dedos_reg)
            cont = cont + 1

            cv2.imshow('camara', imagen)

        tecla = cv2.waitKey(1)
        if tecla == ord('t') or cont==300 :
            break

camara.release()
cv2.destroyAllWindows()