from pickletools import optimize
import tensorflow as tf
import numpy as np

kilogrmos = np.array([40,96,60,74,4,15], dtype=float)
libras = np.array([88,211,132,163,8,33], dtype=float)

capa = tf.keras.layers.Dense(units=1, input_shape=[1])
modelo = tf.keras.models.Sequential([capa])

modelo.compile(
    optimizer=tf.keras.optimizers.Adam(0.1),
    loss='mean_squared_error',
)
print("comenzando entrenamiento...")
historial= modelo.fit(kilogrmos, libras, epochs=1000, verbose=False)
print("entrenamiento finalizado")

print("haber...")
peso=int(input("ingrsa un peso en KG: "))
resultado = modelo.predict([peso])
print("mi prediccion es "+ str(resultado) + " libras")
print(capa.get_weights())