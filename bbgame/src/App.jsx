import './App.css';
import { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import { BlurFilter, Texture } from 'pixi.js';
import { Graphics, Stage, Container, Sprite } from '@pixi/react';
import MainCharacter from './components/MainCharacter';
import dungeonTest from './assets/MapTextures/dungeonTest.jpeg';

// Main Application Component
const App = () => {
  const [isColliding, setIsColliding] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 400, y: 300 }); // Player position state

  const cameraRef = useRef(null); // Reference to the camera container
  const backgroundTexture = Texture.from(dungeonTest);

  const draw = useCallback((g) => {
    g.clear();
    g.beginFill(0xff3300);
    g.lineStyle(4, 0xffd900, 1);
    g.moveTo(50, 50);
    g.lineTo(250, 50);
    g.lineTo(100, 100);
    g.lineTo(50, 50);
    g.endFill();
    g.lineStyle(2, 0x0000ff, 1);
    g.beginFill(0xff700b, 1);
    g.drawRect(50, 150, 120, 120); // Rectangle acting as collision box
    g.lineStyle(2, 0xff00ff, 1);
    g.beginFill(0xff00bb, 0.25);
    g.drawRoundedRect(150, 100, 300, 100, 15); // Rounded Rectangle as collision
    g.endFill();
    g.lineStyle(0);
    g.beginFill(0xffff0b, 0.5);
    g.drawCircle(470, 90, 60); // Circle acting as collision area
    g.endFill();
  }, []);

  const checkCollision = (characterBounds) => {
    const collisionZones = [
      { x: 50, y: 150, width: 120, height: 120 },
      { x: 150, y: 100, width: 300, height: 100 },
      { x: 470, y: 90, width: 60, height: 60 }
    ];

    for (let zone of collisionZones) {
      if (
        characterBounds.x < zone.x + zone.width &&
        characterBounds.x + characterBounds.width > zone.x &&
        characterBounds.y < zone.y + zone.height &&
        characterBounds.y + characterBounds.height > zone.y
      ) {
        return true; // Collision detected
      }
    }

    return false; // No collision
  };

  // Player movement logic
  const handleKeyDown = (e) => {
    const speed = 5;
    switch (e.key) {
      case 'w':
        setPlayerPosition((prev) => ({ ...prev, y: prev.y - speed }));
        break;
      case 's':
        setPlayerPosition((prev) => ({ ...prev, y: prev.y + speed }));
        break;
      case 'a':
        setPlayerPosition((prev) => ({ ...prev, x: prev.x - speed }));
        break;
      case 'd':
        setPlayerPosition((prev) => ({ ...prev, x: prev.x + speed }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Camera follows the player position
  useEffect(() => {
    console.log("redraw");
    if (cameraRef.current) {
      cameraRef.current.position.set(playerPosition.x, playerPosition.y);
    }
  }, [playerPosition]);

  return (
    <Stage width={800} height={600} options={{ background: 0x1099bb }}>
      
      {/* world ** these calues will ** find a wy to modify this vlaue from when the atacvater moves, this is state taht is flo8d  the the miancharacvter compoenent, this logic needs to bne manage din the*/}
      <Container pivot={{x: 100, y: 130}}> 
        
        {/* Static Image as Background */}
        <Sprite texture={backgroundTexture} x={0} y={0} />

        {/* Draw Collision Zones with Graphics */}
        <Graphics draw={draw} />

        {/* Main Character */}
        <MainCharacter characterPosition={playerPosition} checkCollision={checkCollision} setIsColliding={setIsColliding} />
        
        
      </Container>
    </Stage>
  );
};

export default App;
