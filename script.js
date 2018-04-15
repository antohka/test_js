sweetAlert = function ( obj ) {
  function addClass (el, className) {
    if (el.classList) { el.classList.add(className); }
    else { el.className += ' ' + className; }
  }
  function removeClass(el, className) {
    if (el.classList) { el.classList.remove(className); }
    else { el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '); }
  }
  function setText (el, string) {
    if (el.textContent !== undefined) { el.textContent = string; }
    else { el.innerText = string; }
  }
  var sweetOverlayHtml = document.querySelector(".sweet-overlay");
  var sweetAlertHtml = document.querySelector(".sweet-alert");
  setText(sweetAlertHtml.querySelector(".FBTITLE b"), obj.title);
  setText(sweetAlertHtml.querySelector("h2"), obj.title);
  setText(sweetAlertHtml.querySelector("p"), obj.text);
  if(typeof obj.type !== "undefined" && obj.type == "success") {
    sweetAlertHtml.querySelector(".sa-custom").style.display = "none";
    sweetAlertHtml.querySelector(".sa-success").style.display = "";
  }
  sweetOverlayHtml.style.display = "";
  sweetAlertHtml.style.display = "";
}
sweetAlert.close = function () {
  var sweetOverlayHtml = document.querySelector(".sweet-overlay");
  var sweetAlertHtml = document.querySelector(".sweet-alert");
  sweetOverlayHtml.style.display = "none";
  sweetAlertHtml.style.display = "none";
}
var spinnerAction = function( text, trackingLink ) {
  var currentStep = 1;
  var prizeHtml = document.getElementById("prize");
  var pagelinkHtml, sweetAlertHtml, sweetOverlayHtml;
  function addEventListener (el, eventName, handler) {
    if (el.addEventListener) {
      el.addEventListener(eventName, handler);
    } else {
      el.attachEvent('on' + eventName, function(){
        handler.call(el);
      });
    }
  }

  function spin3() {
    removeClass(pagelinkHtml, "pagelink_hidden");
    addClass(pagelinkHtml, "pagelink_visible");
  }

  function spin2point5() {
    spin3();
    var spinWin = document.getElementById("spin");
    var prizes = document.querySelector(".prizes");
    addClass(spinWin, "spinAround2");
    addClass(prizes, "spinAround2");
    setTimeout(function() {
      addClass(spinWin, "Op");
    }, 6600);
    setTimeout(function() {
      prizeHtml.style.display = "block";
    }, 7000);
    setTimeout(function() {
      sweetAlert({
        title: text.alert5,
        text: text.alert6,
        type: "success"
      }, spin3);
    }, 8000);
  }

  function spin2() {
    var spinWin = document.getElementById("spin");
    var prizes = document.querySelector(".prizes");
    addClass(spinWin, "spinAround");
    addClass(prizes, "spinAround");
    setTimeout(function() {
      sweetAlert({
        title: text.alert3,
        text: text.alert4,
        type: "success"
      });
    }, 6500);
  }

  sweetAlert({
    title: text.alert1,
    text: text.alert2
  });

  function closeAlert() {
    sweetAlert.close();
    currentStep++;
    switch( currentStep ) {
      case 2: spin2(); break;
      case 3: spin2point5(); break;
    }
  };

  function Ready () {
    pagelinkHtml = document.querySelector("a[rel=\"noreferrer noopener\"]");
    addClass(pagelinkHtml, "pagelink_hidden");
    sweetAlertHtml = document.getElementsByClassName("sweet-alert")[0];
    sweetOverlayHtml = document.getElementsByClassName("sweet-overlay")[0];
    addEventListener(sweetAlertHtml, "click", closeAlert);
    addEventListener(sweetOverlayHtml, "click", closeAlert);
  }
  if (document.readyState != 'loading') {
    Ready();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', Ready);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading') {
        Ready();
      }
    });
  }
};

//-------Date-----------
  var arrMonthYear = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  var $date = new Date().getDate();
  var $month = new Date().getMonth();
      $month = arrMonthYear[$month];
  var $year = new Date().getFullYear();
  document.querySelector('.date').innerHTML = $date.toString() + " " +$month.toString()+ " " + $year.toString();
//-------Date-----------

//-------Model-Phone----
//   function getURLParameter(name) {
//       return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1] || '');
//   }
//   var brand = getURLParameter('brand');
//   var model = getURLParameter('model');
//   document.querySelector('.model-phone').innerHTML = brand + model || "Name of the model of your phone";

//  Use platform.js
    var brand = platform.manufacturer;
    var model = platform.product;
    document.querySelector('.model-phone').innerHTML = (brand === null) ? "Desktop" : brand + " " + model;

//-------Model-Phone----