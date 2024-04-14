export class Fragmento {
    id:number;
    x: number;
    y: number;
    ancho: number;
    alto: number;
    color: string;
    arrastrando: boolean;
    texto: string='loop';
    tipo: number;
    name:string='fragment'


    constructor(id:number) {
        this.id=id
        this.x = 0;
        this.y = 0;
        this.ancho =500;
        this.alto = 300;
        this.color = '#ED3A23';
        this.arrastrando = false;
        this.texto = 'loop';
        this.tipo = 2;
    }

    drawActor(x: number,y: number): void {
        const canvas = document.getElementById('actorCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.beginPath();
            this.x = x; this.y = y;
            ctx.moveTo(x, y); 
            ctx.lineTo(this.x+this.ancho,this.y);
            ctx.lineWidth = 1;
            ctx.strokeStyle =this.color;
            ctx.stroke();
            ctx.closePath();
 
            ctx.beginPath();
            ctx.moveTo(this.x,this.y); 
            ctx.lineTo(this.x,this.y+this.alto);
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.color;
            ctx.stroke();
            ctx.closePath();
 


            /// linea 3 del final hacia abajo
            ctx.beginPath();
            ctx.moveTo(this.x+this.ancho, this.y); 
            ctx.lineTo(this.x+this.ancho,this.y+this.alto);
            ctx.lineWidth = 1;
            ctx.strokeStyle =this.color;
            ctx.stroke();
            ctx.closePath();


            //linea 4 del final de la linea 2 hasta el final de la 3 , osea el linea de abajo
            ctx.beginPath();
            ctx.moveTo(this.x,this.y+this.alto); 
            ctx.lineTo(this.x+this.ancho,this.y+this.alto);
            ctx.lineWidth = 1;
            ctx.strokeStyle =this.color;
            ctx.stroke();
            ctx.closePath(); 
                   







            ctx.beginPath();
            ctx.rect(x, y, 30, 25);
            this.x = x; this.y = y;
            ctx.fillStyle ='#202F3E';
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();              




            ctx.beginPath();
            ctx.font = "10px Arial";
            ctx.fillStyle = "white";
            ctx.fillText(this.texto, this.x + 5, this.y + 15);
            ctx.closePath();





            


        } else {
            console.error("Contexto de lienzo no disponible.");
        }
    }

    clearActor(): void {
        const canvas = document.getElementById('actorCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.clearRect(this.x, this.y, this.ancho, this.ancho);
        } else {
            console.error("Contexto de lienzo no disponible.");
        }
    }


    


}
