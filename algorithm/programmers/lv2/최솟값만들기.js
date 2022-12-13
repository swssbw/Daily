// 프로그래머스 Lv.2 최솟값 만들기
// https://school.programmers.co.kr/learn/courses/30/lessons/12941
function solution(A, B) {
  var answer = 0;

  A.sort((a, b) => a - b);
  B.sort((a, b) => b - a);

  A.forEach((a, i) => (answer += A[i] * B[i]));
  return answer;
}
