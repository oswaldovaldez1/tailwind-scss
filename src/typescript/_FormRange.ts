let _FormRange = {
  init() {
    document.querySelectorAll("input[type='range']").forEach((range: any) => {
      let value = parseInt(range.value);
      range.style.setProperty("--content", `" ${value} "`);  
      range.addEventListener("input", _FormRange.updateValue);
      
    });
  },
  updateValue(evt: Event) {    
    let range = <HTMLInputElement>evt.target;    
    let value = parseInt(range.value);
    range.style.setProperty("--content", `" ${value} "`);
  },
};
