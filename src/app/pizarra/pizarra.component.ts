import {  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild, } from '@angular/core';
import { Actor } from './actor';
import { LifeLine } from './lifeline';
import { Message } from './message';
import { Fragmento } from './fragment';
import { ProyectService } from '../services/proyects.service';
import { Proyecto } from '../proyects/proyecto';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
//import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SocketWebService } from '../services/socket-web.service';
import { EMPTY, Subscription } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninService } from '../services/auth/signin.service';

@Component({
  selector: 'app-pizarra',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './pizarra.component.html',
  styleUrl: './pizarra.component.css',
  
})
export class PizarraComponent {
  @ViewChild('movableDiv', { static: true }) movableDiv!: ElementRef;
  @ViewChild('movableDiv2', { static: true }) movableDiv2!: ElementRef;
  @ViewChild('movableDiv3', { static: true }) movableDiv3!: ElementRef;
  @ViewChild('movableDiv4', { static: true }) movableDiv4!: ElementRef;

  @ViewChild('canvasElement', { static: true }) canvasElement!: ElementRef<HTMLCanvasElement>;
  private isMouseDown: boolean = false; // Variable para indicar si se ha presionado el botón del ratón
  private offsetX: number = 0; // Variable para almacenar el desplazamiento horizontal entre el ratón y el div
  private offsetY: number = 0; // Variable para almacenar el desplazamiento vertical entre el ratón y el div


  private isDragging: boolean = false; // Variable para indicar si se está arrastrando el elemento en el canvas
  private offsetcX: number = 0;
  private offsetcY: number = 0;
  private dragElementPosition = { x: 0, y: 0 };  // Posición inicial del elemento en el canvas
  private idd = 0;  ///i que aumentara de acuerdo a la cantidad de dibujos en el canvas 
  private selectedN: any = null;
  private nodes: any[] = []; // nodos para los dibujos
  private ymaster = 30  //una ves puesto el primer elemento , todos los elementos van a esa altura 
  private divclick = 0

  private flechita = false;   //cuando quiero dibujar una flecha
  private flechita2 = false;
  private flechaI1 = 0;
  private flecheI2 = 0;

  private connectionSub: Subscription = EMPTY.subscribe();

   private numerocg=24
   private proyecto!:Proyecto
   private sala!:any
   usuarios!:any[]
  private idproyect!:string




  //oculto
  mostrarDiv: boolean = false;
  contenedor:boolean=true;
  mostrarform1:boolean=true
  mostrarform2:boolean=false
  mostrarlink:boolean=false
 link!:string
 botonVisible:boolean=false
 dueño!:string
  //para cambiar el texto de los elementos
  textoelementos=null
  miFormulario = new FormGroup({
    texto: new FormControl(''),
    opcion: new FormControl('')
    // otros campos...
  });



  constructor(private elRef: ElementRef,private proyectoservice:ProyectService,private route: ActivatedRoute,private cookieservice:CookieService,private socketService:SocketWebService,private ruta:Router,private siginservice:SigninService) { }
  
   
  ngOnInit():void{
    const protocol = window.location.protocol;
    const host = window.location.host;
    const route = this.ruta.url;
   console.log(`${protocol}//${host}${route}`)
   console.log()
    this.connectionSub = this.socketService.onConnectionChange.subscribe(
        
      (status) => {
        console.log(status)
        //this.serverStatus = status;
      }
    );

      this.socketService.getusuarios().subscribe({

        next:(res)=>{
          console.log(res,'usuers')
          this.usuarios=res
        }
      })

  
     this.sala= this.route.snapshot.paramMap.get('sala')
     this.cookieservice.set('sala',this.sala)
     this.sala =`/${this.sala}`    
     this.link=this.sala
     console.log(`/${this.sala},'dsdsads`)
   
     let a=localStorage.getItem('proyectouid')
      console.log('devuelve el pinche code  o nda',a)
      let b=this.siginservice.userid
      //console.log('los id',a, ' pr',b ) 
                 if(a===b){
                this.botonVisible=true
                console.log('llega al invicible')
               }
     console.log(this.idproyect ,'llega o nel ')
     //let b=localStorage.getItem('proyectouid')     
     //let a=this.siginservice.userid
     //console.log('los id',a, ' pr',b ) 
     
     let idp=localStorage.getItem('proyecto_id')


     let node:any
     //console.log(idproyecto,'este es ')
     console.log(idp, 'no te creo')
    if(idp){
    console.log('prueba')
        this.proyectoservice.findById(idp).subscribe(
           res=>{
             idp=null
            console.log(res.data,'prueba 2')
            //console.log(res,'me devuelve o nel')
            if(res.data){

              console.log(res.userid,'el dueño')
              
              this.proyecto=res
             
              console.log(this.proyecto.data,'respiue')
              //console.log(this.proyecto.data,'osea esta vacio')
              let  nodosprueba:any[]=[]
              const jsonObject = JSON.parse(this.proyecto.data!);
              //console.log(jsonObject,'hola ')
              Object.keys(jsonObject).forEach(key => {
                // Inserta el valor correspondiente en el array nodes
                nodosprueba.push(jsonObject[key]);
              });   
             // console.log(this.nodes,'aver recupera o nel')
              const canvas = this.canvasElement.nativeElement;
             const ctx = canvas.getContext('2d');
             const rect = canvas.getBoundingClientRect();
             ctx!.clearRect(0, 0, canvas.width, canvas.height);
              console.log(nodosprueba,'llega  a nodos peruba') 
             if(nodosprueba.length>0){
                   console.log('encerio llego aca')
                this.processNodes(nodosprueba)
            }
           
               
             }else{
              console.log('ni llega? asdsd')
              this.socketService.onDiagramUpdate().subscribe({
                next: (data) => {
                  console.log('llegoooooooo')
                  //console.log('Diagram update received number 1', data.payload.content);
                  this.idproyect=data.payload.diagramId
                  console.log('Diagram id',this.idproyect) 
                  let  nodosprueba:any[]=[]
                  nodosprueba=data.payload.content
                  
                  const canvas = this.canvasElement.nativeElement;
                 const ctx = canvas.getContext('2d');
                 const rect = canvas.getBoundingClientRect();
                 ctx!.clearRect(0, 0, canvas.width, canvas.height);
                  //console.log(nodosprueba) 
                 if(nodosprueba.length>0){
                  this.nodes=[]
                  this.idd=0
                  this.processNodes(nodosprueba)
                 }
                   // this.loadDiagramState(data.content);
                },
                error: (error) =>
                 console.log('fallor')
                  // console.error('Failed to receive diagram updates:', error),
               });



             }
           }  
      )





   }
   
    console.log('ni llega?')
              this.socketService.onDiagramUpdate().subscribe({
                next: (data) => {
                  //console.log('Diagram update received', data.payload.content[0]);
                  let  nodosprueba:any[]=[]
                  this.nodes=[]
                  this.idd=0
                  this.idproyect=data.payload.diagramId
                  nodosprueba=data.payload.content
                  // const jsonObject = JSON.parse(data);
                  //console.log(jsonObject,'hola ')
                   
                 // console.log(this.nodes,'aver recupera o nel')
                  const canvas = this.canvasElement.nativeElement;
                 const ctx = canvas.getContext('2d');
                 const rect = canvas.getBoundingClientRect();
                 ctx!.clearRect(0, 0, canvas.width, canvas.height);
                  //console.log(nodosprueba) 
                 if(nodosprueba.length>0){
                  this.processNodes(nodosprueba)
                 }
                   // this.loadDiagramState(data.content);
                },
                error: (error) =>
                  console.log('dio errrore',error),
                  //console.error('Failed to receive diagram updates:', error),
               });


   
   
   

    
  }
  // sendUpdate(content: any): void {
  //   const data = { diagramId: this.currentDiagram?.id!, content: content };
  //   this.socketService.updateDiagram(data);
  // }



   





   guardar(){
    const id=localStorage.getItem('proyecto_id')
     if(id){
      this.proyectoservice.save(this.nodes,id).subscribe()
     }
    
      

    //console.log('positivo entra al save')
   

   }








    processNodes(nodosprueba: any[]): void {
    let array: number[] = [];
    // console.log('ale')
    for (let index = 0; index < nodosprueba.length; index++) {
      const x1 = nodosprueba[index].componente.x;
      const y2 = nodosprueba[index].componente.y;
  
      if (nodosprueba[index].componente.name === 'message') {
        const componente = new Message(nodosprueba[index].componente.id);
        let xf = nodosprueba[index].componente.xf;
        componente.texto=nodosprueba[index].componente.texto
        componente.tipo_hilo=nodosprueba[index].componente.tipo_hilo 
        const xi = nodosprueba[index].componente.xi;
        if (xf > xi) { xf = xf - 15; }
        componente.drawActor(xi, xf, y2);
        componente.indices.push(nodosprueba[index].componente.indices[0]);
        componente.indices.push(nodosprueba[index].componente.indices[1]);

        this.nodes.push({ componente });
        this.idd++;
      }
  
      if (nodosprueba[index].componente.name === 'fragment') {
        const componente = new Fragmento(nodosprueba[index].componente.id);
        componente.texto=nodosprueba[index].componente.texto
        componente.drawActor(x1, y2);
  
        this.nodes.push({ componente });
        this.idd++;
      }
  
      if (nodosprueba[index].componente.name === 'lifeline') {
        const componente = new LifeLine(nodosprueba[index].componente.id);
        this.numerocg = nodosprueba[index].componente.numero_c;
        componente.numero_c = this.numerocg;
        componente.texto=nodosprueba[index].componente.texto
        componente.drawActor(x1, y2);
  
        this.nodes.push({ componente });
        this.idd++;
      }
  
      if (nodosprueba[index].componente.name === 'actor') {
        const componente = new Actor(nodosprueba[index].componente.id);
        componente.numero_c = this.numerocg;
        componente.texto=nodosprueba[index].componente.texto
        componente.drawActor(x1, y2);
  
        this.nodes.push({ componente });
        this.idd++;
      }
    }
  }
  






  toggleDiv() {
    this.mostrarDiv = !this.mostrarDiv;
    this.contenedor = !this.contenedor;
    if(this.selectedN!==null){
      if(this.nodes[this.selectedN].componente.name==='message'){
      
        console.log(this.nodes[this.selectedN].componente.name,'componente')

         this.mostrarform2=true
         this.mostrarform1=false

      }else{

        this.mostrarform2=false
        this.mostrarform1=true

      }
    } 
    


  }

   onSubmit(){
     
     if(this.selectedN!==null){ 
      
      
      this.mostrarDiv = !this.mostrarDiv;
      //const t=this.nodes
      //this.nodes=[]
      //this.idd=0
      //this.processNodes(t)
      if(this.nodes[this.selectedN].componente.name==='message'){
         
         if(this.miFormulario.value.texto!=="" && this.miFormulario.value.opcion!=="" ){
          
          console.log(this.miFormulario.value,'form vacio') 
          this.nodes[this.selectedN].componente.texto=this.miFormulario.value.texto
          console.log(this.miFormulario.value.opcion,'dads')
          this.nodes[this.selectedN].componente.tipo_hilo=this.miFormulario.value.opcion
          console.log(this.nodes[this.selectedN].componente,'esta es la flecha actualizada')

         }
      }

      else{
        //if(this.miFormulario.value.texto!=="" && this.miFormulario.value.opcion!=="" ){
           // this.nodes[this.selectedN].component.name=this.miFormulario.value.texto
          //  this.nodes[this.selectedN].component.tipo_hilo=this.miFormulario.value.texto

        //}   
        this.nodes[this.selectedN].componente.texto=this.miFormulario.value.texto

      }


        this.redibujar()

      console.log(this.miFormulario.value.texto,'aver')
     // this.sendUpdate(this.nodes)
     
     // this.nodes[this.selectedN].componente.text='dasd'

    }else{
    this.mostrarDiv = !this.mostrarDiv;
    this.mostrarform2=false
    this.mostrarform1=true

    }
     
    

   }


    compartir(){


      this.mostrarlink=!this.mostrarlink
    }













  // Función que se activa cuando se hace clic en el div
  onMouseDown(event: MouseEvent) {
    this.isMouseDown = true;  // Se establece la variable de control a verdadero
    const divElement = this.movableDiv.nativeElement as HTMLElement; // Se obtiene una referencia al div
    const divElement2 = this.movableDiv2.nativeElement as HTMLElement; // Se obtiene una referencia al div
    const divElement3 = this.movableDiv3.nativeElement as HTMLElement;
    const divElement4 = this.movableDiv4.nativeElement as HTMLElement;
    const targetElement = event.target as HTMLElement;

    // Verificamos si el elemento objetivo es uno de los divs que nos interesa
    if (targetElement === this.movableDiv.nativeElement) { // Si se hace clic en el primer div
      this.divclick = 1
      this.offsetX = event.clientX - divElement.offsetLeft;
      this.offsetY = event.clientY - divElement.offsetTop;
      this.flechita = false;divElement3.style.backgroundColor = '#ffffff';
    } 
    
    
    if (targetElement === this.movableDiv2.nativeElement) {// Si se hace clic en el segundo div
      this.divclick = 2
      this.offsetX = event.clientX - divElement.offsetLeft;
      this.offsetY = event.clientY - divElement.offsetTop;
      this.flechita = false; divElement3.style.backgroundColor = '#ffffff';

     // console.log(divElement2.offsetLeft, divElement2.offsetTop, 'direccion del div')

    }

    if (targetElement === this.movableDiv4.nativeElement) {// Si se hace clic en el segundo div
      this.divclick = 4
      this.offsetX = event.clientX - divElement.offsetLeft;
      this.offsetY = event.clientY - divElement.offsetTop;
      this.flechita = false; divElement3.style.backgroundColor = '#ffffff';
      //console.log(divElement2.offsetLeft, divElement4.offsetTop, 'direccion del div')

    }

    if (targetElement === this.movableDiv3.nativeElement) {
      this.divclick = 3
      this.offsetX = event.clientX - divElement.offsetLeft;
      this.offsetY = event.clientY - divElement.offsetTop;
      divElement3.style.backgroundColor = '#FEF2DD';
      this.flechita = true;
      //.log(divElement2.offsetLeft, divElement2.offsetTop, 'direccion del div 3')

    }

  }


  //funcion cuando se suelta el raton
  onMouseUp(event: MouseEvent) {
    if (this.isMouseDown) {
      const canvas = this.canvasElement.nativeElement;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect(); // Obtener el rectángulo del canvas
      let x = event.clientX - rect.left;
      //const y = event.clientY -  rect.top;
      if (event.clientX - rect.left < 30) {
        x = 30
      }


      if (this.divclick === 1) {
        const divElement = this.movableDiv.nativeElement as HTMLElement;   //volver el div a a su lugar 
        divElement.style.left = (0) + 'px';                              //volver el mouse a su lugar 
        divElement.style.top = (0) + 'px';                               //volver el mouse a su lugar 
        const componente = new LifeLine(this.idd);
         componente.numero_c=this.numerocg 
        componente.drawActor(x, this.ymaster)
        //console.log(this.nodes,'noditos a guarda')
        this.nodes.push({ componente })
        this.idd = this.idd + 1;
      } if (this.divclick == 2) {
        const divElement = this.movableDiv2.nativeElement as HTMLElement;   //volver el div a a su lugar 
        divElement.style.left = (0) + 'px';                              //volver el mouse a su lugar 
        divElement.style.top = (0) + 'px';

        const componente = new Actor(this.idd);
        componente.numero_c=this.numerocg 
        componente.drawActor(x, this.ymaster + 10)
        this.nodes.push({ componente })
        this.idd = this.idd + 1; //volver el mouse a su lugar 

      }

      if (this.divclick == 4) {
        const divElement = this.movableDiv4.nativeElement as HTMLElement;   //volver el div a a su lugar 
        divElement.style.left = (0) + 'px';                              //volver el mouse a su lugar 
        divElement.style.top = (0) + 'px';

        const componente = new Fragmento(this.idd);

        componente.drawActor(x, this.ymaster + 10)
        this.nodes.push({ componente })
        this.idd = this.idd + 1; //volver el mouse a su lugar 

      }

     

      // if(this.divclick==3){
      //   const divElement = this.movableDiv3.nativeElement as HTMLElement;   //volver el div a a su lugar 
      //   divElement.style.left = (0) + 'px';                              //volver el mouse a su lugar 
      //   divElement.style.top = (0) + 'px';  
      //     //  const componente = new Message(this.idd);         
      //    

      //   console.log('odkansdsandjkasndjs')
      // }
      this.isMouseDown = false;                                          //poner el mouse en movimientto=false
    }
  }






  // Función que se activa cuando se mueve el ratón
  onMouseMove(event: MouseEvent) {
    if (this.isMouseDown) { // Si se mantiene presionado el botón del ratón

      if (this.divclick === 1) {
        const divElement = this.movableDiv.nativeElement as HTMLElement;// Se obtiene una referencia al div
        divElement.style.left = (event.clientX - this.offsetX) + 'px';  // Se actualiza la posición del div según el movimiento del ratón
        divElement.style.top = (event.clientY - this.offsetY) + 'px';

      }


      if (this.divclick === 2) {
        const divElement = this.movableDiv2.nativeElement as HTMLElement;// Se obtiene una referencia al div
        // Se actualiza la posición del div según el movimiento del ratón
        divElement.style.left = (event.clientX - this.offsetX) + 'px';
        divElement.style.top = (event.clientY - this.offsetY) + 'px';

      }

     


    }
  }




  // Función que se activa cuando se hace clic en el canvas
  onCanvasMouseDown(event: MouseEvent) {
    const canvas = this.canvasElement.nativeElement;
    const rect = canvas.getBoundingClientRect(); // Obtener el rectángulo del canvas
    //this.isDragging = true; // Establecer la variable de arrastre a verdadero

    this.offsetcX = event.clientX - rect.left; // Calcular el desplazamiento horizontal inicial del elemento en el canvas
    this.offsetcY = event.clientY - rect.top; // Calcular el desplazamiento vertical inicial del elemento en el canvas
    this.dragElementPosition = { x: this.offsetX, y: this.offsetY }; // Guardar la posición inicial del elemento en el canvas    

    for (let index = 0; index < this.nodes.length; index++) {


      if (this.nodes[index].componente.name!='fragment' && this.offsetcX <= (this.nodes[index].componente.x + this.nodes[index].componente.ancho) &&
        this.offsetcX >= this.nodes[index].componente.x && this.offsetcY >= this.nodes[index].componente.y && this.offsetcY <= this.nodes[index].componente.alto+30

      ) {
        //this.flechita2=true; 
        this.selectedN = index;
        this.nodes[this.selectedN].componente.arrastrando = true
       // console.log('adkdk')
      }








        let xf=this.nodes[index].componente.x
        let yf=this.nodes[index].componente.y 
        let anchof=this.nodes[index].componente.ancho
        let altof=this.nodes[index].componente.alto

        if(this.nodes[index].componente.name==='fragment' 
        && (this.offsetcX <= (xf + anchof) &&
        this.offsetcX >= xf && this.offsetcY >= yf-15 && this.offsetcY <= yf+15  ||

        (this.offsetcX <= (xf + 15 ) &&
        this.offsetcX >= xf-15 && this.offsetcY >= yf && this.offsetcY <=  yf+altof)  ||  
       


        (this.offsetcX <= (xf + anchof) &&
        this.offsetcX >= xf && this.offsetcY >= yf+altof-15   && this.offsetcY <=yf+ altof+15)  ||
        



        this.offsetcX <= (xf+anchof+15) &&
        this.offsetcX >= xf+anchof-15 && this.offsetcY >= yf && this.offsetcY <=yf+altof

       
        )
      
       ){
          
        this.selectedN = index;
        this.nodes[this.selectedN].componente.arrastrando = true
      // console.log('entro por mensaje')


        }
      
         

       if(this.nodes[index].componente.name==='message'){

       
        if ( (this.offsetcX <= (this.nodes[index].componente.xi + this.nodes[index].componente.ancho) &&
        this.offsetcX >= this.nodes[index].componente.xi && this.offsetcY >= this.nodes[index].componente.y-10
        && this.offsetcY <= this.nodes[index].componente.y+this.nodes[index].componente.alto) ||


        (this.offsetcX >= (this.nodes[index].componente.xf) &&
        this.offsetcX <= this.nodes[index].componente.xi && this.offsetcY >= this.nodes[index].componente.y-10
        && this.offsetcY <= this.nodes[index].componente.y+this.nodes[index].componente.alto)
        
        
        ){
            this.selectedN = index;
            this.nodes[this.selectedN].componente.arrastrando = true
           // console.log('entro por mensaje')
          }

       }
  
  
       


      if (this.flechita === true && this.nodes[index].componente.name!='fragment' && this.offsetcX <= (this.nodes[index].componente.x + this.nodes[index].componente.ancho) &&
        this.offsetcX >= this.nodes[index].componente.x && this.offsetcY >= this.nodes[index].componente.y && this.offsetcY <= this.nodes[index].componente.alto

      ) 
      
      {
        this.flechaI1 = index
        this.flechita2 = true;
      }

    }



  }




  

  // Función que se activa cuando se suelta el clic del ratón en cualquier parte del documento
  onCanvasMouseUp(event: MouseEvent) {
    //if (this.nodes[this.selectedNode]   ) {
    const canvas = this.canvasElement.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left; // Calcular el desplazamiento horizontal inicial del elemento en el canvas
    const y = event.clientY - rect.top;




    if (this.flechita2 === true) {    // cuando voy a dibujar la flecha en el segundo elemento
      for (let index = 0; index < this.nodes.length; index++) {
        if (x <= (this.nodes[index].componente.x + this.nodes[index].componente.ancho) &&
          x >= this.nodes[index].componente.x && y >= this.nodes[index].componente.y && y <= this.nodes[index].componente.alto && this.nodes[index].componente.name!='fragment') {
             this.crearflecha(index)
            
     
        }
      }

    }
       



     if (this.nodes[this.selectedN].componente.name==='message'  ){
          

      //console.log('ale aver pasa o nel')
      const num=this.nodes[this.selectedN].componente.indices[0]

     const alto=this.nodes[num].componente.alto
      const y=this.nodes[num].componente.y

      //console.log(this.nodes[this.selectedN].componente.y,'y',y+alto)
     
     
      if(this.nodes[this.selectedN].componente.y>y+alto){
       //console.log('alejandri ')
        this.redibujarLifeline(y,alto,this.nodes[this.selectedN].componente.indices[0])
        
       }
      
     }

   // Establecer la variable de arrastre a falso cuando se suelta el clic del ratón
    this.nodes[this.selectedN].componente.arrastrando = false

    //}
  }
  


  redibujarLifeline(y:any,alto:any,x:number){
     
     // console.log('llego')

    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
   ctx!.clearRect(0, 0, canvas.width, canvas.height);


      let num=(y+alto)/12
      let entero = Math.floor(num);
      this.numerocg=entero
    for (let index = 0; index < this.nodes.length; index++) {
      //if (index !== x) {
        this.nodes[index].componente.numero_c=entero
        const x1 = this.nodes[index].componente.x;
        const y2 = this.nodes[index].componente.y;
        if (this.nodes[index].componente.name === 'message') { this.redibujarflecha(index) }

        else {
          this.nodes[index].componente.drawActor(x1, y2);
        }

      
    }

  }






  ///move
  // Función que se activa cuando se mueve el ratón sobre el canvas
  onCanvasMouseMove(event: MouseEvent) {

    if (this.nodes[this.selectedN].componente.arrastrando === true && this.flechita2 === false) { // Si se está arrastrando el elemento en el canvas

      const canvas = this.canvasElement.nativeElement;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect(); // Obtener el rectángulo del canva 
      const x = event.clientX - rect.left; // Calcular la nueva posición horizontal del elemento en el canvas
      const y = event.clientY - rect.top; // Calcular la nueva posición vertical del elemento en el canvas
      //limpiar   
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      if (this.nodes[this.selectedN].componente.name != 'message' && this.nodes[this.selectedN].componente.name != 'fragment' ) { this.nodes[this.selectedN].componente.drawActor(x, this.ymaster); }




      if(this.nodes[this.selectedN].componente.name === 'message') {
        let xi = this.nodes[this.nodes[this.selectedN].componente.indices[0]].componente.x + this.nodes[this.nodes[this.selectedN].componente.indices[0]].componente.ancho / 2
        let xf = this.nodes[this.nodes[this.selectedN].componente.indices[1]].componente.x + this.nodes[this.nodes[this.selectedN].componente.indices[1]].componente.ancho / 2 - 15
        let ym = this.nodes[this.selectedN].componente.y
       //  console.log(xi,xf, 'para ver porque no mueve')  
        if(this.nodes[this.nodes[this.selectedN].componente.indices[0]].componente.y+120>y ){                
          this.nodes[this.selectedN].componente.drawActor(xi, xf,120)
        //  console.log('entro o nada')
          
        }else{
            
            this.nodes[this.selectedN].componente.drawActor(xi, xf,y) 
        }
      }
     

     let array:number[]=[]
      for (let index = 0; index < this.nodes.length; index++) {
        if (index !== this.selectedN ) {
          const x1 = this.nodes[index].componente.x;
          const y2 = this.nodes[index].componente.y;
          if (this.nodes[index].componente.name === 'message') { this.redibujarflecha(index) }
          if (this.nodes[index].componente.name === 'fragment'){
      //      console.log('entras al framgment ')
            array.push(index)
          }  
          if(this.nodes[index].componente.name != 'message' && this.nodes[index].componente.name != 'fragment'){
            this.nodes[index].componente.drawActor(x1, y2);
          }
        }
      }
       for(let index = 0; index < array.length; index++){
          const x1 = this.nodes[array[index ]].componente.x;
          const y2 = this.nodes[array[index ]].componente.y; 
         // console.log('entra por dos')
        this.nodes[array[index ]].componente.drawActor(x1, y2)
      } 

      if(this.nodes[this.selectedN].componente.name === 'fragment'){
       //console.log('djsadjasndjsajdnasjndasndjnasjndsja')
        this.nodes[this.selectedN].componente.drawActor(x, y);
       }
      
      

    }

      //console.log(this.nodes,'actualizar') 
      this.sendUpdate(this.nodes)               


  }



  sendUpdate(content: any): void {
    //let a=localStorage.getItem('proyecto_id')
    //console.log('dnasdnsajndjsandjasdjnsajndasndas',a)
     console.log(this.idproyect,'sube el actualizado')
    const data = { diagramId:this.idproyect!, content: content };
   // const data = { diagramId: this.currentDiagram?.id!, content: content };
    //const data = { content: content };
    this.socketService.updateDiagram(data);
  }








    aumentarLineaVida(y:number,select:number){
      /* const canvas = this.canvasElement.nativeElement;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect(); 
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
 */

    }




  crearflecha(index: number) {
    this.flecheI2 = index
    this.flechita = false; this.flechita2 = false

    const componente = new Message(this.idd);
    componente.indices[0] = this.flechaI1; componente.indices[1] = this.flecheI2
    
    let xi = this.nodes[this.flechaI1].componente.x + this.nodes[this.flechaI1].componente.ancho / 2
    let xf = this.nodes[this.flecheI2].componente.x + this.nodes[this.flecheI2].componente.ancho / 2 - 15
    
    if (xi > xf) { xf = xf + 15 }
    
    componente.drawActor(xi, xf, this.offsetcY )
    
    this.nodes.push({ componente })
    
    this.idd = this.idd + 1;

  }




  redibujarflecha(index: number) {

    let xi = this.nodes[this.nodes[index].componente.indices[0]].componente.x + this.nodes[this.nodes[index].componente.indices[0]].componente.ancho / 2
    let xf = this.nodes[this.nodes[index].componente.indices[1]].componente.x + this.nodes[this.nodes[index].componente.indices[1]].componente.ancho / 2 
    if(xi<xf){xf=xf-15}
     //if(x1>x2){}
    let ym = this.nodes[index].componente.y
    //if (xi > xf) { xf = xf + 12 }
    this.nodes[index].componente.drawActor(xi, xf, ym)

  }

  


    redibujar(){

      const canvas = this.canvasElement.nativeElement;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect(); // Obtener el rectángulo del canva 
      //const x = event.clientX - rect.left; // Calcular la nueva posición horizontal del elemento en el canvas
      //const y = event.clientY - rect.top; // Calcular la nueva posición vertical del elemento en el canvas
      //limpiar   
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
     

     let array:number[]=[]
      for (let index = 0; index < this.nodes.length; index++) {
        
          const x1 = this.nodes[index].componente.x;
          const y2 = this.nodes[index].componente.y;
          if (this.nodes[index].componente.name === 'message') { this.redibujarflecha(index) }
          if (this.nodes[index].componente.name === 'fragment'){
      //      console.log('entras al framgment ')
            array.push(index)
          }  
          if(this.nodes[index].componente.name != 'message' && this.nodes[index].componente.name != 'fragment'){
            this.nodes[index].componente.drawActor(x1, y2);
          }
        
      }
       for(let index = 0; index < array.length; index++){
          const x1 = this.nodes[array[index ]].componente.x;
          const y2 = this.nodes[array[index ]].componente.y; 
         // console.log('entra por dos')
        this.nodes[array[index ]].componente.drawActor(x1, y2)
      } 

      
       this.sendUpdate(this.nodes)
    }

      //console.log(this.nodes,'actualizar') 
           

    















}












 
               //console.log(nodosprueba,'paso a mayores o nel')
            //   let array:number[]=[]
            //  // console.log('ale')
            //   for (let index = 0; index < nodosprueba.length; index++) {
            //     const x1 =nodosprueba[index].componente.x;
            //     const y2 =nodosprueba[index].componente.y;
                
            //     if(nodosprueba[index].componente.name === 'message'){
            //       const  componente=new Message(nodosprueba[index].componente.id)
            //       let xf =nodosprueba[index].componente.xf;
          
            //       const xi =nodosprueba[index].componente.xi;   
            //       if(xf>xi){xf=xf-15}   
            //       componente.drawActor(xi,xf,y2)
            //       componente.indices.push(nodosprueba[index].componente.indices[0])
            //       componente.indices.push(nodosprueba[index].componente.indices[1])
            //       this.nodes.push({componente})
            //       this.idd++
            //     }

            //     if(nodosprueba[index].componente.name === 'fragment'){
            //       const  componente=new Fragmento(nodosprueba[index].componente.id)
            //       componente.drawActor(x1,y2);
                   
            //       this.nodes.push({componente})
            //       this.idd++
            //     }

            //     if(nodosprueba[index].componente.name === 'lifeline'){
            //       const  componente=new LifeLine(nodosprueba[index].componente.id)
            //       this.numerocg=nodosprueba[index].componente.numero_c
            //       componente.numero_c=this.numerocg
            //       componente.drawActor(x1,y2)
                  
            //       this.nodes.push({componente})
            //       this.idd++
            //     }

            //     if(nodosprueba[index].componente.name === 'actor'){
            //       const  componente=new Actor(nodosprueba[index].componente.id)
            //       componente.numero_c=this.numerocg
            //       componente.drawActor(x1,y2)
                  
            //       this.nodes.push({componente})
            //       this.idd++
            //     }
    
                
            //   }