// 프로그래머스 Lv.0 분수의 덧셈
// https://school.programmers.co.kr/learn/courses/30/lessons/120808
function solution(denum1, num1, denum2, num2) {
  let a = denum1 * num2 + denum2 * num1;
  let b = num1 * num2;
  const gcd = (a, b) => (a % b === 0 ? b : gcd(b, a % b));
  console.log("최대공약수", gcd(a, b));

  return [a / gcd(a, b), b / gcd(a, b)];
}
