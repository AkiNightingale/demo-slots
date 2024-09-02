import { setDividers, setFrame, setGradient } from '@/pages/slots/services/slots-utils';
import { Application, Assets } from 'pixi.js';
import { createReels } from '@/entities/reel/ui/reel-view';
import { startSpin } from '@/features/spin-reels/model/spin';
import { SpinButton } from '@/features/spin-reels/ui/spin-button';
import frameImg from '@/shared/assets/images/frame.png';
import divider from '@/shared/assets/images/divider.png';
import {
  REEL_WIDTH,
  REEL_HEIGHT,
} from '@/shared/services/global-constants';

export const SlotsPageView = async (container: HTMLElement) => {
  const parentContainer = document.createElement('div');
  parentContainer.style.position = 'relative';
  parentContainer.style.display = 'inline-block';
  container.appendChild(parentContainer);

  const app = new Application();
  await app.init({
    backgroundAlpha: 0,
    width: REEL_WIDTH + 40,
    height: REEL_HEIGHT + 40,
  });
  container.appendChild(app.canvas);

  await Assets.load([
    frameImg,
    divider,
  ]);

  setGradient(app);
  setFrame(app);

  const reels = await createReels(app);

  await setDividers(app, reels);

  const spinButton = SpinButton(() => startSpin(app, reels));
  container.appendChild(spinButton);
};
