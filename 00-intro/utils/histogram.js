const DefaultMap = require("./defaultMap");

class Histogram {
  constructor() {
    this.letterCounts = new DefaultMap(0);
    this.totalLetters = 0;
  }

  add(text) {
    text = text.replace(/\s/g, "").toUpperCase();
    for (let char of text) {
      const count = this.letterCounts.get(char);
      this.letterCounts.set(char, count + 1);
      this.totalLetters += 1;
    }
  }

  toString() {
    let entries = [...this.letterCounts];
    entries.sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] < b[0] ? -1 : 1;
      } else {
        return b[1] - a[1];
      }
    });

    for (let entry of entries) {
      entry[1] = (entry[1] / this.totalLetters) * 100;
    }

    entries = entries.filter((entry) => entry[1] >= 1);

    let lines = entries.map(
      ([l, n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}`
    );

    return lines.join("\n");
  }
}

module.exports = Histogram;
