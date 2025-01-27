import './App.css';
import { useMemo, useCallback, useState } from 'react';
import { Texture } from 'pixi.js';
import { Graphics, Stage, Container, Sprite, useTick } from '@pixi/react';
import MainCharacter from './components/MainCharacter';
import dungeonTest from './assets/MapTextures/dungeonTest.jpeg';

// Main Application Component
const App = () => {
  const [isColliding, setIsColliding] = useState(false);

  const backgroundTexture = Texture.from(dungeonTest);

  // The drawing callback for Graphics component
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

  // Collision check logic TODO: change to maincharcatert instead of passing 
  const checkCollision = (characterBounds) => {
    // Here we define our "collision zones" based on Graphics' bounds
    const collisionZones = [
      { x: 50, y: 150, width: 120, height: 120 }, // Rectangle
      { x: 150, y: 100, width: 300, height: 100 }, // Rounded Rectangle
      { x: 470, y: 90, width: 60, height: 60 } // Circle
    ];

    // Check if the character's bounds intersect with any of the collision zones
    for (let zone of collisionZones) {
      if (
        characterBounds.x < zone.x + zone.width &&
        characterBounds.x + characterBounds.width > zone.x &&
        characterBounds.y < zone.y + zone.height &&
        characterBounds.y + characterBounds.height > zone.y
      ) {
        console.log("Collision detected");
        return true; // Collision detected
      }
    }

    return false; // No collision
  };



  return (
    <Stage width={800} height={600} options={{ background: 0x1099bb }}>
      
      {/* world container //TO DO: conditionally update container based on collision data fro doorts */}
      <Container> 
        
        {/* Static Image as Background */}
        <Sprite texture={backgroundTexture} x={0} y={0} />

        {/* Draw Collision Zones with Graphics */}
        <Graphics draw={draw} />

        {/* Main Character */}
        <MainCharacter checkCollision={checkCollision} setIsColliding={setIsColliding} />
        
      </Container>
    </Stage>
  );
};

export default App;
