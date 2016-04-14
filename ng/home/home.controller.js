(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['ToDoService','PriorityService' ,'$rootScope'];
    function HomeController(ToDoService,PriorityService, $rootScope) {
        var vm = this;

        vm.loader = false;
        vm.checkBox = [];
        vm.errors   = [];
        vm.checked  = false;
        vm.itemData = {};
        vm.todo     = {};
        vm.list     = [];
        vm.priorityList = [];

        vm.checkedTrue = checkedTrue;
        vm.deleteItem = deleteItem;
        vm.doneItem = doneItem;
        vm.createItem = createItem;
        vm.loadCurrentToDo = loadCurrentToDo;
        vm.updateItem = updateItem;

        initController();

        function initController() {
            loadList();
            loadPriorityList();
        }

        function loadCurrentToDo(id) {
            ToDoService.GetById(id)
                .then(function (todo) {
                    vm.todo = todo;
                });
        }

        function createItem()
        {
            vm.loader = true;
            vm.errors = [];
            if(!vm.itemData.priority_id) {
                vm.errors.push('Please select one priority');
            }
            if(!vm.itemData.title) {
                vm.errors.push('Please fill title');
            }
            if(vm.errors.length)
            {
                vm.loader = false;
                return false;
            }
            ToDoService.Create(vm.itemData).then(function (answer)
            {
                if(answer.success)
                {
                    vm.loader = false;
                    vm.itemData.title = "";
                    vm.itemData.priority_id = "";
                    loadList();
                }
                else
                    vm.loader = false;
            });
        }

        function loadPriorityList()
        {
            PriorityService.GetAll().then(function (priorityList) {
                vm.priorityList = priorityList;
            });
        }

        function loadList() {
            ToDoService.GetAll()
                .then(function (toDoList) {
                    vm.list = toDoList;
                });
        }
        
        function updateItem(id)
        {
            vm.loader = true;
            ToDoService.Update(id,vm.todo).then(function (answer) {
                if(answer.success)
                {
                    vm.loader = false;
                    loadList();
                }else
                    vm.loader = false;
            });
        }

        function deleteItem(id)
        {
            vm.loader = true;
            if(confirm("Are You sure You want to delete this todo"))
            {
                ToDoService.Delete(id)
                    .then(function () {
                        vm.loader = false;
                        loadList();
                    });
            }
        }

        function doneItem(item_id,checked)
        {
            vm.todo.done = checked;
            vm.updateItem(item_id);
        }
        function checkedTrue(val1,val2)
        {
            return val1 == val2;
        }
    }

})();