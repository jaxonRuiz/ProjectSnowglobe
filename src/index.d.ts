interface State {
	pen: {
		color: Color;
		line: Line | null;
	};
	canvas: CanvasCtx;
	// globe: GlobeGlass;
	// base: GlobeBase;
}

interface CanvasCtx {
	ctx: CanvasRenderingContext2D;
  content: Command[];
  undoBuffer: Command[];
  notify: () => void;
  display: () => void;
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

interface Line extends Command {
  points: Point[];
  width: number;
  color: string;
  extend: (point: Point) => void;
}
