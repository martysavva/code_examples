(function() {
    'use strict';

    angular
        .module('app.stannah')
        .directive('activityChart', activityChart);

    activityChart.$inject = ['STANNAH_EVENTS', 'TESTING', 'SmartplugMapping'];

    /* @ngInject */
    function activityChart(STANNAH_EVENTS, TESTING, SmartplugMapping) {

        var activityChart = {
            templateUrl: 'app/code/stannah/system/home/activity-chart.html',
            link: link,
            restrict: 'A',
            scope: {
                activityData: '=',
                dateRange: '=',
                systemId: '=',
                timeZone: '='
            }
        };
        return activityChart;

        function link($scope) {
            Highcharts.setOptions({
                global: {
                    useUTC: true,
                    getTimezoneOffset: function (timestamp) {
                        var timeZone = $scope.timeZone,
                        timezoneOffset = -moment.tz(timestamp, timeZone).utcOffset();
                        return timezoneOffset;
                    }
                }
            });

            //show/hide test elements
            //change this value in the app.constants.js file
            $scope.showTest  = TESTING.show;

            //chart colours
            var colourRed    = '#D41922';
            var colourOrange = '#FFA600';
            var colourYellow = '#C5D31F';
            var colourBlue   = '#00A9E0';
            var colourPurple = '#A17AAA';
            var colourGrey   = '#b1b0b0';


            //chart positions
            var maxY                         = 100;//height of chart
            var lineheightFood               = 15;
            var lineheightBeverage           = 30;
            var lineheightEntertainment      = 45;
            var lineheightStairLift          = 75;
            var stairliftUpPlotPosition      = 84;
            var stairliftDownPlotPosition    = 66;
            var stairliftUnknownPlotPosition = 75;


            //chart data
            var chartOptions = [];
            $scope.chartVerticalPlotlinesData     = [];
            $scope.chartStairliftEventsData       = [];
            $scope.chartMidwayStairliftEventsData = [];
            $scope.chartEntertainmentEventsData   = [];
            $scope.chartBeverageEventsData        = [];
            $scope.chartFoodEventsData            = [];

            //chart icons
            var iconUp       = './app/assets/images/graph-icon-up.png';
            var iconDown     = './app/assets/images/graph-icon-down.png';
            var iconUnknown  = './app/assets/images/graph-icon-unknown.png';
            var midpointIcon = './app/assets/images/midpoint.png';


            activate();
            ////////////////////

            function activate(){
                updateData(
                    $scope.dateRange.startOfDay,
                    $scope.dateRange.endOfDay
                );
            }

            function updateData() {
                createVerticalPlotlines();
                createStairliftEvents($scope.activityData);
                createMidwayStairliftEvents($scope.activityData);
                createEntertainmentEvents($scope.activityData);
                createBeverageEvents($scope.activityData);
                createFoodEvents($scope.activityData);
                ////draw chart
                drawChart();
            }
            function createVerticalPlotlines(){
                var numberOfLines               = 24 / 3;
                var plotlineArray               = [];
                var plotlineSpaceInMilliseconds = 1000 * 60 * 60 * 3;//3 hours

                for(var inc = 0; inc < numberOfLines + 1; inc++){
                    var plotlineObject = {
                        color: '#D9D9D9',
                        dashStyle: 'solid',
                        value: null,
                        width: 1
                    };

                    plotlineObject.value = moment().tz($scope.timeZone).startOf('day').unix()*1000 + (inc * plotlineSpaceInMilliseconds);
                    plotlineArray.push(plotlineObject);
                }
                $scope.chartVerticalPlotlinesData = plotlineArray;
            }
            function createStairliftEvents(response){
                 _.each(response.data._allEvents, function(obj){
                    if(obj.type === STANNAH_EVENTS.devices.stairlift){
                        var direction = null;
                        var icon      = '';

                        if(obj.travel === STANNAH_EVENTS.travel.up){
                            direction = stairliftUpPlotPosition;
                            icon      = iconUp;
                        } else if (obj.travel === STANNAH_EVENTS.travel.down) {
                            direction = stairliftDownPlotPosition;
                            icon      = iconDown;
                        } else {
                            direction = stairliftUnknownPlotPosition;
                            icon      = iconUnknown;
                        };

                        //create series object
                        var newObject = {
                            x: obj.activityTimestamp*1000,
                            y: direction,
                            travel: obj.travel ,
                            type: obj.type,
                            marker: {
                                width:30,
                                height:30,
                                symbol: 'url(' + icon + ')'
                            }
                        }
                        //build series array to pass into chart
                        $scope.chartStairliftEventsData.push(newObject);
                    };
                });
            }
            function createMidwayStairliftEvents(response){
                //filtered list of all stairlift events
                var allStairliftEvents = _.filter(response.data._allEvents, function (obj) {
                    return (obj.type === STANNAH_EVENTS.devices.stairlift)
                });

                var allowNextObject = false;
                var midwayArrayList = [];//will include midway event and following up/down event
                /* iterate through all stairlift events:
                Logic:
                1. always add midway object
                2. add next following event
                Logic assumes that and up/down event will always follow a midpoint object
                 */
                _.each(allStairliftEvents, function(obj){
                    if (obj.travel === STANNAH_EVENTS.travel.midway){
                        midwayArrayList.push(obj);
                        allowNextObject = true;
                    } else
                    if(allowNextObject) {
                        midwayArrayList.push(obj);
                        allowNextObject = false;
                    }
                });

                
                /**
                 * determine whether there is an odd number of objects, we need an even number, i.e. at least 1 midway and following up/down
                 */
                var unevenNumberOfMidwayPairs = _.size(midwayArrayList) % 2; //determine expecting '0' if even pairs

                //if uneven events then add last travel event (not midway) at now
                //at this point we should only have odd events if there was a midway event and no following up/down event
                if(unevenNumberOfMidwayPairs !== 0){
                    var travelObj = {
                        activityTimestamp: moment().unix(),
                        travel: STANNAH_EVENTS.travel.up,
                        type: STANNAH_EVENTS.devices.stairlift
                    }
                    midwayArrayList.push(travelObj);
                }

                ////create an array of objects for the chart
                _.each(midwayArrayList,function(obj,i){ //iterate over midwayList
                    if(obj.travel === STANNAH_EVENTS.travel.midway){//if 'midway' event

                        var stairliftObj = { //create object for 'midway' event
                            nodeId: midwayArrayList[i].nodeId,
                            name: 'midway',
                            type: 'line',
                            color: colourRed,
                            lineWidth:8,
                            linecap:'square',
                            states: {
                                hover: {
                                    enabled: false
                                }
                            },
                            data: [
                                {
                                    x: obj.activityTimestamp * 1000,
                                    y: stairliftUnknownPlotPosition,
                                    removeMarker: false,
                                    marker: {
                                        enabled:true,
                                        width:19,
                                        height:19,
                                        symbol: 'url(' + midpointIcon + ')'
                                    }
                                },
                                {
                                    x: midwayArrayList[i + 1].activityTimestamp * 1000,
                                    y: stairliftUnknownPlotPosition
                                }
                            ]
                        };

                        $scope.chartMidwayStairliftEventsData.push(stairliftObj); //add 'midway' object to list
                    };
                });
            }
            function createEntertainmentEvents(response){
                //filtered list of all entertainment events
                var allEntertainmentEvents = _.filter(response.data._allEvents, function (obj) {
                    if(obj.nodeId === STANNAH_EVENTS.plugType.entertainment){
                        //insert key to allow removal of last marker if following current time on now line
                        obj.removeMarker = false;
                    }
                    return (obj.function === STANNAH_EVENTS.plugType.entertainment);
                });
                //insert missing off events
                //insert them up to the next 'on' event or now if the last event
                allEntertainmentEvents = _removeDoubleOffEvents(allEntertainmentEvents);
                allEntertainmentEvents = _insertMissingOffEvents(allEntertainmentEvents, STANNAH_EVENTS.plugType.entertainment);
                allEntertainmentEvents = _insertLastOffObject(allEntertainmentEvents);
                allEntertainmentEvents = _insertFirstOnObject(allEntertainmentEvents);

                //create an array of objects for the chart
                for (var inc=0; inc < allEntertainmentEvents.length/2; inc++) {
                    var entertainmentObj = {
                        nodeId: allEntertainmentEvents[inc].nodeId,
                        name: 'entertainment',
                        type: 'line',
                        color: colourOrange,
                        lineWidth:8,
                        linecap:'square',
                        states: {
                            hover: {
                                enabled: false
                            }
                        },
                        data: [
                            {
                                x: null,
                                y: lineheightEntertainment,
                                removeMarker: false,
                                marker: {
                                    enabled:true,
                                    width:30,
                                    height:30,
                                    symbol: 'url(' + SmartplugMapping.getChartIconMapping(allEntertainmentEvents[inc].name) + ')'
                                }
                            },
                            {
                                x: null,
                                y: lineheightEntertainment,
                                removeMarker: false,
                                marker: {
                                    enabled:true,
                                    symbol: 'url(' + SmartplugMapping.getChartLastIconMapping(allEntertainmentEvents[inc].function) + ')'
                                }
                            }
                        ]
                    };
                    $scope.chartEntertainmentEventsData.push(entertainmentObj);
                }

                //insert correct start/end into each object
                for (var inc = 0; inc < $scope.chartEntertainmentEventsData.length; inc++) {
                    //on object
                    $scope.chartEntertainmentEventsData[inc].data[0].x  = allEntertainmentEvents[inc+inc].activityTimestamp * 1000;
                    ////disable marker if first inserted event
                    if(allEntertainmentEvents[(inc+inc)].removeMarker === true){
                        $scope.chartEntertainmentEventsData[inc].data[0].marker.enabled = false;
                    };

                    //off object
                    ////insert timestamp
                    $scope.chartEntertainmentEventsData[inc].data[1].x  = allEntertainmentEvents[(inc+inc)+1].activityTimestamp * 1000;
                    ////disable marker if last inserted event
                    if(allEntertainmentEvents[(inc+inc)+1].removeMarker === true){
                        $scope.chartEntertainmentEventsData[inc].data[1].marker.enabled = false;
                    }
                }
            }
            function createBeverageEvents(response){
                //filtered list of all beverage events
                var allBeverageEvents = _.filter(response.data._allEvents, function (obj) {
                    if(obj.nodeId === STANNAH_EVENTS.plugType.beverage){
                        //insert key to allow removal of last marker if following current time on now line
                        obj.removeMarker = false;
                    };
                    return (obj.function === STANNAH_EVENTS.plugType.beverage)
                });
                //insert missing off events
                //insert them up to the next 'on' event or now if the last event
                allBeverageEvents = _removeDoubleOffEvents(allBeverageEvents);
                allBeverageEvents = _insertMissingOffEvents(allBeverageEvents, STANNAH_EVENTS.plugType.beverage);
                allBeverageEvents = _insertLastOffObject(allBeverageEvents);
                allBeverageEvents = _insertFirstOnObject(allBeverageEvents);

                //create an array of objects for the chart
                for (var inc=0; inc < allBeverageEvents.length/2; inc++) {
                    var beverageObj = {
                        nodeId: allBeverageEvents[inc].nodeId,
                        name: 'beverage',
                        type: 'line',
                        color: colourBlue,
                        lineWidth:8,
                        linecap:'square',
                        states: {
                            hover: {
                                enabled: false
                            }
                        },
                        data: [
                            {
                                x: null,
                                y: lineheightBeverage,
                                removeMarker: false,
                                marker: {
                                    enabled:true,
                                    width:30,
                                    height:30,
                                    symbol: 'url(' + SmartplugMapping.getChartIconMapping(allBeverageEvents[inc].name) + ')'
                                }
                            },
                            {
                                x: null,
                                y: lineheightBeverage,
                                removeMarker: false,
                                marker: {
                                    enabled:true,
                                    symbol: 'url(' + SmartplugMapping.getChartLastIconMapping(allBeverageEvents[inc].function) + ')'
                                }
                            }
                        ]
                    };
                    $scope.chartBeverageEventsData.push(beverageObj);
                }

                //insert correct start/end into each object
                for (var inc = 0; inc < $scope.chartBeverageEventsData.length; inc++) {
                    //on object
                    $scope.chartBeverageEventsData[inc].data[0].x  = allBeverageEvents[inc+inc].activityTimestamp * 1000;
                    ////disable marker if first inserted event
                    if(allBeverageEvents[(inc+inc)].removeMarker === true){
                        $scope.chartBeverageEventsData[inc].data[0].marker.enabled = false;
                    };

                    //off object
                    ////insert timestamp
                    $scope.chartBeverageEventsData[inc].data[1].x  = allBeverageEvents[(inc+inc)+1].activityTimestamp * 1000;
                    ////disable marker if last inserted event
                    if(allBeverageEvents[(inc+inc)+1].removeMarker === true){
                        $scope.chartBeverageEventsData[inc].data[1].marker.enabled = false;
                    };
                }


            }
            function createFoodEvents(response){
                //filtered list of all beverage events
                var allFoodEvents = _.filter(response.data._allEvents, function (obj) {
                    if(obj.nodeId === STANNAH_EVENTS.plugType.food){
                        //insert key to allow removal of last marker if following current time on now line
                        obj.removeMarker = false;
                    }
                    return (obj.function === STANNAH_EVENTS.plugType.food)
                });
                //insert missing off events
                //insert them up to the next 'on' event or now if the last event
                allFoodEvents = _removeDoubleOffEvents(allFoodEvents);
                allFoodEvents = _insertMissingOffEvents(allFoodEvents, STANNAH_EVENTS.plugType.food);
                allFoodEvents = _insertLastOffObject(allFoodEvents);
                allFoodEvents = _insertFirstOnObject(allFoodEvents);

                //create an array of objects for the chart
                for (var inc=0; inc < allFoodEvents.length/2; inc++) {
                    var foodObj = {
                        nodeId: allFoodEvents[inc].nodeId,
                        name: 'food',
                        type: 'line',
                        color: colourYellow,
                        lineWidth:8,
                        linecap:'square',
                        states: {
                            hover: {
                                enabled: false
                            }
                        },
                        data: [
                            {
                                x: null,
                                y: lineheightFood,
                                removeMarker: false,
                                marker: {
                                    enabled:true,
                                    width:30,
                                    height:30,
                                    symbol: 'url(' + SmartplugMapping.getChartIconMapping(allFoodEvents[inc].name) + ')'
                                }
                            },
                            {
                                x: null,
                                y: lineheightFood,
                                removeMarker: false,
                                marker: {
                                    enabled:true,
                                    symbol: 'url(' + SmartplugMapping.getChartLastIconMapping(allFoodEvents[inc].function) + ')'
                                }
                            }
                        ]
                    };
                    $scope.chartFoodEventsData.push(foodObj);
                }

                //insert correct start/end into each object
                for (var inc = 0; inc < $scope.chartFoodEventsData.length; inc++) {
                    //on object
                    $scope.chartFoodEventsData[inc].data[0].x  = allFoodEvents[inc+inc].activityTimestamp * 1000;
                    ////disable marker if first inserted event
                    if(allFoodEvents[(inc+inc)].removeMarker === true){
                        $scope.chartFoodEventsData[inc].data[0].marker.enabled = false;
                    };

                    //off object
                    ////insert timestamp
                    $scope.chartFoodEventsData[inc].data[1].x  = allFoodEvents[(inc+inc)+1].activityTimestamp * 1000;
                    ////disable marker if last inserted event
                    if(allFoodEvents[(inc+inc)+1].removeMarker === true){
                        $scope.chartFoodEventsData[inc].data[1].marker.enabled = false;
                    };
                }
            }
            function plotStairliftMidpointEvents(){
                _.each($scope.chartMidwayStairliftEventsData,function(obj,i){
                    chartOptions.series.push($scope.chartMidwayStairliftEventsData[i]);
                });
            }
            function plotEntertainmentEvents(){
                _.each($scope.chartEntertainmentEventsData,function(obj,i){
                    chartOptions.series.push($scope.chartEntertainmentEventsData[i]);
                });
            }
            function plotBeverageEvents(){
                _.each($scope.chartBeverageEventsData,function(obj,i){
                    chartOptions.series.push($scope.chartBeverageEventsData[i]);
                });
            }
            function plotFoodEvents(){
                _.each($scope.chartFoodEventsData,function(obj,i){
                    chartOptions.series.push($scope.chartFoodEventsData[i]);
                });
            }

            function drawChart(){
                chartOptions ={
                    chart: {
                        renderTo: 'chart1',
                        zoomType: 'x',
                        events: {
                            selection: function(event){
                                console.log(event.xAxis);
                                if (event.xAxis) {
                                    //hide xaxis label when zooming
                                    document.getElementsByClassName('highcharts-xaxis-title')[0].style.visibility = 'hidden';
                                } else {
                                    //show xaxis label after zooming (when resetting)
                                    document.getElementsByClassName('highcharts-xaxis-title')[0].style.visibility = 'visible';
                                }
                            }
                        }
                    },
                    title : {
                        text: '_',
                        y: -20
                    },
                    xAxis: {
                        type: 'datetime',
                        title: {
                            text: 'noon',
                            y: -8
                        },
                        dateTimeLabelFormats: {
                            day: '%H',
                            hour: '%H'
                        },
                        tickInterval: 3600*3000,
                        min: moment().tz($scope.timeZone).startOf('day').unix()*1000,
                        max: moment().tz($scope.timeZone).endOf('day').unix()*1000 + 1000,//adding 1000 to force the next hour to draw 00 at the end of the day
                        plotLines: $scope.chartVerticalPlotlinesData
                    },
                    yAxis: {
                        title: {
                            text: null
                        },
                        labels: {
                            enabled:false
                        },
                        gridLineWidth: 0,
                        minorGridLineWidth: 0,
                        min: 0,
                        max: maxY
                    },
                    tooltip: {
                        enabled: false
                    },
                    plotOptions : {
                        line: {
                            lineWidth: 1,
                            tooltip: {
                                enabled: false
                            },
                            marker: {
                                enabled: false,
                                states: {
                                    hover: {
                                        enabled: false
                                    }
                                }
                            },
                            showInLegend: false
                        },
                        spline: {
                            color:'#ffffff',
                            lineWidth: 4,
                            marker: {
                                enabled: false,
                                states: {
                                    hover: {
                                        enabled: false
                                    }
                                }
                            },
                            showInLegend: false
                        },
                        column: {
                            dataLabels: {
                                useHTML: true,
                                enabled: true,
                                x:0,
                                y: -38,
                                formatter: function(){
                                    return '<div class="now-graphic-en"></div>';
                                },
                            },
                            pointRange: 1,
                            pointWidth:.1,
                            showInLegend: false,
                            marker: {
                                enabled: false
                            }
                        },
                        scatter: {
                            marker: {
                                enabled: true,
                                states: {
                                    hover: {
                                        enabled: false
                                    }
                                }
                            },
                            showInLegend: false
                        }
                    },
                    series: [
                        {
                            name: 'plug1',
                            type: 'line',
                            color:colourYellow,
                            states: {
                                hover: {
                                    enabled: false
                                }
                            },
                            data: [
                                {
                                    x: moment().tz($scope.timeZone).startOf('day').unix()*1000,
                                    y: lineheightFood

                                },
                                {
                                    x: moment().tz($scope.timeZone).unix()*1000,
                                    y: lineheightFood
                                }
                            ]
                        },
                        {
                            name: 'plug2',
                            type: 'line',
                            color:colourBlue,
                            states: {
                                hover: {
                                    enabled: false
                                }
                            },
                            data: [
                                {
                                    x: moment().tz($scope.timeZone).startOf('day').unix()*1000,
                                    y: lineheightBeverage

                                },
                                {
                                    x: moment().tz($scope.timeZone).unix()*1000,
                                    y: lineheightBeverage
                                }
                            ]
                        },
                        {
                            name: 'plug3',
                            type: 'line',
                            color:colourOrange,
                            states: {
                                hover: {
                                    enabled: false
                                }
                            },
                            data: [
                                {
                                    x: moment().tz($scope.timeZone).startOf('day').unix()*1000,
                                    y: lineheightEntertainment,

                                },
                                {
                                    x: moment().tz($scope.timeZone).unix()*1000,
                                    y: lineheightEntertainment
                                }
                            ]
                        },
                        {
                            name: 'stairlift line',
                            type: 'line',
                            color:colourGrey,
                            states: {
                                hover: {
                                    enabled: false
                                }
                            },
                            data: [
                                {
                                    x: moment().tz($scope.timeZone).startOf('day').unix()*1000,
                                    y: lineheightStairLift,

                                },
                                {
                                    x: moment().tz($scope.timeZone).unix()*1000,
                                    y: lineheightStairLift
                                }
                            ]
                        },
                        {
                            name: 'nowline',
                            type: 'column',
                            color:colourRed,
                            states: {
                                hover: {
                                    enabled: false
                                }
                            },
                            data: [
                                {
                                    x: moment().tz($scope.timeZone).unix()*1000,
                                    y: maxY
                                }
                            ]
                        },
                        {
                            turboThreshold: 0,
                            name: 'stairlift activity',
                            type: 'scatter',
                            data: $scope.chartStairliftEventsData
                        }
                    ]
                };

                //uncomment to show hotwater events as lines with icons
                plotStairliftMidpointEvents();
                plotEntertainmentEvents();
                plotBeverageEvents();
                plotFoodEvents();

                $scope.currentChart = new Highcharts.Chart(chartOptions);
            }


            //private methods
            function _removeDoubleOffEvents(arr){
                //removes all OFF objects immediately following anoter OFF object
                var state = null;
                var _arr = arr;
                var hasDuplicates = false;

                for(var inc = 0; inc < _arr.length; inc++){
                    var incState =_arr[inc].state;

                    //check if its a double
                    if(incState === state){
                        //only remove if its an 'off' double
                        if(state === 'OFF'){
                            hasDuplicates = true;
                            _arr.splice(inc, 1);
                            return _removeDoubleOffEvents(_arr);
                        }
                    } else {
                        //if current state is different to previous
                        state = arr[inc].state;
                    }
                }

                if(!hasDuplicates){
                    return _arr;
                }
            }
            function _insertMissingOffEvents(arr, smartplugType){
                //insert 'off' objects to close out on events.
                //example: 1011011 = 101010101
                var state          = null;
                var _arr           = arr;
                var _smartplugType = smartplugType;
                var hasDuplicates  = false;
                var offObj         = {
                    type: STANNAH_EVENTS.devices.smartplug,
                    activityTimestamp: null,
                    nodeId: _smartplugType,
                    function: _smartplugType,
                    state: 'OFF'
                };

                for(var inc = 0; inc < _arr.length; inc++){
                    var incState =_arr[inc].state;

                    //check if its a double
                    if(incState === state){
                        //only add 'off' object if the double is an on event
                        if(state === 'ON'){
                            hasDuplicates = true;
                            offObj.activityTimestamp = _arr[inc].activityTimestamp;
                            offObj.name = _arr[inc].name;
                            _arr.splice(inc, 0, offObj);
                            return _insertMissingOffEvents(_arr, smartplugType);
                        };
                    } else {
                        //if current state is different to previous
                        state = arr[inc].state;
                    }
                }

                if(!hasDuplicates){
                    return _arr;
                }
            }
            function _insertLastOffObject(arr){
                //if array is empty then just return the array
                if (arr.length === 0) return arr;

                var lastObj    = _.last(arr);
                var stateValue = lastObj.state;

                //if last object is 'ON', we must inject an off event for current time
                //array of objects must be have an even amount of objects
                if(stateValue === 'ON'){
                    //copy last object and change required elements
                    var newObj = angular.copy(lastObj);
                    newObj.state = 'OFF';
                    newObj.removeMarker = true;
                    newObj.activityTimestamp = moment().tz($scope.timeZone).unix();
                    arr.push(newObj);
                    return arr;
                }
                //return existing array if last object is 'ON'
                return arr;
            }
            function _insertFirstOnObject(arr){
                //if array is empty then just return the array
                if (arr.length === 0) return arr;

                var firstObj   = _.first(arr);
                var stateValue = firstObj.state;

                //if first object is 'OFF', we must inject an 'ON' event start of day
                //array of objects must be have an even amount of objects
                if(stateValue === 'OFF'){
                    //copy last object and change required elements
                    var newObj = angular.copy(firstObj);
                    newObj.state = 'ON';
                    newObj.removeMarker = true;
                    newObj.activityTimestamp = moment().tz($scope.timeZone).startOf('day').unix();
                    arr.unshift(newObj);
                    return arr;
                }
                //return existing array if last object is 'ON'
                return arr;
            }
        }
    }
})();