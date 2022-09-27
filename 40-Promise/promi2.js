const randTime = (val) =>
  new Promise((resolve) => {
    const delay = Math.random() * 1000;
    console.log("randTime>>>", val, delay);
    setTimeout(resolve, delay, val);
  });
