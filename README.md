# 3D 인터랙티브 웹 개발 분야 이론 및 실습 강의 / 파트3 

# 3D 물리엔진 자동차 웹

## 3D 개발 환경 구현

- [x] 프로젝트 설명 (r3f, cannon)
- [x] use-cannon 라이브러리 소개
```
cannon-es는 가벼우면서 웹에서 사용하기 쉬운 3D 물리엔진.
three.js의 간단한 api에서 영감을 받아 개발되었음.
use-cannon은 R3F와 cannon-es를 연결하여 웹 애플리케이션에서
손쉽게 3D물리 시뮬레이션을 통합할 수 있도록 도와주는 유용한 도구.
```
코드로 구현하는 방법은 **Physics 컴포넌트**를 사용한다.

- [x] leva 라이브러리 소개
```
Leva는 사용자에게 GUI를 제공하여 React Three Fiber 기반의
3D 애플리케이션에서 간단하게 씬의 속성을 조작하고 모니터링할 수 있는 도구.

이 라이브러리를 사용하면 코드 수정없이도 사용자가 실시간으로
애플리케이션의 다양한 매개변수를 조절하고 시각적으로 확인할 수 있다.

Leva 라이브러리를 사용하는 이유?
실시간 상호작용 및 조절이다.
```

- [x] 물리 엔진 기본 1편 (useBox, useShpere, useCylinder, usePlane )
```
충돌체란?
게임 및 시뮬레이션에서 현실적이고 다양한 상호작용을 제공하는 중요한 개념.
충돌 검출과 물리적 상호작용을 관리할 수 있게 해줌.

충돌체의 크기는 메쉬의 크기보다 더 크게 설정할 수 있음.
```

- [x] 물리 엔진 기본 2편 (useTrimesh, useConvexPolyhedron )
```
복잡한 매쉬에 물리엔진을 설정해야할 때 사용.

useTrimesh 훅
삼각형 메쉬를 나타내는 충돌체를 생성하는데 사용
일반적으로 3D 모델의 표면을 삼각형으로 나누어 이 삼각형들을 충돌체로 사용함.
하지만 성능 측면에서는 간단한 기하 모형보다는 높은 비용이 들 수 있음.

useConvexPolyhedron 훅
볼록 다면체를 나타내는 충돌체를 생성하는데 사용.
볼록다면체는 각 점을 포함하는 선분이 모두 그 내부에 위치한 다면체를 말함.
간단한 형태의 메쉬에 적합.
볼록 다면체 충돌체는 일반적으로 useBox나 useSphere보다는 복잡한 형상을 가지는 메쉬에 사용됨.
```

## Cannon 활용 자동차 구현

- [x] 물리 엔진을 가진 자동차의 바디 만들기 (useBox)
- [x] 물리 엔진을 가진 바퀴 만들기 (useCompoundBody)
```
useCompoundBody 사용하는 경우

여러 개의 간단한 형태의 물체를 조합하여 하나의 복잡한 물체를 만들 수 있게 해줌.

useTrimesh나 useConvexPolyhedron은 각각의 도형에 대한 별도의 계산을 수행해야 함.
반면에 useCompoundBody를 사용하면 하나의 복합된 물체로 취급되므로 물리엔진은
이를 최적화하여 전체적인 성능을 향상시킬 수 있음.

또한 useTrimesh나 useConvexPolyhedron보다 충돌감지가 더 효과적임.
```
- [x] 키보드를 통한 바퀴 제어 로직 만들기
- [ ] 물리엔진 Static, Kinematic, Dynamic 이해하기
```
Static (정적)
움직이지 않으며 고정된 위치에 존재함.
주로 화면상에서 움직이지 않는 요소들에 사용됨.
물체는 물리 시뮬레이션에 참여하지만, 중력이나 다른 외력에 의해 움지이지 않음.
```
```
Kinematic(운동)
사용자가 직접 제어하거나 물리 시뮬레이션에 의해 움지이지 않는 물체.
주로 플레이어 캐릭터나 움지이는 플랫폼과 같은 요소에 사용됨.
물리 시뮬레이션은 물체에 영향을 미치지 않고 개발자가 직접 위치와 속도를 조절할 수 있음.
```
```
Dynamic (동적)
물리 시뮬레이션에 의해 영향을 받아 움지이는 물체.
주로 공, 상자 등.
중력이나 다른 외력에 의해 영향을 받아 움직임.
```
- [x] useBox, useSphere로 충돌체 만들기 구체, 박스 (Dynamic)
- [x] 벽과 고정체 만들기 (Static)
- [x] 자동차를 따라다니는 카메라 만들기 (useThree)
```
useThree 훅
이 훅은 기본 렌더러, 씬, 카메라 등이 포함된 상태 모델에 접근할 수 있게 해줌.
또한 현재 캔버스의 크기를 스크린 및 뷰포트 좌표로 제공함.

useThree는 Scene에서 사용 X
무조건 캔버스 안에 만들어야함
```

```
lerp()
선형 보간(Linear Interpolation)이란 두 점 a, b 사이의 값(c)를 구하기 위해
a-b 두 점을 연결한 직선을 만들어 사이 값을 계산하는 방법이다.

pivot 포인트와 worldPosition의 중간값을 찾을 때 사용되는 함수
```

## 3D 오브젝트 실제 모델 적용하기

- [x] gltfjsx로 소개 및 glb 파일을 jsx로 변환하기
```
GLTF를 선언적이고 재사용 가능한 react-three-fiber JSX 컴포넌트로
변환시켜주는 유틸리티(도구)임.
```

**gltfjsx 장점**
```
- 쉬운 콘텐츠 수정 및 재사용
- 효율적인 그래프 최적화
- 압축 옵션 제공
```
**gltfjsx 사용법**
```
npx gltfjsx [Model.glb] [options]

Options
--output, -o        Output file name/path
--types, -t         Add Typescript definitions
--keepnames, -k     Keep original names
--keepgroups, -K    Keep (empty) groups, disable pruning
--meta, -m          Include metadata (as userData)
```
- [x] 자동차 바디 glb 모델로 적용하기
- [x] 자동차 바퀴 glb 모델로 적용하기
- [x] 충돌 모델 glb 모델로 적용하기
- [x] Text 3D 모델 넣기

## 이벤트 및 모션 만들기

- [ ] recoil 전역값 관리 학습
- [ ] 페이지 진입시 인 모션 만들기
- [ ] 물체 충돌 UI 팝업 생성
- [ ] 물체 충돌시 물체 회전 (간판 회전)
- [ ] 물체 마우스 클릭시 페이지 이동
- [ ] 특정 지역 진입시 이벤트 발생
- [ ] 특정 지역 진입시 이벤트2 발생

## 프로젝트 최적화 알아보기

- [ ] FPS 개념과 확인(stats)
- [ ] 최적화 알아보기 (DrawCall)
- [ ] Json 폰트 최적화
- [ ] Webp로 텍스처 압축
- [ ] 모델 최적화 (glb, Draco 압축)
