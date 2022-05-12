#include <ESP8266WiFi.h>
#include "FirebaseESP8266.h"
#include <ArduinoJson.h>
#define WIFI_SSID "Home_Run"
#define WIFI_PASSWORD "0904291241"
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

//#define WIFI_SSID "HSU_Students"
//#define WIFI_PASSWORD "dhhs12cnvch"

//Your Domain name with URL path or IP address with path
String serverName = "http://192.168.1.4:3000/t";
String path ="/";
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }// Set your Static IP address
  
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");


}

void test(){
      //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;

      String serverPath = serverName + "?temperature=24.37";
      
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverPath.c_str());
      
      // Send HTTP GET request
      int httpResponseCode = http.GET();
      
      if (httpResponseCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
}

void loop() {
//  // put your main code here, to run repeatedly:
//  test();
//  delay(1500);



  
  if(Serial.available()){
    String RxBuffer="";
    while(Serial.available()){
      RxBuffer = Serial.readString();
    }
    
      WiFiClient client;
      HTTPClient http;
//      Serial.println("rx:"+RxBuffer);
      String serverPath = serverName + "?temp="+RxBuffer;
//      Serial.println("serverPath:"+serverPath);
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverPath.c_str());
      
      // Send HTTP GET request
      int httpResponseCode = http.GET();
      
      if (httpResponseCode>0) {
        String payload = http.getString();
//        Serial.print("HTTP Response code: ");
//        Serial.println(httpResponseCode);
        if(payload=="true"){
          Serial.println("1");
        }else{
          Serial.println("0");
        }
      }
      http.end();
  }
}
