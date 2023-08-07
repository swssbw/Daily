// 프로그래머스 Lv.2 기사단원의 무기
// https://school.programmers.co.kr/learn/courses/30/lessons/136798
// 시간초과 나서 소인수분해로 약수의 갯수를 구해서 풀었음!
function solution(number, limit, power) {
  var answer = 0;

  for (let i = 1; i <= number; i++) {
    answer += prime(i) > limit ? power : prime(i);
  }

  return answer;
}

function prime(n) {
  let primes = new Map();

  while (n % 2 === 0) {
    if (primes.has(2)) primes.set(2, primes.get(2) + 1);
    else primes.set(2, 1);
    n /= 2;
  }

  for (let i = 3; i * i <= n; i += 2) {
    while (n % i === 0) {
      if (primes.has(i)) primes.set(i, primes.get(i) + 1);
      else primes.set(i, 1);
      n /= i;
    }
  }

  if (n > 2) primes.set(n, 1);

  let cnt = 1;

  for (let x of primes.values()) {
    cnt *= x + 1;
  }

  return cnt;
}
