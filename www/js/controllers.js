angular.module('starter.controllers', ['ngCordova'])

//
// Controlador de la vista de la camara
//
.controller('CameraCtrl', function($scope, $ionicPopup, $cordovaBarcodeScanner) {

  // Foto por defecto
  $scope.photo = "img/no-available-image.png";

  // Función llamada para hacer la foto o recogerla de la libreria (Depende de SourceType 0 = Libreria 1 = Camara)
  $scope.takePhoto = function(sourceType){

    // Función de exito, en caso de obtener imagen se le asigna al visor del a foto
    var cameraSuccess = function cameraCallback(image) {
      // Es necesario refrescar el scope puesto que esta operación se realiza despues de la llamada al view de la camara
      $scope.$apply(function () { $scope.photo = image; });
    }

    // Función de error, en caso de que no se pueda obtener la imagen, se muestra un alert en la pantalla del usuario
    var cameraError = function cameraCallback(message) {
      $ionicPopup.alert({
        title: 'Camera Error',
        template: message
      });
    }

    // Opciones adicionales de la camara
    var cameraOptions = {
      sourceType: sourceType,
      allowEdit: false
    };

    // Se llama al plugin de camara pasandole como algumento las 2 funciones anteriores y las opciones a la camara
    navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);

  }

  // Función llamada para escanear códigos
  $scope.scanCode = function (){

    // Llamada a la función
    $cordovaBarcodeScanner.scan()

      // En caso de exito
      .then(function(result) {

        // Comprueba si el usuario no ha pulsado el boton de atras
        if (result.cancelled === "0" || result.cancelled == 0 || result.cancelled == false) {

          // Muestra un alert con el contenido del código
          $ionicPopup.alert({
            title: 'Code '+result.format+' readed',
            template: result.text
          });

        }

      // En caso de error
      },function(error) {

        // Muestra un alert con el error
        $ionicPopup.alert({
          title: 'Scan Code Error',
          template: error
        });

      });

  }

})

//
// Controlador de la vista de la geolocalizacion
//
.controller('GeolocationCtrl', function($scope, $ionicPopup, $ionicLoading) {

  // Opciones del plugin de localización
  var options = { timeout: 10000, enableHighAccuracy: true};

  // Opciones de Google Maps
  var mapOptions = {
    center: new google.maps.LatLng(0, 0),
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // Creación del mapa
  $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Función de localización
  $scope.geolozalize = function() {

    // Función en caso de obtener con exito las coordenadas
    var geolocationSuccess = function (position) {

      // Creación del objeto localización tipo Google Map con las coordenadas obtenidas
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      // Establece el centro del mapa las coordenadas obtenidas
      $scope.map.setCenter(latLng);
      $scope.map.setZoom(15);

      // Ocultación de la vista del cargando
      $ionicLoading.hide()

      // Evento que se dispara cuando el mapa está cargado completamente
      google.maps.event.addListenerOnce($scope.map, 'idle', function () {

        // Creación de un marcador en el mapa animado
        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });

        // Creación de ventana cuando se pulsa en el marcador
        var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
        });

        // Se añade el evento para que al pulsar salga la ventana previamente definida
        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });

      });

    }

    // Función en caso de no obtener las coordenadas
    var geolocationError = function (error) {

      // Ocultación de la vista del cargando
      $ionicLoading.hide()

      // Muestra el error
      $ionicPopup.alert({
        title: 'Geolocation Error',
        template: error.message
      });

    }

    // Muestra un cargando
    $ionicLoading.show({template: 'Getting your location...'})

    // Llama al plugin de localización pasandole como argumento las funciones anteriores y las opciones
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, options);

  }

  // Lanza la función de geolocalización
  $scope.geolozalize()

})

//
// Controlador de la vista de información
//
.controller('InformationCtrl', function($scope) {

  // Optención del estado de la conexión
  var networkState = navigator.connection.type;

  // Tipos de estados
  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.CELL]     = 'Cell generic connection';
  states[Connection.NONE]     = 'No network connection';

  // Asignación al tipo de estado correspondiente
  $scope.networkType = states[networkState];

  // Asignación de la información del dispositivo
  $scope.device = device;

})

//
// Controlador de la vista de la motions
//
.controller('MotionsCtrl', function($scope) {

  // Opciones del plugin de acelerometro y giroscopio
  var options = { frequency: 500 };

  // Función en caso de obtener con exito los datos del acelerometro
  var accelerometerOnSuccess = function(acceleration) {
    // Es necesario refrescar el scope puesto que esta operación se realiza despues de la llamada al plugin del acelerometro
    $scope.$apply(function () { $scope.acceleration = acceleration; });
  }

  // Función en caso de no obtener los datos del acelerometro
  var accelerometerOnError = function(error) {

    // Muestra el error
    $ionicPopup.alert({
      title: 'Accelerometer Error',
      template: error.message
    });

  }

  // Función en caso de obtener con exito los datos del acelerometro
  var compassOnSuccess = function(heading) {
    // Es necesario refrescar el scope puesto que esta operación se realiza despues de la llamada al plugin de la brújula
    $scope.$apply(function () { $scope.heading = heading; });
  }

  // Función en caso de no obtener los datos del acelerometro
  var compassOnError = function(error) {

    // Muestra el error
    $ionicPopup.alert({
      title: 'Compass Error',
      template: error.message
    });

  }

  // Se ejecuta cuando se carga la vista y pone los plugin a actualizar la vista cada tiempo configurado en options
  $scope.$on('$ionicView.enter', function(){
    $scope.accelerometerWatchID = navigator.accelerometer.watchAcceleration(accelerometerOnSuccess, accelerometerOnError, options);
    $scope.compassWatchID = navigator.compass.watchHeading(compassOnSuccess, compassOnError, options);
  });

  // Se ejecuta al cerrar la vista y detiene la actualización de los plugins
  $scope.$on('$ionicView.leave', function(){
    navigator.accelerometer.clearWatch($scope.accelerometerWatchID);
    navigator.compass.clearWatch($scope.compassWatchID);
  });

})

//
// Controlador de la vista de la vibración
//
.controller('VibrationCtrl', function($scope) {

  // Duración preterminada (1 segundo)
  $scope.duration = 1000;

  // Función para redondear el numero a mostrar en la vista
  $scope.round = function(i) {
    return Math.round(i * 100)/100;
  }

  // Función de vibración, dado una duración en milisegundos vibra el telefono
  $scope.vibrate = function(duration) {
    navigator.vibrate(parseInt(duration));
  };

})
