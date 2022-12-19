## Next.js api routes로 cors 에러 없이 API요청 보낼수 있을까?

### 내 예상 : 당연히 가능 ⭕

<br />

## 확인해보기!!

> 웹 → api routes → 외부 서버 로 요청을 보내보자..

#### 구성

- localhost:8000 : fastAPI
- localhost:3000 : next.js

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/fastapi")
async def test():
    return {"result" :"fastAPI 연결" }
```

#### case 1. 웹에서 바로 호출하기 (당연히 cors에러가 날 것으로 예상)

- pages/index.js

```javascript
import axios from "axios";

export default function Home() {
  const handleClick = async () => {
    await axios.get("http://127.0.0.1:8000/fastapi").then((result) => console.log(result));
  };

  return <button onClick={handleClick}>클릭</button>;
}
```

##### 결과 : Access to XMLHttpRequest at "..." from origin "..." has been blocked by CORS policy 에러 발생

<br />

#### case 2. api routes에서 호출해보기

- api/hello.js

```javascript
import axios from "axios";

export default async function handler(req, res) {
  await axios.get("http://127.0.0.1:8000/fastapi").then(({ data }) => {
    res.status(200).json({ data });
  });
}
```

- pages/index.js

```javascript
import axios from "axios";

export default function Home() {
  const handleClick = async () => {
    await axios.get("/api/hello").then((result) => console.log(result));
  };

  return <button onClick={handleClick}>클릭</button>;
}
```

##### 결과 : 예상한대로 호출 할 수 있다!
