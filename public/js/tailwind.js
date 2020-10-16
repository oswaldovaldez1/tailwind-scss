"use strict";
var _Notifications = {
    show: function (text, config) {
        var _this = this;
        var timeOut = typeof config.timeOut === "number" ? config.timeOut : 3000;
        var id = "_" + Math.random().toString(36).substr(2, 9);
        var alerts = document.createElement("div");
        var span = document.createElement("span");
        var close = document.createElement("span");
        var sum = 0;
        close.classList.add("closeAlert");
        close.classList.add("fas");
        close.classList.add("fa-times");
        close.classList.add("pl-8");
        span.innerHTML = text;
        alerts.id = id;
        if (typeof config.classIcon === "string" && config.classIcon.length > 0) {
            var spanIcon_1 = document.createElement("span");
            var classNames = config.classIcon.split(" ");
            classNames.forEach(function (element) {
                spanIcon_1.classList.add(element);
            });
            spanIcon_1.classList.add("px-2");
            alerts.appendChild(spanIcon_1);
        }
        if (typeof config.position === "undefined" ||
            (typeof config.position === "string" && config.position.length === 0)) {
            config.position = "topRight";
        }
        var _self = this;
        close.addEventListener("click", function (evt) {
            var removeChild = document.querySelector("#" + id);
            document.body.removeChild(removeChild);
            setTimeout(function () {
                _self.changePosition(config.position);
            }, 100);
        });
        alerts.appendChild(span);
        alerts.appendChild(close);
        alerts.classList.add("alert");
        alerts.classList.add(config.className);
        alerts.setAttribute("role", config.position);
        alerts.style.position = "fixed";
        var count = document.querySelectorAll("[role=\"" + config.position + "\"]");
        count.forEach(function (element) {
            if (element instanceof HTMLElement) {
                sum += element.offsetHeight;
            }
        });
        switch (config.position) {
            case "topLeft": {
                var top_1 = 0;
                top_1 = sum + (count.length + 1) * 10;
                alerts.style.top = top_1 + "px";
                alerts.style.left = "10px";
                break;
            }
            case "bottomRight": {
                var bottom = 0;
                bottom = sum + (count.length + 1) * 10;
                alerts.style.bottom = bottom + "px";
                alerts.style.right = "10px";
                break;
            }
            case "bottomLeft": {
                var bottom = 0;
                bottom = sum + (count.length + 1) * 10;
                alerts.style.bottom = bottom + "px";
                alerts.style.left = "10px";
                break;
            }
            default: {
                var top_2 = 0;
                top_2 = sum + (count.length + 1) * 10;
                alerts.style.top = top_2 + "px";
                alerts.style.right = "10px";
                break;
            }
        }
        document.body.appendChild(alerts);
        setTimeout(function () {
            try {
                document.body.removeChild(alerts);
            }
            catch (e) { }
            _this.changePosition(config.position);
        }, timeOut + ((count.length + 1) * 1000));
    },
    changePosition: function (position) {
        var count = document.querySelectorAll("[role=\"" + position + "\"]");
        var sum = 0;
        var cont = 0;
        count.forEach(function (element) {
            if (element instanceof HTMLElement) {
                sum = element.offsetHeight * cont;
                switch (position) {
                    case "topLeft": {
                        var top_3 = 0;
                        top_3 = sum + (((cont + 1) * 10));
                        element.style.top = top_3 + "px";
                        break;
                    }
                    case "bottomRight": {
                        var bottom = 0;
                        bottom = sum + (((cont + 1) * 10));
                        element.style.bottom = bottom + "px";
                        break;
                    }
                    case "bottomLeft": {
                        var bottom = 0;
                        bottom = sum + (((cont + 1) * 10));
                        element.style.bottom = bottom + "px";
                        break;
                    }
                    default: {
                        var top_4 = 0;
                        top_4 = sum + (((cont + 1) * 10));
                        element.style.top = top_4 + "px";
                        break;
                    }
                }
            }
            cont = cont + 1;
        });
    }
};
var _FormChecks = {
    init: function () {
    },
};
var _FormRange = {
    init: function () {
        document.querySelectorAll("input[type='range']").forEach(function (range) {
            var value = parseInt(range.value);
            range.style.setProperty("--content", "\" " + value + " \"");
            range.addEventListener("input", _FormRange.updateValue);
        });
    },
    updateValue: function (evt) {
        var range = evt.target;
        var value = parseInt(range.value);
        range.style.setProperty("--content", "\" " + value + " \"");
    },
};
var _Form = {
    FormRange: _FormRange,
    init: function () {
        document.querySelectorAll("input[type='tel']").forEach(function (tel) {
            tel.addEventListener("keypress", _Form.validateTel);
            tel.addEventListener("paste", _Form.validateTel);
            tel.addEventListener("keyup", _Form.formatTel);
        });
        document.querySelectorAll(".input-field > label").forEach(function (label) {
            _Form.upLabel(label);
        });
        document.querySelectorAll(".input-field > input").forEach(function (input) {
            var label = (document.querySelector("label[for='" + input.id + "']"));
            setInterval(function () {
                if (input.placeholder.length > 0) {
                    label.classList.add("up");
                }
                else {
                    label.classList.remove("up");
                }
            }, 1000);
        });
        _Form.FormRange.init();
    },
    upLabel: function (label) {
        var input = (document.querySelector("#" + label.getAttribute("for")));
        input === null || input === void 0 ? void 0 : input.addEventListener("blur", function (evt) {
            if (input.value.length > 0) {
                label.classList.add("up");
            }
            else if (input.placeholder.length > 0) {
                label.classList.add("up");
            }
            else {
                label.classList.remove("up");
            }
        });
    },
    formatTel: function (evt) {
        var _format = evt.target.dataset.format;
        var _min = evt.target.getAttribute("min");
        var _max = evt.target.getAttribute("max");
        if (_format !== undefined && _format !== null) {
            var _expStr_1 = "";
            _format.split("-").forEach(function (element) {
                _expStr_1 = _expStr_1 + ("(\\d{" + element.length + "})");
            });
            try {
                var _exp = new RegExp(_expStr_1);
                var x = evt.target.value.replace(/\D/g, "").match(_exp);
                evt.target.value = x.slice(1, x.length).join("-");
                evt.target.classList.remove("danger");
                evt.target.classList.add("success");
            }
            catch (err) {
                evt.target.classList.add("danger");
                evt.target.classList.add("remove");
            }
        }
        if (_min !== undefined && _min !== null) {
            if (evt.target.value.length >= parseInt(_min)) {
                evt.target.classList.remove("danger");
                evt.target.classList.add("success");
            }
            else {
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
    validateTel: function (evt) {
        var _max = evt.target.getAttribute("max");
        var theEvent = evt || window.event;
        if (theEvent.type === "paste") {
            key = evt.originalEvent.clipboardData.getData("text/plain");
        }
        else {
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault)
                theEvent.preventDefault();
        }
        if (_max !== undefined && _max !== null) {
            if (key.length > parseInt(_max)) {
                key = key.substr(0, parseInt(_max));
                evt.target.value = key;
                theEvent.returnValue = false;
                if (theEvent.preventDefault)
                    theEvent.preventDefault();
            }
        }
    },
};
/*!
 * Autor: Warlock
 */
var Oz = {
    Alert: _Notifications,
    Forms: _Form,
    init: function () {
        console.log("Iniciando ...");
        Oz.Forms.init();
    },
};
