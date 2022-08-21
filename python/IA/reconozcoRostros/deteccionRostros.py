import cv2
import mediapipe as mp

detector = mp.solutions.face_detection
dibujo = mp.solutions.drawing_utils

# Capturar imagen de la camara
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
                dibujo.draw_detection(frame,rostro)
        else:
            print("No se detectaron rostros")

        cv2.imshow('camara', frame)#muestra la imagen le paso el nombre de la ventana y el frame

        tecla = cv2.waitKey(1)
        if tecla == ord('t'):
            break

capture.release()
cv2.destroyAllWindows()