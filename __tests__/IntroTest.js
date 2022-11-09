const { DefaultMap, Histogram } = require("../00-intro/utils");

describe("DefaultMap 테스트", () => {
  test("get default value", () => {
    const map = new DefaultMap(0);
    const result = map.get();
    expect(result).toEqual(0);
  });

  test("get exising value", () => {
    const map = new DefaultMap(0);
    const key = "ball";
    const value = map.get(key);
    map.set(key, value);
    expect(map.get(key)).toEqual(value);
  });
});

describe("Histogram 테스트", () => {
  test("문자열을 맵 객체에 넣기", () => {
    const hist = new Histogram();
    const string = "rovxxmjxxtaemincee";
    hist.add(string);
    const counts = hist.letterCounts;
    const map = [1, 1, 1, 4, 2, 1, 1, 1, 1, 1, 1, 2];
    for (let [key, value] of [...counts]) {
      expect(counts.get(key)).toEqual(value);
    }
  });
});
