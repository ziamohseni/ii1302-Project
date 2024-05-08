import subprocess
import time
import psutil
import threading



# Make sure to install the playsound library by running ' pip install playsound ' . 
class Alarm:
    def __init__(self, sound_file):
        print("Initializing sound")
        self.sound_file = sound_file
        self.processcounter = 0
        self.process = subprocess.Popen(["ffplay","-loop","0",self.sound_file],stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True,bufsize=1,universal_newlines=True)
        self.runthread = None
        self.psprocess = psutil.Process(pid=self.process.pid)
        for line in self.process.stdout:
            if sound_file in line:
                break
        self.psprocess.suspend()
    def start(self):
        print("Playing sound")
        # Resume the process responsible for playing the sound
    
        if self.runthread:
            self.stop()
        self.psprocess.resume()
        self.runthread = threading.Thread(target=runfortime,args=(self,3600,self.processcounter))
        self.runthread.start()
              


    def stop(self):
        print("Stopping sound")
        self.processcounter+=1
        # Pause the process responsible for playing the sound
        self.psprocess.suspend()
        self.runthread = None

def runfortime(alarm,running_time,procnum):
    time.sleep(running_time)  
    if alarm.processcounter == procnum:

        
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
