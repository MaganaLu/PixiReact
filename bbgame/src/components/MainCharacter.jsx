import { AnimatedSprite, Sprite } from "@pixi/react";
import { useEffect, useState } from "react";
import { Texture } from "pixi.js";

const MainCharacter = ({ }) => {
    const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';

    const [textures, setTextures] = useState([]);


    useEffect(() => {
        const characterMovement = {
            walk_down: [],
        };

        //push texture for walk down
        characterMovement.walk_down.push(Texture.from(bunnyUrl));

        //set default animation 
        setTextures(characterMovement.walk_down);
    }, []);

    if (textures.length === 0) {
        return null; // Optionally show a loading message while textures are being loaded (must be pixijs node)
    }

    return (
        <AnimatedSprite
            anchor={0.5}
            textures={textures}
            isPlaying={true}
            initialFrame={0}
            animationSpeed={0.1}
        />
    );
};

export default MainCharacter;
