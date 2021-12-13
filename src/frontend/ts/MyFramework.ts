class MyFramework{
  public getElementById(id:string): HTMLElement{
    return document.getElementById(id);
  }

  public requestPOST(url: string, response: HandlerHTTP, datos: any) {
    let xlm: XMLHttpRequest = new XMLHttpRequest();

    xlm.onreadystatechange = () => {
      if (xlm.readyState == 4) {
        response.responseHTTP(xlm.status, xlm.responseText);
      }
    }
    xlm.open("POST", url, true);
    xlm.setRequestHeader("Content-Type", "application/json");

    console.log(url,datos)
    xlm.send(JSON.stringify(datos));
  }

  public requestPUT(url: string, response: HandlerHTTP, datos: any) {
    let xlm: XMLHttpRequest = new XMLHttpRequest();

    xlm.onreadystatechange = () => {
      if (xlm.readyState == 4) {
        response.responseHTTP(xlm.status, xlm.responseText);
      }
    }
    xlm.open("PUT", url, true);
    xlm.setRequestHeader("Content-Type", "application/json");

    
    xlm.send(JSON.stringify(datos));
  }

  public requestDELETE(url: string, response: HandlerHTTP, datos: any) {
    let xlm: XMLHttpRequest = new XMLHttpRequest();

    xlm.onreadystatechange = () => {
      if (xlm.readyState == 4) {
        response.responseHTTP(xlm.status, xlm.responseText);
      }
    }
    xlm.open("DELETE", url, true);
    xlm.setRequestHeader("Content-Type", "application/json");

    
    xlm.send(JSON.stringify(datos));
  }

}