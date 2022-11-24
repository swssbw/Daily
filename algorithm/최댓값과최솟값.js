// 프로그래머스 Lv.2 최댓값과 최솟값
// https://school.programmers.co.kr/learn/courses/30/lessons/12939
function solution(s) {
  var answer = "";
  const max = Math.max(...s.split(" ").map((v) => parseInt(v)));
  const min = Math.min(...s.split(" ").map((v) => parseInt(v)));

  answer = `${min} ${max}`;
  return answer;
}
