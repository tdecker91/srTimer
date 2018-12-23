/**
 * adds 0's to the front of a number returns a string representation of the number
 */
export function prependZeros(number: number, digits: number): string {
  var stringNumber = number.toString();
  var length = stringNumber.length;

  for (var i = 0; i < digits - length; i++) {
    stringNumber = "0" + stringNumber;
  }

  return stringNumber;
}

/**
 * add 0's to the end of a number
 */
export function appendZeros(number: number, digits: number): string {
  var stringNumber = number.toString();
  var length = stringNumber.length;

  for (var i = 0; i < digits - length; i++) {
    stringNumber = stringNumber + "0";
  }

  return stringNumber;
}

/**
 * formats milliseconds for display on the timer face
 * by padding with 0s as necessary
 */
function formatMiliseconds(number: number, digits: number) {
  return prependZeros(number, 3).substring(0, digits);
}

/**
 * Converts milliseconds to a clock face display ex. "00:00.0"
 */
export function formatTime(totalMilliseconds: number) {
  if (totalMilliseconds == undefined) {
    return "00:00.00";
  }

  var hours = Math.floor(totalMilliseconds / 1000 / 60 / 60);
  var minutes = Math.floor((totalMilliseconds % 3600000) / 1000 / 60);
  var seconds = Math.floor(((totalMilliseconds % 3600000) % 60000) / 1000);
  var milliseconds = Math.floor(((totalMilliseconds % 3600000) % 60000) % 1000);

  return (
    (hours > 0 ? prependZeros(hours, 2) + ":" : "") +
    prependZeros(minutes, 2) +
    ":" +
    prependZeros(seconds, 2) +
    "." +
    formatMiliseconds(milliseconds, 2)
  );
}
