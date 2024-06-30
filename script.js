// Definir módulo AngularJS
angular.module('quizApp', [])
.controller('QuizController', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window) {
    // Obtener el ID del parámetro de consulta en la URL
    $scope.id = $location.search().id;
    $scope.randomNumber = 0; // Variable para almacenar el número aleatorio

    // Función para generar un número aleatorio entre 1 y 30
    $scope.usedNumbers = []; // Array para almacenar los números utilizados

$scope.generatepregunta = function() {
    var randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 30) + 1; // Genera número entre 1 y 30
    } while ($scope.usedNumbers.includes(randomNumber)); // Repite si el número ya fue utilizado

    // Agrega el número utilizado al array
    $scope.usedNumbers.push(randomNumber);

    $http.get('https://localhost:7270/api/Preguntas/BuscarPorID/' + randomNumber)
    .then(function(response) {
        $scope.Pregunta = response.data.tPregunta;
    })
    .catch(function(error) {
        console.error('Error al cargar la información del cliente:', error);
        alert('Error al cargar la información del cliente');
    });

    $http.get('https://localhost:7270/api/Respuestas/BuscarPorIrespuesta/' + randomNumber)
    .then(function(response) {
        $scope.Respuesta = response.data;
        console.log($scope.Respuesta)
    })
    .catch(function(error) {
        console.error('Error al cargar la información del cliente:', error);
        alert('Error al cargar la información del cliente');
    });
};
$scope.reiniciar = function() {
    $scope.usedNumbers = []; // Reinicia el array de números utilizados
    
};
    
    // Redirigir función
    $scope.redirigir = function(url) {
        $window.location.href = url + '#!/?id=' + $scope.id; 
    };

    // Variables de estado del cuestionario
    $scope.startQuiz = true;
    $scope.showrespuestanfn = false;
    $scope.showpreguntas=false;
    $scope.showInfo = false;
    $scope.showrespuestaf = false;
    $scope.showrespuestas = true;
    $scope.showQuiz = false;
    $scope.showResult = false;
    $scope.timeLeft = 0; // Tiempo inicial por pregunta en segundos
    $scope.userScore = 0;
    $scope.queCounter = 1;
    $scope.showNextButton = false;
    $scope.currentQuestion = {}; // Objeto para almacenar la pregunta actual
    $scope.timeLeftPercentage = 100;

    // Función para iniciar el cuestionario
    $scope.startQuiz = function() {
        $scope.showInfo = true;
    };

    // Función para continuar desde la información
    $scope.continueQuiz = function() {
        $scope.showpreguntas=true;
        $scope.showInfo = false;
        $scope.showQuiz = true;
        $scope.showNextButton = false;
        $scope.loadQuestion(0); // Cargar primera pregunta
        $scope.startTimer(); // Iniciar temporizador
        $scope.generatepregunta();
    };

    // Función para cargar la pregunta actual
    $scope.loadQuestion = function(index) {
        $scope.timeLeft = 15; 

    };

    // Función para seleccionar una opción de respuesta
    $scope.optionSelected = function(selectedOption) {
        clearInterval($scope.timerInterval); // Detener temporizador
        $scope.showrespuestaf = true;
        $scope.showrespuestas = false;
        selectedOption.selected = true; // Marcar la respuesta seleccionada
        if (selectedOption.correcto === 1) {
            $scope.userScore++; // Incrementar puntaje si es correcta
        }
        $scope.showNextButton = true; // Mostrar botón de siguiente
    };

    // Función para pasar a la siguiente pregunta
    $scope.nextQuestion = function() {
        if ($scope.queCounter < 10) {
            $scope.queCounter++;
            $scope.startTimer(); // Reiniciar temporizador
            $scope.showNextButton = false;
            $scope.showrespuestaf = false;
            $scope.showrespuestafn = false;
            $scope.showrespuestas = true;
            $scope.timeLeft = 15; 
            $scope.generatepregunta(); 
        } else {
            $scope.showpreguntas=false;
            $scope.showResult = true; // Mostrar resultado final

        }
   
        
    };

    // Función para reiniciar el cuestionario
    $scope.restartQuiz = function() {
        $scope.showQuiz = false;
        $scope.showResult = false;
        $scope.showrespuestaf = false;
        $scope.showrespuestafn = false;
        $scope.showrespuestas = true;
        $scope.userScore = 0; // Reiniciar puntaje
        $scope.queCounter = 1; // Reiniciar contador de preguntas
        $scope.startQuiz();
        $scope.reiniciar();
    };

    // Función para salir del cuestionario
    $scope.quitQuiz = function() {
        window.location.reload(); // Recargar la página
        $scope.reiniciar();
    };

    // Función para iniciar el temporizador
    $scope.startTimer = function() {
        $scope.timerInterval = setInterval(function() {
            $scope.$apply(function() {
                $scope.timeLeft--;
                $scope.timeLeftPercentage = ($scope.timeLeft / 15) * 100;
                if ($scope.timeLeft === 0) {
                    clearInterval($scope.timerInterval);
                    $scope.showNextButton = true; // Mostrar botón de siguiente al finalizar el tiempo
                    $scope.showrespuestafn = true;
                    $scope.showrespuestas = false;
                }
            });
        }, 900);
    };
    
}]);
