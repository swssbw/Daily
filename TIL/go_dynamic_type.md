#### 동적 타입 처리하기

Go에서 동적 타입을 처리해야할때는 `interface{}`를 사용하자
`interface{}` 는 다양한 타입의 값을 받을 수 있다!

#### 콘솔에 구조체 키:값 형태로 출력하기

```go
package main

import "fmt"

type User struct {
    Name string
    ID   string
}

func main() {
	user1 := User{"name1", "id001"}
    fmt.Println(user1) // {name1 id001}
}
```

fmt.Println을 사용해서 구조체를 출력하면 값만 출력된다.
포맷팅 옵션을 줘서 출력하기 위해 Printf + `%+v` 를 사용하자

```go
func main() {
	user1 := User{"name1", "id001"}
    fmt.Printf("%+v\n", user1) // {Name: name1, ID: id001}
}
```

아니면 `Marshal`도 가능하다.

```go
package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    Name string
    ID   string
}

func main() {
    user1 := User{Name: "name1", ID: "id001"}

    jsonUser, _ := json.Marshal(user1)
    fmt.Println(string(user1)) // {"Name":"name1", "ID":"id001"}
}
```
