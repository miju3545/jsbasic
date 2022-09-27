import fetch from "node-fetch";

const sampleUrl = "https://jsonplaceholder.typicode.com/users/1";

const myFetch = (url) => fetch(url).then((res) => res.json()); // fetch 는 promise 리턴!

myFetch(sampleUrl)
  .then((user) => console.log("user1", user.name))
  .catch(console.error);
const user2 = await myFetch(sampleUrl);
console.log("user2", user2);

// const exec = utils.promisify(cb) // cb 을 프로미스를 리턴하는 함수로 변환
// exec.then(res => console.log(res)).catch(console.error)
