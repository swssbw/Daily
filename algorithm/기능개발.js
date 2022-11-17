// 프로그래머스 Lv.2 기능개발
// https://school.programmers.co.kr/learn/courses/30/lessons/42586
function solution(progresses, speeds) {
  var answer = [];
  let tmp = progresses.map((v, i) => Math.ceil((100 - v) / speeds[i]));
  let max = tmp[0];
  answer.push(0);

  for (let i = 0; i < tmp.length; i++) {
    if (tmp[i] <= max) {
      answer[answer.length - 1] += 1;
    } else {
      answer.push(1);
      max = tmp[i];
    }
  }
  return answer;
}
