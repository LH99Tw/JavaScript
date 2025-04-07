import React from 'react';
import ReactDOM from 'react-dom/client';

const myApp = <h1>리액트 테스트</h1>;

const root = ReactDOM.createRoot(document.getElementById('root')); // 표시할 컴포넌트의 위치
root.render(<myApp />);