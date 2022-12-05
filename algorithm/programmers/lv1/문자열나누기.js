// 프로그래머스 Lv.1 문자열 나누기
// https://school.programmers.co.kr/learn/courses/30/lessons/140108
function solution(s) {
  let answer = 0,
    index = 0,
    xCnt = 0,
    notXcnt = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[index] === s[i]) xCnt++;
    else notXcnt++;

    if (xCnt === notXcnt) {
      answer++;
      index = i + 1;
      xCnt = 0;
      notXcnt = 0;
    } else if (i === s.length - 1) {
      answer++;
    }
  }

  return answer;
}
