function Array(...arr) {
  this.length = arr.length;

  Array.prototype.map = (cb) => {
    const ret = [];

    for (let [i, v] of arr.entries()) {
      ret.push(cb(v, i));
    }
    return ret;
  };

  Array.prototype.filter = (cb) => {
    const ret = [];

    for (let [i, v] of arr.entries()) {
      const match = cb(v, i);
      if (match) ret.push(match);
    }
    return ret;
  };

  Array.prototype.find = (cb) => {
    for (let [i, v] of arr.entries()) {
      if (cb(v)) return v;
    }
  };

  Array.prototype.findIndex = (cb) => {
    for (let [i, v] of arr.entries()) {
      if (cb(v)) return i;
    }
    return -1;
  };

  Array.prototype.some = (cb) => {
    for (let v of arr) {
      if (cb(v)) return true;
    }
    return false;
  };

  Array.prototype.every = (cb) => {
    for (let v of arr) {
      if (!cb(v)) return false;
    }
    return true;
  };

  Array.prototype.reduce = (cb, initVal = 0) => {
    let acc = initVal;

    for (let [i, v] of arr.entries()) {
      acc = cb(acc, v, i, arr);
    }

    return acc;
  };

  Array.prototype.reduceRight = (cb, initVal = 0) => {
    let acc = initVal;

    for (let [i, v] of arr.entries()) {
      acc = cb(v, acc, i, arr);
    }

    return acc;
  };

  Array.prototype.flat = (dim) => {};
  Array.prototype.flatMap = (dim) => {};
  Array.prototype.concat = (...values) => {
    return [...arr, values];
  };
  Array.prototype.push = (val) => {
    return [...arr, val];
  };

  Array.prototype.pop = () => {
    return arr.slice(0, arr.length);
  };
  Array.prototype.shift = () => {
    return arr.slice(1, arr.length + 1);
  };
  Array.prototype.unshift = (val) => {
    return [val, ...arr];
  };
  return arr;
}

const arr = new Array(1, 2, 3);
const arr2 = arr.map((v) => v + 1);
const arr3 = arr.filter((v) => v === 1);
console.log(arr);
console.log(arr2);
console.log(arr3);
const arr4 = arr.map((v, i) => v + i);
console.log(arr4);
const t = [1, 2, 3];
const arr5 = arr.find((v) => v % 2 === 4);
const arr6 = arr.findIndex((v) => v % 2 === 3);
console.log(arr5);
console.log(arr6);

console.log(arr.every((v) => v === 1));
console.log(arr.some((v) => v === 1));
console.log(arr.reduce((a, b) => a * b, 2));
console.log(arr.reduce((a, b) => (a > b ? a : b)));
// arr.pop();
arr.shift();
arr.unshift(10);
// console.log(arr.concat(20));
console.log(arr);
export { Array };
