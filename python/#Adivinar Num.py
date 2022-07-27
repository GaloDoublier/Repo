#adivinarNum
import random

def adivinar(x):
    numeroRandom=random.randint(1,x)
    rta=int(input("ya genere el numero del 1 al , intenta adivinarlo: "))
    
    while rta!=numeroRandom:
        if rta<numeroRandom:
            rta=int(input("muy bajo, vuelve a intentarlo: "))
        elif rta>numeroRandom:
            rta=int(input("muy alto, vuelve a intentarlo: "))
          
    
    print("numero correcto!")

numero=int(input("numero random del 1 al: "))
adivinar(numero)


