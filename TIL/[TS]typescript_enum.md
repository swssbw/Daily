# 타입스크립트 enum의 멤버변수로 접근하기

만약 동적으로 할당되는 변수에 따라 enum값에 접근하고 싶다면?

```jsx
enum UserType {
  Unknown = 0,
  Bronze = 1,
  Silver = 2,
  Gold = 3,
  Admin = 4,
}

const payload: UserPayload = {
	userType: UserType[paramType]
};
```

위의 예제에서 asset.locationType이 Residential, Public, Commercial… 등의 문자열로 들어올때, 그 문자열에 따라 enum에서 적절한 값 (1,2,3,4,5)를 넣어주고 싶다면 어떻게 해야할까?

enum은 value로 간주되기 때문에, keyof typeof 를 사용하면 enum의 멤버변수들의 union type 으로 만들 수 있다.

```jsx
const payload: ComplexLocationPayload = {
  locationType: LocationType[asset.locationType as keyof typeof LocationType],
};
```
