### 사용법

`arr.sort(comparefunction)`

<br />

#### 문자열 정렬 (가나다 순, abc 순)

```javascript
["a", "d", "c", "b"]
  .sort() // ["a", "b", "c", "d"]
  [("라", "다", "나", "가")].sort(); // ["가", "나", "다", "라"]
```

##### 역순으로 정렬하려면?

```javascript
["라", "다", "나", "가"].sort((a, b) => comparefunction(a, b));

function comparefunction(a, b) {
  return a < b; // 유니코드로 대,소 비교
}
```

<br />

#### 숫자 정렬

```javascript
[1, 3, 2, 4]
  .sort((a, b) => a - b) // [1,2,3,4]
  [(1, 3, 2, 4)].sort((a, b) => b - a); // [4,3,2,1]
```

<br />

### compareFunction 의 특징

`compareFunction(a, b)` < 0 이면 **a -> b** 순으로 정렬
`compareFunction(a, b)` > 0 이면 **b -> a** 순으로 정렬
`compareFunction(a, b)` = 0 이면 순서는 바뀌지 않는다.

```javascript
const test = [7, 3, 5, 10, 4];

const compare = (a, b) => {
  if (a > b) return 1; // a=7, b=3일때 + 리턴.. b -> a 순으로 정렬
  if (a < b) return -1;
};

test.sort((a, b) => compare(a, b)); // [3, 4, 5, 7, 10]
```
