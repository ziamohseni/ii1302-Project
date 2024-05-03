import os # Since there's no inbuilt way to stop a sound played using 'playsound' library, we can use 'os' module to stop the sound
          # The 'os' module can be used to stop the sound, by terminating the process responsible for playing it.

from playsound import playsound
# Make sure to install the playsound library by running ' pip install playsound ' . 
class Alarm:
    def __init__(self, sound_file):
        self.sound_file = sound_file

    def start(self):
        playsound(self.sound_file)

    def stop(self):
        # There's no built-in way to stop a sound played using playsound
        # You can implement your own logic to handle stopping the sound if needed
        if self.process_id:
        # Terminate the process responsible for playing the sound
        os.system(f"kill {self.process_id}")

def main(): # Example of how we can use the alarm sound in the main function

    alarm_sound_file = "alarm.mp3" # This is an example of a name to the alarm sound file.
    alarm = Alarm(alarm_sound_file)
    
    print("Starting alarm...")
    alarm.start()

    # Alarm will play until it's manually stopped
    input("Press Enter to stop the alarm...")

    print("Stopping alarm...")
    alarm.stop()

if __name__ == "__main__":
    main()

