#include <SoftwareSerial.h>
#define Rx 11
#define Tx 12
SoftwareSerial mySerial(Rx,Tx);
float temp; 
float vout; 
float vout1; 
unsigned long lastTime = 0;
// Timer set to 10 minutes (600000)
//unsigned long timerDelay = 600000;
// Set timer to 5 seconds (5000)
unsigned long timerDelay = 1500;
void setup() {
  pinMode(A0, INPUT); 
  pinMode(7,OUTPUT); 
  // put your setup code here, to run once:
  Serial.begin(9600);
  mySerial.begin(9600);
}

void loop() {
    if ((millis() - lastTime) > timerDelay) {
 vout=analogRead(A0); 
  vout1=(vout/1023)*5000; 
  temp=(vout1-500)/10; 
  Serial.print("----------------------");
  Serial.println("");
  Serial.print("temp:");
  Serial.print(temp); 
  Serial.println("");

  mySerial.print(String(temp));
   String Data = "" ;       // Offset into buffer 
  if(mySerial.available()>0){
        String test = mySerial.readString();
        test.trim();
    if(test=="1"){
       digitalWrite(7,HIGH);
    }else{
        digitalWrite(7,LOW);
    }
  }
      
          lastTime = millis();

    }

 
//  delay(1500);
  
}
