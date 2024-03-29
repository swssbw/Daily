# go에서 Request body 처리하기

요청 본문의 Act(수정, 수정취소,, 등등)에 따라 다르게 처리하는 PATCH /api/user API 명세를 전달받았다.

그래서 Handler에서 Request라는 구조체에 요청 본문을 바인딩했고, HandleA와 HandleB에 ctx를 인자로 넘겨주면 Handle함수 내부에서도 요청 본문을 다른 구조체에 바인딩해서 쓸 수 있을 거라 생각했다.

그 결과 1 에서는 정상적으로 요청 본문이 Request 구조체에 바인딩 되었지만, 2와 3에서는 빈객체가 출력되었다.

```go
type Request {
	Act string `json:"act"`
	Id  string `json:"id"`
}

type RequestA struct {
	Act    string `json:"act"`
	Id     string `json:"id"`
	Grade  string `json:"grade"`
}

type RequestB struct {
	Act       string `json:"act"`
	Id        string `json:"id"`
	Password  string `json:"password"`
}

// 핸들러 함수
func (c *Controller) Handler(ctx *gin.Context) {
	var payload payloads.Request // 1

	if err := ctx.ShouldBindJSON(&payload); err == nil {
		if payload.Act == payloads.ActionA {
			c.HandleA(ctx)
		} else if payload.Act == payloads.ActionB {
			c.HandleB(ctx)
		} else {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	}

}

func (c *Controller) HandleA(ctx *gin.Context) {
	var payload payloads.RequestA // 2
	err := ctx.ShouldBindJSON(&payload)

	fmt.Println(payload)
}

func (c *Controller) HandleB(ctx *gin.Context) {
	var payload payloads.RequestB // 3
	err := ctx.ShouldBindJSON(&payload)

	fmt.Println(payload)
}
```

#### 왜 그럴까?

HTTP 프로토콜의 특성 때문이다.

- HTTP 프로토콜의 요청-응답이 한번만 이루어지는 단방향 통신으로, 요청과 응답은 일회성이다.
- 서버는 요청을 받은 후 해당 요청의 데이터를 메모리에 유지하지 않는다.
- 따라서 요청의 바디를 읽은 후 그 데이터를 다시 읽을 수 없게 된다.

shouldBindJSON(또는 BindJSON)을 사용해 요청의 본문을 구조체에 바인딩하면, 요청의 본문은 이미 처리되었기에 메모리에서 제거된다. 그래서 같은 요청에 대해 다시 바인딩을 하려고 하면 요청의 본문이 비어있는 상태로 간주되어 빈 객체가 반환된다.

그래서 바인딩된 데이터를 재사용하거나, 다른방식으로 처리해야한다.

#### 해결

```go
type Request {
    Act       string `json:"act"`
    Id        string `json:"id"`
    Grade     string `json:"grade"`
    Password  string `json:"password"`
}

// 핸들러 함수
func (c *Controller) Handler(ctx *gin.Context) {
	var payload payloads.Request

	if err := ctx.ShouldBindJSON(&payload); err == nil {
		if payload.Act == payloads.ActionA {
			c.HandleA(ctx, payload)
		} else if payload.Act == payloads.ActionB {
			c.HandleB(ctx, payload)
		} else {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	}

}
```

한개의 Request 구조체에 원하는 필드를 모두 담고, 이 구조체에 요청 본문을 바인딩한다. 그리고 그 데이터를 인자로 넘겨주어 재사용하는것으로 코드를 수정했다.

만약 요청의 본문이 어떤 키를 가질지 모른다면 (구조체를 미리 선언해두기 어렵다면) `map[string]interface{}` 타입으로 언마샬 하고 필요한 데이터를 추출하여 다른 구조체에 할당하면 되겠다!

```go
func (c *Controller) Handler(ctx *gin.Context) {
    var requestBody map[string]interface{}

    if err := ctx.ShouldBindJSON(&requestBody); err != nil {
        // 바인딩 실패 처리
        return
    }

    ...
}
```
