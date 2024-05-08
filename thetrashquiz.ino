#include <Keyboard.h>

const int leftButtonPin = 8;
const int middleButtonPin = 9;
const int rightButtonPin = 10;
const int nextItemButtonPin = 11;

void setup() {
  pinMode(leftButtonPin, INPUT_PULLUP);
  pinMode(middleButtonPin, INPUT_PULLUP);
  pinMode(rightButtonPin, INPUT_PULLUP);
  pinMode(nextItemButtonPin, INPUT_PULLUP);

  Keyboard.begin();
}

// Read inputs from each button and write to their cooresponding key
void loop() {
  if (digitalRead(leftButtonPin) == 1) {
    Keyboard.write('1');
    delay(200); // Debounce delay
  }

  if (digitalRead(middleButtonPin) == 1) {
    Keyboard.write('2');
    delay(200); // Debounce delay
  }

  if (digitalRead(rightButtonPin) == 1) {
    Keyboard.write('3');
    delay(200); // Debounce delay
  }

  if (digitalRead(nextItemButtonPin) == 1) {
    Keyboard.write('4');
    delay(200); // Debounce delay
  }
}
