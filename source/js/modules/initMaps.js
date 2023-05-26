
const initMap = () => {
  const container = document.querySelector('[data-map="map-1"]');

  if (!container) {
    return;
  }

  const zoomValue = container.dataset.zoom;
  const centerValue = container.dataset.center.split(',');

  ymaps.ready(function () {
    let myMap = new ymaps.Map(container, {
      center: centerValue,
      zoom: zoomValue,
    }, {
      searchControlProvider: 'yandex#search',
    });

    // Убираем ненужные эл-ты управления

    myMap.behaviors.disable('scrollZoom');

    myMap.controls.remove('zoomControl');

    myMap.controls.remove('geolocationControl');

    myMap.controls.remove('searchControl');

    myMap.controls.remove('routeButtonControl');

    myMap.controls.remove('trafficControl');

    myMap.controls.remove('typeSelector');

    myMap.controls.remove('fullscreenControl');

    // Создаём макет содержимого.
    // let MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
    //     '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    // );

    let myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: 'Собственный значок метки',
      // balloonContent: 'Это красивая метка',
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'img/file/main-pin.png',
      // Размеры метки.
      iconImageSize: [62, 76],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-31, -70],
    });

    // let myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
    //   hintContent: 'Собственный значок метки с контентом',
    //   balloonContent: 'А эта — новогодняя',
    //   iconContent: '12',
    // }, {
    //   // Опции.
    //   // Необходимо указать данный тип макета.
    //   iconLayout: 'default#imageWithContent',
    //   // Своё изображение иконки метки.
    //   iconImageHref: 'images/ball.png',
    //   // Размеры метки.
    //   iconImageSize: [48, 48],
    //   // Смещение левого верхнего угла иконки относительно
    //   // её "ножки" (точки привязки).
    //   iconImageOffset: [-24, -24],
    //   // Смещение слоя с содержимым относительно слоя с картинкой.
    //   iconContentOffset: [15, 15],
    //   // Макет содержимого.
    //   iconContentLayout: MyIconContentLayout,
    // });

    myMap.geoObjects
        .add(myPlacemark);
    // .add(myPlacemarkWithContent);
  });
};


const initMap2 = () => {

  const container = document.querySelector('[data-map="map-2"]');

  if (!container) {
    return;
  }

  const zoomValue = container.dataset.zoom;
  const centerValue = container.dataset.center.split(',');

  ymaps.ready(function () {

    let myMap2 = new ymaps.Map(container, {
      center: centerValue,
      zoom: zoomValue,
    }, {
      searchControlProvider: 'yandex#search',
    });

    myMap2.behaviors.disable('scrollZoom');

    myMap2.controls.remove('zoomControl');

    myMap2.controls.remove('geolocationControl');

    myMap2.controls.remove('searchControl');

    myMap2.controls.remove('routeButtonControl');

    myMap2.controls.remove('trafficControl');

    myMap2.controls.remove('typeSelector');

    myMap2.controls.remove('fullscreenControl');


    let myPlacemark = new ymaps.Placemark(myMap2.getCenter(), {
      hintContent: 'Собственный значок метки',
      // balloonContent: 'Это красивая метка',
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'img/file/main-pin.png',
      // Размеры метки.
      iconImageSize: [62, 76],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-31, -70],
    });

    myMap2.geoObjects
        .add(myPlacemark);

    let objectManager = new window.ymaps.ObjectManager();

    myMap2.geoObjects.add(objectManager);

    $.ajax({
      url: 'data/data.json',
    }).done(function (data) {
      objectManager.add(data);
    });

  });

};


const initMap3 = () => {

  const container = document.querySelector('[data-map="map-3"]');

  if (!container) {
    return;
  }

  const zoomValue = container.dataset.zoom;
  const centerValue = container.dataset.center.split(',');

  ymaps.ready(function () {

    let myMap3 = new ymaps.Map(container, {
      center: centerValue,
      zoom: zoomValue,
    }, {
      searchControlProvider: 'yandex#search',
    });

    myMap3.behaviors.disable('scrollZoom');

    myMap3.controls.remove('zoomControl');

    myMap3.controls.remove('geolocationControl');

    myMap3.controls.remove('searchControl');

    myMap3.controls.remove('routeButtonControl');

    myMap3.controls.remove('trafficControl');

    myMap3.controls.remove('typeSelector');

    myMap3.controls.remove('fullscreenControl');


    // Убираем и устанавливаем возможность масштабирования по нажатию на ctrl
    const message = document.querySelector('[data-map="superzoom"]');

    const showMessage = () => {

      let sign = true;

      let hidden = null;

      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Control') {
          sign = false;
          myMap3.behaviors.enable('scrollZoom');
          message.classList.remove('is-active');
          clearInterval(hidden);


          document.addEventListener('keyup', () => {
            if (evt.key === 'Control') {
              sign = true;
              myMap3.behaviors.disable('scrollZoom');
            }
          });
        }
      });

      const show = () => {
        if (sign) {
          message.classList.add('is-active');
          hidden = setTimeout(() => {
            message.classList.remove('is-active');
          }, 2000);
        }
        return;
      };

      container.addEventListener('wheel', show, clearTimeout(hidden));

    };

    if (message) {
      showMessage();
    }

    let myPlacemark = new ymaps.Placemark(myMap3.getCenter(), {
      hintContent: 'Собственный значок метки',
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'img/file/main-pin.png',
      // Размеры метки.
      iconImageSize: [62, 76],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-31, -70],
    });

    myMap3.geoObjects
        .add(myPlacemark);

    function checkState() {
      let shownObjects;
      let byColor = new ymaps.GeoQueryResult();


      if ($('#filterAll').prop('checked')) {
        byColor = myObjects;
      }

      // Отберем объекты по признакам.
      if ($('#filterPark').prop('checked')) {
        byColor = myObjects.search('options.name = "park"');
      }

      if ($('#filterMuseum').prop('checked')) {
        byColor = myObjects.search('options.name = "museum"');
      }

      if ($('#filterChildren').prop('checked')) {
        byColor = myObjects.search('options.name = "children"');
      }

      if ($('#filterHospital').prop('checked')) {
        byColor = myObjects.search('options.name = "hospital"');
      }

      if ($('#filterSchool').prop('checked')) {
        byColor = myObjects.search('options.name = "school"');
      }

      // Выводим на карте объекты,
      shownObjects = byColor.addToMap(myMap3);

      // убираем бъекты, которые не попали в выборку
      myObjects.remove(shownObjects).removeFromMap(myMap3);
    }

    $('#filterAll').click(checkState);
    $('#filterPark').click(checkState);
    $('#filterMuseum').click(checkState);
    $('#filterChildren').click(checkState);
    $('#filterHospital').click(checkState);
    $('#filterSchool').click(checkState);

    $.ajax({
      url: 'data/data.json',
    }).done(function (data) {
      window.myObjects = ymaps.geoQuery(data).addToMap(myMap3);
    });

  });

};

const initMap4 = () => {

  const container = document.querySelector('[data-map="map-4"]');

  if (!container) {
    return;
  }

  const zoomValue = container.dataset.zoom;
  const centerValue = container.dataset.center.split(',');

  ymaps.ready(function () {

    let myMap4 = new ymaps.Map(container, {
      center: centerValue,
      zoom: zoomValue,
    }, {
      searchControlProvider: 'yandex#search',
    });

    myMap4.behaviors.disable('scrollZoom');

    myMap4.controls.remove('zoomControl');

    myMap4.controls.remove('geolocationControl');

    myMap4.controls.remove('searchControl');

    myMap4.controls.remove('routeButtonControl');

    myMap4.controls.remove('trafficControl');

    myMap4.controls.remove('typeSelector');

    myMap4.controls.remove('fullscreenControl');

    const message = document.querySelector('[data-map="superzoom"]');

    const showMessage = () => {

      let sign = true;

      let hidden = null;

      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Control') {
          sign = false;
          myMap4.behaviors.enable('scrollZoom');
          message.classList.remove('is-active');
          clearInterval(hidden);


          document.addEventListener('keyup', () => {
            if (evt.key === 'Control') {
              sign = true;
              myMap4.behaviors.disable('scrollZoom');
            }
          });
        }
      });

      const show = () => {
        if (sign) {
          message.classList.add('is-active');
          hidden = setTimeout(() => {
            message.classList.remove('is-active');
          }, 2000);
        }
        return;
      };

      container.addEventListener('wheel', show, clearTimeout(hidden));

    };

    if (message) {
      showMessage();
    }


    let myPlacemark = new ymaps.Placemark(myMap4.getCenter(), {
      hintContent: 'Собственный значок метки',
      // balloonContent: 'Это красивая метка',
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'img/file/main-pin.png',
      // Размеры метки.
      iconImageSize: [62, 76],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-31, -70],
    });

    myMap4.geoObjects
        .add(myPlacemark);


    // Создаем собственный макет с информацией о выбранном геообъекте.
    let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
        '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>'
    );

    let objectManager = new window.ymaps.ObjectManager(
        {
          clusterDisableClickZoom: true,
          clusterOpenBalloonOnClick: true,
          // Устанавливаем стандартный макет балуна кластера "Карусель".
          clusterBalloonContentLayout: 'cluster#balloonCarousel',
          // Устанавливаем собственный макет.
          clusterBalloonItemContentLayout: customItemContentLayout,
          // Устанавливаем режим открытия балуна.
          // В данном примере балун никогда не будет открываться в режиме панели.
          clusterBalloonPanelMaxMapArea: 0,
          // Устанавливаем размеры макета контента балуна (в пикселях).
          clusterBalloonContentLayoutWidth: 300,
          clusterBalloonContentLayoutHeight: 80,
          // Устанавливаем максимальное количество элементов в нижней панели на одной странице
          clusterBalloonPagerSize: 10,
          // Настройка внешнего вида нижней панели.
          // Режим marker рекомендуется использовать с небольшим количеством элементов.
          clusterBalloonPagerType: 'marker',
          // Можно отключить зацикливание списка при навигации при помощи боковых стрелок.
          // clusterBalloonCycling: false,
          // Можно отключить отображение меню навигации.
          // clusterBalloonPagerVisible: false\
          // Чтобы метки начали кластеризоваться, выставляем опцию.
          clusterize: true,
          // ObjectManager принимает те же опции, что и кластеризатор.
          gridSize: 185,
          // Макет метки кластера pieChart.
          clusterIconLayout: 'default#pieChart',
        }
    );


    myMap4.geoObjects.add(objectManager);

    $.ajax({
      url: 'data/data.json',
    }).done(function (data) {
      objectManager.add(data);
    });
  });
};

export {initMap, initMap2, initMap3, initMap4};
