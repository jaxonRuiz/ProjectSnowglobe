interface State {
	color: Color;
	globe: GlobeGlass;
	base: GlobeBase;
	ctx: CanvasCtx;
}

interface CanvasCtx {
  content: Command[];
  undoBuffer: Command[];
  notify: () => void;
  display: (ctx: CanvasRenderingContext2D) => void;
  add: (command: Command) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
}

interface Command {
  display: (ctx: CanvasRenderingContext2D) => void;
}

interface Point {
  x: number;
  y: number;
}

interface Color {
	hex: string;
}

interface GlobeGlass {
	color: Color;
	// transparency: number;
	// shape: string;
}

interface GlobeBase {
	color: Color;
	// design: number;
}
