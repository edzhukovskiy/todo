(function () {
    'use strict';

    angular
        .module('app')
        .factory('PriorityService', PriorityService);

    PriorityService.$inject = ['$http'];
    function PriorityService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;

        return service;

        function GetAll() {
            return $http.get('http://localhost/todo/public/priority').then(handleSuccess, handleError('Error getting priority list'));
        }

        function GetById(id) {
            return $http.get('http://localhost/todo/public/priority/' + id).then(handleSuccess, handleError('Error getting priority by id'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
