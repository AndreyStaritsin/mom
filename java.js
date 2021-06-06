let rotate = document.querySelector(".rotate-box");
let download = document.querySelector(".loader-box");
let play = document.querySelector(".play-box");
let area = document.querySelector(".area");
let photoWrap = document.querySelector(".photo-wrap");
let cards = document.querySelectorAll(".card");
let blur = document.querySelector(".blur");
let screenShadow = document.querySelector(".screen-shadow");
let pisma = document.querySelectorAll(".pismo");
let converts = document.querySelectorAll(".convert");
let albumWrap = document.querySelector(".album-wrap");
let photoAlbumBox = document.querySelectorAll(".photo-box");
let photoFullBox = document.querySelector(".photo-full-box");
let alert = document.querySelector(".alert-box");

let sheet = 1; //счетчик листов альбома
let sheetForSwipe = 1; //счетчик листов альбома при листании
let src = ""; //путь фото
let cardAlbum = 0; //счетчик ячеек (общее) альбома
let cadr = 0; //счетчик заполненых ячеек листа альбома
let numAddPhoto = "11"; // номер фото для дозагрузки после начальных 10

/*-----------------------------------ПРЕДУПРЕЖДЕНИЕ ----------------------------------*/

function showAlert(text) {
  alert.children[0].innerHTML = text;
  alert.style.display = "flex";
  setTimeout(function () {
    alert.style.opacity = "1";
  }, 100);
  setTimeout(function () {
    alert.style.opacity = "0";
  }, 3000);
  setTimeout(function () {
    alert.style.display = "none";
  }, 3500);
}

/*----------------------------------------- ПРОВЕРКА ОРИЕНТАЦИИ---------------------------------------*/

function checkOrientation() {
  let whatOrientation = screen.orientation.type; //получаем ориентацию
  if (whatOrientation == "portrait-primary") {
    //если портретная
    rotate.style.display = "flex"; //показываем rotate
    rotate.style.visibility = "visible"; //делаем видимым
  }
  if (whatOrientation == "landscape-primary") {
    //если альбомная
    rotate.style.display = "none"; //скрываем rotate
  }
}
checkOrientation();

window.addEventListener("orientationchange", checkOrientation);

/*-----------------------------------------ПРЕЛОАДЕР ---------------------------------------*/
var audio = new Audio("fon.mp3"); //создаеи объект фоновой музыки

window.onload = function () {
  //как все загрузится
  download.style.display = "none"; //ожидание убираем
  play.style.display = "flex"; //показываем кнопку play
};

/*-----------------------------------------РАЗВЕРНУТЬ В ПОЛНЫЙ ЭКРАН ---------------------------------------*/

play.onclick = function () {
  //при клике на play
  play.style.display = "none"; //выключаем его
  document.documentElement.requestFullscreen(); //на весь экран
  audio.loop = true; //зацикливаем музыку
  audio.volume = 0.7; //громкость фона
  audio.play(); //запускаем музыку
  area.style.opacity = "1"; //показываем область
};

/*-----------------------------------------Письма и конверты ---------------------------------------*/

for (let pismo = 0; pismo < pisma.length; pismo++) {
  pisma[pismo].addEventListener("click", function () {
    //вешаем слушателя клик циклом на письма
    pisma[pismo].classList.toggle("pismo-active"); //добавление/выключение класса актив (включено)
    pisma[pismo].children[0].classList.toggle("text-active"); //включаем текст
    pisma[pismo].children[0].style.opacity = "1"; //делаем его видимым
    screenShadow.classList.toggle("screen-shadow-active"); //показываем затемнение
   if(audio.volume== 0.7){
    audio.volume=0.3;
   }else if(audio.volume==0.3){
     audio.volume=0.7
   }
  });
}


for (let convert = 0; convert < converts.length; convert++) {
  converts[convert].children[0].addEventListener("click", function () {
    converts[convert].classList.toggle("convert-active");
    screenShadow.classList.toggle("screen-shadow-active");
  });
}

/*----------------------------------------- ФОТО НА ВЕСЬ  ---------------------------------------*/

for (let i = 0; i < cards.length; i++) {
  cards[i].children[0].addEventListener("click", function (e) {
    let photoAlbum = document.querySelectorAll(`.photo-album`); //получаем все фото(ячейки)альбома. При клике он перезаписывается

    let sheetRight = document.querySelector(`.sheet-${sheet}`).children[1]; // получаем правую страницу Текущего листа.
    if (e.target.localName == "img") {
      //если кликаем по фото

      /*----------------------------------- ПОЛУЧЕНИЕ ПУТИ ФОТОГРАФИИ ----------------------------------*/

      src = e.target.src; //получаем путь изображения для blur
      blur.style.backgroundImage = `url("${src}")`; //устанавливаем фон
      /*----------------------------------- АКТИВИРУЕМ ----------------------------------*/

      if (!cards[i].classList.contains("card-active")) {
        //если у фото нет класса актив т.е неактивна
        if (sheet == sheetForSwipe) {
          e.target.classList.add("photo-active"); //активируем фото(добавляем класс)
          e.target.parentElement.classList.add("card-active"); //активируем блок с фото (карточку)
          cadr++; //увеличиваем переменную (счетчик мест в листе альбома)
          blur.style.visibility = "visible"; //показываем blur
          blur.style.opacity = "1";
        } else {
          showAlert(
            "На этих страницах альбома нет места!<br> Сначала пролистай альбом!"
          );
        }

        /*----------------------------------- ВЫКЛЮЧАЕМ ----------------------------------*/
      } else {
        //если у фото есть клас, т.е она активна
        if (cadr == 4 && sheet <= 33) {
          // и если счетчик мест в листе альбома равен 4 (т.е заполнен)
          albumWrap.insertAdjacentHTML(
            "beforeend", //добавляем в конец лист в альбом с увеличенным номером листа и индексом 0
            `<div class="sheet sheet-${sheet + 1}" style="z-index:0;">
              <div class="sheet-left">
                <div class="album-photo-box-wrap">
                  <div class="photo-box">
                    <img src="" alt="" class="photo-album">
                  </div>
                  <div class="photo-box">
                    <img src="" alt="" class="photo-album">
                  </div>
                </div>
              </div>

              <div class="sheet-right-rotate">
                <div class="album-photo-box-wrap">
                  <div class="photo-box">
                    <img src="" alt="" class="photo-album">
                  </div>
                  <div class="photo-box">
                    <img src="" alt="" class="photo-album">
                  </div>
                </div>
              </div>
            </div>`
          );
          setTimeout(function () {
            sheetRight.classList.add("rotate");
          }, 500); //переворачиваем правую страницу через полсекунды
          setTimeout(function () {
            sheetRight.children[0].style.opacity = "0";
          }, 750); //делаем правую страницу прозрачной
          setTimeout(function () {
            document.querySelector(`.sheet-${sheet}`).style.display = "none"; //выключаем правую страницу (старую-заполненую)
            sheet++; //меняем счетчик листов
            sheetForSwipe++;
            document.querySelector(`.sheet-${sheet}`).style.zIndex = "1"; //поднимаем новую правую страницу
          }, 1000);
          cadr = 0; //обнуляем счетчик ячеек листа альбома
        }

        blur.style.opacity = "0"; //делаем невидимым blur
        e.target.parentElement.style.display = "none"; //выключаем карточку фотогравии по которой кликнули
        e.target.style.display = "none"; //выключаем саму фотографию
        e.target.parentElement.classList.remove("card-active"); //делаем неактивной карточку фотографии
        e.target.classList.remove("photo-active"); //делаем саму фотографию неактивную
        setTimeout(function () {
          blur.style.visibility = "hidden";
        }, 600); // скрываем blur через полсекунды (для плавности)

        /*----------------------------------- ДОЗАГРУЗКА ФОТОГРАФИЙ ----------------------------------*/

        if (numAddPhoto <= 136) {
          //если счетчик фото которые добавляем меньше их количества
          let index = e.target.parentElement.style.zIndex; //берем индекс карточки
          index = index - 10; //уменьшаем ее на общее кол-во карточек )чтобы сделать самым маленьким (первым)
          e.target.parentElement.style.zIndex = index; //устанавливаем его карточке

          e.target.src = "pics/PhotoMom(Original)/photo" + numAddPhoto + ".jpg"; //меняем ей фотографию с номером счетчика

          numAddPhoto++; //увеличиваем счетчик добавочных фото
          setTimeout(function () {
            //включаем фото и карточку
            e.target.parentElement.style.display = "flex"; //включаем карточку
            e.target.style.display = "block"; //включаем фотографию через полсекунды
          }, 500);
        }

        /*----------------------------------- Увеличение (поднятие) индекса у карточек ----------------------------------*/

        for (let ip = 0; ip < cards.length; ip++) {
          let indexElement = cards[ip].style.zIndex; //получаем текущий индекс
          indexElement++; //увеличиваем его на 1
          cards[ip].style.zIndex = indexElement; //устанавливаем его карточке
        }
        photoAlbum[cardAlbum].src = `${src}`; //устанавливаем (вносим) фото в очередную ячейку альбома
        photoAlbum[cardAlbum].classList.add("photo-album-visible"); //делаем ячейку активной
        cardAlbum++; //увеличиваем счетчик ячеек
      }
    }
  });
}

/*----------------------------------- SWIPE ----------------------------------*/

area.ondragstart = () => false; //выключаем стандартное правило браузера
area.addEventListener("pointerdown", function (event) {
  //при нажатии
  start = {
    x: event.x,
    y: event.y,
  };
});
area.addEventListener("pointerup", function (event) {
  //при конце нажатия поднятия пальца
  if (event)
    end = {
      x: event.x,
      y: event.y,
    };
  way = end.x - start.x; //путь пройденый от начала до конца свайпа
  if (0 < way && way > window.innerWidth / 3) {
    //ЛИСТАНИЕ НАЗАД

    if (sheetForSwipe > 1) {
      //если количество листов в счетчике свайпа больше 1
      let currentSheetNumber = sheetForSwipe; //текущий номер листа
      let previousSheetNumber = sheetForSwipe - 1; //предыдущий номер листа
      let currentSheet = document.querySelector(`.sheet-${sheetForSwipe}`); //текущий лист
      let previousSheet = document.querySelector(
        `.sheet-${previousSheetNumber}`
      ); //предыдущий лист
      let currentLeftPage = document.querySelector(
        `.sheet-${currentSheetNumber}`
      ).children[0]; //левая страница текущего листа
      let currentRightPage = document.querySelector(
        `.sheet-${currentSheetNumber}`
      ).children[1]; //правая страница текущего листа
      let previousLeftPage = document.querySelector(
        `.sheet-${previousSheetNumber}`
      ).children[0]; //левая страница предыдущего листа
      let previousRightPage = document.querySelector(
        `.sheet-${previousSheetNumber}`
      ).children[1]; //правая страница предыдущего листа
      previousRightPage.style.transform = "rotateY(0deg)"; //разворачиваем предыдущий правую страницу
      previousSheet.style.display = "flex"; //включаем предыдущий лист
      currentLeftPage.style.transform = "rotateY(180deg)"; //поворачиваем текущую левую страницу
      previousRightPage.children[0].style.opacity = "1"; //делаем предыдущую правую страницу видимой видимой
      setTimeout(function () {
        currentSheet.style.zIndex = "0";
      }, 250); //опускаем текущий лист
      setTimeout(function () {
        currentSheet.style.display = "none"; //выключаем текущий лист
      }, 500);
      sheetForSwipe--; //уменьшаем счетчик листов для свайпа
    } else {
      //если нет
      showAlert("Это самое начало альбома!");
    }
  }

  if (way < (window.innerWidth / 3) * -1 && way < 0) {
    //ЛИСТАНИЕ ВПЕРЕД
    if (sheetForSwipe < sheet) {
      //если кол-во листов в счетчике для свайпа < кол-ва листов общего
      let currentSheetNumber = sheetForSwipe; //текущий номер листа
      let nextSheetNumber = sheetForSwipe + 1; //предыдущий номер листа
      let currentSheet = document.querySelector(`.sheet-${sheetForSwipe}`);
      let nextSheet = document.querySelector(`.sheet-${nextSheetNumber}`);
      let currentLeftPage = document.querySelector(
        `.sheet-${currentSheetNumber}`
      ).children[0]; //левая страница текущего листа
      let currentRightPage = document.querySelector(
        `.sheet-${currentSheetNumber}`
      ).children[1]; //правая страница текущего листа
      let nextLeftPage = document.querySelector(`.sheet-${nextSheetNumber}`)
        .children[0]; //левая страница предыдущего листа
      let nextRightPage = document.querySelector(`.sheet-${nextSheetNumber}`)
        .children[1]; //правая страница предыдущего листа
      currentRightPage.style.transform = "rotateY(180deg)";
      nextLeftPage.style.transform = "rotateY(0deg)";
      nextRightPage.children[0].style.opacity = "1";
      nextSheet.style.display = "flex";
      setTimeout(function () {
        nextSheet.style.zIndex = "1";
      }, 250);
      setTimeout(function () {
        currentSheet.style.display = "none";
      }, 500);
      sheetForSwipe++;
    } else {
      showAlert("Это самый конец альбома!");
    }
  }
});

/* created by Staritsin Andrey */