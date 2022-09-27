import randTime from "../randTime.js";

function Promise(cb) {
  Promise.prototype.then = (tcb) => {
    Promise.prototype.thenFn = tcb;
    return this;
  };

  Promise.prototype.catch = (ccb) => {
    Promise.prototype.catchFn = ccb;
    return this;
  };

  Promise.prototype.finally = (fcb) => {
    fcb();
    Promise.prototype.finallyFn = fcb;
    return this;
  };

  const resolve = (success) => {
    console.log("RESOLVE>>", success);
    this.state = "resolve";
    this.thenFn(success);
    this.arr.push(success);
  };

  const reject = (error) => {
    console.log("REJECT>>", error);
    this.state = "reject";
    this.thenFn(error);
    if (this.catchFn) {
      this.catchFn(error);
    }
  };

  cb(resolve, reject);

  if (new.target) {
    this.state = "pending";
    this.arr = [];
  }
}

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    const now = Date.now();
    if (now % 2 === 0) resolve(now);
    else reject(new Error("어디로?"));
  }, 1000);
});

p.then((res) => {
  console.log("p.then.res11>>>", res);
  return randTime(1);
})
  .catch((err) => console.error("err-11>>", err))
  .catch((err) => console.error("err-22>>", err))
  .then((res) => {
    console.log("p.then.res22>>>", res);
    return "FiNALLY";
  })
  .then(console.log("p.then.res33!!!"))
  .then((res) => res || "TTT")
  .finally(() => console.log("finally-11"))
  .finally(() => console.log("finally-22"));
