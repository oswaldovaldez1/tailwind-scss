let _Form = {
  FormRange: _FormRange,
  init: () => {
    //validar inputs tipo tel
    document.querySelectorAll("input[type='tel']").forEach((tel) => {
      tel.addEventListener("keypress", _Form.validateTel);
      tel.addEventListener("paste", _Form.validateTel);
      tel.addEventListener("keyup", _Form.formatTel);
    });
    //labels
    document.querySelectorAll(".input-field > label").forEach((label) => {
      _Form.upLabel(label);
    });
    //placeholder
    document.querySelectorAll(".input-field > input").forEach((input) => {
      let label = <HTMLInputElement>(
        document.querySelector(`label[for='${input.id}']`)
      );

      setInterval(() => {
        if ((input as HTMLTextAreaElement).placeholder.length > 0) {
          label.classList.add("up");
        } else {
          label.classList.remove("up");
        }
      }, 1000);
    });

    _Form.FormRange.init();
  },
  upLabel(label: any) {
    let input = <HTMLInputElement>(
      document.querySelector("#" + label.getAttribute("for"))
    );
    input?.addEventListener("blur", (evt) => {
      if (input.value.length > 0) {
        label.classList.add("up");
      } else if (input.placeholder.length > 0) {
        label.classList.add("up");
      } else {
        label.classList.remove("up");
      }
    });
  },
  formatTel(evt: any) {
    let _format = evt.target.dataset.format;
    let _min = evt.target.getAttribute("min");
    let _max = evt.target.getAttribute("max");

    if (_format !== undefined && _format !== null) {
      let _expStr = "";
      _format.split("-").forEach((element: any) => {
        _expStr = _expStr + `(\\d{${element.length}})`;
      });
      try {
        let _exp = new RegExp(_expStr);

        var x = evt.target.value.replace(/\D/g, "").match(_exp);

        evt.target.value = x.slice(1, x.length).join("-");
        evt.target.classList.remove("danger");
        evt.target.classList.add("success");
      } catch (err) {
        evt.target.classList.add("danger");
        evt.target.classList.add("remove");
      }
    }
    if (_min !== undefined && _min !== null) {
      if (evt.target.value.length >= parseInt(_min)) {
        evt.target.classList.remove("danger");
        evt.target.classList.add("success");
      } else {
        evt.target.classList.add("danger");
        evt.target.classList.remove("success");
      }
    }
    if (_max !== undefined && _max !== null) {
      if (evt.target.value.length > parseInt(_max)) {
        evt.target.value = evt.target.value;
      }
    }
  },
  validateTel(evt: any) {
    let _max = evt.target.getAttribute("max");
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === "paste") {
      key = evt.originalEvent.clipboardData.getData("text/plain"); //event.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;

    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
    if (_max !== undefined && _max !== null) {
      if (key.length > parseInt(_max)) {
        key = key.substr(0, parseInt(_max));
        evt.target.value = key;
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }
    }
  },
};

/**
button
checkbox
color
date
datetime-local
email
file
hidden
image
month
number
password
radio
range
reset
search
submit
tel
text
time
url
week
95149019891090192
 */
