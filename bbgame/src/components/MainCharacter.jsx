import { AnimatedSprite } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import { Texture } from "pixi.js";

const MainCharacter = ({ checkCollision, setIsColliding }) => {
  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';
  const characterRef = useRef(null); // PixiJS ref to directly control position

  const [textures, setTextures] = useState([]);
  
  // Store key press states in a ref so they don't trigger re-renders
  const keys = useRef({ up: false, down: false, left: false, right: false });

  const speed = 5; // Speed of the character

  // Load the texture for the character
  useEffect(() => {
    const loadTextures = async () => {
      const loadedTextures = [Texture.from(bunnyUrl), Texture.from(bunnyUrl)];
      setTextures(loadedTextures);
    };

    loadTextures(); // Async operation to load textures

    return () => {
      console.log("Component unmounted or cleanup");
    };
  }, []); // Only run once on mount

  // Handle keydown and keyup events for character movement
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          keys.current.up = true;
          break;
        case 'ArrowDown':
        case 's':
          keys.current.down = true;
          break;
        case 'ArrowLeft':
        case 'a':
          keys.current.left = true;
          break;
        case 'ArrowRight':
        case 'd':
          keys.current.right = true;
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          keys.current.up = false;
          break;
        case 'ArrowDown':
        case 's':
          keys.current.down = false;
          break;
        case 'ArrowLeft':
        case 'a':
          keys.current.left = false;
          break;
        case 'ArrowRight':
        case 'd':
          keys.current.right = false;
          break;
        default:
          break;
      }
    };

    // Attach event listeners for keydown and keyup
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []); // Only run once on mount

  // Update the character position based on key presses
  useEffect(() => {
    const moveCharacter = () => {
      const character = characterRef.current;
      if (character) {
        const { up, down, left, right } = keys.current;

        let newX = character.x;
        let newY = character.y;

        // Move the character based on pressed keys
        if (up) newY -= speed;
        if (down) newY += speed;
        if (left) newX -= speed;
        if (right) newX += speed;

        // Only update position if it has changed
        if (newX !== character.x || newY !== character.y) {
          character.x = newX;
          character.y = newY;
        }
      }
    };

    const interval = setInterval(moveCharacter, 16); // ~60fps

    return () => clearInterval(interval); // Cleanup interval
  }, []); // Only run once on mount

  if (textures.length === 0) {
    return null; // Optionally show a loading message while textures are being loaded
  }

  return (
    <AnimatedSprite
      ref={characterRef}
      textures={textures}
      isPlaying={true}
      animationSpeed={0.1}
      loop={true}
      x={100} // Initial position
      y={100} // Initial position
    />
  );
};

export default MainCharacter;
