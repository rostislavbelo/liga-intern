
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


    // Убираем и устанавливаем возможность масштабирования по нажатию на ctrl
    const message = document.querySelector('[data-map="superzoom"]');

    const showMessage = () => {

      let sign = true;

      let hidden = null;

      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Control') {
          sign = false;
          myMap2.behaviors.enable('scrollZoom');
          message.classList.remove('is-active');
          clearInterval(hidden);


          document.addEventListener('keyup', () => {
            if (evt.key === 'Control') {
              sign = true;
              myMap2.behaviors.disable('scrollZoom');
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


const initMap4 = () => {

  const container = document.querySelector('[data-map="map-4"]');

  if (!container) {
    return;
  }

  // const zoomValue = container.dataset.zoom;
  // const centerValue = container.dataset.center.split(',');

  ymaps.ready(function () {


    let myMap = new ymaps.Map(container, {
      center: [55.76, 37.64],
      zoom: 10,
      controls: [],
    }, {
      searchControlProvider: 'yandex#search',
    });
    let objectManager = new ymaps.ObjectManager({
      // Чтобы метки начали кластеризоваться, выставляем опцию.
      // clusterize: true,
      // ObjectManager принимает те же опции, что и кластеризатор.
      // gridSize: 64,
      // Макет метки кластера pieChart.
      clusterIconLayout: 'default#pieChart',
    });
    myMap.geoObjects.add(objectManager);

    // Создадим 5 пунктов выпадающего списка.
    let listBoxItems = ['Школа', 'Аптека', 'Магазин', 'Больница', 'Бар']
      .map(function (title) {
        return new ymaps.control.ListBoxItem({
          data: {
            content: title,
          },
          state: {
            selected: true,
          },
        });
      });
    let reducer = function (filters, filter) {
      filters[filter.data.get('content')] = filter.isSelected();
      return filters;
    };
    // Теперь создадим список, содержащий 5 пунктов.
    let listBoxControl = new ymaps.control.ListBox({
      data: {
        content: 'Фильтр',
        // title: 'Фильтр',
      },
      items: listBoxItems,
      state: {
        // Признак, развернут ли список.
        expanded: true,
        filters: listBoxItems.reduce(reducer, {}),
      },
    });
    myMap.controls.add(listBoxControl);

    // Добавим отслеживание изменения признака, выбран ли пункт списка.
    listBoxControl.events.add(['select', 'deselect'], function (e) {
      let listBoxItem = e.get('target');
      let filters = ymaps.util.extend({}, listBoxControl.state.get('filters'));
      filters[listBoxItem.data.get('content')] = listBoxItem.isSelected();
      listBoxControl.state.set('filters', filters);
    });

    let filterMonitor = new ymaps.Monitor(listBoxControl.state);
    filterMonitor.add('filters', function (filters) {
      // Применим фильтр.
      objectManager.setFilter(getFilterFunction(filters));
    });

    function getFilterFunction(categories) {
      return function (obj) {
        let content = obj.properties.balloonContent;
        return categories[content];
      };
    }

    $.ajax({
      url: 'data/dataTest.json',
    }).done(function (data) {
      objectManager.add(data);
    });

  });
};

export { initMap, initMap2, initMap3, initMap4 };
