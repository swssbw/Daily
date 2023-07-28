## arr.sort(comparefunction)

```javascript
// 문자열 정렬
["a","d","c","b"].sort() // ["a", "b", "c", "d"]
["라","다","나","가"].sort() // ["가", "나", "다", "라"]

// 문자열을 역순으로 정렬하고자 할때?
["라","다","나","가"].sort((a,b) => comparefunction(a,b))

function comparefunction(a,b) {
  return a < b // 유니코드로 비교함
}

// 숫자 오름차순, 내림차순
[1,3,2,4].sort((a,b) => a-b) // [1,2,3,4]
[1,3,2,4].sort((a,b) => b-a) // [4,3,2,1]
```

### compareFunction 의 특징
`compareFunction(a, b) < 0` 이면 a -> b 순으로 정렬 <br/>
`compareFunction(a, b) > 0` 이면 b -> a 순으로 정렬 <br/>
`compareFunction(a, b) = 0` 이면 순서는 바뀌지 않는다. <br/>

```jsx
const test = [7,3,5,10,4];

const compare = (a,b) => {
  if(a>b) return 1; // a=7, b=3일때 + 리턴.. b -> a 순으로 정렬
  if(a<b) return -1; 
}

test.sort((a,b) => compare(a,b)) // [3, 4, 5, 7, 10]

```
