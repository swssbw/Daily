// 프로그래머스 Lv.2 가장 큰 수
// https://school.programmers.co.kr/learn/courses/30/lessons/42746
function solution(numbers) {
  var answer = "";

  numbers = numbers.map((v) => String(v));
  numbers.sort((a, b) => b + a - (a + b));
  answer = numbers.join("");
  if (answer[0] === "0") answer = "0";

  return answer;
}
