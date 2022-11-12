// 프로그래머스 Lv.1
// https://school.programmers.co.kr/learn/courses/30/lessons/134240
function solution(food) {
  var answer = "";
  let a = [];
  for (let i = 1; i < food.length; i++) {
    if (Math.floor(food[i] / 2) >= 1) {
      a.push(String(i).repeat(Math.floor(food[i] / 2)));
    }
  }

  answer += a.join("") + "0" + a.reverse().join("");
  return answer;
}
