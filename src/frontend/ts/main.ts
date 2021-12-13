
class Main implements EventListenerObject, HandlerHTTP{
    public myFramework: MyFramework;
    public listaDis: Array<Device> = [];
    public active_device: number;
    public main(): void {
        console.log("Se ejecuto el metodo main!!!");
        this.myFramework = new MyFramework();
      
    }
    
    // This function loads devices from esrver into memory
    public loadDevices(){
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    //console.log("Llego la respuesta!!!!");
                    //console.log(xhr.responseText);

                    let parsed_list_Disp = JSON.parse(xhr.responseText);

                    //console.log(this.listaDis); 
                    for (let disp of parsed_list_Disp ){
                        let unDisp = new Device(
                            disp.id,
                            disp.name,
                            disp.description,
                            disp.state,
                            disp.type,
                            disp.level
                        );
                        //console.log(unDisp,disp);
                        this.listaDis.push(unDisp);
                    }
                    this.loadScreen();
                } else {
                    alert("error!!")
                }
            }
        }
        xhr.open("GET","http://localhost:8000/devices",true)
        xhr.send();
        console.log("Ya hice el request!!")
    }

    // This function loads devices to screen
    public loadScreen(){
        let listaDisp = this.myFramework.getElementById("listaDisp");
        let devices_HTML: string;
        devices_HTML = ``;
        for (let disp of this.listaDis ){
            devices_HTML += `<li class="collection-item avatar">
                <img src=${(<Device>disp).UI_image()} alt="" class="circle">
                <span class="nombreDisp">${disp.name}</span>
                <p>${disp.description}</p>`;


            devices_HTML += `
                    <a class="waves-effect waves-light btn-small btn-floating secondary-content">
                        <i class="tiny material-icons" id="avatar_${disp.id}">menu</i>
                    </a>`;

            // I add the sliders only to the required devices
            if (disp.UI_slider()){
                devices_HTML += `
                        <p class="range-field">
                            <input type="range" id="slider_${disp.id}" min="0" max="100" />
                        </p>`;
            }
            // I add the switch only to the required devices
            if (disp.UI_switch()){
                devices_HTML += `
                    <div class="switch">
                        <label >
                            Off
                            <input id="disp_${disp.id}" type="checkbox">
                            <span class="lever"></span>
                            On
                        </label>
                    </div>`;
            }

            devices_HTML += `
                </li>`;  
        }
        listaDisp.innerHTML = devices_HTML;

        //I Initialize event listener for avatars to open Options
        for (let disp of this.listaDis) {
            let avatarDisp = <HTMLElement>this.myFramework.getElementById("avatar_" + disp.id);
            avatarDisp.addEventListener("click", this);
        }

        //I Initialize event listener for sliders
        for (let disp of this.listaDis) {
            if (disp.UI_slider()){
                let sliderDisp = <HTMLInputElement>this.myFramework.getElementById("slider_" + disp.id);
                sliderDisp.value = disp.level.toString();
                sliderDisp.addEventListener("click", this);
            }
        }

        //I Initialize switches
        for (let disp of this.listaDis) {

            //I Initialize switches event listener
            let checkDisp = <HTMLInputElement>this.myFramework.getElementById("disp_" + disp.id);
            checkDisp.addEventListener("click", this);

            //I Initialize switches initial status
            if(disp.state==1){
                checkDisp.checked = true; 
            }
            else{
                checkDisp.checked = false; 
            } 
        }

    }

    public handleEvent(ev: Event) {
        let objetoClick: HTMLElement = <HTMLElement>ev.target;
        //console.log(ev.target)

        // I handle the event of pressing the Switch dor All devices
        if (objetoClick.id == "switch_all") {
            //alert("Se hizo click en switch_all!");
            let checkBox: HTMLInputElement = <HTMLInputElement>ev.target;
            for (let disp of this.listaDis) {
                let checkDisp: HTMLInputElement = <HTMLInputElement>this.myFramework.getElementById("disp_" + disp.id);
                console.log("switch:",checkDisp);
                if (checkBox.checked){
                    disp.level=100;
                    disp.state=1;
                    checkDisp.checked = true;
                    if (disp.UI_slider()){
                        let sliderDisp = <HTMLInputElement>this.myFramework.getElementById("slider_" + disp.id);
                        sliderDisp.value = disp.level.toString();  
                    }
                    let datos = {"level":"100","state":"1"};
                    this.myFramework.requestPOST(`http://localhost:8000/devices/${disp.id}`, this,datos);
                }
                else{
                    disp.level=0;
                    disp.state=0;
                    checkDisp.checked = false;
                    if (disp.UI_slider()){
                        let sliderDisp = <HTMLInputElement>this.myFramework.getElementById("slider_" + disp.id);
                        sliderDisp.value = disp.level.toString();  
                    }
                    let datos = {"level":"0","state":"0"};
                    this.myFramework.requestPOST(`http://localhost:8000/devices/${disp.id}`, this,datos);
                }
            }
        }

        else if (objetoClick.id == "button_add") {
            let newModal: HTMLElement = <HTMLElement>this.myFramework.getElementById("modal_edit");
            this.active_device = -1; //-1 indicates is a new device

            newModal.style.display = "block";
        }

        else if (objetoClick.id == "modal_cancel") {
            let newModal: HTMLElement = <HTMLElement>this.myFramework.getElementById("modal_edit");
            newModal.style.display = "none";

            //I clear prefilled data for next open of the modal
            let device_name: HTMLInputElement = <HTMLInputElement>this.myFramework.getElementById("device_name");
            device_name.value = "";
            let device_description: HTMLInputElement = <HTMLInputElement>this.myFramework.getElementById("device_description");
            device_description.value = "";
            newModal.style.display = "none";
        }

        else if (objetoClick.id == "modal_submit") {
            let newModal: HTMLElement = <HTMLElement>this.myFramework.getElementById("modal_edit");

            //if it is a new device
            if (this.active_device == -1){
                let emptyID:number = 1;
                while (this.listaDis.find(i => i.id ===emptyID)) {
                    emptyID++;
                }                
                let device_name: HTMLInputElement = <HTMLInputElement>this.myFramework.getElementById("device_name");
                let device_description: HTMLInputElement = <HTMLInputElement>this.myFramework.getElementById("device_description");
                let device_type: HTMLInputElement = <HTMLInputElement>this.myFramework.getElementById("device_type");
                if (device_type.value==""){
                    //console.log("default device_type applied");
                    device_type.value = "0"; // If not selected, default will be type 0
                }             
                
                let datos = {"id":emptyID,"name":device_name.value,"description":device_description.value,"state":0,"type":device_type.value,"level":0}
                
                //Send data to server
                this.myFramework.requestPUT(`http://localhost:8000/devices`, this,datos);

                // Adding new device to device array in main class
                let unDisp = new Device(
                    datos.id,
                    datos.name,
                    datos.description,
                    datos.state,
                    +datos.type,
                    datos.level
                    );
                    //console.log(unDisp,disp);
                this.listaDis.push(unDisp);
                            
                this.loadScreen();//I reload screen with new device
    
            }
            else{ //if it is an existing device
                let device_name: HTMLInputElement = <HTMLInputElement>this.myFramework.getElementById("device_name");
                let device_description: HTMLInputElement = <HTMLInputElement>this.myFramework.getElementById("device_description");
                let device_type: HTMLInputElement = <HTMLInputElement>this.myFramework.getElementById("device_type");
                
                if (device_type.value==""){
                    device_type.value = "0"; // If not selected, default will be type 0
                } 
                //I find the device corresponding to edit            
                let disp :Device= this.listaDis.find(i => i.id === this.active_device);

                //I load new values to memory
                disp.name = device_name.value;
                disp.description = device_description.value;
                disp.type = +device_type.value;

                //I find the index of the device corresponding to edit 
                let dispIndex :number= this.listaDis.findIndex(i => i.id === this.active_device);
                
                //I load new values to memory
                this.listaDis[dispIndex].name = device_name.value;
                this.listaDis[dispIndex].description = device_description.value;
                this.listaDis[dispIndex].type = +device_type.value;

                //I reload screen with new device
                this.loadScreen();

                //I send data of updated device to server
                let datos = {"id":this.listaDis[dispIndex].id,
                        "name":this.listaDis[dispIndex].name,
                        "description":this.listaDis[dispIndex].description,
                        "state":this.listaDis[dispIndex].state,
                        "type":this.listaDis[dispIndex].type,
                        "level":this.listaDis[dispIndex].level}
                this.myFramework.requestPOST(`http://localhost:8000/devices`, this,datos);
            }

            //I clear prefilled data for next open of the modal
            let device_name: HTMLInputElement = <HTMLInputElement>this.myFramework.getElementById("device_name");
            device_name.value = "";
            let device_description: HTMLInputElement = <HTMLInputElement>this.myFramework.getElementById("device_description");
            device_description.value = "";
            newModal.style.display = "none";
        }

        //If a device switch was pressed.
        else if (objetoClick.id.includes("disp_")) {         
            let checkBox: HTMLInputElement = <HTMLInputElement>ev.target;
            
            //I find the device corresponding to the switch pressed             
            let disp :Device= this.listaDis.find(i => i.id === get_device_ID(checkBox));
            let datos = {"level":"0","state":"0"};
            if (checkBox.checked){

                disp.level=100;
                disp.state=1;

                if (disp.UI_slider()){
                    let sliderDisp = <HTMLInputElement>this.myFramework.getElementById("slider_" + disp.id);
                    sliderDisp.value = disp.level.toString();  
                }
                let datos = {"level":"100","state":"1"};
                this.myFramework.requestPOST(`http://localhost:8000/devices/${disp.id}`, this,datos);
            }
            else{
                disp.level=0;
                disp.state=0;

                if (disp.UI_slider()){
                    let sliderDisp = <HTMLInputElement>this.myFramework.getElementById("slider_" + disp.id);
                    sliderDisp.value = disp.level.toString();  
                }
                let datos = {"level":"0","state":"0"};
                this.myFramework.requestPOST(`http://localhost:8000/devices/${disp.id}`, this,datos);
            }
            

        }
        //If a device slider was pressed.
        else if (objetoClick.id.includes("slider_")) {
            let checkSlider: HTMLInputElement = <HTMLInputElement>ev.target;

            //I find the device corresponding to the slider pressed             
            let disp :Device= this.listaDis.find(i => i.id === get_device_ID(checkSlider));

            if (checkSlider.value == "0"){
                disp.level=0;
                disp.state=0;
                if (disp.UI_switch()){
                    let switchDisp = <HTMLInputElement>this.myFramework.getElementById("disp_" + disp.id);
                    switchDisp.checked = false;
                }
                let datos = {"level":"0","state":"0"};
                this.myFramework.requestPOST(`http://localhost:8000/devices/${disp.id}`, this,datos);
            }
            else{
                disp.level=+checkSlider.value;
                disp.state=1;
                if (disp.UI_switch()){
                    let switchDisp = <HTMLInputElement>this.myFramework.getElementById("disp_" + disp.id);
                    switchDisp.checked = true;
                }
                let datos = {"level":checkSlider.value,"state":"1"};
                this.myFramework.requestPOST(`http://localhost:8000/devices/${disp.id}`, this,datos);
            }

        }

        //If a device avatar buton was ckicked.
        else if (objetoClick.id.includes("avatar_")) {
            let optionModal: HTMLElement = <HTMLElement>this.myFramework.getElementById("modal_options");
            optionModal.style.display = "block";

            let buttonClicked: HTMLInputElement = <HTMLInputElement>ev.target;
            this.active_device = get_device_ID(buttonClicked);
        }

        else if (objetoClick.id == "modal_back") {
            let optionModal: HTMLElement = <HTMLElement>this.myFramework.getElementById("modal_options");
            optionModal.style.display = "none";
        }
        else if (objetoClick.id == "modal_update") {
            // I close the options modal
            let optionModal: HTMLElement = <HTMLElement>this.myFramework.getElementById("modal_options");
            optionModal.style.display = "none";

            //I find the device corresponding to edit            
            let disp :Device= this.listaDis.find(i => i.id === this.active_device);

            // I update modal fields with actual device data to be modified by user         
            let device_name: HTMLInputElement = <HTMLInputElement>this.myFramework.getElementById("device_name");
            device_name.value = disp.name;
            let device_description: HTMLInputElement = <HTMLInputElement>this.myFramework.getElementById("device_description");
            device_description.value = disp.description;
            let device_type: HTMLInputElement = <HTMLInputElement>this.myFramework.getElementById("device_type");
            device_type.value = disp.type.toString();
            
            // get the modal with fields to edit data and display it
            let newModal: HTMLElement = <HTMLElement>this.myFramework.getElementById("modal_edit");
            newModal.style.display = "block";

        }
        else if (objetoClick.id == "modal_delete") {
            
            let disp :Device= this.listaDis.find(i => i.id === this.active_device);
            
            //I send data to server
            let datos = {"id":disp.id};
            this.myFramework.requestDELETE(`http://localhost:8000/devices`, this,datos);

            // I remove device from memory
            this.listaDis = this.listaDis.filter(obj => obj !== disp);
            
            //I reload screen without the deleted device
            this.loadScreen();

            // I hide the option modal
            let optionModal: HTMLElement = <HTMLElement>this.myFramework.getElementById("modal_options");
            optionModal.style.display = "none";
        }
    }

    responseHTTP(status: number, response: string) {  
        console.log("HTTP in",response);
    }    
}

function get_device_ID(elemento:HTMLInputElement): number{
      if (elemento.id.includes("disp_")){
        return +elemento.id.substring(5);//removes the string "disp_" from HTML element ID
      }
      
      if (elemento.id.includes("slider_")){
        return +elemento.id.substring(7);//removes the string "slider_" from HTML element ID
      }
      if (elemento.id.includes("avatar_")){
        return +elemento.id.substring(7);//removes the string "avatar_" from HTML element ID
      }
      else{
        return null;
      }
  }



window.addEventListener("load", ()=> {
    //Initialize Main
    let miObjMain: Main = new Main();
    miObjMain.main();

    //Load devices from server on the UI
    miObjMain.loadDevices();

    //Buttons Event Handlers Asignation
    let switch_all:HTMLElement = miObjMain.myFramework.getElementById("switch_all");
    switch_all.addEventListener("click", miObjMain);

    let button_add: HTMLElement = miObjMain.myFramework.getElementById("button_add");
    button_add.addEventListener("click", miObjMain);

    let modal_cancel: HTMLElement = miObjMain.myFramework.getElementById("modal_cancel");
    modal_cancel.addEventListener("click", miObjMain);

    let modal_submit: HTMLElement = miObjMain.myFramework.getElementById("modal_submit");
    modal_submit.addEventListener("click", miObjMain);

    let modal_update: HTMLElement = miObjMain.myFramework.getElementById("modal_update");
    modal_update.addEventListener("click", miObjMain);

    let modal_delete: HTMLElement = miObjMain.myFramework.getElementById("modal_delete");
    modal_delete.addEventListener("click", miObjMain);

    let modal_back: HTMLElement = miObjMain.myFramework.getElementById("modal_back");
    modal_back.addEventListener("click", miObjMain);

});




