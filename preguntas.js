$scope.startQuiz = function() {
    $scope.showInfo = true;
};

// Función para continuar desde la información
$scope.continueQuiz = function() {
    $scope.showInfo = false;
    $scope.showQuiz = true;
    $scope.showNextButton = false;
    $scope.loadQuestion(0); // Cargar primera pregunta
    $scope.startTimer(); // Iniciar temporizador
    $scope.generatepregunta();
};

// Función para cargar la pregunta actual
$scope.loadQuestion = function(index) {
    $scope.timeLeft = 10; 
};

// Función para seleccionar una opción de respuesta
$scope.optionSelected = function(selectedOption) {
   clearInterval($scope.timerInterval); // Detener temporizador
   $scope.showrespuestaf = true;
   $scope.showrespuestas = false;
   alert(selectedOption)
        $scope.selectedOption = selectedOption; // Guardar la opción seleccionada
        if (selectedOption === 1) {
            $scope.userScore++; // Incrementar puntaje si es correcta
            alert("correcta")
        }
    $scope.showNextButton = true; // Mostrar botón de siguiente
};

// Función para pasar a la siguiente pregunta
$scope.nextQuestion = function() {
    if ($scope.queCounter < 1) {
        $scope.queCounter++;
        $scope.loadQuestion($scope.queCounter); // Cargar siguiente pregunta
        $scope.startTimer(); // Reiniciar temporizador
        $scope.showNextButton = false;
        $scope.showrespuestaf = false;
        $scope.showrespuestas = true;
        $scope.generatepregunta(); // Ocultar botón de siguiente
    } else {
        $scope.showQuiz = false;
        $scope.showResult = true; // Mostrar resultado final
    }
};

// Función para reiniciar el cuestionario
$scope.restartQuiz = function() {
    $scope.showQuiz = false;
    $scope.showResult = false;
    $scope.userScore = 0; // Reiniciar puntaje
    $scope.queCounter = 0; // Reiniciar contador de preguntas
    $scope.startQuiz(); // Volver a iniciar el cuestionario
};

// Función para salir del cuestionario
$scope.quitQuiz = function() {
    window.location.reload(); // Recargar la página
};

// Función para iniciar el temporizador
$scope.startTimer = function() {
    $scope.timerInterval = setInterval(function() {
        $scope.$apply(function() {
            $scope.timeLeft--;
            if ($scope.timeLeft === 0) {
                clearInterval($scope.timerInterval);
                $scope.showNextButton = true; // Mostrar botón de siguiente al finalizar el tiempo
            }
        });
    }, 1000);
};