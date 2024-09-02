import './button.scss';
import { startSpin } from '@/features/spin-reels/model/spin';
import { IReel } from '@/shared/services/global-types';
import { Application } from 'pixi.js';

export const SpinButton = (app: Application, reels: IReel[]): HTMLDivElement => {
  const container = document.createElement('div');
  container.className = 'spin-btn__container';

  const button = document.createElement('button');
  button.className = 'spin-btn__container_button';
  button.innerText = 'Spin';
  container.appendChild(button);

  button.addEventListener('click', () => startSpin(app, reels, button));

  return container;
};
