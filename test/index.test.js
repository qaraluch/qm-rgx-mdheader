import test from "ava";
import { mdHeaderCreate, mdHeaderGetTxt, ifMdHeader } from "../dist/index.js";

test("mdHeaderCreate() - is function", t => {
  const msg = "should be a function ";
  const actual = typeof mdHeaderCreate === "function";
  const expected = true;
  t.is(actual, expected, msg);
});

test("mdHeaderCreate() - is regex object", t => {
  const msg = "should be regex object";
  const actual = mdHeaderCreate() instanceof RegExp;
  const expected = true;
  t.is(actual, expected, msg);
});

var cases = [
  ["# terefere \n", undefined, true],
  ["# terefere#\n", undefined, true],
  ["# terefere # \n", undefined, true],

  ["# terefere \n", 1, true],
  ["## terefere \n", 2, true],
  ["### terefere \n", 3, true],
  ["#### terefere \n", 4, true],
  ["##### terefere \n", 5, true],
  ["###### terefere \n", 6, true],

  ["## terefere \n", 1, false],
  ["### terefere \n", 2, false],
  ["#### terefere \n", 3, false],
  ["##### terefere \n", 4, false],
  ["###### terefere \n", 5, false],
  ["####### terefere \n", 6, false],

  ["# terefere \n", "all", true],
  ["## terefere \n", "all", true],
  ["### terefere \n", "all", true],
  ["#### terefere \n", "all", true],
  ["##### terefere \n", "all", true],
  ["###### terefere \n", "all", true],

  ["# terefere \n", "wrongParam", true],
  ["## terefere \n", "wrongParam", true],
  ["### terefere \n", "wrongParam", true],
  ["#### terefere \n", "wrongParam", true],
  ["##### terefere \n", "wrongParam", true],
  ["###### terefere \n", "wrongParam", true],

  ["####### terefere \n", 7, false],
  ["####### terefere \n", "terefere", false],
  ["####### terefere \n", "all", false],

  ["#terefere# \n", undefined, false],
  [" # terefere \n", undefined, false],
  ["   #terefere#\n", undefined, false]
];

test("ifMdHeader() - is it md header", t => {
  const msg = "should be heder";
  cases.forEach((c, i) => {
    const txt = c[0];
    const whatHeader = c[1];
    const predefinedResult = c[2];
    const rgx = mdHeaderCreate(whatHeader);
    const actual = ifMdHeader(rgx, txt);
    const expected = predefinedResult;
    t.is(actual, expected, `${msg} in case no. ${i} -> ${c}`);
  });
});

var casesTxt = [
  ["# terefere \n", undefined, "terefere"],
  ["# terefere#\n", undefined, "terefere"],
  ["# terefere # \n", undefined, "terefere"],

  ["# terefere \n", 1, "terefere"],
  ["## terefere \n", 2, "terefere"],
  ["### terefere \n", 3, "terefere"],
  ["#### terefere \n", 4, "terefere"],
  ["##### terefere \n", 5, "terefere"],
  ["###### terefere \n", 6, "terefere"],

  ["# terefere \n", "all", "terefere"],
  ["## terefere \n", "all", "terefere"],
  ["### terefere \n", "all", "terefere"],
  ["#### terefere \n", "all", "terefere"],
  ["##### terefere \n", "all", "terefere"],
  ["###### terefere \n", "all", "terefere"],

  ["# terefere \n", "wrongParam", "terefere"],
  ["## terefere \n", "wrongParam", "terefere"],
  ["### terefere \n", "wrongParam", "terefere"],
  ["#### terefere \n", "wrongParam", "terefere"],
  ["##### terefere \n", "wrongParam", "terefere"],
  ["###### terefere \n", "wrongParam", "terefere"],

  ["####### terefere \n", 7, null],
  ["####### terefere \n", "terefere", null],
  ["####### terefere \n", "all", null],

  ["#terefere# \n", undefined, null],
  [" # terefere \n", undefined, null],
  ["   #terefere#\n", undefined, null]
];

test("mdHeaderGetTxt() - return header text", t => {
  const msg = "should be heder";
  casesTxt.forEach((c, i) => {
    const txt = c[0];
    const whatHeader = c[1];
    const predefinedResult = c[2];
    const rgx = mdHeaderCreate(whatHeader);
    const actual = mdHeaderGetTxt(rgx, txt);
    const expected = predefinedResult;
    t.is(actual, expected, `${msg} in case no. ${i} -> ${c}`);
  });
});

test("curried ifMdHeader()", t => {
  const msg = "curried fn should work as usual one";
  const rgx = mdHeaderCreate(4);
  const actual = ifMdHeader(rgx)("#### terefere \n");
  const expected = true;
  t.is(actual, expected, msg);
});

test("curried mdHeaderGetTxt()", t => {
  const msg = "curried fn should work as usual one";
  const rgx = mdHeaderCreate(4);
  const actual = mdHeaderGetTxt(rgx)("#### terefere \n");
  const expected = "terefere";
  t.is(actual, expected, msg);
});
