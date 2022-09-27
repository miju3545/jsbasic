const start = Date.now();

const randTime = (value) => {
  return new Promise((resolve, reject) => {
    const end = Date.now();

    if (end < start + 60000) {
      console.log("randTime>>>", value, start, end);
      resolve(value);
    } else reject("1분 초과");
  });
};

// [1, 2, 3, 4, 5].forEach((value) => {
//   randTime(value).then((v) => console.log(v));
// });

export default randTime;
