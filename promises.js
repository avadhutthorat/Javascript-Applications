// Promises Example 1

// const cleanRoom = function() {
// return new Promise(function(resolve, reject) {
//     isClean = false;

//     if (isClean) {
//     resolve("clean");
//     } else {
//     reject("Not clean");
//     }
// });
// };

// cleanRoom()
// .then(function(result) {
//     console.log("The room is ", result);
// })
// .catch(msg => console.log("The room is ", msg));

// Promises example 2

//I will create 3 parts - cleanRoom, disposeGarbage , wonIcecream

const cleanRoom = () => {
  return new Promise((resolve, reject) => {
    resolve("Room is cleaned");
  });
};

const disposeGarbage = msg => {
  return new Promise((resolve, reject) => {
    resolve(msg + "Garbage has been disposed");
  });
};

const wonIcecream = msg => {
  return new Promise((resolve, reject) => {
    resolve(msg + "Yaay!! You have won Icecream");
  });
};

// calling promises - method 1
// cleanRoom()
//   .then(msg => {
//     return disposeGarbage(msg);
//   })
//   .then(msg => {
//     return wonIcecream(msg);
//   })
//   .then(msg => {
//     console.log("Finished" + msg);
//   });

// calling promises - method 2 - This will resolve all promises at once and print the resolved message
// Promise.all([cleanRoom(), disposeGarbage()]).then(() =>
// console.log("Finished")
// );

// caling promises - method 3 -  this will return then call if one of the promise is resolved
// Promise.race([cleanRoom(), disposeGarbage()]).then(() =>
// console.log("Finished")
// );
