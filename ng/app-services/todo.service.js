(function () {
    'use strict';

    angular
        .module('app')
        .factory('ToDoService', ToDoService);

    ToDoService.$inject = ['$http'];
    function ToDoService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get(apiURL+'list').then(handleSuccess, handleError('Error getting todo list'));
        }

        function GetById(id) {
            return $http.get(apiURL+'list/' + id).then(handleSuccess, handleError('Error getting todo by id'));
        }

        function Create(data) {
            return $http.post(apiURL+'list', data).then(handleSuccess, handleError('Error creating todo'));
        }

        function Update(id,data) {
            return $http.put(apiURL+'list/' + id, data).then(handleSuccess, handleError('Error updating todo'));
        }

        function Delete(id) {
            return $http.delete(apiURL+'list/' + id).then(handleSuccess, handleError('Error deleting todo'));
        }


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
