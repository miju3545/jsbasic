const DefaultMap = "../00-intro/utils/defaultMap";

describe("DefaultMap 테스트", () => {
  test("get default value", () => {
    const map = new DefaultMap("default...");
    const result = map.get();
    expect(result).toEqual("default...");
  });
});
