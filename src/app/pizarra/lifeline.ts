export class LifeLine {
    id:number;
    x: number;
    y: number;
    ancho: number;
    alto: number;
    color: string='#202F3E';
    arrastrando: boolean;
    texto: string;
    texto_color='#f4f7fb';
    //texto_color='#202F3E';
     tipo: number;
    name:string='lifeline'
    numero_c:number=24


    constructor(id:number) {
        this.id=id
        this.x = 0;
        this.y = 0;
        this.ancho =130;
        this.alto = 0;
       // this.color = '#ED3A23';
        
        this.arrastrando = false;
        this.texto = `Objet ${this.id}`;
        this.tipo = 2;
    }

    drawActor(x: number, y: number): void {
        const canvas = document.getElementById('actorCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        //console.log('porque no dibuja')
        if (ctx) {
            ctx.beginPath();
            ctx.rect(x, y,this.ancho,70);
            this.x = x; this.y = y;
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.color;
            ctx.stroke();
            ctx.closePath();





            ctx.beginPath();
            ctx.font = "15px Arial";
            ctx.fillStyle = this.texto_color;
            ctx.fillText(this.texto, x + 10, y + 40);
            ctx.closePath();





            for (let i = 0; i < this.numero_c; i++) {
                const yCoord = y + 70 + i * 12;
                ctx.moveTo(x + this.ancho/2, yCoord + 5);
                ctx.lineTo(x + this.ancho/2, yCoord + 10);
                this.alto = (yCoord + 10) - this.y;
            }
            ctx.strokeStyle ='#ED3A23';
            ctx.stroke();
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
