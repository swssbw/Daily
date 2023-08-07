// 프로그래머스 Lv.2 H-index
// https://school.programmers.co.kr/learn/courses/30/lessons/42747
function solution(citations) {
  citations.sort((a, b) => a - b);
  let idx = 0,
    cnt = 0,
    n = Math.max(...citations);
  for (let i = 0; i < n; i++) {
    cnt = 0;
    for (let j = 0; j < citations.length; j++) {
      if (citations[j] >= i) cnt++;
    }

    if (i > cnt) break;
    idx = Math.max(idx, i);
  }

  return idx;
}
