//Background----------

function fn() {
    window.requestAnimFrame = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
    })();
    var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      w = canvas.width = window.innerWidth,
      h = canvas.height = window.innerHeight,
      hue = 217,
      stars = [],
      count = 0,
      maxStars = 1200;
    var canvas2 = document.createElement('canvas'),
      ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    var half = canvas2.width / 2,
      gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#fff');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');
    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();
  
    function random(min, max) {
      if (arguments.length < 2) {
        max = min;
        min = 0;
      }
      if (min > max) {
        var hold = max;
        max = min;
        min = hold;
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    function maxOrbit(x, y) {
      var max = Math.max(x, y),
        diameter = Math.round(Math.sqrt(max * max + max * max));
      return diameter / 2;
    }
  
    var Star = function() {
      this.orbitRadius = random(maxOrbit(w, h));
      this.radius = random(60, this.orbitRadius) / 12;
      this.orbitX = w / 2;
      this.orbitY = h / 2;
      this.timePassed = random(0, maxStars);
      this.speed = random(this.orbitRadius) / 900000;
      this.alpha = random(2, 10) / 10;
      count++;
      stars[count] = this;
    };
    Star.prototype.draw = function() {
      var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
        y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
        twinkle = random(10);
      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
      }
      ctx.globalAlpha = this.alpha;
      ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
      this.timePassed += this.speed;
    };
    for (var i = 0; i < maxStars; i++) {
      new Star();
    }
  
    function animation() {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
      }
      window.requestAnimationFrame(animation);
    }
  
    animation();
  }
  fn();

//Enviar formulário por email

(function(){
      emailjs.init("ql3TzoPbGvSASIf5k");
})();

function enviaForms(){
  document.querySelector("#audioagradecimento").play();
var arr = [];
$.each($("input[name='caracteristicas']:checked"), function(){
arr.push($(this).val());
});
let caracteristicas = arr.join(", ");


var arr1 = [];
$.each($("input[name='designs']:checked"), function(){
arr1.push($(this).val());
});
let designs = arr1.join(", ");


    
let fullName = document.getElementById('nome').value;
let email = document.getElementById('email').value;
let phone = document.getElementById("phone").value;
let empresa = document.getElementById("empresa").value;
let public = document.getElementById("public").value;
let produto = document.getElementById("product/service").value;
let concorrentes = document.getElementById("concorrentes").value;
let logo = document.querySelector('input[name="logo"]').value;
let cor1 = document.getElementById('cor-1').value;
let cor2 = document.getElementById('cor-2').value;
let cor3 = document.getElementById('cor-3').value;

    var templateParams = {
        to_name: "Formulário",
        from_name: fullName,
        email: email,
        phone: phone,
        public: public,
        empresa:empresa,
        produto: produto,
        concorrentes: concorrentes,
        logo:logo,
        cor1: cor1,
        cor2:cor2,
        cor3:cor3,
        caracteristicas:caracteristicas,
        designs:designs,
    }

    emailjs.send("service_mxtwbyd","template_akyml6m", templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
};

//Bolinhas das etapas do formulário
const progressBar = document.getElementById("progress-bar");
const progressNext = document.getElementById("progress-next");
const progressPrev = document.getElementById("progress-prev");
const steps = document.querySelectorAll(".step");
const formularios = document.querySelectorAll(".formulario");
const audios = document.querySelectorAll("audios");
let active = 1;
let formStepsNum = 0;

progressNext.addEventListener("click", () => {
  active++;
  formStepsNum++;
  let active1 = active-1;
  if (active > steps.length) {
    active = steps.length;
  } 
  updateProgress();
  document.querySelector("#audio"+active).load();
  document.querySelector("#audio"+active).play();
  document.querySelector("#audio"+active1).pause();
});

progressPrev.addEventListener("click", () => {
  active--;
  formStepsNum--;
  let active1 = active+1;
  if (active < 1) {
    active = 1;
  }
  updateProgress();
  document.querySelector("#audio"+active).load();
  document.querySelector("#audio"+active).play();
  document.querySelector("#audio"+active1).pause();
});

const updateProgress = () => {
  steps.forEach((step, i) => {
    if (i < active) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });


formularios.forEach((formStep) => {
        formStep.classList.contains("form-step-active") && formStep.classList.remove("form-step-active");
      });
    
    formularios[formStepsNum].classList.add("form-step-active");

  if (active === 1) {
    progressPrev.style.visibility = "hidden";
  } else if (active === steps.length) {
    progressNext.style.visibility = "hidden";
  } else {
    progressPrev.style.visibility = "visible";
    progressNext.style.visibility = "visible";
  }

};

//Validação-----------

const tel = document.getElementById('phone') // Seletor do campo de telefone

tel.addEventListener('keypress', (e) => mascaraTelefone(e.target.value)) // Dispara quando digitado no campo
tel.addEventListener('change', (e) => mascaraTelefone(e.target.value)) // Dispara quando autocompletado o campo

const mascaraTelefone = (valor) => {
    valor = valor.replace(/\D/g, "")
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2")
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2")
    tel.value = valor // Insere o(s) valor(es) no campo
}


function SomenteNumero(e){
  var tecla=(window.event)?event.keyCode:e.which;   
  if((tecla>47 && tecla<58)) return true;
  else{
    if (tecla==8 || tecla==0) return true;
else  return false;
  }
}



jQuery(function() {
    
  jQuery(".custom4").maskMoney({
prefix:'R$ ', 
thousands:'.', 
decimal:','
})

});

let submitButton = document.getElementById('button') 

submitButton.addEventListener('click', function(event){

  event.preventDefault();
    
  let fullName = document.getElementById('nome').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById("phone").value;
  let empresa = document.getElementById("empresa").value;
  let public = document.getElementById("public").value;
  let produto = document.getElementById("product/service").value;
  let concorrentes = document.getElementById("concorrentes").value;
  let logo = document.querySelector('input[name="logo"]').value

  let alerta = "Tem algo faltando, por favor, confira as informações!"


  if( fullName == "" ) {
    alert(alerta);
    return false;
  }
  if( email == "" ) {
    alert(alerta);
    return false;
  }
  if( phone == "" ) {
    alert(alerta);
    return false;
  }
  if( empresa == "" ) {
    alert(alerta);
    return false;
  }
  if( public == "" ) {
    alert(alerta);
    return false;
  }
  if( produto == "" ) {
    alert(alerta);
    return false;
  }
  if( concorrentes == ""){
    alert(alert);
    return false
  }
  if( logo == ""){
    alert(alert);
    return false
  }
    return(enviaForms());

});

function adjustHeight(element){
  element.style.height = "5px";
  element.style.height = (element.scrollHeight)+"px";
}