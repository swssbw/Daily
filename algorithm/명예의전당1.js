// 프로그래머스 Lv.1 명예의 전당(1)
// https://school.programmers.co.kr/learn/courses/30/lessons/138477
function solution(k, score) {
  var answer = [];
  let tmp = [];

  while (score.length !== 0) {
    tmp.push(score.shift());

    if (tmp.length > k) {
      tmp.sort((a, b) => b - a);
      tmp.pop();
    }

    answer.push(Math.min(...tmp));
  }

  return answer;
}

// 1트만에 풀었당,, 신기
