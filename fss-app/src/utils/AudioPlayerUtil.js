import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";

class AudioPlayer {
  constructor() {
    this.sound = null;
  }

  // Initialize audio mode
  async initAudioMode() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true,
    });
  }

  // Play sound from a URI passed as an argument
  async playSound(uri) {
    if (this.sound) {
      this.sound.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true }
    );
    this.sound = sound;
    await this.initAudioMode();
    await this.sound.playAsync();
  }

  // Stop the sound
  async stopSound() {
    if (this.sound) {
      await this.sound.stopAsync();
      await this.sound.unloadAsync();
      this.sound = null;
    }
  }
}

const audioPlayer = new AudioPlayer();
export default audioPlayer;
