import { IReel } from '@/shared/services/global-types';
import {Application, Assets, Container, Texture} from 'pixi.js';
import {createReel} from '@/entities/reel/model/reel';
import banana from '@/shared/assets/images/banana.svg';
import apple from '@/shared/assets/images/apple.svg';
import diamond from '@/shared/assets/images/diamond.svg';
import strawberry from '@/shared/assets/images/strawberry.svg';
import grape from '@/shared/assets/images/grape.svg';
import {GRID_HEIGHT, GRID_WIDTH, COLUMN_WIDTH, SYMBOL_SIZE} from "@/shared/services/global-constants";

export const createReels = async (app: Application): Promise<IReel[]> => {
    await Assets.load([
        banana,
        apple,
        diamond,
        strawberry,
        grape
    ]);

    const slotTextures = [
        Texture.from(banana),
        Texture.from(apple),
        Texture.from(diamond),
        Texture.from(strawberry),
        Texture.from(grape),
    ];

    const reels: IReel[] = [];
    const reelContainer = new Container();

    for (let i = 0; i < GRID_WIDTH; i++) {
        const reel = createReel(slotTextures, i);
        reelContainer.addChild(reel.container);
        reels.push(reel);
    }

    app.stage.addChild(reelContainer);

    reelContainer.x = (app.screen.width - COLUMN_WIDTH * GRID_WIDTH) / 2;
    reelContainer.y = (app.screen.height - SYMBOL_SIZE * GRID_HEIGHT) / 2;

    return reels;
}
