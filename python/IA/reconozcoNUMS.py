from __future__ import absolute_import, division, print_function, unicode_literals

import tensorflow as tf
import tensorflow_datasets as tfds

import math
import numpy as np
import matplotlib.pyplot as plt

datos,metadatos= tfds.load("mnist", as_supervised=True,with_info=True)
datosEntrenamiento, datosPrueba=datos["train"], datos["test"]

numeros=["uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"]

EjemplosEntrenamiento= metadatos.splits["train"].num_examples
EjemplosPrueba=metadatos.splits["test"].num_examples

def normalizar(imagenes, etiquetas):
  imagenes = tf.cast(imagenes, tf.float32)
  imagenes /= 255
  return imagenes, etiquetas

datosEntrenamiento=datosEntrenamiento.map(normalizar)
datosPrueba=datosPrueba.map(normalizar)

modelo= tf.keras.models.Sequential([
    tf.keras.layers.Flatten(input_shape=(28,28,1)),
    tf.keras.layers.Dense(50, activation="relu"),
    tf.keras.layers.Dense(50, activation="relu"),
    tf.keras.layers.Dense(10, activation="softmax")
])
modelo.compile(optimizer="adam",loss="sparse_categorical_crossentropy",metrics=["accuracy"])

lote=32
datosEntrenamiento= datosEntrenamiento.repeat().shuffle(EjemplosEntrenamiento).batch(lote)
datosPrueba=datosPrueba.batch(lote)

modelo.fit(
    datosEntrenamiento, epochs=5, steps_per_epoch=math.ceil(EjemplosEntrenamiento/lote),
)

test_loss, test_accuracy = modelo.evaluate(datosPrueba, steps=math.ceil(EjemplosPrueba/lote))
print("resultados de las pruebas:",test_accuracy)