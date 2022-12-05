// 프로그래머스 Lv.1 실패율
// https://school.programmers.co.kr/learn/courses/30/lessons/42889

function solution(N, stages) {
  var answer = [];

  for (let i = 1; i <= N; i++) {
    let clear = stages.filter((v) => v <= i);
    answer.push([i, clear.length / stages.length]);
    stages = stages.filter((v) => v > i);
  }

  answer.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    else return b[1] - a[1];
  });

  return answer.map((v) => v[0]);
}
