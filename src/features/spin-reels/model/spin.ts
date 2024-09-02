import { getRandomSymbol, linearInterpolation, startPlay } from '@/features/spin-reels/services/utils/spin-utils';
import { IReel } from '@/shared/services/global-types';
import { Application, Texture } from 'pixi.js';
import { SYMBOL_SIZE } from '@/shared/services/global-constants';

export const startSpin = async (app: Application, reels: IReel[], spinButton: HTMLButtonElement) => {
  let isRunning = false;
  const tweening: any[] = [];

  if (isRunning) {
    return;
  } else {
    spinButton.classList.add('spinning');
    spinButton.textContent = 'Spinning';

    isRunning = true;
  }

  /** Note: Ticker for Reels Animation */
  app.ticker.add(() => {
    for (const r of reels) {
      /** Note: It adjusts the blur strength based on the difference between the current and previous positions of
       *  the reels to create a motion blur effect */
      r.blur.strengthY = (r.position - r.previousPosition) * 8;
      r.previousPosition = r.position;

      /** Note: It updates the position of each symbol on the reel, wrapping around with the modulus operator.
       *  Symbols that move off the top are repositioned at the bottom with a new random texture */
      for (let i = 0; i < r.symbols.length; i++) {
        const s = r.symbols[i];
        const prevy = s.y;

        s.y = ((r.position + i) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;

        if (s.y < 0 && prevy > 100) {
          s.texture = Texture.from(getRandomSymbol());

          /** Note: Adjusts symbol scaling and centers them horizontally */
          s.scale.set(Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height));
          s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
        }
      }
    }
  });

  /** Note: Ticker for Tweening */
  app.ticker.add(() => {
    const now = Date.now();
    const remove = [];

    /** Manages smooth transitions (tweening) for animated properties over time */
    for (const t of tweening) {
      const phase = Math.min(1, (now - t.start) / t.time,
      );

      /** Uses linearInterpolation to calculate the values over time, easing the transition */
      t.object[t.property] = linearInterpolation(t.propertyBeginValue, t.target, t.easing(phase));
      if (t.change) {
        t.change(t);
      }
      if (phase === 1) {
        t.object[t.property] = t.target;
        if (t.complete) {
          t.complete(t);
        }
        remove.push(t);
      }
    }

    for (const rem of remove) {
      tweening.splice(tweening.indexOf(rem), 1);
    }
  });

  startPlay(isRunning, reels, tweening, spinButton);
};
