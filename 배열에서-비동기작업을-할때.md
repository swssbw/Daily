# 문제

```javascript
function fnpromise(num) {
  return new Promise((resolve) => setTimeout(() => resolve(num), 2000));
}

const arr = [1, 2, 3];

function test() {
  arr.forEach(async (num) => {
    const result = await fnpromise(num);
    console.log(result);
  });
}

test();
```

위 코드는 어떻게 작동할까?
나의 예상 : 1초 간격으로 1 -> 2 -> 3 출력
실제 : 1초 뒤에 1,2,3이 동시에 출력...

나의 예상과는 다르게 forEach 는 배열 요소를 돌며 callback을 실행만 할 뿐, 기다려주지는 않는다.
( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach 에서 해당 내용을 확인할 수 있다.)

<br/>

# 해결

### ✨ for of 또는 for 문을 사용하자!

```javascript
async function test() {
  // for of 사용시
  for (let x of arr) {
    const result = await fnpromise(x);
    console.log(result);
  }

  // for 사용
  for (let i = 0; i < arr.length; i++) {
    const result = await fnpromise(arr[i]);
    console.log(result);
  }
}

test();
```

test 라는 function 앞에 async 키워드를 사용하고,
for문 안에서 await을 사용하면 1초간격으로 1 -> 2 -> 3이 되는걸 확인할 수 있다.
