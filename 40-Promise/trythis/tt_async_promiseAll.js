const afterTime = (sec) => {
  if (sec < 1 || sec > 3)
    return Promise.reject(new Error("Not valid sec range!!"));
  return new Promise((resolve) => setTimeout(resolve, sec * 1000, `${sec}초`));
};

const promiseAll = async (promises) => {
  const results = [];
  for (let i = 0; i < promises.length; i += 1) {
    results[i] = await promises[i](i + 1);
  }
  return results;
};

const promiseAll2 = async (promises) => {
  return await Promise.all(promises.map((p, i) => p(i + 1)));
};

const promiseAll3 = async (promises) => {
  const rs = promises.map((p, i) => p(i + 1));

  const result = [];
  for await (let p of rs) {
    result.push(p);
  }

  return result;
};

console.time("async-promiseAll");
const pfns = [afterTime, afterTime, afterTime];
const rets = await promiseAll(pfns);
const rets2 = await promiseAll2(pfns);
const rets3 = await promiseAll3(pfns);
console.log("rets>>>", rets);
console.log("rets2>>>", rets2);
console.log("rets3>>>", rets3);
console.timeEnd("async-promiseAll");
