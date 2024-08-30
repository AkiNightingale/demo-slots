import { Application } from 'pixi.js';
import { createReels } from '@/entities/reel/ui/reel-view';
import { startSpin } from '@/features/spin-reels/model/spin';
import { SpinButton } from '@/features/spin-reels/ui/spin-button';
import {GRID_HEIGHT, GRID_WIDTH, REEL_WIDTH, SYMBOL_SIZE} from "@/shared/services/global-constants";

export const SlotsPage = async (container: HTMLElement) => {
    const app = new Application();
    await app.init({
        background: 'white',
        width: REEL_WIDTH * GRID_WIDTH,
        height: SYMBOL_SIZE * GRID_HEIGHT,
    });
    container.appendChild(app.canvas);

    const reels = await createReels(app);

    const spinButton = SpinButton(() => startSpin(app, reels));
    container.appendChild(spinButton);
};
