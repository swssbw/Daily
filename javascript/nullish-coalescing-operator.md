### 자바스크립트에서 기본값 설정할때

- `??` : 왼쪽 피연산자가 null 이나 undefined 일때 오른쪽 피연산자를 리턴
- `||` : 왼쪽 피연산자가 null, undefined 뿐 만 아니라 falsy 한 값이면 오른쪽 피연산자를 리턴

```javascript
const t1 = null ?? "기본값";
console.log(t1); // '기본값'

const t2 = 0 ?? "기본값";
console.log(t2); // 0

const t3 = 0 ?? "기본값";
console.log(t3); // 0

const t4 = 0 || "기본값";
console.log(t4); // '기본값'
```

> 기본값을 설정할때에는 `??` 연산자를 사용해야 undefined, null 에 대해서만 처리를 할 수 있다.
