from gpiozero import LED
import queue
import time

LED1 = LED(17)
LED2 = LED(27)

def LED_Control(queue):
    while True:
        if not queue.empty():
            state = queue.get()
        
        match state:
            case "Boot":
                LED1.on()
                LED2.on()
                time.sleep(0.5)
                LED1.off()
                LED2.off()
                time.sleep(0.5)
            case "Alarm":
                LED1.on()
                LED2.off()
                time.sleep(0.1)
                LED1.off()
                LED2.on()
                time.sleep(0.1)
            case "Armed":
                LED1.on()
                LED2.on()
            case "Unarmed":
                LED1.on()
                LED2.off()
            case "FirebaseError":
                LED1.on()
                LED2.off()
                time.sleep(1)
                LED1.off()
                time.sleep(1)
            case "WifiError":
                LED2.on()
                LED1.off()
                time.sleep(1)
                LED2.off()
                time.sleep(1)



if __name__ == "__main__":
    q = queue.Queue()
    q.put("Unarmed")
    LED_Control(q)