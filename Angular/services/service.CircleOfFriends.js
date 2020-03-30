(function() {
    'use strict';

    angular
        .module('app.stannah')
        .factory('CircleOfFriends', CircleOfFriends);

    CircleOfFriends.$inject = ['SiteData','Storage', '$q', '$rootScope'];

    /* @ngInject */
    function CircleOfFriends(SiteData, Storage, $q, $rootScope) {
        var data          = null;
        var username      = null;
        var broadcastData = false;

        var service = {
            getCircleOfFriends: getCircleOfFriends,
            updateAndBroadcast: updateAndBroadcast,
            reset: reset
        };


        return service;

        ////////////////

        //public methods
        function getCircleOfFriends() {
            if (data) {
                //have data already
                //return data in promise so live data and existing data are both returned as a promise
                return $q(function(resolve, reject) {
                    resolve(data);
                });
            } else {
                //get systemId from storage
                var systemId = Storage.getDefaultSystem();
                //call api
                return SiteData.stannahGetCircleOfFriends(systemId)
                    .then(function (response) {
                        if (response.status === 200) {
                            //retrieving user details to get current user name
                            return _getUserDetails(response);
                        } else {
                            //return response containing non 200 status so that Controller/Directive can deal with error
                            return response;
                        }
                    });
            }
        }

        //used to force the circle of friends to reload (after updating permissions etc.)
        function reset(){
            data = null;
        }

        function updateAndBroadcast(){
            //setting data to null will force a refresh
            data          = null;
            //broacastData set to true will allow the data to be broadcast
            broadcastData = true;
            //getCircleOfFriends
            getCircleOfFriends();
        }

        //private methods
        //get user details to retrieve the current users username
        function _getUserDetails(circleOfFriendsResponse){
            return SiteData.userDetails()
                .then(function (response) {
                    if (response.status === 200) {
                        //get current users username
                        username = response.data.username;

                        //check to see if user is an admin
                        var isAdmin = _getAdminOfUser(username, circleOfFriendsResponse);

                        //inject data into returned response
                        circleOfFriendsResponse.data._currentUserIsAdmin = isAdmin;

                        //check to see if user is last admin
                        var isLastAdmin = _isLastAdmin(username, circleOfFriendsResponse);

                        //inject data into returned response
                        circleOfFriendsResponse.data._isLastAdmin = isLastAdmin;

                        //inject current users username to the return object
                        circleOfFriendsResponse.data._currentUser = username;

                        //set data to response for caching
                        data = circleOfFriendsResponse;

                        //broadcast data (for when updating monitoree pic, to update in monitoree window also)
                        if(broadcastData){
                            $rootScope.$broadcast('getCircleOfFriendsData', data);
                            broadcastData = false;
                        }

                        //return final response
                        return circleOfFriendsResponse;
                    } else {
                        console.log('service.CircleOfFriends.js: _getUserDetails: error');
                        return circleOfFriendsResponse;
                    }
                });
        }

        //check to see if current user is an admin (returns boolean)
        function _getAdminOfUser(username, circleOfFriendsResponse){
            //get the supplied user object from supplied circleOfFriends
           var userObject = _.find(circleOfFriendsResponse.data.circleList, function(user){
                return user.username === username;
            });
            //if user does not exist then return false
            if(userObject === undefined || userObject === null){
                return false;
            }
            //otherwise return value of 'admin' key
            return userObject.admin;
        }

        //check to see if current user is the last admin (returns boolean)
        function _isLastAdmin(username, circleOfFriendsResponse){
            var numberOfUsers = _.countBy(circleOfFriendsResponse.data.circleList, function(obj) {
                return obj.admin ? 'isAdmin': 'isNotAdmin';
            });

            if(numberOfUsers.isAdmin <= 1){
                return true;
            }
            return false;
        }
    }
})();