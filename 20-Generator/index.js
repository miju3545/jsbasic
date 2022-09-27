function* route() {
  const start = yield "출발";
  const end = yield "도착";
  return `${start}역에서 출발 ${end}역에 도착`;
}

const it = route();
it.next();
it.next("문래");
it.next("신림");
