export class Message {
    id: number;
    xi: number;
    xf: number;
    y: number;
    ancho: number;
    alto: number;
    color: string;
    arrastrando: boolean;
    texto: string='';
    tipo: number;
    name: string = 'message'
    message: string = '';
    indices: number[] = []
    tipo_hilo: string = 'sincrono'
    return: boolean = false
    //sincrono , asincrono

    constructor(id: number) {
        this.id = id
        this.xi = 0;
        this.xf = 0;
        this.y = 0;
        this.ancho = 20;
        this.alto = 25;
        this.color = '#ED3A23';
        this.arrastrando = false;
         this.texto = `objet ${this.id}`;
        this.tipo = 2;
    }


    drawActor(xi: number, xf: number, y: number): void {



        if (this.tipo_hilo !== 'return') {

            if (this.tipo_hilo === 'sincrono') {
                console.log('sincrono')
                this.drawActorN(xi, xf, y)
            } else {
                     
                 console.log('imposible')
                this.drawActorA(xi, xf, y)
            }


        } else {
            console.log('imposible x2')
            this.drawactorr(xi, xf, y)

        }



    }






    drawActorN(xi: number, xf: number, y: number): void {
        const canvas = document.getElementById('actorCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        if (ctx) {

            this.xi = xi, this.xf = xf, this.y = y, this.ancho = xf
            if (xi === xf) {
                this.drawrecursivo()
            } else {

                ctx.beginPath();
                ctx.moveTo(this.xi, this.y);
                ctx.lineTo(this.xf, this.y);
                ctx.lineWidth = 1;

                ctx.stroke();
                ctx.closePath();

                if (xf > xi) {
                    ctx.beginPath();
                    ctx.moveTo(this.xf, this.y);  //60 50
                    ctx.lineTo(this.xf + 15, this.y);   //90  50
                    ctx.fillStyle = "black";
                    ctx.lineTo(this.xf, this.y);    //60  40
                    for (let i = 1; i < 20; i++) {
                        ctx.moveTo(this.xf + 15, this.y);
                        ctx.lineTo(this.xf, this.y - 10 + i);
                    }
                    ctx.font = "13px Arial";
                    ctx.fillStyle = 'white';
                    ctx.fillText(this.texto, (this.xi + this.xf) / 2 - 20, this.y - 2);
                } else {
                    ctx.beginPath();
                    ctx.moveTo(this.xf, this.y);  //60 50
                    ctx.lineTo(this.xf + 15, this.y + 6);   //90  50
                    for (let i = 1; i < 20; i++) { //la i es para el relleno
                        ctx.moveTo(this.xf, this.y);
                        ctx.lineTo(this.xf + 15, this.y - 10 + i);
                    }
                    ctx.font = "13px Arial";
                    ctx.fillStyle = 'white';
                    ctx.fillText(this.texto, (this.xf + this.xi) / 2 - 40, this.y - 2);
                }
                ctx.stroke();
                ctx.closePath();
            }
        } else {
            console.error("Contexto de lienzo no disponible.");
        }
    }




    drawActorA(xi: number, xf: number, y: number): void {
        const canvas = document.getElementById('actorCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const tamaño_fuente = 12

        if (xf > xi) {
            this.xf = xf + 15
            this.ancho = xf - xi
        } else {
            this.xf = xf
            this.ancho = xi - xf
        }
        this.xi = xi,
            this.y = y


        if (ctx) {
            if (xi === xf) {
                this.drawrecursivo()


            } else {
                ctx.beginPath();
                ctx.moveTo(this.xi, this.y);
                ctx.lineTo(this.xf, this.y);
                ctx.lineWidth = 1;
                //ctx.strokeStyle = "red";
                ctx.stroke();
                ctx.closePath();
           
            if (xf > xi) {


                ctx.beginPath();
                ctx.moveTo(this.xf, this.y);  //60 50
                ctx.lineTo(this.xf - 15, this.y + 5);   //90  50
                ctx.moveTo(this.xf, this.y);
                ctx.lineTo(this.xf - 15, this.y - 5);   //90  50
                ctx.font = "13px Arial";
                ctx.fillStyle = 'white';
                ctx.fillText(this.texto, (this.xi + this.xf) / 2 - 30, this.y - 2);

            }




            else {
                ctx.beginPath();
                ctx.moveTo(this.xf, this.y);  //60 50
                ctx.lineTo(this.xf + 15, this.y - 5);   //90  50
                ctx.moveTo(this.xf, this.y);  //60 50
                ctx.lineTo(this.xf + 15, this.y + 5);

                ctx.font = "13px Arial";
                ctx.fillStyle = 'white';
                ctx.fillText(this.texto, (this.xi + this.xf) / 2 - 20, this.y - 2);
            }

            ctx.fillStyle = "black";
            ctx.stroke();
            ctx.closePath();
        }


        

        }





    }




    drawactorr(xi: number, xf: number, y: number) {

        const canvas = document.getElementById('actorCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const tamaño_fuente = 12

        if (xf > xi) {
            this.xf = xf + 15
            this.ancho = xf - xi
        } else {
            this.xf = xf
            this.ancho = xi - xf
        }
        this.xi = xi,
            this.y = y


        if (ctx) {


            var distanciaMiniLineas = 12;



            if (xf > xi) {
                // Dibuja las mini líneas horizontales
                for (var x = this.xi; x <= this.xf; x += distanciaMiniLineas) {
                    ctx.beginPath();
                    ctx.moveTo(x, this.y);
                    ctx.lineTo(x + 5, this.y); // Dibuja una mini línea de longitud 1
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
                //ctx.strokeStyle = "red";
                ctx.closePath();

                ctx.beginPath();
                ctx.moveTo(this.xf, this.y);  //60 50
                ctx.lineTo(this.xf - 15, this.y + 5);   //90  50
                ctx.moveTo(this.xf, this.y);
                ctx.lineTo(this.xf - 15, this.y - 5);   //90  50
                ctx.font = "13px Arial";
                ctx.fillStyle = 'white';
                ctx.fillText(this.texto, (this.xi + this.xf) / 2 - 30, this.y - 2);

            }

            else {

                for (var x = this.xf; x <= this.xi; x += distanciaMiniLineas) {
                    ctx.beginPath();
                    ctx.moveTo(x, this.y);
                    ctx.lineTo(x + 5, this.y); // Dibuja una mini línea de longitud 1
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }




                ctx.beginPath();
                ctx.moveTo(this.xf, this.y);  //60 50
                ctx.lineTo(this.xf + 15, this.y - 5);   //90  50
                ctx.moveTo(this.xf, this.y);  //60 50
                ctx.lineTo(this.xf + 15, this.y + 5);

                ctx.font = "13px Arial";
                ctx.fillStyle = 'white';
                ctx.fillText(this.texto, (this.xi + this.xf) / 2 - 20, this.y - 2);
            }

            ctx.fillStyle = "black";
            ctx.stroke();
            ctx.closePath();

        }






    }



    drawrecursivo() {
        const canvas = document.getElementById('actorCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d')!;
        ctx.beginPath();
        ctx.moveTo(this.xi, this.y);
        ctx.lineTo(this.xi + 30, this.y);
        ctx.lineTo(this.xi + 30, this.y + 20);
        ctx.lineTo(this.xi, this.y + 20);
        ctx.closePath(); // Cierra el camino para formar un polígono
        ctx.lineWidth = 1;
        ctx.stroke();
          console.log('entro')
        //flecha 
        if(this.tipo_hilo=="asincrono"){

        ctx.moveTo(this.xf, this.y+20);
        ctx.lineTo(this.xf+10, this.y+15);
        ctx.moveTo(this.xf, this.y+20);
        ctx.lineTo(this.xf+10, this.y+25);
        ctx.fillStyle = "black";
        ctx.stroke();


        }
        if(this.tipo_hilo=="sincrono"){
            ctx.moveTo(this.xf, this.y+20);
            ctx.lineTo(this.xf+10, this.y+15);
            ctx.moveTo(this.xf, this.y+20);
            ctx.lineTo(this.xf+10, this.y+25);

             for (let i = 1; i < 20; i++) { //la i es para el relleno
                ctx.moveTo(this.xf, this.y+20);
                ctx.lineTo(this.xf + 15, this.y + 10 + i);
            } 
            
            ctx.stroke();
 


        }
       
                                                       // Cierra el camino

        // Texto de la flecha
        ctx.font = "13px Arial";
        //ctx.fillStyle = 'white';
        ctx.fillText(this.texto, (this.xi + this.xf) / 2 - 20, this.y + 30 - 2); // Alinea el texto centrado en la flecha


    }








    clearActor(): void {
        const canvas = document.getElementById('actorCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.clearRect(this.xi, this.y, this.ancho, this.ancho);
        } else {
            console.error("Contexto de lienzo no disponible.");
        }
    }

}
