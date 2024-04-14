import { Actor } from './actor.js';
import { LifeLine } from './lifeline.js';

const dropZone = document.getElementById("actorCanvas") as HTMLCanvasElement;
const ctx = dropZone.getContext("2d");
let nodes: { actor: Actor | LifeLine }[] = [];
let selectedNode: number | null = null;
let x: number, y: number, t: number, l: number;
let idd = 1;
//const socket = io();

function inicializarElementoArrastrable(elemento: HTMLElement) {
  elemento.addEventListener("dragstart", function (event) {
    event.dataTransfer?.setData("text/plain", elemento.id);
  });

  dropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
  });
}

// Inicializar los elementos arrastrables una vez al cargar la página
const draggableElement1 = document.getElementById("draggableElement");
const draggableElement2 = document.getElementById("draggable2");

if (draggableElement1 && draggableElement2) {
  inicializarElementoArrastrable(draggableElement1);
  inicializarElementoArrastrable(draggableElement2);
}

// Al soltar el elemento
dropZone.addEventListener("drop", function (event) {
  event.preventDefault();
  const data = event.dataTransfer?.getData("text/plain");
  const draggedElement = document.getElementById(data || "");

  if (draggedElement) {
    const canvasRect = dropZone.getBoundingClientRect();
    const x = event.clientX - canvasRect.left;
    const y = event.clientY - canvasRect.top;

    if (draggedElement === draggableElement1) {
      const actor = new Actor();
      actor.drawActor(x, y);
      actor.id = idd;
      nodes.push({ actor });
      console.log(nodes);
    } else if (draggedElement === draggableElement2) {
      const actor = new LifeLine();
      actor.drawActor(x, y);
      actor.texto = 'objeto';
      actor.id = idd;
      nodes.push({ actor });
      console.log(nodes, 'nodos');
    }
  }
});

// Al hacer clic en un elemento
function clicEnElemento(event: MouseEvent): boolean {
  var rect = dropZone.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;
  let bool = false;

  for (let index = 0; index < nodes.length; index++) {
    if (
      mouseX >= nodes[index].actor.x &&
      mouseX <= nodes[index].actor.x + nodes[index].actor.ancho &&
      mouseY >= nodes[index].actor.y &&
      mouseY <= nodes[index].actor.y + nodes[index].actor.alto
    ) {
      selectedNode = index;
      nodes[selectedNode].actor.color = '#FF3C33';
      bool = true;
    }
  }
  return bool;
}

// Al iniciar el arrastre
function iniciarArrastre(event: MouseEvent) {
  if (clicEnElemento(event)) {
    nodes[selectedNode!].actor.arrastrando = true;
    dropZone.style.cursor = 'grabbing';
  }
}

// Al detener el arrastre
function detenerArrastre() {
  if (selectedNode !== null) {
    nodes[selectedNode].actor.arrastrando = false;
    dropZone.style.cursor = 'grab';
  }
}

// Al mover el elemento
function actualizarPosicionElemento(event: MouseEvent) {
  if (selectedNode !== null && nodes[selectedNode].actor.arrastrando) {
    var rect = dropZone.getBoundingClientRect();
    t = nodes[selectedNode].actor.x = event.clientX - rect.left - nodes[selectedNode].actor.ancho / 2;
    l = nodes[selectedNode].actor.y = event.clientY - rect.top - nodes[selectedNode].actor.alto / 2;
    
    ctx?.clearRect(0, 0, dropZone.width, dropZone.height);
    
    for (let index = 0; index < nodes.length; index++) {
      if (index !== selectedNode) {
        x = nodes[index].actor.x;
        y = nodes[index].actor.y;
        nodes[index].actor.drawActor(x, y);
      }
    }
    nodes[selectedNode].actor.drawActor(t, l);
  }
}

// Eventos de clic para iniciar/detener el arrastre y mover el elemento
dropZone.addEventListener('mousedown', iniciarArrastre);
dropZone.addEventListener('mouseup', detenerArrastre);
dropZone.addEventListener('mousemove', actualizarPosicionElemento);
