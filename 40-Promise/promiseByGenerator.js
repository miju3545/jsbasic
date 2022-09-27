import fetch from "node-fetch";
import co from "co";

const sampleUrl = "https://jsonplaceholder.typicode.com/users/1";

fetch(sampleUrl)
  .then((res) => res.json())
  .then((user) => console.log(user.name));

// refactoring using generator
function* getFetch(url) {
  const res = yield fetch(url);
  const user = yield res.json();
  return user.name;
}

const g = getFetch(sampleUrl);
const nextResult = g.next(); // { value: Promise { <pending> }, done: false }
console.log(nextResult);
nextResult.value.then((res) => {
  const nr2 = g.next(res);
  console.log("res1>>>", nr2);
  nr2.value.then((res2) => {
    console.log("res2>>>", res2);
    const userName = g.next(res2);
    console.log(userName);
  });
});

function* getFetch2(url, fromFn) {
  const res = yield fetch(url);
  const user = yield res.json();
  console.log(fromFn, ">>>", user.name);
}

co(getFetch2, sampleUrl, "co");
