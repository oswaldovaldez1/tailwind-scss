//const loader = require("sass-loader");

let render = document.querySelector("#render");
let menuUrl = {
  //   acordion: "acordion.html",
  alert: "alert.html", //terminado
  avatar: "avatar.html",
  badge: "badge.html", //terminado
  bars: "bars.html",
  breadcrumb: "breadcrumb.html", //terminado
  buttons: "buttons.html", //terminado
  cards: "cards.html", //terminado
  carousel: "carousel.html",
  collapse: "collapse.html",
  dropdowns: "dropdowns.html",
  forms: {
    input: "forms/input.html", //terminado
    switch: "forms/switch.html", //terminado
    check: "forms/check.html", //terminado
    radio: "forms/radio.html", //terminado
    // picker: "forms/picker.html", //terminado
    range: "forms/range.html", //terminado
    select: "forms/select.html", //terminado
    chip: "forms/chip.html", //terminado
  },
  menu: "menu.html",
  modal: "modal.html",
  nav: "nav.html",
  navbar: "navbar.html",
  pagination: "pagination.html",
  popover: "popover.html",
  scrollspy: "scrollspy.html",
  spinners: "spinners.html",
  tooltips: "tooltips.html",
  // index: "index.html",
};
let menuItems = document.querySelector("#menuElements");

window.onload = function () {
  //let menuItems = document.querySelector("#menu");
  //menuItems.innerHTML = "";
  let ul = document.createElement("ul");
  Object.keys(menuUrl).forEach((item) => {
    if (typeof menuUrl[item] === "string") {
      let li = document.createElement("li");
      let linkA = document.createElement("a");
      linkA.classList.add("px-6");
      linkA.classList.add("text-white");
      linkA.classList.add("link-url");
      linkA.innerText = item;
      linkA.href = "javascript:void(0)";
      linkA.dataset.url = menuUrl[item];
      linkA.onclick = reset();
      li.appendChild(linkA);
      ul.appendChild(li);
    } else {
      let li = document.createElement("li");
      let ul2 = document.createElement("ul");
      let link2 = document.createElement("a");
      link2.classList.add("px-6");
      link2.classList.add("text-white");
      link2.classList.add("link-url");
      link2.innerText = item;
      link2.href = "javascript:void(0)";
      let menutmp = menuUrl[item];
      Object.keys(menutmp).forEach((item2) => {
        let li2 = document.createElement("li");
        let linkA = document.createElement("a");
        linkA.classList.add("px-10");
        linkA.classList.add("text-white");
        linkA.classList.add("link-url");
        linkA.innerText = item2;
        linkA.href = "javascript:void(0)";
        linkA.dataset.url = menutmp[item2];
        linkA.onclick = reset();
        li2.appendChild(linkA);
        ul2.appendChild(li2);
      });
      li.appendChild(link2);
      li.appendChild(ul2);
      ul.appendChild(li);
    }
  });
  menuItems.appendChild(ul);
  let links = document.querySelectorAll(".link-url");

  links.forEach((item) => {
    item.addEventListener("click", (evt) => {
      renderUrl(evt.target.dataset.url);
    });
  });
};

function makeHttpObject() {
  try {
    return new XMLHttpRequest();
  } catch (error) {}
  try {
    return new ActiveXObject("Msxml2.XMLHTTP");
  } catch (error) {}
  try {
    return new ActiveXObject("Microsoft.XMLHTTP");
  } catch (error) {}

  throw new Error("Could not create HTTP request object.");
}

function renderUrl(url) {
  if (url === undefined || url === null || url === "") return;

  var request = makeHttpObject();
  request.open("GET", url, true);
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState == 4)
      //alert(request.responseText);
      render.innerHTML = request.responseText;
  };
}
