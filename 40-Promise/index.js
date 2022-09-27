const promiseFn = (dept = 0, timeout = 1000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (dept < 3) {
        resolve(dept + 1);
      }
    }, timeout);

    if (dept === 3) {
      clearTimeout(timer);
      reject(new Error("Already 3-depth!!"));
    }
  });
};

console.log("start>>", new Date());

promiseFn()
  .then((res) => {
    console.log(res, new Date());
    return promiseFn(res, 2000);
  })
  .then((res) => {
    console.log(res, new Date());
    return promiseFn(res, 3000);
  })
  .then((res) => {
    console.log(res, new Date());
    return promiseFn(res, 4000);
  })
  .then((res) => {
    console.log(res, new Date());
    return promiseFn(res, 5000);
  })
  .catch((err) => console.log(err));
