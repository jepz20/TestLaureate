//https://www.ibm.com/developerworks/community/blogs/3d274f0f-f47a-4bf0-91ec-8ebad479881b/entry/how_to_implement_a_table_with_lazy_loading_infinite_scroll_in_angularjs?lang=es

var TestLaureate = angular.module('TestLaureateApp', ['ngAnimate']);


TestLaureate.controller('ChannelLaureteCtrl', ['$scope','$http','$window','$sce'
  , function ($scope,$http,$window,$sce) {
    /**
     *Texto del boton de caracteristicas
     *type {string}
     */
    $scope.textoBoton = 'Show Features'
    /**
     *Determina si se muestra o no las caracteristicas
     *type {string}
     */
    $scope.mostrarCaracteristicas = false;
    /**
     *Limite de resultados a mostrar en ngrepeat
     *type {number}
     */
     $scope.limit = 10;

    /**
     * Busca todas las paginas con videos del canal
     * @param {string} nextPageToken
     */
    $scope.busquedaRecursiva = function(nextPageToken) {
      /**
       * Control de si es la ultima pagina con resultados
       * type  {boolean}
       */
      ultimaPagina = false;
      /**
       * Tag del api para siguientePagina
       * type  {boolean}
       */
       siguientePaginaTag = '&pageToken=';

      /**
       * String a incluir en la url para llamar la siguiente pagina
       * type  {string}
       */
      siguientePagina =''

      //Si no hay siguiente pagina es la ultima pagina
     if ( typeof nextPageToken !== "undefined") {
          siguientePagina = siguientePaginaTag + nextPageToken;
      } else {
           ultimaPagina = true;
      }

      apiKey = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCxclN7tg-s_ckx-gDOEft-CxljqHqaIiM&channelId=UCvS6-K6Ydmb4gH-kim3AmjA&part=snippet,id&order=date&maxResults=50' + siguientePagina;
      if (!ultimaPagina) {
          $http.get(apiKey).then(function (youtube) {
              $scope.videos = youtube.data;
              $scope.items = $scope.items.concat($scope.videos.items);
              $scope.busquedaRecursiva(youtube.data.nextPageToken);
          });
      }
    }
    /**
     * Inicia la busqueda reversiva de los videos
     * @param {string} nextPageToken
     */

    $scope.buscarVideos = function() {
      apiKey = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCxclN7tg-s_ckx-gDOEft-CxljqHqaIiM&channelId=UCvS6-K6Ydmb4gH-kim3AmjA&part=snippet,id&order=date&maxResults=50';
      $http.get(apiKey).then(function (youtube) {
          $scope.videos = youtube.data;
          $scope.items = $scope.videos.items;
      });
    }

    /**
     * Abre una nueva ventana y muestra el video seleccionado
     * @param url {string} pagina a la que se desea ir
     */
     $scope.irAUrl = function (url) {
        $window.open(url);
     }
    /**
     * retorna una URL segura que pueda ser usada como source
     * @param videoId {string} video a la que se desea ir
     */
     $scope.mostrarVideo = function (videoId) {
        return $sce.trustAsResourceUrl('http://www.youtube.com/embed/'+videoId+'?rel=0');
     }

    /**
     * Aumenta el limite de videos mostrados
     */
     $scope.cargarMasVideos = function() {
        $scope.limit = $scope.limit + 10;
     }

    /**
     * Da formata a la fecha
     *@param fecha {string} fecha a formatear
     */
     $scope.formatearFecha = function(fecha) {
        return fecha.substring(8,10) + fecha.substring(7,8) +
         fecha.substring(5,7) + fecha.substring(4,5) + fecha.substring(0,4);
     }

     /**
      * Vuelve a poner el limite al valor inicial
      **/
      $scope.resetearLimite = function() {
        $scope.limit = 10;
      }

      /**
       * Cambia el estado de mostrar o ocultar caracteristicas
       *
       **/
       $scope.mostrarOcultarCaracteristicas= function() {
        $scope.mostrarCaracteristicas = !$scope.mostrarCaracteristicas;
        if ($scope.mostrarCaracteristicas) {
          $scope.textoBoton = 'Hide Features';
        } else {
          $scope.textoBoton = 'Show Features';
        }
      }
  }
]);
