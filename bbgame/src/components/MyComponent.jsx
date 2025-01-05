import { Sprite } from '@pixi/react';
import { BLEND_MODES, BlurFilter } from 'pixi.js';
import { useMemo } from 'react';

const MyComponent = () => {
    const blurFilter = useMemo(() => new BlurFilter(4), []);

    return (
        <Sprite
            texture={myTexture}
            anchor={0.5}
            position={[50, 200]}
            blendMode={BLEND_MODES.ADD}
            roundPixels={true}
            filters={[blurFilter]}
        />
    );
};

export default MyComponent;