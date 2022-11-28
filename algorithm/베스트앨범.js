// 프로그래머스 Lv.3 베스트앨범
// https://school.programmers.co.kr/learn/courses/30/lessons/42579
function solution(genres, plays) {
  var answer = [];
  let obj = {};
  let playsPerGenres = {};
  let genresArr = [];

  genres.forEach((v, i) => {
    obj[v] ? obj[v].push([i, plays[i]]) : (obj[v] = [[i, plays[i]]]);
    playsPerGenres[v] ? (playsPerGenres[v] += plays[i]) : (playsPerGenres[v] = plays[i]);
  });

  for (let genres in playsPerGenres) {
    genresArr.push([genres, playsPerGenres[genres]]);
  }

  genresArr = genresArr.sort((a, b) => b[1] - a[1]).map((v) => v[0]);

  for (let key in obj) {
    obj[key].sort((a, b) => {
      if (b[1] === a[1]) return a[0] - b[0];
      else return b[1] - a[1];
    });
  }

  for (let genre of genresArr) {
    if (obj[genre].length <= 2) {
      answer.push(...obj[genre].map((v) => v[0]));
    } else {
      answer.push(...obj[genre].slice(0, 2).map((v) => v[0]));
    }
  }
  return answer;
}
