declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.svg' {
    const value: string;
    export default value;
}

declare global {
  interface GlobalThis {
    __PIXI_APP__: any;
  }
}

// (globalThis as any).__PIXI_APP__ = app;
