import randTime from "../randTime.js";

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
  .then((res) => {
    console.log("p.then.resxxx>>>", res);
    return randTime(2);
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

function Promise(cb) {
  console.log("@myPromise.createAt>>", new Date());

  const thenFns = [];
  const finalFns = [];

  Promise.prototype.then = (tcb) => {
    if (typeof tcb === "function") thenFns.push(tcb);
    return this;
  };

  Promise.prototype.catch = (ccb) => {
    if (!Promise.prototype.catchFn) {
      Promise.prototype.catchFn = ccb;
    }
    return this;
  };

  Promise.prototype.finally = (fcb) => {
    if (typeof fcb === "function") finalFns.push(fcb);
    return this;
  };

  // closure
  const final = () => {
    let isNowRunning = false;
    return () => {
      if (isNowRunning || !finalFns.length) return;
      isNowRunning = true;
      const intl = setInterval(() => {
        for (const fn of finalFns) fn();
        clearInterval(intl);
      }, 0);
    };
  };

  const resolve = (success) => {
    console.log("RESOLVE>>", success);

    let preRet = success;
    const finalRunner = final();

    const recur = (preRet) => {
      const fn = thenFns.shift();
      if (!fn) {
        this.state = "resolve";
        return finalRunner();
      }

      if (preRet instanceof Promise) {
        preRet.then(fn).then((res) => {
          recur(res);
        });
      } else {
        recur(fn(preRet));
      }
    };

    recur(success);

    // while (thenFns.length) {
    //   const fn = thenFns.shift();
    //   if (preRet instanceof Promise) {
    //     preRet.then(fn).then((res) => {
    //       preRet = res;
    //       if (!thenFns.length) {
    //         this.state = "resolve";
    //         finalRunner();
    //       }
    //     });
    //   } else {
    //      preRet = fn(preRet)
    //   }
    // }
  };

  const reject = (error) => {
    console.log("REJECT>>", error);
    this.state = "reject";
    if (this.catchFn) {
      this.catchFn(error);
    }
    final()();
  };

  cb(resolve, reject);

  if (new.target) {
    this.state = "pending";
  }
}
