// 프로그래머스 Lv.2 스킬트리
// https://school.programmers.co.kr/learn/courses/30/lessons/49993
function solution(skill, skill_trees) {
  var answer = 0;
  const regex = new RegExp(`[^${skill}]`, "g"); // [^BCD]

  skill_trees
    .map((v) => v.replace(regex, ""))
    .forEach((v) => {
      let result = true;
      for (let i = 0; i < v.length; i++) {
        if (v[i] !== skill[i]) result = false;
      }
      if (result) answer++;
    });

  return answer;
}
