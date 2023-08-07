Go에서 오브젝트를 JSON으로 변환하려면, 오브젝트를 기술한 구조체가 선언되어 있어야 한다.

`omitempty` 태그는 마샬링 수행시 해당 필드의 데이터가 존재하지 않으면 그 필드는 제외하고 마샬링을 수행하게 한다.

```go
type Score struct {
    Korean  uint `json:"korean,omitempty"`
    Math    uint `json:"math,omitempty"`
    English uint `json:"english,omitempty"`
}

type UserV1 struct {
    Name     string `json:"name"`
    Score    Score  `json:"score,omitempty"`
}
```

그러나 score데이터가 없을때도 `{}` 가 출력된다. 아예 score 필드가 보이지 않도록 하는 방법은 없을까?

```go
{
  "name": "Cathy",
  "score": {}
}
```

omitempty는 해당 필드의 값이 empty value일때 생략하게 된다.

empty value : false, 0, nil pointer, nil interface value, empty array/slice/map, empty string

구조체 필드를 숨기고 싶다면 nil pointer를 사용하자. 구조체의 필드를 구조체 포인터 필드로 바꿔서 사용하는 것이다.

```go
type UserV1 struct {
    Name     string `json:"name"`
    Score    *Score  `json:"score,omitempty"`
}
```

```json
// 데이터가 다 있을때
{
  "name": "alice",
  "score": {
    "korean": 88,
    "math": 77,
    "english": 99
  }
}
```

```json
// score값이 없을때
// 필드 O, 값 X
{
  "name": "alice",
  "score": {}
}
```

```go
type UserV2 struct {
    Name     string `json:"name"`
    Score    ***Score** `json:"score,omitempty"`
}
```

```json
// 데이터가 다 있을때
{
  "name": "alice",
  "score": {
    "korean": 88,
    "math": 77,
    "english": 99
  }
}
```

```json
// score필드가 없을때
// 필드 X, 값 X
{
  "name": "alice"
}
```
