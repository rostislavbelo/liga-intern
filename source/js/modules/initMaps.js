import json from '../../data/data.json';

const initMaps = () => {
  const maps = document.querySelectorAll('[data-map]');

  if (maps.length === 0) {
    return;
  }

  const initMap = (container) => {

    const zoomValue = container.dataset.zoom;
    const centerValue = container.dataset.center.split(',');

    window.ymaps.ready(function () {
      let myMap = new window.ymaps.Map(container, {
        center: centerValue,
        zoom: zoomValue,
      }, {
        searchControlProvider: 'yandex#search',
      });

      // - Удаляем ненужные панели
      myMap.behaviors.disable('scrollZoom');
      myMap.controls.remove('zoomControl');
      myMap.controls.remove('geolocationControl');
      myMap.controls.remove('searchControl');
      myMap.controls.remove('routeButtonControl');
      myMap.controls.remove('trafficControl');
      myMap.controls.remove('typeSelector');
      myMap.controls.remove('fullscreenControl');

      // Добавляем главную метку
      let myPlacemark = new window.ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Собственный значок метки',
      }, {
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/file/main-pin.png',
        // Размеры метки.
        iconImageSize: [62, 76],
        iconImageOffset: [-31, -70],
      });

      myMap.geoObjects
          .add(myPlacemark);

      // Добавляем пины без опций
      const addPins = () => {
        let objectManager = new window.ymaps.ObjectManager();
        myMap.geoObjects.add(objectManager);
        objectManager.add(json);
      };

      if (container.dataset.pins === 'default') {
        addPins();
      }

      // Добавляем пины с фильтрацией
      const filterPins = () => {

        const filtersBlock = document.querySelector('[data-filters]');
        const filterCollection = filtersBlock.querySelectorAll('input');

        const filterAll = filtersBlock.querySelector('#filterAll');
        const filterPark = filtersBlock.querySelector('#filterPark');
        const filterMuseum = filtersBlock.querySelector('#filterMuseum');
        const filterChildren = filtersBlock.querySelector('#filterChildren');
        const filterHospital = filtersBlock.querySelector('#filterHospital');
        const filterSchool = filtersBlock.querySelector('#filterSchool');

        function checkState() {
          let shownObjects;
          let result = new window.ymaps.GeoQueryResult();

          if (filterAll.checked) {
            result = window.myObjects;
          }

          if (filterPark.checked) {
            result = window.myObjects.search('options.name = "park"');
          }

          if (filterMuseum.checked) {
            result = window.myObjects.search('options.name = "museum"');
          }

          if (filterChildren.checked) {
            result = window.myObjects.search('options.name = "children"');
          }

          if (filterHospital.checked) {
            result = window.myObjects.search('options.name = "hospital"');
          }

          if (filterSchool.checked) {
            result = window.myObjects.search('options.name = "school"');
          }

          // Выводим на карте объекты,
          shownObjects = result.addToMap(myMap);

          // убираем бъекты, которые не попали в выборку
          window.myObjects.remove(shownObjects).removeFromMap(myMap);
        }

        filterCollection.forEach((filter) => {
          filter.addEventListener('click', checkState);
        });

        window.myObjects = window.ymaps.geoQuery(json).addToMap(myMap);
      };


      if (container.dataset.pins === 'filter') {
        filterPins();
      }

      // Инициализируем Зум с ctrl c сообщением на карте
      const showMessage = () => {
        const message = container.closest('.map__inner').querySelector('[data-map-superzoom]');
        let sign = true;
        let hidden = null;

        document.addEventListener('keydown', (evt) => {
          if (evt.key === 'Control') {
            sign = false;
            myMap.behaviors.enable('scrollZoom');
            message.classList.remove('is-active');
            clearInterval(hidden);

            document.addEventListener('keyup', () => {
              if (evt.key === 'Control') {
                sign = true;
                myMap.behaviors.disable('scrollZoom');
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

      if (container.dataset.message === 'true') {
        showMessage();
      }

      // Добавляем пины с кластеризацией
      const addClastersPins = () => {

        let customItemContentLayout = window.ymaps.templateLayoutFactory.createClass(
            '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>'
        );

        let objectManager = new window.ymaps.ObjectManager(
            {
              clusterDisableClickZoom: true,
              clusterOpenBalloonOnClick: true,
              clusterBalloonContentLayout: 'cluster#balloonCarousel',
              clusterBalloonItemContentLayout: customItemContentLayout,
              clusterBalloonPanelMaxMapArea: 0,
              clusterBalloonContentLayoutWidth: 300,
              clusterBalloonContentLayoutHeight: 80,
              clusterBalloonPagerSize: 10,
              clusterBalloonPagerType: 'marker',
              clusterize: true,
              gridSize: 185,
              clusterIconLayout: 'default#pieChart',
            }
        );

        myMap.geoObjects.add(objectManager);
        objectManager.add(json);
      };

      if (container.dataset.pins === 'clasters') {
        addClastersPins();
      }
    });
  };

  maps.forEach((map) => {
    initMap(map);
  });
};

export {initMaps};
