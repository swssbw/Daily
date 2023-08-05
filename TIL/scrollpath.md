# 스크롤에 따라 그려지는 path

stroke-dashoffset = stroke-dasharray = 총 path의 길이 → 화면에 안보임

stroke-dasharray = 총 path의 길이 → 화면에 다보임

스크롤에 따라 그려지게 하는 방법은 2가지

path의 총 길이가 1000일때,

### 첫번째 방법

stroke-dashoffset = stroke-dasharray = 총 path의 길이 에서 시작

스크롤에 따라 stroke-dashoffset가 path길이 → 0 으로 변화하도록 함

```css
#target1 {
  stroke-dashoffset: 1000;
  stroke-dasharray: 1000;
}
```

```css
#target1 {
  stroke-dashoffset: 0;
  stroke-dasharray: 1000;
}
```

### 두번째 방법

stroke-dashoffset 값을 0 으로 고정

스크롤에 따라 stroke-dasharray의 첫번째 인자값이 0 → 총 path의 길이로 변화

```css
#target1 {
  stroke-dashoffset: 0;
  stroke-dasharray: 0, 1000;
}
```

```css
#target1 {
  stroke-dashoffset: 0;
  stroke-dasharray: 1000, 1000;
}
```
