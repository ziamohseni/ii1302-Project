#include "WiFi.h"
#include <Arduino.h>
// Include other libraries and define your code here

const char* WIFI_SSID = "5SenseHub";                // CHANGE TO YOUR WIFI SSID
const char* WIFI_PASSWORD = "Cz1HOiOW";           // CHANGE TO YOUR WIFI PASSWORD
const char* TCP_SERVER_ADDR = "10.42.0.1";  // CHANGE TO TCP SERVER'S IP ADDRESS
const int TCP_SERVER_PORT = 8888;


//WiFi client object initialised 
WiFiClient TCP_client;

const int SMOKE_PIN = A0;
void setup() {
  Serial.begin(9600);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.print("Connected to WiFi ");
  Serial.println(WIFI_SSID);
}

bool poll_smoke() {
 Serial.println(analogRead(SMOKE_PIN));
  if ((analogRead(SMOKE_PIN)) > 4000) {
    return true;
  } else {
    return false;
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

void handleSmokeChange(bool smokeStatus) {
  if (smokeStatus) {
    Serial.println("Smoke detected!");
    //connect("4:smoke_detect:true");
  }
}

void loop() {
  bool smokeStatus = poll_smoke();
handleSmokeChange(smokeStatus);
 
  delay(1000);

}
