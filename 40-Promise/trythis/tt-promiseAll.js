import { assertArray } from "../../utils/test-utils.js";

const vals = [1, 2, 3];
const randTime = (val) =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 1000, val));

const promiseAll = (promises) => {
  if (!promises?.length) return Promise.reject("Not promises");
  return new Promise((resolve, reject) => {
    const results = [];
    let pending = promises.length;
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((res) => {
          results[i] = res;
          pending -= 1;

          if (!pending) resolve(results);
        })
        .catch(reject);
    }
  });
};

const promiseAll2 = async (promises) => {
  const results = [];
  for (const promise of promises) {
    results.push(await promise);
  }

  return results;
};

promiseAll2([randTime(1), randTime(2), randTime(3)])
  .then((arr) => {
    console.table(arr);
    assertArray(arr, vals);
  })
  .catch(console.error);

const p = promiseAll2([randTime(1), randTime(2), randTime(3)]);
console.log(p); //pending
// promiseAll2([randTime(11), Promise.reject("RRR"), randTime(33)])
//   .then((array) => {
//     console.log("여긴 과연 호출될까?!");
//   })
//   .catch((error) => {
//     console.log("reject!!!!!!>>", error);
//   });
