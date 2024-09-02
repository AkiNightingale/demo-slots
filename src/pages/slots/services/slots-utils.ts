import divider from '@/shared/assets/images/divider.png';
import frameImg from '@/shared/assets/images/frame.png';
import { COLUMN_WIDTH, GRID_WIDTH, REEL_HEIGHT, REEL_WIDTH } from '@/shared/services/global-constants';
import { IReel } from '@/shared/services/global-types';
import { Application, Container, Renderer, Sprite, Texture } from 'pixi.js';

const generateGradientTexture = (width: number, height: number): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Unable to get 2D context');
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#013220');
  gradient.addColorStop(1, '#3d985f');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas;
};

export const setGradient = (app: Application<Renderer>) => {
  const gradientTexture = Texture.from(generateGradientTexture(app.screen.width, app.screen.height));
  const gradientSprite = new Sprite(gradientTexture);
  gradientSprite.width = app.screen.width;
  gradientSprite.height = app.screen.height;

  app.stage.addChild(gradientSprite);
};

export const setFrame = (app: Application<Renderer>) => {
  const frame = Sprite.from(frameImg);
  frame.width = REEL_WIDTH + 40;
  frame.height = REEL_HEIGHT + 40;
  app.stage.addChild(frame);
};

export const setDividers = async (app: Application<Renderer>, reels: IReel[]) => {
  const reelContainer = reels[0].container.parent as Container;
  reelContainer.x = (app.screen.width - REEL_WIDTH) / 2;
  reelContainer.y = (app.screen.height - REEL_HEIGHT) / 2;

  const dividerTexture = Texture.from(divider);
  for (let i = 1; i < GRID_WIDTH; i++) {
    const divider = new Sprite(dividerTexture);
    divider.x = reelContainer.x + i * COLUMN_WIDTH - divider.width / 2;
    divider.height = REEL_HEIGHT - 40;
    divider.width = 10;
    divider.y = reelContainer.y + (
      REEL_HEIGHT - divider.height
    ) / 2;
    app.stage.addChild(divider);
  }
};
