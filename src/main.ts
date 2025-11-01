const app: HTMLDivElement = document.querySelector("#app")!;
document.title = "Project Snowglobe";

// event system ////
const observationDock: EventTarget = new EventTarget();
function observe(event: string, detail?: unknown) {
  observationDock.dispatchEvent(new CustomEvent(event, { detail }));
}
// TODO add event listeners

// compartmentalize
const snowglobeCreator: HTMLDivElement = document.createElement("div");
snowglobeCreator.id = "snowglobe-creation";
app.appendChild(snowglobeCreator);

// snowglobe display ////
const displayPanel: HTMLDivElement = document.createElement("div");
snowglobeCreator.appendChild(displayPanel);

const display: HTMLCanvasElement = document.createElement("canvas");
display.id = "snowglobe";
displayPanel.appendChild(display);


// creation controls ////
const creationPanel: HTMLDivElement = document.createElement("div");
snowglobeCreator.appendChild(creationPanel);

const colorPalette: HTMLDivElement = document.createElement("div");
creationPanel.appendChild(colorPalette);
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
  // create color palette
});

const controls: HTMLDivElement = document.createElement("div");
controls.id = "controls";
creationPanel.appendChild(controls);
