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
String serverName = "http://192.168.1.7:3000/tempature";
//#define FIREBASE_HOST "arduino-2022-default-rtdb.firebaseio.com"
//#define FIREBASE_AUTH "3gix3iAxm6cDTo6mgDFNK5CXN71jS51XmdqaZoCL"
//FirebaseData firebaseData;
String path ="/";
FirebaseJson json;

int limit = 50;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  WiFi.begin(WIFI_SSID,WIFI_PASSWORD);
//  Firebase.begin(FIREBASE_HOST,FIREBASE_AUTH);
  while(WiFi.status()!= WL_CONNECTED){
      Serial.print(".");
      delay(500);
  }
//  Firebase.reconnectWiFi(true);
//  if(!Firebase.beginStream(firebaseData,path)){
//    Serial.println("Reason"+firebaseData.errorReason());
//  }
  Serial.print(WiFi.localIP());
//  if(Firebase.getInt(firebaseData,path+"/limit"))limit = firebaseData.intData();

}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available()){
    String RxBuffer="";
    while(Serial.available()){
      RxBuffer = Serial.readString();
    }
    
      WiFiClient client;
      HTTPClient http;

      String serverPath = serverName + "?temperature="+RxBuffer;
      
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
        
//        Serial.println(payload);
      }
      // Free resources
      http.end();
//    Firebase.setFloat(firebaseData,path+"/tempature",RxBuffer.toFloat());
//    if(Firebase.getInt(firebaseData,path+"/limit"))limit = firebaseData.intData();
//
//     if(limit<=RxBuffer.toInt()){
//        Serial.println("1");
//      }else{
//        Serial.println("0");
//      }
  }
}
