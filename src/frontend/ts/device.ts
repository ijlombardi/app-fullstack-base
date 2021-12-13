/*

Suported device types:
- 0: Lightpoint On-Off
- 1: Blind Open-Closed Only
- 2: Lightpoint Dimmable
- 3: Blind with level
*/
class Device{

  public id: number;
  public name: string;
  public description: string;
  public state: number;
  public type: number;
  public level: number;
  
  
  constructor(id:number, name:string, description: string, state: number, type: number, level: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.state = state;
    this.type = type;
    this.level = level;
    
  }

  public UI_switch(): boolean{
    if (this.type == 0){ //- 0: Lightpoint On-Off
      return true;
    }
    else if (this.type == 1){ //- 1: Blind Open-Closed Only
      return true;
    }
    else if (this.type == 2){ //- 2: Lightpoint Dimmable
      return true;
    }
    else if (this.type == 3){ //- 3: Blind with level
      return true;
    }
    else{
      return false;
    }
  }

  public UI_slider(): boolean{
      if (this.type == 0){ //- 0: Lightpoint On-Off
        return false;
      }
      else if (this.type == 1){ //- 1: Blind Open-Closed Only
        return false;
      }
      else if (this.type == 2){ //- 2: Lightpoint Dimmable
        return true;
      }
      else if (this.type == 3){ //- 3: Blind with level
        return true;
      }
      else{
        return false;
      }
  }


  public UI_RGB(): boolean{
      if (this.type == 0){ //- 0: Lightpoint On-Off
        return false;
      }
      else if (this.type == 1){ //- 1: Blind Open-Closed Only
        return false;
      }
      else if (this.type == 2){ //- 2: Lightpoint Dimmable
        return false;
      }
      else if (this.type == 3){ //- 3: Blind with level
        return false;
      }
      else{
        return false;
      }
  }

    
  public UI_image(): string{
    //console.log("Tipo: ",this.type);
      if (this.type == 0){ //- 0: Lightpoint On-Off
        return '"./static/images/lightbulb.png"';
      }
      else if (this.type == 1){ //- 1: Blind Open-Closed Only
        return '"./static/images/blinds.png"';
      }
      else if (this.type == 2){ //- 2: Lightpoint Dimmable
        return '"./static/images/idea.png"';
      }
      else if (this.type == 3){ //- 3: Blind with level
        return '"./static/images/smart-blind.png"';
      }
      else{
        return '""';
      }
  }
}