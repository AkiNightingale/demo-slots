import { getRandomSymbol, lerp, startPlay } from '@/features/spin-reels/services/utils/spin-utils';
import { IReel } from '@/shared/services/global-types';
import { Application, Texture } from 'pixi.js';
import { SYMBOL_SIZE } from '@/shared/services/global-constants';

export const startSpin = async (app: Application, reels: IReel[]) => {
  let isRunning = false;
  const tweening: any[] = [];

  app.ticker.add(() => {
    for (const r of reels) {
      r.blur.strengthY = (r.position - r.previousPosition) * 8;
      r.previousPosition = r.position;

      for (let i = 0; i < r.symbols.length; i++) {
        const s = r.symbols[i];
        const prevy = s.y;

        s.y = ((r.position + i) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;

        if (s.y < 0 && prevy > 100) {
          s.texture = Texture.from(getRandomSymbol());
          s.scale.set(Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height));
          s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
        }
      }
    }
  });

  app.ticker.add(() => {
    const now = Date.now();
    const remove = [];

    for (const t of tweening) {
      const phase = Math.min(1, (now - t.start) / t.time,
      );

      t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
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

  startPlay(isRunning, reels, tweening);
};
