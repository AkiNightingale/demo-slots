import apple from '@/shared/assets/images/apple.svg';
import banana from '@/shared/assets/images/banana.svg';
import diamond from '@/shared/assets/images/diamond.svg';
import grape from '@/shared/assets/images/grape.svg';
import strawberry from '@/shared/assets/images/strawberry.svg';
import { IReel } from '@/shared/services/global-types';

const tweenTo = (
  tweening: any[],
  object: any,
  property: any,
  target: any,
  time: any,
  easing: any,
  onchange: any,
  oncomplete: any,
) => {
  const tween = {
    object,
    property,
    propertyBeginValue: object[property],
    target,
    easing,
    time,
    change: onchange,
    complete: oncomplete,
    start: Date.now(),
  };

  tweening.push(tween);
  return tween;
};

const backout = (amount: number) => {
  return (t: number) => --t * t * ((amount + 1) * t + amount) + 1;
};

const reelsComplete = (isRunning: boolean) => {
  isRunning = false;
};

export const startPlay = (isRunning: boolean, reels: IReel[], tweening: any[]) => {
  if (isRunning) {
    return;
  } else {
    isRunning = true;
  }

  for (let i = 0; i < reels.length; i++) {
    const r = reels[i];
    const extra = Math.floor(Math.random() * 3);
    const target = r.position + 10 + i * 5 + extra;
    const time = 2500 + i * 600 + extra * 600;

    tweenTo(
      tweening,
      r,
      'position',
      target,
      time,
      backout(0.5),
      null,
      i === reels.length - 1 ? reelsComplete(isRunning) : null,
    );
  }
};

export const getRandomSymbol = (): string => {
  const symbols = [banana, apple, diamond, strawberry, grape];
  return symbols[Math.floor(Math.random() * symbols.length)];
};

export const lerp = (a1: number, a2: number, t: number): number => {
  return a1 * (1 - t) + a2 * t;
};
