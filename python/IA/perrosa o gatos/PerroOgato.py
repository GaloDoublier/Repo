import tensorflow as tf
import tensorflow_datasets as tfds
import matplotlib.pyplot as plt
import cv2
import numpy as np
from keras_preprocessing.image import ImageDataGenerator


datos,metadatos=tfds.load("cats_vs_dogs",as_supervised=True,with_info=True)
datos_entrenamiento=[]
pixeles=[]
tipo=[]

for i, (img,et) in enumerate(datos["train"]):
    img= cv2.resize(img.numpy(), (100,100))
    img=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    img= img.reshape(100,100,1)#tamaño y canal de color para tf
    datos_entrenamiento.append([img,et])
    pixeles.append(img)
    tipo.append(et)

pixeles= np.array(pixeles).astype(float)/255 #para tener una imagen de 0 a 1(normalización)
tipos=np.array(tipo)

# modeloDenso.fit(pixeles,tipos,batch_size=32,epochs=100,callbacks=[tensorboardDenso],validation_split=0.15)
# modeloConv2.fit(pixeles,tipos,batch_size=32,epochs=100,callbacks=[tensorboardConv],validation_split=0.15)


cambiadorDeImg=ImageDataGenerator(
    rotation_range=50,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
)

cambiadorDeImg.fit(pixeles)

pixeles_entrenamiento=pixeles[:19700]
pixeles_validacion=pixeles[19700:]

tipos_entrenamiento=tipos[:19700]
tipos_validacion=tipos[19700:]

dataGenEntrenamiento=cambiadorDeImg.flow(pixeles_entrenamiento,tipos_entrenamiento,batch_size=32)

modeloConv=tf.keras.models.Sequential([
    tf.keras.layers.Conv2D(32,(3,3), activation="relu",input_shape=(100,100,1)),
    tf.keras.layers.MaxPooling2D(2,2),
    tf.keras.layers.Conv2D(64,(3,3), activation="relu"),
    tf.keras.layers.MaxPooling2D(2,2),
    tf.keras.layers.Conv2D(128,(3,3), activation="relu"),
    tf.keras.layers.MaxPooling2D(2,2),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(100,activation="relu"),
    tf.keras.layers.Dense(1,activation="sigmoid")
])

modeloConv.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])

tensorboardConv= tf.keras.callbacks.TensorBoard(log_dir="logs/modeloDefinitivoConv")

modeloConv.fit(
    dataGenEntrenamiento,
    epochs=100,batch_size=32,
    validation_data=(pixeles_validacion,tipos_validacion),
    steps_per_epoch=int(np.ceil(len(pixeles_entrenamiento)//float(32))),
    validation_steps=int(np.ceil(len(pixeles_validacion)//float(32))),
    callbacks=[tensorboardConv]
)

modeloConv.save("perrosOgatosConv.h5")

