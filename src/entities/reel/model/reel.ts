import { Container, Sprite, Texture, BlurFilter } from 'pixi.js';
import { GRID_HEIGHT, REEL_WIDTH, SYMBOL_SIZE } from '@/shared/services/global-constants';
import { IReel } from '@/shared/services/global-types';

export const createReel = (slotTextures: Texture[], reelIndex: number): IReel => {
  const container = new Container();
  container.x = reelIndex * REEL_WIDTH;

  const blur = new BlurFilter();
  blur.strengthX = 0;
  blur.strengthY = 0;
  container.filters = [blur];

  const symbols: Sprite[] = [];

  for (let j = 0; j < GRID_HEIGHT + 1; j++) {
    const symbol = new Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
    symbol.y = j * SYMBOL_SIZE - SYMBOL_SIZE;
    symbol.scale.set(Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height));
    symbol.x = Math.round((
                            SYMBOL_SIZE - symbol.width
                          ) / 2);
    symbols.push(symbol);
    container.addChild(symbol);
  }

  return {
    container,
    symbols,
    position: 0,
    previousPosition: 0,
    blur,
  };
};
