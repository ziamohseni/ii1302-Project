import os # Since there's no inbuilt way to stop a sound played using 'playsound' library, we can use 'os' module to stop the sound
          # The 'os' module can be used to stop the sound, by terminating the process responsible for playing it.

import multiprocessing
from playsound import playsound

# Make sure to install the playsound library by running ' pip install playsound ' . 
class Alarm:
    def __init__(self, sound_file):
        self.sound_file = sound_file
        self.process = None

    def start(self):
        # Start the alarm sound in a separate process
        self.process = multiprocessing.Process(target=self._play_sound)
        self.process.start()

    def stop(self):
        if self.process:
            # Terminate the process responsible for playing the sound
            self.process.terminate()

    def _play_sound(self):
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

if __name__ == "__main__":
    main()
'''
