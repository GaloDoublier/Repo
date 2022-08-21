import cv2
import os
import mediapipe as mp

direc = "C:/Users/galod/Documents/ORT/2022/prog-apart/python/IA/reconozcoRostros2/fotos"
etiquetas = os.listdir(direc)
print("nombres: ", etiquetas)
 
modelo = cv2.face.LBPHFaceRecognizer_create()
modelo.read("modelo.xml")

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
                #print(rostro)

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
                cara = cv2.cvtColor(cara, cv2.COLOR_BGR2GRAY)

                #prediccion
                prediction = modelo.predict(cara)


                #mostramos resultados en la pantalla
                if prediction[0] ==0:
                    cv2.putText(frame, "{}".format(etiquetas[0]), (xi, yi), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0,0 ), 2)
                    cv2.rectangle(frame, (xi, yi), (xf, yf), (0, 0, 255), 2)# imagen, punto inicial, punto final, color, grosor
                elif prediction[0] ==1:
                    cv2.putText(frame, "{}".format(etiquetas[1]), (xi, yi), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0,0 ), 2)
                    cv2.rectangle(frame, (xi, yi), (xf, yf), (0, 0, 255), 2)# imagen, punto inicial, punto final, color, grosor
                elif prediction[0] ==2:
                    cv2.putText(frame, "{}".format(etiquetas[2]), (xi, yi), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0,0 ), 2)
                    cv2.rectangle(frame, (xi, yi), (xf, yf), (0, 0, 255), 2)# imagen, punto inicial, punto final, color, grosor
                elif prediction[0] ==3:
                    cv2.putText(frame, "{}".format(etiquetas[3]), (xi, yi), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0,0 ), 2)
                    cv2.rectangle(frame, (xi, yi), (xf, yf), (0, 0, 255), 2)# imagen, punto inicial, punto final, color, grosor
                else:
                    print("rostro no reconocido ")



        cv2.imshow('camara', frame)#muestra la imagen le paso el nombre de la ventana y el frame
        tecla = cv2.waitKey(1)
        if tecla == ord('t'):
            break

capture.release()
cv2.destroyAllWindows()