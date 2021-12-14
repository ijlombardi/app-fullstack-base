/*

This class handles all device data.

Methods give to the UI the information about the controls required for each device type.

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

  // Gives the UI the information if the device needs a switch
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

  // Gives the UI the information if the device needs a slider
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

  // Gives the UI the information if the device needs color picker
  // Not implemented on current application. Left for future development
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

  // Gives the UI thee location of the image to be shown
  public UI_image(): string{
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