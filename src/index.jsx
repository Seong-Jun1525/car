import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Scene from './Scene';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RecoilRoot>
      <Scene />
    </RecoilRoot>
  // </React.StrictMode>
);
/**
 * StrictMode는 애플리케이션 내의 잠재적인 문제를 알아내기 위한 도구.
 * Fragment와 같이 UI를 렌더링하지 않으며, 자손들에 대한 부가적인 검사와 경고를 활성화함.
 * 
 * 
 * StrictMode는 아래와 같은 부분에서 도움이 됨
 * 안전하지 않은 생명주기를 사용하는 컴포넌트 발견
 * 레거시 문자열 ref 사용에 대한 경고
 * 권장되지 않는 findDOMNode 사용에 대한 경고
 * 예상치 못한 부작용 검사
 * 레거시 context API 검사
 * Ensuring reusable state
 */