// 프로그래머스 Lv.2
// https://school.programmers.co.kr/learn/courses/30/lessons/12949
function solution(arr1, arr2) {
  var answer = [];

  for (let i = 0; i < arr1.length; i++) {
    let tmp = [];
    for (let j = 0; j < arr2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < arr2.length; k++) {
        sum += arr1[i][k] * arr2[k][j];
      }
      tmp.push(sum);
    }
    answer.push(tmp);
  }
  return answer;
}

// M x N * N x O = M x O 의 행렬이 나온다.
