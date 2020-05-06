/*window.onload = function(){     
			var pos = 350;
			var box = document.getElementById('box');
			var t = setInterval(move, 10);
			
			function move(){
						if (pos>=696){
							clearInterval(t);
						}
						else {
							pos += 1;
							box.style.left = pos+'px';
							box.style.top = pos+'px';
						}
			}
}*/
//переменная для определения необходимости перезагрузки
let download = 0;
let real_x_zero = 0;
let real_y_zero = 0;
let real_x_one = 0;
let real_y_one = 0;
let real_x_too = 0;
let real_y_too = 0;

let go_throw = 0;

//цент треугольника
let real_x = 0;
let real_y = 0;



function draw(){
	
	if(download != 0){
		location.reload();
	}
	download = 1;

	//меняем название кнопки на сброс
	var change_text_button = document.getElementById('draw_button');
	change_text_button.innerHTML = "Сброс"

	//меняем для начала текст в поле для текста
	var text = document.getElementById('text_box');
	text.innerHTML = "Нажми три раза на серой области, создав треугольник"
	////////////////////////////////////////////////////////////

	//вставляем обработку событий на нажатие в этой области
	var cont = document.getElementById("conteiner");
  //cont.addEventListener("click", alert("dddfgdfg"), false); не заработала
	var dot_count = 0;

	cont.onclick = function() {
		switch (dot_count) {
////////////////////////////////////////////////////////////////////////
			case 0: //находим координаты мыши
					var coord_x = event.clientX; //
					var coord_y = event.clientY;
					//alert("X = " + coord_x + " Y = " + coord_y);

					//находим координаты контейнера относительно экрана
					var helper = document.getElementById('conteiner');
					var offset_xy = helper.getBoundingClientRect();
					//alert(offset_xy.left + " " + offset_xy.top);

					//находим реальные координаты курсора
					 real_x_zero = coord_x - offset_xy.left;
					 real_y_zero = coord_y - offset_xy.top;
					 
					//ставим точку по найденым реальным координатам
					// но это перенос старой посути
					var dot = document.getElementById('box');
					dot.style.left = real_x_zero+'px';
					dot.style.top = real_y_zero+'px';
					//alert (real_x_zero + "|" + real_y_zero);

					text.innerHTML = "Первая точка есть";

					dot_count = 1;

					break;
////////////////////////////////////////////////////////////////////////
					case 1: //находим координаты мыши
					var coord_x = event.clientX; //
					var coord_y = event.clientY;
					//alert("X = " + coord_x + " Y = " + coord_y);

					//находим координаты контейнера относительно экрана
					var helper = document.getElementById('conteiner');
					var offset_xy = helper.getBoundingClientRect();
					//alert(offset_xy.left + " " + offset_xy.top);

					//находим реальные координаты курсора
					real_x_one = coord_x - offset_xy.left;
					real_y_one = coord_y - offset_xy.top;

					//отнимаем 5 потому-что один клона
					real_y_one -= 5;

					//ставим точку по найденым реальным координатам
					/*var dot_too = document.getElementById('box');
					dot_too.style.left = real_x+'px';
					dot_too.style.top = real_y+'px';*/

					//клонируем первую точку и ставим клон номер 1 (точка 2)
					var clone_one = document.getElementById('box').cloneNode(false);
					//document.querySelector("conteiner").appendChild(clone_one);
					var div_conteiner = document.getElementById("conteiner");
					div_conteiner.appendChild(clone_one);
					clone_one.style.left = real_x_one+'px';
					clone_one.style.top = real_y_one+'px';
					//alert (real_x_one + "|" + real_y_one);

					text.innerHTML = "Вторая точка есть";

					dot_count = 2;
					break;
////////////////////////////////////////////////////////////////////////
					case 2: //находим координаты мыши
					var coord_x = event.clientX; //
					var coord_y = event.clientY;
					//alert("X = " + coord_x + " Y = " + coord_y);

					//находим координаты контейнера относительно экрана
					var helper = document.getElementById('conteiner');
					var offset_xy = helper.getBoundingClientRect();
					//alert(offset_xy.left + " " + offset_xy.top);

					//находим реальные координаты курсора
					real_x_too = coord_x - offset_xy.left;
					real_y_too = coord_y - offset_xy.top;

					//отнимаем 10 потому-что два клона
					real_y_too -= 10;

					//ставим точку по найденым реальным координатам
					/*var dot_tree = document.getElementById('box');
					dot_tree.style.left = real_x+'px';
					dot_tree.style.top = real_y+'px';*/

					//клонируем первую точку и ставим клон номер 2 (точка 3)
					var clone_too = document.getElementById('box').cloneNode(false);
					//document.querySelector("conteiner").appendChild(clone_one);
					var div_conteiner = document.getElementById("conteiner");
					div_conteiner.appendChild(clone_too);
					clone_too.style.left = real_x_too+'px';
					clone_too.style.top = real_y_too+'px';
					//alert (real_x_too + "|" + real_y_too);

					text.innerHTML = "Третья точка есть 	  БРОСАЙ КУБИК!!!";

					dot_count = 3;

					//создаем центр треугольника
					//клонируем первую точку и ставим клон центр треугольника
					real_x = (real_x_zero + real_x_one + real_x_too) / 3;
					real_y = (real_y_zero + real_y_one + real_y_too) / 3;

					//отнимаем 10 потому-что два клона
					real_y -= 10;

					//alert (real_x + "|" + real_y);
					var clone_zero = document.getElementById('box').cloneNode(false);
					//document.querySelector("conteiner").appendChild(clone_one);
					var div_conteiner = document.getElementById("conteiner");
					clone_zero.style.background = '#C0C0C0';
					clone_zero.style.left = real_x + 'px';
					clone_zero.style.top = real_y + 'px';
					div_conteiner.appendChild(clone_zero);

					go_throw = 1;

					break;
		}
	}
}

let offset_clone = 12.5; //(12.5  10  7.5)
let first = 0;

function throww(){
	if(go_throw == 1){
		//бросаем кубик от  1 до 6
		var value_cube = Math.floor(Math.random() * 6) + 1;
		console.log(value_cube);
		if (first==0){
			if(value_cube==1 || value_cube==2){offset_clone = 12.5}
				else if(value_cube==3 || value_cube==4){offset_clone = 10}
					else if(value_cube==5 || value_cube==6){offset_clone = 7.5}
			console.log(offset_clone);
			first = 1;
		}

		var count_clones = document.getElementById("conteiner").children.length;

		var clones = document.getElementById('box').cloneNode(false);
		clones.style.background = '#C0C0C0';
		var clones_conteiner = document.getElementById("conteiner");
		clones_conteiner.appendChild(clones);

		/*var value_x = (real_x_zero + real_x)/2;
		var value_y = (real_y_zero + real_y)/2 - offset_clone;
		clones.style.left = value_x+'px';
		clones.style.top = value_y+'px';

		real_x = value_x;
		real_y = value_y;

		offset_clone += 2.5;*/




		//проверка работы по диагонали смещения от центрадбной точки 
		/*
		clones.style.left = (real_x = real_x + 10)+'px';
		clones.style.top = (real_y = real_y + 10)+'px';
		*/




		switch(value_cube){

			case 1:
			case 2:
				var value_x = (real_x_zero + real_x)/2;
				var value_y = (real_y_zero + real_y)/2 - offset_clone;
				clones.style.left = value_x+'px';
				clones.style.top = value_y+'px';

				real_x = value_x;
				real_y = value_y;

				offset_clone += 2.5;
				
			break;

			case 3:
			case 4:
					var value_x = (real_x_one + real_x)/2;
					var value_y = (real_y_one + real_y)/2 - offset_clone;
					clones.style.left = value_x+'px';
					clones.style.top = value_y+'px';
	
					real_x = value_x;
					real_y = value_y;
	
					offset_clone += 2.5;
			break;

			case 5:
			case 6:
					var value_x = (real_x_too + real_x)/2;
					var value_y = (real_y_too + real_y)/2 - offset_clone;
					clones.style.left = value_x+'px';
					clones.style.top = value_y+'px';
	
					real_x = value_x;
					real_y = value_y;
	
					offset_clone += 2.5;

			break;
		}
	}

}
/////////////////////////////////////////////////////////////////////////////////
// рабочая часть для приблидения к первой точке первое значение должно быть 12,5
/*
var count_clones = document.getElementById("conteiner").children.length;

		var clones = document.getElementById('box').cloneNode(false);
		clones.style.background = '#C0C0C0';
		var clones_conteiner = document.getElementById("conteiner");
		clones_conteiner.appendChild(clones);

		var value_x = (real_x_zero + real_x)/2;
		var value_y = (real_y_zero + real_y)/2 - offset_clone;
		clones.style.left = value_x+'px';
		clones.style.top = value_y+'px';

		real_x = value_x;
		real_y = value_y;

		offset_clone += 2.5;
*/
////////////////////////////////////////////////////////////////////////////////