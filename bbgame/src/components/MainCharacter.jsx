import { AnimatedSprite } from "@pixi/react";
import { useEffect, useState, useRef } from "react";
import { Texture } from "pixi.js";

const MainCharacter = ({checkCollision, setIsColliding}) => {
  const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';

  const [textures, setTextures] = useState([]);
  const [characterPosition, setCharacterPosition] = useState({ x: 100, y: 100 });
  const [keys, setKeys] = useState({ up: false, down: false, left: false, right: false });
  const characterRef = useRef(null);

  const speed = 5; // Speed of the character

  // Load the texture for the character
  useEffect(() => {
    const loadTextures = async () => {
      console.log("Loading textures...");
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
          setKeys((prevState) => ({ ...prevState, up: true }));
          break;
        case 'ArrowDown':
        case 's':
          setKeys((prevState) => ({ ...prevState, down: true }));
          break;
        case 'ArrowLeft':
        case 'a':
          setKeys((prevState) => ({ ...prevState, left: true }));
          break;
        case 'ArrowRight':
        case 'd':
          setKeys((prevState) => ({ ...prevState, right: true }));
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          setKeys((prevState) => ({ ...prevState, up: false }));
          break;
        case 'ArrowDown':
        case 's':
          setKeys((prevState) => ({ ...prevState, down: false }));
          break;
        case 'ArrowLeft':
        case 'a':
          setKeys((prevState) => ({ ...prevState, left: false }));
          break;
        case 'ArrowRight':
        case 'd':
          setKeys((prevState) => ({ ...prevState, right: false }));
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

  // Update the character position based on the key states
  useEffect(() => {
    const updatePosition = () => {
      const { up, down, left, right } = keys;

      let newX = characterPosition.x;
      let newY = characterPosition.y;

      // Move the character based on pressed keys
      if (up) newY -= speed;
      if (down) newY += speed;
      if (left) newX -= speed;
      if (right) newX += speed;

      // Update the position if it has changed
      if (newX !== characterPosition.x || newY !== characterPosition.y) {
        setCharacterPosition({ x: newX, y: newY });
      }
    };

    // Set up a simple game loop for continuous movement
    const interval = setInterval(updatePosition, 16); // ~60fps

    // Cleanup interval when the component unmounts
    return () => clearInterval(interval);
  }, [keys, characterPosition]); // Re-run only when keys or position change

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
      x={characterPosition.x}
      y={characterPosition.y}
    />
  );
};

export default MainCharacter;
