import os # Since there's no inbuilt way to stop a sound played using 'playsound' library, we can use 'os' module to stop the sound
          # The 'os' module can be used to stop the sound, by terminating the process responsible for playing it.

import subprocess
import time
import psutil
import threading



# Make sure to install the playsound library by running ' pip install playsound ' . 
class Alarm:
    def __init__(self, sound_file):
        print("Initializing sound")
        self.sound_file = sound_file

        self.process = subprocess.Popen(["ffplay","-loop","0",self.sound_file],stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True)
        self.runthread = None
        self.psprocess = psutil.Process(pid=self.process.pid)
        time.sleep(5)
        self.psprocess.suspend()
    def start(self):
        print("Playing sound")
        # Resume the process responsible for playing the sound
    
        while self.runthread and self.runthread.is_alive():
            pass
        self.psprocess.resume()
        self.runthread = threading.Thread(target=runfortime,args=(self,30))
        self.runthread.start()
              


    def stop(self):
        print("Stopping sound")

        # Pause the process responsible for playing the sound
        self.psprocess.suspend()

def runfortime(alarm,running_time):
    time.sleep(running_time)  
    alarm.stop()

'''
def main(): # Example of how we can use the alarm sound in the main function

    alarm_sound_file = "alarm.mp3" # Sound file can be found in the fss-raspberry map. This is the path to the alarm sound file
    alarm = Alarm(alarm_sound_file)
    
    print("Starting alarm...")
    alarm.start()

    # Alarm will play until it's manually stopped
    input("Press Enter to stop the alarm...")

    print("Stopping alarm...")
    alarm.stop()
'''
