import cv2
import os
import mediapipe as mp

detector = mp.solutions.hands
dibujo = mp.solutions.drawing_utils
estilos  = mp.solutions.drawing_styles
camara = cv2.VideoCapture(1)

with detector.Hands(min_detection_confidence=0.5) as manos:
    while True:
        fine,imagen=camara.read()
        if not fine:
            print("no se pudo conectar a la camara")
            continue
        imagen = cv2.cvtColor(imagen, cv2.COLOR_BGR2RGB)
        resultado =  manos.process(imagen)

            #dibujar
        imagen = cv2.cvtColor(imagen, cv2.COLOR_RGB2BGR)
        if resultado.multi_hand_landmarks:
            for mano in resultado.multi_hand_landmarks:
                dibujo.draw_landmarks(imagen,mano,detector.HAND_CONNECTIONS,estilos.get_default_hand_landmarks_style(),
            estilos.get_default_hand_connections_style())
        else:
            print("no hay manos")
    
        cv2.imshow('camara', imagen)
        tecla = cv2.waitKey(1)
        if tecla == ord('t'):
            break

camara.release()
cv2.destroyAllWindows()