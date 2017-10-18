import { curry } from "qm-fp";

export function mdHeaderCreate(type = "all", flags) {
  // all or 1 - 6
  let lvl;
  if (typeof type === "number" && /[1-6]/g.test(type)) {
    lvl = type;
  } else {
    lvl = "1,6";
  }
  const rgx = `^(#{${lvl}})\\ ([\\w,-]+)([\\ ]?#{${lvl}})?`;
  return new RegExp(rgx, flags);
}

export function ifMdHeader(rgx = mdHeaderCreate("all"), txt) {
  const rgxTest = (rgx, txt) => rgx.test(txt);
  return curry(rgxTest, rgx, txt);
}

// result example:
// [ '#### terefere',
//   '####',
//   'terefere', // index [2]
//   undefined,
//   index: 0,
//   input: '#### terefere \n' ]
//   or null
export function mdHeaderGetTxt(rgx = mdHeaderCreate("all"), txt) {
  const rgxPull = (rgx, txt) => {
    const result = rgx.exec(txt);
    return result && result[2];
  };
  return curry(rgxPull, rgx, txt);
}
