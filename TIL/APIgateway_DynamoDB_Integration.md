# API gateway - DynamoDB 연동

SFDC와 SAP데이터를 연동하기 위해 택한 방법은 API 게이트웨이와 DDB를 연동하는것이다…

람다함수 없이 API gateway에 REST로 CRUD를 하는 환경을 구성하는 CDK를 정리해본다.

# DDB 테이블 생성

```tsx
import { Construct } from "constructs";
import { Table, AttributeType, BillingMode } from "aws-cdk-lib/aws-dynamodb";

class DynamoDbConstruct extends Construct {
  readonly UserTable: Table;

  constructor(scope: Construct, id: string) {
		// Construct 클래스의 생성자를 호출하여 DynamoDbConstruct가 Construct의 기능을 상속받음
    super(scope, id); 

    // 유저 테이블
    this.UserTable = new Table(this, "user-table", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      tableName: "User",
      billingMode: BillingMode.PROVISIONED,
    });
  }
}

export { DynamoDbConstruct };
```

- UserTable : **`DynamoDbConstruct`** 클래스의 멤버 변수로, 생성된 DynamoDB 테이블의 인스턴스를 저장하는 변수
- partitionKey : DDB는 테이블을 파티션으로 분할하며, 파티션키는 테이블의 레코드가 저장되는 기준 열.
- billingMode : 테이블의 과금 모드.
    - PROVISIONED : 프로비저닝된 처리량 모드. 미리 프로비저닝된 쓰기용량,읽기용량을 지정하여 사용. 프로비저닝된 처리량은 시간단위로 지불되며, 추가 비용 없이 큰 양의 요청을 처리할 수 있다.
    - PAY_PER_REQUEST : 온디맨드 처리량 모드. 요청당 처리량만큼 비용 지불 (요청이 없다면 비용 발생하지 않음). 요청 패턴이 불규칙하거나 예측할 수 없는 경우에 유용함

# API Gateway 생성

AWSIntegration을 사용한다.

CRUD별로 IntegrationRequest, Action이 다르다.

### 전체 조회

- GET /users
- action: `Scan`
- requestTemplates:
    
    ```tsx
    {
      "application/json": JSON.stringify({
        TableName: ddb.UserTable.tableName, // 테이블 이름
      }),
    },
    ```
    

### 단건 조회

- GET /users/:id
- action: `GetItem`
    
    ```
    {
      "application/json": JSON.stringify({
        TableName: ddb.UserTable.tableName,
        Key: {
          id: {
            S: "$input.params('id')",
          },
        },
      }),
    }
    ```
    

### 생성

- POST /users
- action: `PutItem`
    
    ```
    {
      "application/json": JSON.stringify({
        TableName: ddb.UserTable.tableName,
    		Item: {
          id: {
            S: "$input.path('$.id')",
          },
          name: {
            S: "$input.path('$.name')",
          },
        },
      }),
    }
    
    // 실제 REQUEST
    {
        "id": "001",
        "name": "계정1"
    }
    ```
    

### 수정

- PUT /users/:id
- action: `UpdateItem`
    
    ```
    {
      "application/json": JSON.stringify({
        TableName: ddb.UserTable.tableName,
        Key: {
          id: {
            S: "$input.params('id')",
          },
        },
        UpdateExpression: "SET #nameAttr = :nameValue",
        ExpressionAttributeNames: {
          "#nameAttr": "name", // 업데이트할 속성 이름
        },
        ExpressionAttributeValues: {
          ":nameValue": { S: "$input.path('$.name')" }, // 업데이트할 속성 값
        },
      }),
    },
    ```
    

### 삭제

- DELETE /users/:id
- action: `DeleteItem`
    
    ```
    {
      "application/json": JSON.stringify({
        TableName: ddb.UserTable.tableName,
    		Key: {
          id: {
              S: "$input.params('id')",
            },
          },
      }),
    },
    ```
    

### 전체 코드

```tsx
import { Construct } from "constructs";
import {
  AwsIntegration,
  RestApi,
  PassthroughBehavior,
} from "aws-cdk-lib/aws-apigateway";

import { DynamoDbConstruct } from "./erp-dynamo-db-construct";
import { Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";

class ApiGatewayConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const ddb = new DynamoDbConstruct(this, "user-dynamo-db");
		
		// 권한 생성
    const integrationRole = new Role(this, "IntegrationRole", {
      assumedBy: new ServicePrincipal("apigateway.amazonaws.com"),
    });
	
    ddb.UserTable.grantReadData(integrationRole); // DDB테이블 읽기
    ddb.UserTable.grantWriteData(integrationRole); // DDB테이블 쓰기
		

		// REST API 생성
    const restApi = new RestApi(this, "system-integration-api");

    // /v1
    const version1 = restApi.root.addResource("v1");

    // /v1/users
    const users = version1.addResource("users");

    // /v1/users/:id
    const user = users.addResource("{id}");
		
    const dynamoScanIntegration = new AwsIntegration({
      service: "dynamodb",
      action: "Scan",
      options: {
        passthroughBehavior: PassthroughBehavior.WHEN_NO_TEMPLATES,
        credentialsRole: integrationRole,
        requestTemplates: {
          "application/json": JSON.stringify({
            TableName: ddb.UserTable.tableName,
          }),
        },
        integrationResponses: [{ statusCode: "200" }],
      },
    });

    const dynamoGetItemIntegration = new AwsIntegration({
      service: "dynamodb",
      action: "GetItem",
      options: {
        credentialsRole: integrationRole,
        requestTemplates: {
          "application/json": JSON.stringify({
            TableName: ddb.UserTable.tableName,
            Key: {
              id: {
                S: "$input.params('id')",
              },
            },
          }),
        },
        integrationResponses: [{ statusCode: "200" }],
      },
    });

    const dynamoPutIntegration = new AwsIntegration({
      service: "dynamodb",
      action: "PutItem",
      options: {
        credentialsRole: integrationRole,
        requestTemplates: {
          "application/json": JSON.stringify({
            TableName: ddb.UserTable.tableName,
            Item: {
              id: {
                S: "$input.path('$.id')",
              },
              name: {
                S: "$input.path('$.name')",
              },
            },
          }),
        },
        integrationResponses: [
          {
            statusCode: "200",
            responseTemplates: {
              "application/json": `$util.toJson($context.result)`,
            },
          },
        ],
      },
    });

    const dynamoUpdateIntegration = new AwsIntegration({
      service: "dynamodb",
      action: "UpdateItem",
      options: {
        credentialsRole: integrationRole,
        requestTemplates: {
          "application/json": JSON.stringify({
            TableName: ddb.UserTable.tableName,
            Key: {
              id: {
                S: "$input.params('id')",
              },
            },
            UpdateExpression: "SET #nameAttr = :nameValue",
            ExpressionAttributeNames: {
              "#nameAttr": "name", // 업데이트할 속성 이름
            },
            ExpressionAttributeValues: {
              ":nameValue": { S: "$input.path('$.name')" }, // 업데이트할 속성 값
            },
          }),
        },
        integrationResponses: [
          {
            statusCode: "200",
            responseTemplates: {
              "application/json": `$util.toJson($context.result)`,
            },
          },
        ],
      },
    });

    const dynamoDeleteIntegration = new AwsIntegration({
      service: "dynamodb",
      action: "DeleteItem",
      options: {
        credentialsRole: integrationRole,
        requestTemplates: {
          "application/json": JSON.stringify({
            TableName: ddb.UserTable.tableName,
            Key: {
              id: {
                S: "$input.params('id')",
              },
            },
          }),
        },
        integrationResponses: [
          {
            statusCode: "200",
            responseTemplates: {
              "application/json": `$util.toJson($context.result)`,
            },
          },
          {
            statusCode: "400",
            responseTemplates: {
              "application/json": `$util.toJson($context.result)`,
            },
          },
          {
            statusCode: "500",
            responseTemplates: {
              "application/json": `$util.toJson($context.result)`,
            },
          },
        ],
      },
    });

    // GET /v1/users
    users.addMethod("GET", dynamoScanIntegration, {
      methodResponses: [{ statusCode: "200" }],
    });

    // GET /v1/users/:id
    user.addMethod("GET", dynamoGetItemIntegration, {
      methodResponses: [{ statusCode: "200" }],
    });

    // POST /v1/users
    users.addMethod("POST", dynamoPutIntegration, {
      methodResponses: [{ statusCode: "200" }],
    });

    // PUT /v1/users/:id
    user.addMethod("PUT", dynamoUpdateIntegration, {
      methodResponses: [{ statusCode: "200" }],
    });

    // DELETE /v1/users/:id
    user.addMethod("DELETE", dynamoDeleteIntegration, {
      methodResponses: [{ statusCode: "200" }],
    });
  }
}

export { ErpApiGatewayConstruct };
```