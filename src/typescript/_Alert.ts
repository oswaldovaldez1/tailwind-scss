let _Notifications={
        show(text:any, config:any){
          let timeOut = typeof config.timeOut === "number" ? config.timeOut : 3000;
          const id = "_" + Math.random().toString(36).substr(2, 9);
          let alerts = document.createElement("div");
          let span = document.createElement("span");
          let close = document.createElement("span");
          let sum = 0;
          close.classList.add("closeAlert");      
          close.classList.add("fas");
          close.classList.add("fa-times");
          close.classList.add("pl-8");      
          span.innerHTML = text;
          alerts.id = id;
          if (typeof config.classIcon === "string" && config.classIcon.length > 0) {
            let spanIcon = document.createElement("span");
      
            let classNames = config.classIcon.split(" ");
            classNames.forEach((element:any) => {
              spanIcon.classList.add(element);
            });
            spanIcon.classList.add("px-2");
            alerts.appendChild(spanIcon);
          }
          if (
            typeof config.position === "undefined" ||
            (typeof config.position === "string" && config.position.length === 0)
          ) {
            config.position = "topRight";
          }
          let _self=this;
    close.addEventListener("click", function (evt) {
      const removeChild:any = document.querySelector("#" + id);
            document.body.removeChild(removeChild);
            setTimeout(() => {            
                _self.changePosition(config.position);
                 },100);
          });
          alerts.appendChild(span);
          alerts.appendChild(close);
          alerts.classList.add("alert");
          alerts.classList.add(config.className);      
          alerts.setAttribute("role", config.position);
          alerts.style.position = "fixed";
      
          let count = document.querySelectorAll(`[role="${config.position}"]`);
      
          count.forEach((element) => {
            if (element instanceof HTMLElement) {
              sum += element.offsetHeight;
            }
          });
      
          switch (config.position) {
            case "topLeft": {
              let top = 0;
              top = sum + (count.length + 1) * 10;
              alerts.style.top = top + "px";
              alerts.style.left = "10px";
              break;
            }
            case "bottomRight": {
              let bottom = 0;
              bottom = sum + (count.length + 1) * 10;
              alerts.style.bottom = bottom + "px";
              alerts.style.right = "10px";
              break;
            }
            case "bottomLeft": {
              let bottom = 0;
              bottom = sum + (count.length + 1) * 10;
              alerts.style.bottom = bottom + "px";
              alerts.style.left = "10px";
              break;
            }
            default: {
              let top = 0;
              top = sum + (count.length + 1) * 10;
              alerts.style.top = top + "px";
              alerts.style.right = "10px";
              break;
            }
          }
      
            document.body.appendChild(alerts);
                  
            setTimeout(() => {
                try {
                    document.body.removeChild(alerts);
                }
                catch (e) { }          
            this.changePosition(config.position);
          }, timeOut+((count.length + 1)*1000));
        },
        changePosition(position:any) {
          let count = document.querySelectorAll(`[role="${position}"]`);
          let sum = 0;
            let cont = 0;
            
            count.forEach((element) => {
              
                if (element instanceof HTMLElement) {
                
                    sum = element.offsetHeight*cont;
                    
              switch (position) {
                case "topLeft": {
                  let top = 0;
                  top = sum + (((cont + 1) * 10));
                  element.style.top = top + "px";            
                  break;
                }
                case "bottomRight": {
                  let bottom = 0;
                  bottom = sum + (((cont + 1) * 10));
                  element.style.bottom = bottom + "px";            
                  break;
                }
                case "bottomLeft": {
                  let bottom = 0;            
                  bottom = sum + (((cont + 1) * 10));
                  element.style.bottom = bottom + "px";            
                  break;
                }
                default: {
                  let top = 0;            
                  top = sum + (((cont + 1) * 10));
                  element.style.top = top + "px";            
                  break;
                }
              }        
            }
            cont = cont + 1;
          });    
        }
      }