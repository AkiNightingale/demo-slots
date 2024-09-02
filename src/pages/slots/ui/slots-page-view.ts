import { setDividers, setFrame, setGradient } from '@/pages/slots/services/slots-utils';
import { Application, Assets } from 'pixi.js';
import { createReels } from '@/entities/reel/ui/reel-view';
import { SpinButton } from '@/features/spin-reels/ui/spin-button';
import frameImg from '@/shared/assets/images/frame.png';
import divider from '@/shared/assets/images/divider.png';
import {
  REEL_WIDTH,
  REEL_HEIGHT,
} from '@/shared/services/global-constants';
import './slots-page-view.scss';

export const SlotsPageView = async (container: HTMLElement) => {
  const parentContainer = document.createElement('div');
  parentContainer.className = 'slots-page';
  container.appendChild(parentContainer);

  const app = new Application();
  await app.init({
    backgroundAlpha: 0,
    width: REEL_WIDTH + 40,
    height: REEL_HEIGHT + 40,
  });
  parentContainer.appendChild(app.canvas);

  await Assets.load([
    frameImg,
    divider,
  ]);

  setGradient(app);

  const reels = await createReels(app);

  setFrame(app);

  await setDividers(app, reels);

  const spinButton = SpinButton(app, reels);
  parentContainer.appendChild(spinButton);
};
