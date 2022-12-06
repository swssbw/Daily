// 프로그래머스 Lv.2 n^2 배열 자르기
// https://school.programmers.co.kr/learn/courses/30/lessons/87390
function solution(n, left, right) {
  var answer = [];

  const tmp = [...new Array(right - left + 1)].map((_, i) => i + left);

  answer = tmp.map((v) => {
    const a = Math.floor(v / n);
    const b = v % n;
    const min = a + 1;

    if (b === n - 1) return n;
    if (b <= a) return min;

    return min + b - a;
  });

  return answer;
}

// 나름 규칙을 찾는다고 찾았는데.. 다른 사람 풀이중에 "아...!" 할 정도로 깔끔한 풀이가 있었다
// 왜 여기까지는 생각을 못했니,,?
function solution2(n, left, right) {
  var answer = [];

  for (let i = left; i <= right; i++) {
    answer.push(Math.max(i % n, parseInt(i / n)) + 1);
  }

  return answer;
}
