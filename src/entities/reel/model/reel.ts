import { Container, Sprite, Texture, BlurFilter } from 'pixi.js';
import { GRID_HEIGHT, COLUMN_WIDTH, SYMBOL_SIZE } from '@/shared/services/global-constants';
import { IReel } from '@/shared/services/global-types';

export const createReel = (slotTextures: Texture[], reelIndex: number): IReel => {
  /** Note: Creating a container for the drum */
  const container = new Container();
  container.x = reelIndex * COLUMN_WIDTH;

  /** Note: A BlurFilter is created and applied to the drum container to create a motion effect */
  const blur = new BlurFilter();
  blur.strengthX = 0;
  blur.strengthY = 0;
  container.filters = [blur];

  const symbols: Sprite[] = [];

  /** Note: The for loop iterates through each position in the drum (including an extra row at the top to create a
   *  scrolling effect) */
  for (let j = 0; j < GRID_HEIGHT + 1; j++) {
    /** Note: For each symbol, a Sprite is created, randomly selected from slotTextures */
    const symbol = new Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
    /** Note: The y position of the symbol is set based on its index j,
     * which vertically places the symbols at intervals equal to the size of the symbol */
    symbol.y = j * SYMBOL_SIZE - SYMBOL_SIZE;
    /** Note: The symbols are scaled to fit within an area */
    symbol.scale.set(Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height));
    /** Note: Each symbol is centered along the x-axis */
    symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
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
