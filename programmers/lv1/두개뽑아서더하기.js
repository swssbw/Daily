// 프로그래머스 Lv.1 두개 뽑아서 더하기
// https://school.programmers.co.kr/learn/courses/30/lessons/68644
function solution(numbers) {
  var answer = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 1; j < numbers.length; j++) {
      if (i !== j) answer.push(numbers[i] + numbers[j]);
    }
  }
  answer.sort((a, b) => a - b);

  const ansSet = new Set(answer);
  return [...ansSet];
}
