// 프로그래머스 Lv.2 타겟넘버
// https://school.programmers.co.kr/learn/courses/30/lessons/43165

function solution(numbers, target) {
  var answer = 0;

  function dfs(L, sum) {
    if (L === numbers.length) {
      if (sum === target) answer++;
      return;
    } else {
      dfs(L + 1, sum + numbers[L]);
      dfs(L + 1, sum - numbers[L]);
    }
  }

  dfs(0, 0);
  return answer;
}
