$(function(){
	var slide= (function(){
		var  pb = {};
		pb.el = $('#slider');
		pb.items = {
			panel: pb.el.find('li')
		}

		//Variables necesarias
		var sliderInterval, currentSlider = 0, nextSlider = 1, tamSlider = pb.items.panel.length ;

		//Inicializacion
		pb.init = function(settings){
			var salida = "";
			this.settings = settings;
			//Ativamos el slider
			sliderInit();

			for(var i = 0;i <tamSlider;i++){
				if(i == 0){
					salida = "<li class='active'></li>";
				}else{
					salida += "<li></li>";
				}
			}


			//Al hacer click ejecutar funcion en li
			$('#slider-controls').html(salida).on('click','li',function(e){
				var $this = $(this);
				if(currentSlider !== $this.index()){
					cambiarPanel($this.index());
				}
				
			})
		}

		function sliderInit(){
			sliderInterval = setInterval(pb.startSlider,pb.settings.duration);
		}

		pb.startSlider = function(){
			var panels = pb.items.panel;
			var controles = $('#slider-controls li');

			if(nextSlider>=tamSlider){
				nextSlider = 0;
				currentSlider = tamSlider-1;
			}

			//Efectos
			controles.removeClass('active').eq(currentSlider).addClass('active');

			panels.eq(currentSlider).fadeOut('slow');
			panels.eq(nextSlider).fadeIn('slow');

			//Actualizando datos
			currentSlider = nextSlider;
			nextSlider += 1;

		}

		//Funcion para controladores del slider
		var cambiarPanel = function(id){
			clearInterval(sliderInterval);
			var controles = $('#slider-controls li');
			var panels = pb.items.panel;
			//Comprobar el id
			if(id >= tamSlider){
				id= 0;
			}else if(id < 0){
				id = tamSlider -1;
			}

			//Efectos
			controles.removeClass('active').eq(id).addClass('active');
			panels.eq(currentSlider).fadeOut('slow');
			panels.eq(id).fadeIn('slow');

			//Actualizar datos
			currentSlider = id;
			nextSlider = id + 1;

			//Reactivar interval
			sliderInit();

		}

		return pb;

	}()); // Funcion autoejecutable

	slide.init({duration:2000});
})