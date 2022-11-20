// 프로그래머스 Lv.2 괄호 회전하기
// https://school.programmers.co.kr/learn/courses/30/lessons/76502
function solution(s) {
  var answer = 0;
  let arr = s.split("");

  for (let i = 0; i < arr.length; i++) {
    let tmp = arr.join("");
    while (tmp.includes("()") || tmp.includes("{}") || tmp.includes("[]")) {
      tmp = tmp.replaceAll("()", "");
      tmp = tmp.replaceAll("[]", "");
      tmp = tmp.replaceAll("{}", "");
    }
    if (tmp.length === 0) answer++;
    arr.push(arr.shift());
  }
  return answer;
}
