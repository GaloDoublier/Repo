import cv2
import mediapipe as mp
import os

# carpeta de fotos
def conseguirNombre():
    name=input("ingrese el nombre de la persona: ")
    barbijo=int(input("ingrese 1 para fotos con barbijo y 2 para fotos sin barbijo: "))
    if barbijo==1:
        nombre=name+"_con_barbijo"
        return nombre
    elif barbijo==2:
        nombre=name+"_sin_barbijo"
        return nombre


nombre = conseguirNombre()
cont=0
direc= "C:/Users/galod/Documents/ORT/2022/prog-apart/python/IA/reconozcoRostros2/fotos"
carpeta= direc+"/"+nombre

if not os.path.exists(carpeta):
    print("carpeta creada")
    os.makedirs(carpeta)

detector = mp.solutions.face_detection
dibujo = mp.solutions.drawing_utils

capture = cv2.VideoCapture(1)

with detector.FaceDetection(min_detection_confidence=0.5) as rostros:




    while True:
        ret, frame = capture.read()
        frame=cv2.flip(frame,1)#flip para que se vea correctamente
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)#paso de color de BGR a RGB para que me lo acepte mediapipe

        # Detectar rostros
        resultado = rostros.process(rgb)
        
        #filtro de seguridad
        if resultado.detections is not None:
            for rostro in resultado.detections:
                #dibujo.draw_detection(frame,rostro)
                print(rostro)

                al, an, _=frame.shape
                xi=rostro.location_data.relative_bounding_box.xmin
                yi=rostro.location_data.relative_bounding_box.ymin

                ancho=rostro.location_data.relative_bounding_box.width
                alto=rostro.location_data.relative_bounding_box.height

                #conversion a pixeles
                xi=int(xi*an)
                yi=int(yi*al)
                ancho=int(ancho*an)
                alto=int(alto*al)

                xf=xi+ancho
                yf=yi+alto

                #sacar los pixeles
                cara = frame[yi:yf,xi:xf]

                #rezise caras
                cara=cv2.resize(cara,(150,200), interpolation=cv2.INTER_CUBIC)
                cv2.imwrite(carpeta+"/rostro_{}.jpg".format(cont),cara)
                cont+=1

        cv2.imshow('camara', frame)#muestra la imagen le paso el nombre de la ventana y el frame
        tecla = cv2.waitKey(1)
        if tecla == ord('t') or cont>=300:
            break

capture.release()
cv2.destroyAllWindows()