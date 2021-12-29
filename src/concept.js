import {promisify} from 'util';

console.log("===================== Starting Concepts =====================");
/* Delay with promisify */
const delayPromise = (seconds) =>
  new Promise((resolve, reject) => {
    if (seconds > 5) {
      throw new Error(`Seconds should less than 7`);
    }
    setTimeout(
      resolve(`Called delayPromise after ${seconds} seconds`),
      seconds * 1000
    );
  });

delayPromise(4)
  .then(console.log)
  .then(() => 42)
  .then((aboveNumber) =>
    console.log(`Called delayPromise 3rd then ${aboveNumber}`)
  )
  .catch((err) => console.error(`${err.message}`));

/* Delay normal timeout */
const delayTimeout = (seconds, callback) => {
  setTimeout(callback, seconds * 1000);
};

delayTimeout(2, (callback) => {
  console.log(`Called => delayTimeout`);
});

/*  */
const callbackWithError = (seconds, callback) => {
  if (seconds > 6) {
    callback(new Error(`Seconds should not greater than 6`));
  }
  setTimeout(() => callback(null, `Completed callbackWithError `), seconds);
};

/* callbackWithError(3, (error, message) => {
  if (error) {
    console.error(error.message);
  } else {
    console.error(message);
  }
}); */

const promisedDelay = promisify(callbackWithError);
promisedDelay(1);