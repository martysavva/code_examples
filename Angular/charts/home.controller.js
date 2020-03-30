(function() {
    'use strict';

    angular
        .module('app.stannah')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['titleFactory', 'Storage', 'ActivityData', 'usSpinnerService', 'SystemInfo'];

    /* @ngInject */
    function HomeController(titleFactory, Storage, ActivityData, usSpinnerService, SystemInfo) {
        var vm = this;

        vm.checkIfSystemStored = checkIfSystemStored;
        vm.getActivityData     = getActivityData;

        vm.systemId         = null;
        vm.activityData     = null;
        vm.lastActivityTime = null;
        vm.showContent      = false;
        vm.timeZone         = null;


        vm.dateRange        = {
            startOfPreviousDay: null,
            startOfDay: null,
            endOfDay: null
        };


        activate();

        ////////////////

        function activate() {
            titleFactory.setTitle('Home');
            vm.checkIfSystemStored();
        }

        function checkIfSystemStored(){
            if (Storage.defaultSystemExists()) {
                vm.systemId = Storage.getDefaultSystem();
                getTimezone();
            }
        }

        function getTimezone(){
            return SystemInfo.getSystemInfo()
                .then(function(response){
                    if(response.status === 200){
                        vm.timeZone = response.data.timeZoneValue.timeZone;

                        var hubNow = moment();
                        if (vm.timeZone != null && vm.timeZone > 0) {
                            hubNow = moment().tz(vm.timeZone);
                        }

                        vm.dateRange.startOfPreviousDay = moment(hubNow).subtract(1, 'days').startOf('day').unix() * 1000;
                        vm.dateRange.startOfDay         = moment(hubNow).startOf('day').unix() * 1000;
                        vm.dateRange.endOfDay           = moment(hubNow).endOf('day').unix() * 1000;

                        vm.getActivityData(
                            vm.dateRange.startOfPreviousDay/1000,
                            vm.dateRange.endOfDay/1000,
                            vm.systemId
                        )
                    } else {
                        SystemInfo.reset();
                    }
                })
        }

        function getActivityData(startOfPreviousDay, endOfDay, systemId){
            //start spinner
            usSpinnerService.spin('spinner');
            ActivityData.getActivityData(startOfPreviousDay, endOfDay, systemId, true)
                .then(function(response){
                    if (response.status == 200) {
                        vm.activityData     = response;
                        vm.lastActivityTime = response.data._lastActivityTime;
                        vm.showContent      = true;
                        //stop spinner
                        usSpinnerService.stop('spinner');
                    }
                });
        }

    }
})();