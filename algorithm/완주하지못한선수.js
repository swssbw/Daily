// 프로그래머스 Lv.1 완주하지못한선수
// https://school.programmers.co.kr/learn/courses/30/lessons/42576?language=javascript
function solution(participant, completion) {
  var answer = "";
  let participantMap = new Map();

  for (let x of participant) {
    participantMap.has(x) ? participantMap.set(x, participantMap.get(x) + 1) : participantMap.set(x, 1);
  }

  for (let y of completion) {
    participantMap.set(y, participantMap.get(y) - 1);
  }

  participantMap.forEach((value, key) => {
    if (value !== 0) answer += key;
  });

  return answer;
}
