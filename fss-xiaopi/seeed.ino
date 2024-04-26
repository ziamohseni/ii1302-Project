/*
 * Created by ArduinoGetStarted.com
 *
 * This example code is in the public domain
 *
 * Tutorial page: https://arduinogetstarted.com/tutorials/arduino-tcp-client

 Changes implented and comments added by Daniel Johansson, Risha Haq, Joelle Kawouk
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

const int FLOOD_PIN = D1;
bool prevFloodStatus = false;

const int VIB_PIN = D2;
bool vib_detected = false;
unsigned long last_action;
const int interval = 2000; // [milliseconds]


//Sets up connection to the R-Pi TCP Server
void setup() {
  Serial.begin(9600);
  pinMode(REED_PIN, INPUT_PULLUP);
  pinMode(FLOOD_PIN, INPUT_PULLUP);
  pinMode(VIB_PIN, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(VIB_PIN), status_vibration, FALLING);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.print("Connected to WiFi ");
  Serial.println(WIFI_SSID);
}


//handler function for reed sensor
bool poll_reed() {

  if ((digitalRead(REED_PIN)) == HIGH) {
    //Serial.println("Door Open");
    return true;
  } else {
    //Serial.println("Door closed");
    return false;
  }
}

bool poll_flooding() {
  if ((digitalRead(FLOOD_PIN)) == HIGH) {
    //Serial.println("Door Open");
    return true;
  } else {
    //Serial.println("Door closed");
    return false;
  }
}


void status_vibration() {
  noInterrupts();
  if((millis() > (last_action + interval)) /* && (REED_PIN != HIGH)*/) {
    last_action = millis();
    Serial.println ("vibration detected");
    vib_detected = true;
  }

}

void connect(char message[]) {
  // Read data from server and print them to Serial
  /*if (TCP_client.available()) {
    char c = TCP_client.read();
    Serial.print(c);
  }*/

  // reconnect to TCP server
  if (TCP_client.connect(TCP_SERVER_ADDR, TCP_SERVER_PORT)) {
    Serial.println("Reconnected to TCP server");
    TCP_client.write(message);
    TCP_client.flush();
  } else {
    Serial.println("Failed to reconnect to TCP server");
  }
}

void handleFloodChange(bool floodStatus) {
  if (floodStatus != prevFloodStatus) {
    if (floodStatus) {
      Serial.println("Water status change detected: !Flooding");
      connect("!FLOODING");
    } else {
      Serial.println("Water status change detected: Flooding!");
      connect("FLOODING!");
    }
    prevFloodStatus = floodStatus;
  }
}

void handleDoorChange(bool doorStatus) {
  if (doorStatus != prevDoorStatus) {
    if (doorStatus) {
      Serial.println("Door status change detected: OPENED");
      connect("Door Open");
    } else {
      Serial.println("Door status change detected: CLOSED");
      connect("Door Closed");
    }
    prevDoorStatus = doorStatus;
  }
}

void handleVibrationChange() {
  //noInterrupts();
  if (vib_detected = true) {
    connect("Knock happened!");

    vib_detected = false;
  }
  interrupts();
}

void loop() {
  bool doorStatus = poll_reed();
  bool floodStatus = poll_flooding();
  handleDoorChange(doorStatus);
  handleFloodChange(floodStatus);
  handleVibrationChange();
 

  //Create a delay so that we don't flood the server by too many connection attempts
  delay(1000);

}