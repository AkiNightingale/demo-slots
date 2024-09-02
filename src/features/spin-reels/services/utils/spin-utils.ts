import apple from '@/shared/assets/images/apple.svg';
import banana from '@/shared/assets/images/banana.svg';
import diamond from '@/shared/assets/images/diamond.svg';
import grape from '@/shared/assets/images/grape.svg';
import strawberry from '@/shared/assets/images/strawberry.svg';
import { IReel } from '@/shared/services/global-types';


/** This function creates and manages transitions (tweening) of object properties over time
 * The function records the start time, stores the initial value of the property,
 * and pushes the configuration into the tweening array */
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

/** This function creates a custom easing effect that starts fast and then backs out slowly,
 * useful for creating spring-like dynamics.
 * The amount parameter adjusts the strength of the backing out */
const backout = (amount: number) => {
  return (t: number) => --t * t * ((amount + 1) * t + amount) + 1;
};

export const startPlay = (isRunning: boolean, reels: IReel[], tweening: any[], spinButton: HTMLButtonElement) => {
  /** It iterates through each reel and applies a random additional spin to make the outcome less predictable */
  reels.forEach((reel, i) => {
    const extra = Math.floor(Math.random() * 3);
    const target = reel.position + 10 + i * 5 + extra;
    const time = 2500 + i * 600 + extra * 600;

    tweenTo(
      tweening,
      reel,
      'position',
      target,
      time,
      backout(0.5),
      null,
      i === reels.length - 1 ? () => {
        isRunning = false;
        spinButton.classList.remove('spinning');
        spinButton.textContent = 'Spin';
      } : null,
    );
  });
};

/** Returns a random symbol from the list of imported images */
export const getRandomSymbol = (): string => {
  const symbols = [banana, apple, diamond, strawberry, grape];
  return symbols[Math.floor(Math.random() * symbols.length)];
};

/** Calculates the intermediate value between two numbers */
export const linearInterpolation = (a1: number, a2: number, t: number): number => {
  return a1 * (
    1 - t
  ) + a2 * t;
};
