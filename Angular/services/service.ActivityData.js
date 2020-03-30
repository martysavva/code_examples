(function() {
    'use strict';

    angular
        .module('app.stannah')
        .factory('ActivityData', ActivityData);

    ActivityData.$inject = ['SiteData', 'STANNAH_EVENTS', 'Smartplugs', 'SmartplugMapping', 'SystemInfo'];

    /* @ngInject */
    function ActivityData(SiteData, STANNAH_EVENTS, Smartplugs, SmartplugMapping, SystemInfo) {
        var smartplugData                   = null;
        var smartplugs                      = null;
        var pairedSmartplugsFromPeripherals = [];
        var timeZone                        = null;
        var messages = {
            noActivity: 'no activity'
        }


        ////////////////
        var service = {
            getActivityData: getActivityData,
            reset: reset
        };

        return service;

        ////////////////

        //public methods
        function getActivityData(from,to,systemId, reloadSmartplugs) {

            if (smartplugs && !reloadSmartplugs) {
                return _getActivityData(from,to,systemId);
            } else {

                ///first pull system info to retrieve the timezone
                return SystemInfo.getSystemInfo()
                    .then(function(response){
                        if(response.status === 200){
                            timeZone = response.data.timeZoneValue.timeZone;
                            //now pull the smartplug data
                            return Smartplugs.getSmartplugData(systemId, true)
                                .then(function (response) {
                                    smartplugs = response;
                                    return _getActivityData(from, to, systemId);
                                });
                        }
                    });
            }
        }

        //resets all data so nothing persists (used if user goes back to login without refreshing)
        function reset() {
            smartplugData = null;
            smartplugs    = null;
        }




        //private methods
        function _getActivityData(from, to, systemId){
            return SiteData.stannahGetActivity(from,to,systemId)
                .then(function(response) {
                    if(response.status === 200){
                        //return unprocessed data if no activity
                        if(response.data.events.length === 0){
                            return response;
                        };
                        //if there is activity then process
                        response = _addAllEvents(response);
                        response = _insertSmartplugFunctions(response);
                        response = _insertLastEventTime(response);
                        response = _removeAboveTemperatureThresholdEvents(response);
                        //return processed activity
                        smartplugData = response;
                        return smartplugData;
                    } else {
                        return response;
                    };
                });
        }

        //helper functions
        /** inserts a time lapsed object into the data **/
        function _insertLastEventTime(response){

            var eventsWithNoMessages = _.reject(response.data._allEvents, function(event){
                if((event.type === STANNAH_EVENTS.devices.message) || (event.type === STANNAH_EVENTS.devices.temperature)){
                    return event.type;
                }
            });

            var lastActivityTime = null;

            //if there has been activity
            if(eventsWithNoMessages.length != 0){
                var lastObj     = _.last(eventsWithNoMessages);
                var lastObjTime = lastObj.activityTimestamp;
                var currentTime = moment().tz(timeZone).unix();
                var difference  = currentTime - lastObjTime;

                var lastActivityHour    = Math.floor(difference / 3600);
                var lastActivityMinutes = Math.floor((difference - (lastActivityHour * 3600)) / 60);

                if(lastActivityHour === 0){
                    //no hours... only show minutes
                    lastActivityTime = lastActivityMinutes + 'm';
                } else {
                    //at least 1 hour, show hours and minutes
                    lastActivityTime = lastActivityHour + 'h ' + lastActivityMinutes + 'm';
                };
            } else {
                //if there has been no activity
                var lastActivityTime = messages.noActivity;
            };

            //update the data
            response.data._lastActivityTime = lastActivityTime;
            //return the result
            return response;
        }
        /** inserts the name and function of the smartplug into the activity **/
        function _insertSmartplugFunctions(response){
            //insert activity 'name' and 'function' into activity object
            _.each(response.data._allEvents, function(obj){
                if(obj.type === STANNAH_EVENTS.devices.smartplug){
                    //assign the plug name
                    _.each(smartplugs.data, function(map){
                        if(obj.nodeId === map.nodeId){
                            obj.name = map.name;
                        };
                    })
                    //assign the function, i.e. entertainment/beverage/food
                    _.each(SmartplugMapping.getPlugNameFunctionAssociation(), function(map){
                        if(obj.name === map[0]){
                            obj.function = map[1];
                            return obj.nodeId;
                        };
                    })
                };
            })
            return response;
        }
        /** creates a clean array of all events **/
        function _addAllEvents(response){
            //setup array to hold all events
            var allEventObjects = [];

            //filter response to return all events and sub events
            _.each(response.data.events, function(evnt){
                _.each(evnt.activityList, function(obj){
                    //ignore all unknown travel elements
                    if(obj.travel != STANNAH_EVENTS.travel.unknown){
                        allEventObjects.push(obj);
                    };
                })
            });

            response.data._allEvents = allEventObjects;
            return response;
        }
        /** removes all 'above' temperature thrshold events **/
        function _removeAboveTemperatureThresholdEvents(response){
            var cleanedList = _.reject(response.data._allEvents, function(obj){
                if(obj.alertState === "ABOVE_THRESHOLD") {
                    return obj.alertState;
                }
            });
            response.data._allEvents = cleanedList;
            return response;
        }
        //end helper functions
    }
})();