
const initMap = () => {
  const container = document.querySelector('[data-map="map-1"]');

  const zoomValue = container.dataset.zoom;
  const centerValue = container.dataset.center.split(',');

  console.log(centerValue);

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
      iconImageHref: 'img/file/map-pin.png',
      // Размеры метки.
      iconImageSize: [100, 100],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-50, -115],
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

export {initMap};
