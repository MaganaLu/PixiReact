import './App.css';
import { useMemo } from 'react';

import { BlurFilter, TextStyle } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';

import MyComponent from './components/MyComponent';
import MainCharacter from './components/MainCharacter';

const App = () => {
  const blurFilter = useMemo(() => new BlurFilter(2), []);
  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';
  return (
    <Stage width={800} height={600} options={{ background: 0x1099bb }}>

      <MainCharacter/> 

      <Container x={200} y={200}>
  
    

      </Container>
    </Stage>
  );
};

export default App;