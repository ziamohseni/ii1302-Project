/*
 * Created by ArduinoGetStarted.com
 *
 * This example code is in the public domain
 *
 * Tutorial page: https://arduinogetstarted.com/tutorials/arduino-tcp-client
 *
 * Changes implented in code and comments added by Daniel Johansson, Risha Haq, Joelle Kawouk
 *
 */

 //Included Arduino WiFi library for WLAN functionality in the ESP32C3 module
#include "WiFi.h"

/* Daniel's mobile phone WiFi hotspot for initial testing sequence
 * const char* WIFI_SSID = "Nothing";                // CHANGE TO YOUR WIFI SSID
 * const char* WIFI_PASSWORD = "abc12345";           // CHANGE TO YOUR WIFI PASSWORD
 */


// Connection directly to Raspberry Pi Hub
const char* WIFI_SSID = "5SenseHub";
const char* WIFI_PASSWORD = "Cz1HOiOW";
const char* TCP_SERVER_ADDR = "10.42.0.1";
const int TCP_SERVER_PORT = 8888;

//WiFi client object initialised 
WiFiClient TCP_client;

/* Global variables for Flooding sensor */
const int FLOOD_PIN = D1;
bool prevFloodStatus = false;

/* SETUP CODE STARTS HERE: runs once at initialization */
void setup() {
  Serial.begin(9600);

  pinMode(FLOOD_PIN, INPUT_PULLUP);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

/* This part of the code indicates ONLY IN CLIENT whether a connection has been established to R-Pi */
  while (WiFi.status() != WL_CONNECTED) {
    delay(3000);
    //Serial.print(".");

    if(WiFi.status() == WL_CONNECTED) {
      Serial.println("WiFi connection SUCCESSFUL!");
    } else {
      Serial.println("WiFi connection UNSUCCESSFUL!");
    }
  }
}
/* END OF SETUP */

/**************************************************************************************************************/

/* FUNCTIONS/METHODS START HERE */


/* Status function for flooding sensor */
bool poll_flooding() {
  if ((digitalRead(FLOOD_PIN)) == HIGH) {
    //Serial.println("Door Open");
    return true;
  } else {
    //Serial.println("Door closed");
    return false;
  }
}

/* Handler function for flooding sensor */
void handleFloodChange(bool floodStatus) {
  if (floodStatus != prevFloodStatus) {
    if (floodStatus) {
      Serial.println("Water status change detected: !Flooding"); //TCP_Client message
      connect("02:FLOODING:false"); //TCP_Server message
    } else {
      Serial.println("Water status change detected: Flooding!"); //TCP_Client message
      connect("02:FLOODING:true"); //TCP_Server message
    }
    prevFloodStatus = floodStatus;
  }
}

/* Sends message to TCP_Server when status change has been detected */
void connect(char message[]) {
  // reconnect to TCP server
  if (TCP_client.connect(TCP_SERVER_ADDR, TCP_SERVER_PORT)) {
    //Serial.println("Reconnected to TCP server");
    TCP_client.write(message);
    TCP_client.flush();
  } 
  //Commenting this away for the time being so that I can test offline without flooding the serial monitor
  /*else {
    Serial.println("Failed to reconnect to TCP server");
  }*/
}


/* FUNCTIONS/METHODS END HERE */

/**************************************************************************************************************/

/* MAIN CODE STARTS HERE: runs repeatedly */
void loop() {
  bool floodStatus = poll_flooding();
  handleFloodChange(floodStatus);

  //Create a delay so that we don't flood the server by too many connection attempts
  delay(1000);

}
/* END OF MAIN CODE */
