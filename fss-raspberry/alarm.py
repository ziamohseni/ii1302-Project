import os # Since there's no inbuilt way to stop a sound played using 'playsound' library, we can use 'os' module to stop the sound
          # The 'os' module can be used to stop the sound, by terminating the process responsible for playing it.

import multiprocessing
import time

from playsound import playsound


# Make sure to install the playsound library by running ' pip install playsound ' . 
class Alarm:
    def __init__(self, sound_file):
        self.sound_file = sound_file
        self.process = None

    def start(self):
        if self.process and self.process.is_alive():
            self.stop()
                  
        # Start the alarm sound in a separate process
        self.process = multiprocessing.Process(target=self.run_alarm)
        self.process.start()
              
        time.sleep(5)  # 5 seconds delay for example
        self.stop()

    def stop(self):
        if self.process and self.process.is_alive():
            # Terminate the process responsible for playing the sound
            self.process.terminate()
            self.process.join()

    def run_alarm(self):
        playsound(self.sound_file)
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
