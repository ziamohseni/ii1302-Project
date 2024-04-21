/*
 * Created by ArduinoGetStarted.com
 *
 * This example code is in the public domain
 *
 * Tutorial page: https://arduinogetstarted.com/tutorials/arduino-tcp-client

 Changes implented and comments added by Daniel Johansson, Risha Haq
 */

//Included Arduino WiFi library for WLAN functionality
#include "WiFi.h"


//global vars for connection
const char* WIFI_SSID = "Nothing";                // CHANGE TO YOUR WIFI SSID
const char* WIFI_PASSWORD = "abc12345";           // CHANGE TO YOUR WIFI PASSWORD
const char* TCP_SERVER_ADDR = "192.168.237.215";  // CHANGE TO TCP SERVER'S IP ADDRESS
const int TCP_SERVER_PORT = 8888;


//WiFi client object initialised 
WiFiClient TCP_client;

//global vars for sensor
const int REED_PIN = D0;
bool prevDoorStatus = false;

//Sets up connection to the R-Pi TCP Server
void setup() {
  Serial.begin(9600);
  pinMode(REED_PIN, INPUT_PULLUP);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.print("Connected to WiFi ");
  Serial.println(WIFI_SSID);
}


//handler function for reed sensor
bool reed() {

  if ((digitalRead(REED_PIN)) == HIGH) {
    Serial.println("Door Open");
    return true;
  } else {
    Serial.println("Door closed");
    return false;
  }
}



void connect(bool open) {
  // Read data from server and print them to Serial
  /*if (TCP_client.available()) {
    char c = TCP_client.read();
    Serial.print(c);
  }*/

  // reconnect to TCP server
  if (TCP_client.connect(TCP_SERVER_ADDR, TCP_SERVER_PORT)) {
    Serial.println("Reconnected to TCP server");
    if(open){
      TCP_client.write("door open");  // send to TCP Server  
    }
    else{
      TCP_client.write("door closed");  // send to TCP Server
    }
    
    TCP_client.flush();
  } else {
    Serial.println("Failed to reconnect to TCP server");
  }
}


void loop() {
  bool doorStatus = reed();
  if(doorStatus != prevDoorStatus){
    connect(doorStatus);
    prevDoorStatus = doorStatus;

  }
  //Create a delay so that we don't flood the server by too many connection attempts
  //delay(5000);
  delay(1000);

}
