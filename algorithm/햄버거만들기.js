// 프로그래머스 Lv.1 햄버거만들기
// https://school.programmers.co.kr/learn/courses/30/lessons/133502
function solution(ingredient) {
  var answer = 0;
  let tmp = [];

  for (let x of ingredient) {
    tmp.push(x);
    if (tmp.length >= 4) {
      if (
        tmp[tmp.length - 1] === 1 &&
        tmp[tmp.length - 2] === 3 &&
        tmp[tmp.length - 3] === 2 &&
        tmp[tmp.length - 4] === 1
      ) {
        answer++;
        tmp.splice(-4);
        // tmp.pop();
        // tmp.pop();
        // tmp.pop();
        // tmp.pop();
      }
    }
  }

  return answer;
}

// pop을 4번하는게 썩 맘에 들지는 않았는데.. splice 한번으로 줄일 수 있을거같다.
// splice가 pop보다 큰 시간복잡도를 가진다고 하지만 이 문제는 배열의 길이가 길지 않아서 크게 영향 없을듯!!
