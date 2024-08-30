import { BlurFilter, Container, Sprite } from 'pixi.js';

export interface IReel {
  container: Container;
  symbols: Sprite[];
  position: number;
  previousPosition: number;
  blur: BlurFilter;
}
