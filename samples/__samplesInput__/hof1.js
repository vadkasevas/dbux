function f(a) {
  return a.reduce((acc, x) => acc + x, 0);
}

function F(x) {
  console.log(f([x + 10, x + 20]) * f([x + 1, x + 2]));
}

(function main() {
  // run F in two different "runs"
  F(1);
  setTimeout(F.bind(null, 100));
})();