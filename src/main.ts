const app: HTMLDivElement = document.querySelector("#app")!;
document.title = "Project Snowglobe";

const CANVAS_DISPLAY_SIZE = 256;

// compartmentalize
const snowglobeCreator: HTMLDivElement = document.createElement("div");
snowglobeCreator.id = "snowglobe-creation";
app.appendChild(snowglobeCreator);

// snowglobe display ////
const displayPanel: HTMLDivElement = document.createElement("div");
snowglobeCreator.appendChild(displayPanel);

const display: HTMLCanvasElement = document.createElement("canvas");
display.id = "snowglobe";
display.width = display.height = CANVAS_DISPLAY_SIZE;
displayPanel.appendChild(display);

// event system ////
const observationDock: EventTarget = new EventTarget();
function observe(event: string, detail?: unknown) {
  observationDock.dispatchEvent(new CustomEvent(event, { detail }));
}
observationDock.addEventListener("drawing-changed", () => {
  displayDrawing();
});
observationDock.addEventListener("tool-moved", () => {
  displayDrawing();
});

// set up state ////
let canvasCtx: CanvasCtx = {
  ctx: display.getContext("2d")!,
  content: [],
  undoBuffer: [],
  notify: () => observe("drawing-changed"),
  display: function (): void {
    for (const command of this.content) {
      command.display(this.ctx);
    }
  },
  add: function (command: Command): void {
    this.content.push(command);
    this.undoBuffer = [];
    this.notify();
  },
  undo: function () {
    if (this.content.length === 0) return;
    this.undoBuffer.unshift(this.content.pop()!);
    this.notify();
  },
  redo: function () {
    if (this.undoBuffer.length === 0) return;
    this.content.push(this.undoBuffer.shift()!);
    this.notify();
  },
  clear: function () {
    this.content = [];
    this.undoBuffer = [];
    this.notify();
  },
};

let snowglobe: State = {
  pen: {
    color: { hex: "#000000" },
    line: null,
  },
  canvas: canvasCtx,
};

display.addEventListener("mousedown", (e) => {
  snowglobe.pen.line = newLine(
    { x: e.offsetX, y: e.offsetY },
    snowglobe.pen.color.hex,
    10,
  );
  snowglobe.canvas.content.push(snowglobe.pen.line);
});
display.addEventListener("mousemove", (e) => {
  if (snowglobe.pen.line !== null) {
    snowglobe.pen.line.extend({ x: e.offsetX, y: e.offsetY });
  }
  observe("tool-moved", { x: e.offsetX, y: e.offsetY });
});
display.addEventListener("mouseleave", () => {
  observe("tool-moved", null);
});
document.addEventListener("mouseup", (e) => {
  if (snowglobe.pen.line !== null) {
    snowglobe.pen.line.extend({ x: e.offsetX, y: e.offsetY });
    snowglobe.pen.line = null;
  }
});


// creation controls ////
const creationPanel: HTMLDivElement = document.createElement("div");
snowglobeCreator.appendChild(creationPanel);

const colorPalette: HTMLDivElement = document.createElement("div");
creationPanel.appendChild(colorPalette);
colorPalette.id = 'color-palette';
// mspaint color palette
[
  // first row
  "#000000",
  "#7f7f7f",
  "#880015",
  "#ed1c24",
  "#ff7f27",
  "#fff200",
  "#22b14c",
  "#00a2e8",
  "#3f48cc",
  "#a349a4",
  // second row
  "#ffffff",
  "#c3c3c3",
  "#b97a57",
  "#ffaec9",
  "#ffc90e",
  "#efe4b0",
  "#b5e61d",
  "#99d9ea",
  "#7092be",
  "#c8bfe7",
].forEach((color) => {
  const temp = document.createElement("button");
  temp.style.backgroundColor = color;
  temp.addEventListener('click', () => {
    snowglobe.pen.color.hex = color;
  });

  colorPalette.appendChild(temp);
});

const controls: HTMLDivElement = document.createElement("div");
controls.id = "controls";
creationPanel.appendChild(controls);

export function newLine(start: Point, color: string, width: number): Line {
  return {
    points: [start],
    width,
    color,
    display: function (ctx: CanvasRenderingContext2D): void {
      for (let i = 0; i < this.points.length - 1; ++i) {
        drawLine(this.points[i], this.points[i + 1]);
      }

      function drawLine(start: Point, end: Point) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        ctx.closePath();
      }
    },
    extend: function (point: Point): void {
      this.points.push(point);
    },
  };
}

function displayDrawing() {
  snowglobe.canvas.ctx.clearRect(0, 0, CANVAS_DISPLAY_SIZE, CANVAS_DISPLAY_SIZE);
  snowglobe.canvas.display();
}
displayDrawing();