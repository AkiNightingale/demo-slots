import { setArrow, setDividers, setFrame, setGradient } from '@/pages/slots/services/slots-utils';
import { Application, Assets } from 'pixi.js';
import { createReels } from '@/entities/reel/ui/reel-view';
import { SpinButton } from '@/features/spin-reels/ui/spin-button';
import frameImg from '@/shared/assets/images/frame.png';
import divider from '@/shared/assets/images/divider.png';
import arrowLeftImg from '@/shared/assets/images/arrowLeft.png';
import arrowRightImg from '@/shared/assets/images/arrowRight.png';
import {
  REEL_WIDTH,
  REEL_HEIGHT,
} from '@/shared/services/global-constants';
import './slots-page-view.scss';

export const SlotsPageView = async (container: HTMLElement) => {
  await Assets.load([
    frameImg,
    divider,
    arrowLeftImg,
    arrowRightImg,
  ]);

  const parentContainer = document.createElement('div');
  parentContainer.className = 'slots-page';
  container.appendChild(parentContainer);

  const reelsContainer = document.createElement('div');
  reelsContainer.className = 'slots-page__reels';
  parentContainer.appendChild(reelsContainer);

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'slots-page__button';
  parentContainer.appendChild(buttonContainer);

  const app = new Application();
  await app.init({
    backgroundAlpha: 0,
    width: REEL_WIDTH + 40,
    height: REEL_HEIGHT + 40,
  });

  app.canvas.className = 'slots-page__reels-canvas';


  await setArrow(reelsContainer);

  reelsContainer.appendChild(app.canvas);

  setGradient(app);

  const reels = await createReels(app);

  setFrame(app);

  await setDividers(app, reels);

  await setArrow(reelsContainer, true);

  const spinButton = SpinButton(app, reels);
  buttonContainer.appendChild(spinButton);
};
