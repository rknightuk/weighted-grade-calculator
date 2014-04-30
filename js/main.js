var weightApp = angular.module('weightApp', []);

weightApp.controller('CalcController', function($scope) {

	var base_units = [
		{
			unit_name: 'Unit',
			assignments: [
				{ assignment_name: '', assignment_grade: '', overall_percentage: '' }
			]
		}
	];

	if (localStorage.units === '' || localStorage.units === null || localStorage.units === undefined) {
		$scope.units = base_units;
	}
	else {
		$scope.units = angular.fromJson(localStorage.units);
	}

	// $scope.confirmReset = function() {
	// 	var confirmReset = confirm("Are you sure?");
	// 	if (confirmReset) {
	// 		$scope.reset();
	// 	}
	// };

	// $scope.reset = function() {
	// 	localStorage.clear();
	// 	$scope.units = base_units;
	// };

	$scope.addUnit = function() {
		$scope.units.push({
			unit_name: 'Unit',
			assignments: [
				{ assignment_name: '', assignment_grade: '', overall_percentage: '' }
			]
		});
	};
	
	$scope.addAssignment = function(unit) {
		unit.assignments.push({assignment_name: '', assignment_grade: '', overall_percentage: ''});
	};

	$scope.storeGrades = function() {
		localStorage.units = angular.toJson($scope.units);
	};

	$scope.calculateGrade = function(unit) {
		$scope.storeGrades();
		var totalPercent = 0,
			finalGrade = 0;

		angular.forEach(unit.assignments, function(assignment, key) {
			totalPercent += assignment.overall_percentage;
			finalGrade += (assignment.assignment_grade * assignment.overall_percentage) / 100;
		});

		return finalGrade;
	};

	$scope.calculateTotalPercent = function(unit) {
		var totalPercent = 0;

		angular.forEach(unit.assignments, function(assignment, key){
			totalPercent += assignment.overall_percentage;
		});

		return totalPercent;
	};

	$scope.deleteAssignment = function(unit, index) {
		unit.assignments.splice(index, 1);
	};

	$scope.deleteUnit = function(index) {
		var confirmReset = confirm("Are you sure?");
		if (confirmReset) {
			$scope.units.splice(index, 1);
		}
	};

});