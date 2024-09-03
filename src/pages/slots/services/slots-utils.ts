import arrowLeftImg from '@/shared/assets/images/arrowLeft.png';
import arrowRightImg from '@/shared/assets/images/arrowRight.png';
import divider from '@/shared/assets/images/divider.png';
import frameImg from '@/shared/assets/images/frame.png';
import { COLUMN_WIDTH, GRID_WIDTH, REEL_HEIGHT, REEL_WIDTH, SYMBOL_SIZE } from '@/shared/services/global-constants';
import { IReel } from '@/shared/services/global-types';
import { Application, Container, Renderer, Sprite, Texture } from 'pixi.js';
import '../ui/slots-page-view.scss';

const generateGradientTexture = (width: number, height: number): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Unable to get context');
  }

  const gradient = context.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#013220');
  gradient.addColorStop(1, '#3d985f');

  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

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
    divider.y = reelContainer.y + (REEL_HEIGHT - divider.height) / 2;
    app.stage.addChild(divider);
  }
};

export const setArrow = async(parentContainer:  HTMLDivElement, mirrored: boolean = false) => {
  const arrowApp = new Application();
  await arrowApp.init({
    backgroundAlpha: 0,
    width: 1.5 * SYMBOL_SIZE,
    height: REEL_HEIGHT,
  });

  arrowApp.canvas.className = 'slots-page__reels_arrow-canvas';

  parentContainer.appendChild(arrowApp.canvas);

  const arrow = Sprite.from(mirrored ? arrowRightImg : arrowLeftImg);
  arrow.position.set(30, (REEL_HEIGHT / 2) - (SYMBOL_SIZE / 2));
  arrow.scale.set(0.2);

  arrowApp.stage.addChild(arrow);

  const arrowSpeed = 1;
  let direction = mirrored ? -1 : 1;
  arrowApp.ticker.add(() => {
    arrow.x += arrowSpeed * direction;
    if (arrow.x > 50 || arrow.x < 10) {
      direction *= -1;
    }
  });
}
