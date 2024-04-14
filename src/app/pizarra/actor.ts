export class Actor {
    id: number;
    x: number;
    y: number;
    ancho: number;
    alto: number;
    color_relleno: string;
    color_borde: string;
    arrastrando: boolean;
    conexion: any[];
    tipo: number;
    name:string='actor'
    numero_c:number=24

    constructor(id:number) {
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.ancho =25;
        this.alto = 0;
        this.color_borde = '#ED3A23';
        this.color_relleno = '#ED3A23';
        this.arrastrando = false;
        this.conexion = [];
        this.tipo = 1;
    }

    drawActor(x: number, y: number): void {
        const canvas = document.getElementById('actorCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 3 * Math.PI);
            this.x = x;
            this.y = y;
            ctx.fillStyle = this.color_relleno;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.color_borde;
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(x, y + 12);
            ctx.lineTo(x, y + 35);
            ctx.strokeStyle = this.color_borde;
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(x - 10, y + 20);
            ctx.lineTo(x + 10, y + 20);
            ctx.strokeStyle = this.color_borde;
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(x, y + 35);
            ctx.lineTo(x - 10, y + 50);
            ctx.moveTo(x, y + 35);
            ctx.lineTo(x + 10, y + 50);
            ctx.fillStyle = this.color_borde;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.color_borde;
            ctx.stroke();
            ctx.closePath();

            ctx.font = "10px Arial";
            ctx.fillStyle = '#ffffff';
            ctx.fillText("texto", x - 10, y + 65);

            ctx.beginPath();
            for (let i = 0; i < this.numero_c; i++) {
                const yCoord = y + 65 + i * 12;
                ctx.moveTo(x, yCoord + 5);
                ctx.lineTo(x, yCoord + 10);
                this.alto = (yCoord + 10) - this.y+i;
            }
            ctx.strokeStyle = '#ED3A23';
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
