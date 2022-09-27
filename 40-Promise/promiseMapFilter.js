const afterTime = (sec) => {
  if (sec < 1 || sec > 3)
    return Promise.reject(new Error("Not valid sec range!!"));
  return new Promise((resolve) => setTimeout(resolve, sec * 1000, sec));
};

const odds = [1, 2, 3].filter(async (val) => {
  const r = await afterTime(val);
  return r % 2 === 1;
});

// console.log("odds=", odds);

// TryThis) 다음과 같이 출력되도록 병렬 실행하는 코드를 작성하시오.
const odds2 = async (arr) => {
  const proms = arr.map(afterTime);

  const result = [];
  for await (const s of proms) {
    if (s % 2 === 1) {
      result.push(s);
    }
  }

  return result;
};

const odds3 = async (arr) => {
  const ret = await Promise.all(arr.map(afterTime));
  return ret.filter((r) => r % 2 === 1);
};

console.time("async-filter2");
console.log("odds2=", await odds2([1, 2, 3]));
console.timeEnd("async-filter2");

console.time("async-filter3");
console.log("odds3=", await odds3([1, 2, 3]));
console.timeEnd("async-filter3");

// TryThis) myCo 만들기
