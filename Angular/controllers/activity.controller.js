(function() {
    'use strict';

    angular
        .module('app.stannah')
        .controller('ActivityController', ActivityController);

    ActivityController.$inject = ['$sce', 'titleFactory', 'Storage', 'ActivityData', 'usSpinnerService', 'STANNAH_EVENTS','SmartplugMapping','MESSAGE_TYPE', 'CircleOfFriends', 'ImagePath', 'SystemInfo'];

    /* @ngInject */
    function ActivityController($sce, titleFactory, Storage, ActivityData, usSpinnerService, STANNAH_EVENTS, SmartplugMapping, MESSAGE_TYPE, CircleOfFriends, ImagePath, SystemInfo) {
        var vm = this;

        vm.checkIfSystemStored  = checkIfSystemStored;
        vm.getActivityData      = getActivityData;
        vm.displayTime          = displayTime;
        vm.displayIcon          = displayIcon;
        vm.displayMessage       = displayMessage;
        vm.displayMessageSender = displayMessageSender;
        vm.userHasImage         = userHasImage;
        vm.getUserImageHash     = getUserImageHash;
        vm.displayMessageIcon   = displayMessageIcon;
        vm.closeAlert           = closeAlert;
        vm.STANNAH_EVENTS       = STANNAH_EVENTS;
        vm.imagePath            = ImagePath;
        vm.timeZone             = null;

        vm.systemId         = null;
        vm.activityData     = null;
        vm.lastActivityTime = null;
        vm.showContent      = false;
        vm.CircleOfFriends  = null;
        vm.dateRange        = {
            startOfPreviousDay: moment().subtract(5,'days').startOf('day').unix()*1000,
            startOfDay: moment().startOf('day').unix()*1000,
            endOfDay: moment().endOf('day').unix()*1000
        };
        vm.messages = {
            getActivityError: 'Could not retrieve Activity data, please try again.',
            timezoneError: 'Could not retrieve Timezone.'
        }

        activate();

        ////////////////

        function activate() {
            closeAlert();
            titleFactory.setTitle('Activity');
            vm.checkIfSystemStored();
        }

        function checkIfSystemStored(){
            if (Storage.defaultSystemExists()) {
                vm.systemId = Storage.getDefaultSystem();
                //retrieve timezone first before retrieving
                getTimeZone();
            }
        }

        function getTimeZone(){
            return SystemInfo.getSystemInfo()
                .then(function(response){
                    if(response.status === 200){
                        vm.timeZone = response.data.timeZoneValue.timeZone;
                        getCircleOfFriends();
                    } else {
                        addAlertMessage(vm.messages.timezoneError);
                        showAlert(MESSAGE_TYPE.fail);
                    };
                })
        }

        function getCircleOfFriends(){
            //circle of friends required to get users images to insert into messages
            CircleOfFriends.getCircleOfFriends()
                .then(function(response){
                    if(response.status == 200){
                        vm.CircleOfFriends = response;
                    }
                    //get activity data regardless of 'CircleOfFriends' success
                    vm.getActivityData(
                        vm.dateRange.startOfPreviousDay/1000,
                        vm.dateRange.endOfDay/1000,
                        vm.systemId
                    )
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
                    } else {
                        //stop spinner
                        usSpinnerService.stop('spinner');
                        //display error message
                        addAlertMessage(vm.messages.getActivityError);
                        showAlert(MESSAGE_TYPE.fail);
                    }
                });

        }

        /**
         *
         * @param unixTimestamp
         * @param displayDay: boolean, either displays day if true / time if false
         * @returns {*}
         */
        function displayTime(unixTimestamp, displayDay){

            var suppliedDate = moment.unix(unixTimestamp);

            var reference = moment();
            var today = reference.clone().startOf('day');
            var yesterday = reference.clone().subtract(1, 'days').startOf('day');


            if(suppliedDate.isSame(today, 'd')) {
                //return if today
                if(displayDay){
                    return '';
                } else {
                    return moment.unix(unixTimestamp).tz(vm.timeZone).format('HH:mm');
                }
            } else
            if(suppliedDate.isSame(yesterday, 'd')) {
                //return if yesterday
                if(displayDay){
                    return 'yesterday';
                } else {
                    return moment.unix(unixTimestamp).tz(vm.timeZone).format('HH:mm');
                }
            } else {
                //return if any other day
                if(displayDay){
                    return moment.unix(unixTimestamp).tz(vm.timeZone).format('dddd')
                } else {
                    return moment.unix(unixTimestamp).tz(vm.timeZone).format('HH:mm');
                }
            }
        }
        function displayIcon(event){
            //smartplugs
            if(event.type === STANNAH_EVENTS.devices.smartplug){
                if(event.function === STANNAH_EVENTS.plugType.beverage){
                    if(event.state === 'ON'){
                        return SmartplugMapping.getIconMapping(event.name,true) + ' stannah-blue';
                    } else {
                        return SmartplugMapping.getIconMapping(event.name,false) + ' stannah-grey-4';
                    }
                };
                if(event.function === STANNAH_EVENTS.plugType.food){
                    if(event.state === 'ON'){
                        return SmartplugMapping.getIconMapping(event.name,true) + ' stannah-yellow';
                    } else {
                        return SmartplugMapping.getIconMapping(event.name,false) + ' stannah-grey-4';
                    }
                };
                if(event.function === STANNAH_EVENTS.plugType.entertainment){
                    if(event.state === 'ON'){
                        return SmartplugMapping.getIconMapping(event.name,true) + ' stannah-orange';
                    } else {
                        return SmartplugMapping.getIconMapping(event.name,false) + ' stannah-grey-4';
                    }
                };
            };

            //Stairlift
            if(event.type === STANNAH_EVENTS.devices.stairlift){
                if(event.travel === STANNAH_EVENTS.travel.down){
                    return 'geo-glyphicon-stairlift-down-square stannah-red';
                } else if(event.travel === STANNAH_EVENTS.travel.up) {
                    return 'geo-glyphicon-stairlift-up-square stannah-red';
                } else if(event.travel === STANNAH_EVENTS.travel.midway) {
                    return 'geo-glyphicon-stairlift-midpoint-square stannah-red';
                } else {
                    return 'geo-glyphicon-stairlift-unknown-square stannah-red';
                }
            };
            //Message
            if(event.type === STANNAH_EVENTS.devices.message){
                return 'geo-glyphicon-network-user stannah-purple';
            };
            //Temperature
            if(event.type === STANNAH_EVENTS.devices.temperature){
                return 'geo-glyphicon-temperature-square stannah-red';
            };
        }
        function displayMessage(event){
            //smartplugs
            if(event.type === STANNAH_EVENTS.devices.smartplug){
                if(event.function === STANNAH_EVENTS.plugType.beverage){
                    return _message(event.state, event.name);
                };
                if(event.function === STANNAH_EVENTS.plugType.food){
                    return _message(event.state, event.name);
                };
                if(event.function === STANNAH_EVENTS.plugType.entertainment){
                    return _message(event.state, event.name);
                };
            };


            //Stairlift
            if(event.type === STANNAH_EVENTS.devices.stairlift){

                if(event.travel === STANNAH_EVENTS.travel.down){
                    return 'Went Downstairs';
                } else
                if(event.travel === STANNAH_EVENTS.travel.up) {
                    return 'Went Upstairs';
                } else
                if(event.travel === STANNAH_EVENTS.travel.midway) {
                    return 'At Midpoint';
                } else {
                    return 'Unknown';
                }
            };
            //Message
            if(event.type === STANNAH_EVENTS.devices.message){
                return event.message;
            };
            //Temperature
            if(event.type === STANNAH_EVENTS.devices.temperature){
                return 'Temperature below 18°';
            };
        }
        function _message(state, name){
            if(state === 'ON'){
                return 'Turned ' + SmartplugMapping.getTextMapping(name) + ' On';
            } else {
                return 'Turned ' + SmartplugMapping.getTextMapping(name) + ' Off';
            }
        }
        function displayMessageSender(event){

            if(event.type === STANNAH_EVENTS.devices.message){
                return getDisplaynameFromUsername(event.from) + ': ';
            };
        }
        function getDisplaynameFromUsername(suppliedUsername){
            var userCircleObject = _.find(vm.CircleOfFriends.data.circleList, function(user){
                return user.username.toLowerCase() === suppliedUsername.toLowerCase();
            });

            //return displayname if object exists and siaplayname is not null
            if(userCircleObject != "undefined" && userCircleObject.displayName != null){
                return userCircleObject.displayName;
            };

            //otherwise return username
            return suppliedUsername;
        }
        function userHasImage(username){
            //if no circle of friends then return false to show icon
            if (vm.CircleOfFriends === null) return false;
            //find user object relating to 'username'
            var user = _.find(vm.CircleOfFriends.data.circleList, function(user){ return user.username === username; });
            //if user exists then check the imageHash
            if(user){
                if(user.imageHash != null && user.imageHash != ""){
                    return true;
                };
            };

            //return false to use icon
            return false;
        }
        function getUserImageHash(username){
            //find user object relating to 'username'
            var user = _.find(vm.CircleOfFriends.data.circleList, function(user){ return user.username === username; });
            //if user exists then check the imageHash
            if(user){
                return user.imageHash;
            }
        }
        function displayMessageIcon(username){
            //find user object relating to 'username'
            var user = _.find(vm.CircleOfFriends.data.circleList, function(user){ return user.username === username; });
            //if user exists then check the imageHash
            var colour = null;
            //if user does not exist then 'colour' will be null
            if(user){
                colour = user.colour;
            };

            //select correct colour
            //if 'colour' is null then the default will be returned
            switch(colour) {
                case STANNAH_EVENTS.coloursKeys.PURPLE:
                    return 'stannah-purple';
                    break;
                case STANNAH_EVENTS.coloursKeys.GREEN:
                    return 'stannah-yellow';
                    break;
                case STANNAH_EVENTS.coloursKeys.ORANGE:
                    return 'stannah-orange';
                    break;
                case STANNAH_EVENTS.coloursKeys.BLUE:
                    return 'stannah-blue';
                    break;
                default:
                    return 'stannah-orange';
                    break;
            }
        }


        //error methods
        function haveAlerts(){
            if (vm.alertMessage === []) {
                return false;
            } else {
                return true;
            }
        }
        function addAlertMessage(msg){
            vm.alertMessages.push(msg);
        }
        function showAlert(type){
            if(type === MESSAGE_TYPE.success){
                vm.messageType = MESSAGE_TYPE.success;
            } else
            if(type === MESSAGE_TYPE.fail){
                vm.messageType = MESSAGE_TYPE.fail;
            } else {
                vm.messageType = MESSAGE_TYPE.default;
            }
            var msg = '';
            for(var i=0; i<vm.alertMessages.length; i++){
                msg += '<p>' + vm.alertMessages[i];
            }
            vm.alertMessage = $sce.trustAsHtml(msg);
            vm.showAlert = true;
        }
        function closeAlert(){
            vm.alertMessages = [];
            vm.alertMessage = '';
            vm.showAlert = false;
            vm.messageType = MESSAGE_TYPE.default;
        }
    }
})();