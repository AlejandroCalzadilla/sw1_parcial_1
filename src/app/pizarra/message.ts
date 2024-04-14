export class Message {
    id: number;
    xi: number;
    xf:number;
    y: number;
    ancho: number;
    alto: number;
    color: string;
    arrastrando: boolean;
    texto: string;
    tipo: number;
    name:string='message'
    message:string='';


    
    indices:number[]=[]
    tipo_hilo:string='asincrono'
     //sincrono , asincrono

    constructor(id: number) {
        this.id = id
        this.xi = 0;
        this.xf=0;
        this.y = 0;
        this.ancho = 0;
        this.alto = 25;
        this.color = '#ED3A23';
        this.arrastrando = false;
        this.texto = `objet ${this.id}`;
        this.tipo = 2;
    }


    drawActor(xi: number, xf:number,y: number ):void{

         if(this.tipo_hilo==='sincrono'){
            console.log('confirmar dibujo')
            this.drawActorN(xi,xf,y)
         }else{

           // console.log('imposible')
            this.drawActorA(xi,xf,y)
         }


    }






    drawActorN(xi: number, xf:number,y: number ): void {
        const canvas = document.getElementById('actorCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            //const xi=60
            //const y=0
           // const xf=0
          
          this.xi=xi , this.xf=xf,this.y=y , this.ancho=xf
          ctx.beginPath();
          ctx.moveTo(this.xi, this.y);
          ctx.lineTo(this.xf, this.y);
          ctx.lineWidth = 1;
          //ctx.strokeStyle = "red";
          ctx.stroke();
          ctx.closePath();
          
          if(xf>xi){
          ctx.beginPath();
          ctx.moveTo(this.xf, this.y);  //60 50
          ctx.lineTo(this.xf+15,this.y);   //90  50
          ctx.fillStyle = "black";
          ctx.lineTo(this.xf,this.y);    //60  40
              for (let i = 1; i<20  ; i++) { 
                ctx.moveTo(this.xf+15,this.y);
                  ctx.lineTo(this.xf,this.y-10+ i);
                // console.log(xf,'entro poa aquie')

                // ctx.moveTo((this.xi+this.xf)/2 , this.y+48);    
               
            }
            ctx.font = "13px Arial";
            ctx.fillStyle ='white';
            ctx.fillText(this.texto,(this.xi+this.xf)/2-20,this.y-2);
          } else{
              ctx.beginPath();
          ctx.moveTo(this.xf, this.y);  //60 50
          ctx.lineTo(this.xf+15,this.y+6);   //90  50
          //ctx.fillStyle = "black";
          //ctx.lineTo(this.xf,this.y+35);    //60  40
                  for (let i = 1; i <20; i++) { //la i es para el relleno
                   ctx.moveTo(this.xf,this.y);
                     ctx.lineTo(this.xf+15, this.y-10+i);
                   //console.log(xf)
                 } 
                 ctx.font = "13px Arial";
                 ctx.fillStyle ='white';
                 ctx.fillText(this.texto,(this.xf+this.xi)/2-40,this.y-2); 

          }
          
          //ctx.fillStyle = "black";
          ctx.stroke();
          ctx.closePath(); 
            

        } else {
            console.error("Contexto de lienzo no disponible.");
        }
    }




    drawActorA(xi: number,xf:number ,y: number): void {
        const canvas = document.getElementById('actorCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        //const xi=300
         //     const xf=0
        const tamaño_fuente=12
       
        if(xf>xi){  
          this.xf=xf+15
          this.ancho=xf-xi
        } else {
            this.xf=xf
            this.ancho=xi-xf
        }
        this.xi=xi ,
        this.y=y  
        
        
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(this.xi, this.y);
            ctx.lineTo(this.xf, this.y);
            ctx.lineWidth = 1;
            //ctx.strokeStyle = "red";
            ctx.stroke();
            ctx.closePath();
            
            if(xf>xi){


            ctx.beginPath();
            ctx.moveTo(this.xf, this.y);  //60 50
            ctx.lineTo(this.xf-15,this.y+5);   //90  50
            ctx.moveTo(this.xf, this.y);
            ctx.lineTo(this.xf-15,this.y-5);   //90  50
            ctx.font = "13px Arial";
            ctx.fillStyle ='white';
            ctx.fillText(this.texto,(this.xi+this.xf)/2-30,this.y-2);
            
            } 
            
            
            
            
            else{
            ctx.beginPath();
            ctx.moveTo(this.xf, this.y);  //60 50
            ctx.lineTo(this.xf+15,this.y-5);   //90  50
            ctx.moveTo(this.xf, this.y);  //60 50
            ctx.lineTo(this.xf+15,this.y+5);   

            ctx.font = "13px Arial";
            ctx.fillStyle ='white';
            ctx.fillText(this.texto,(this.xi+this.xf)/2-20,this.y-2);              
            }
            
            ctx.fillStyle = "black";
            ctx.stroke();
            ctx.closePath();
      
        }
      
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
