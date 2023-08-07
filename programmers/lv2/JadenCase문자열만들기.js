// 프로그래머스 Lv.2 JadenCase 문자열 만들기
// https://school.programmers.co.kr/learn/courses/30/lessons/12951

function solution(s) {
  var answer = "";
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const strArr = [];

  let tmp = s.toLowerCase().split(" ");
  tmp.forEach((v) => {
    if (alphabet.includes(v[0])) {
      strArr.push(v.replace(v[0], v[0].toUpperCase()));
    } else {
      strArr.push(v);
    }
  });

  answer = strArr.join(" ");
  return answer;
}
