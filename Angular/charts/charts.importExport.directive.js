(function() {
    'use strict';

    angular
        .module('app.energynote')
        .directive('importExportChart', importExportChart);

    importExportChart.$inject = ['Storage','SiteData','$sce','MESSAGE_TYPE'];

    /* @ngInject */
    function importExportChart(Storage,SiteData,$sce, MESSAGE_TYPE) {

        var importExportChart = {
            templateUrl: 'app/code/energynote/charts/charts.importExport.html',
            link: link,
            restrict: 'A',
            scope: {
                from: '=',
                to: '=',
                period: '='
            }
        };
        return importExportChart;


        function link($scope, $elements) {
            $scope.systemId   = '';

            //colours
            var colourExported = '#72c0e7';//blue
            var colourImported = '#f89787';//red
            var colourSolar    = '#f8d16a';//yellow

            //used to stop watchers continually firing
            $scope.hasUpdated = false;
            //summary panel variables
            $scope.totalEnergy = 0;
            //default chart options - used as a base for all charts
            $scope.chartOptionsDefault = {
                chart: {
                    type: 'column',
                    renderTo: 'chart1',
                    backgroundColor: '#ffffff'
                },

                title: {
                    text: ''
                },
                xAxis: {
                },
                yAxis: {
                    title: {
                        text: 'kWh',
                        rotation: 270
                    }
                },
                legend: {
                    align: 'right',
                    enabled: true
                },
                tooltip: {
                    pointFormat: '{series.name} {point.y} kWh'
                },
                plotOptions: {
                    series: {
                        lineWidth: 0,
                    },
                    column: {
                        animation: false
                    }
                }
                ,
                series: [{
                    data: []
                }]
            };

            $scope.totalGenerated      = 0;
            $scope.totalImport         = 0;
            $scope.totalExport         = 0;
            $scope.totalGenerationUsed = 0;

            //expose to view
            $scope.closeAlert = closeAlert;

            activate();
            ////////////////////

            function activate(){
                checkIfSystemStored();
                closeAlert();
            }


            function checkIfSystemStored(){
                if (Storage.defaultSystemExists()) {
                    $scope.systemId = Storage.getDefaultSystem();
                    createChart();
                }
            }

            function createChart(){
                updateData($scope.systemId,$scope.from,$scope.to);
                watchForInputChanges();
            }

            function updateData(period,from,to) {
                
                if($scope.period === 'EPOCH'){
                    SiteData.getEpochData(period,from,to)
                        .then(function(response){
                             if (response.status === 200) {
                                 drawEpochChart(response);
                            } else {
                                addAlertMessage('No data response, unable to draw chart');
                                showAlert(MESSAGE_TYPE.fail);
                            }
                        });
                }

                if($scope.period === 'WEEK_SUMMARIES'){
                    SiteData.getSummariesData(period,from,to)
                        .then(function(response){
                             if (response.status === 200) {
                                drawWeekSummariesChart(response);
                            } else {
                                addAlertMessage('No data response, unable to draw chart');
                                showAlert(MESSAGE_TYPE.fail);
                            }
                        });
                }

                if($scope.period === 'MONTH_SUMMARIES'){
                    SiteData.getSummariesData(period,from,to)
                        .then(function(response){
                             if (response.status === 200) {
                                 drawMonthSummariesChart(response);
                            } else {
                                addAlertMessage('No data response, unable to draw chart');
                                showAlert(MESSAGE_TYPE.fail);
                            }
                        });
                }

                if($scope.period === 'YEAR_SUMMARIES'){
                    SiteData.getSumTotalsForYear(period,from,to)
                        .then(function(response){
                            if (response.status === 200) {
                                drawYearSummariesChart(response);
                            } else {
                                addAlertMessage('No data response, unable to draw chart');
                                showAlert(MESSAGE_TYPE.fail);
                            }
                        });
                }
            }

            //draw charts
            function drawEpochChart(response){
                var generatedEnergy        = [];
                var importedEnergy         = [];
                var importedEnergyNegative = [];
                var exportedEnergy         = [];
                var solarUse               = [];

                //variables for calculating the summary data
                var totalGenerated = 0;
                var totalImport    = 0;
                var totalExport    = 0;



                // Loop through data to process
                for (var inc = 0; inc<response.data.values.length; inc++) {
                    //create date object for current iteration
                    var utcDate = moment.unix(response.data.values[inc].utc);

                    var epochEnergies = response.data.values[inc].epochEnergies;

                    //generated
                    var generatedValue = 0;
                    for (var generated = 0; generated < epochEnergies.length; generated++) {
                        if (epochEnergies[generated].energyType === 'GENERATION') {
                            generatedEnergy.push(epochEnergies[generated].energyKWh);
                            totalGenerated += epochEnergies[generated].energyKWh;
                            generatedValue = epochEnergies[generated].energyKWh;
                        }
                    }
                    //imported
                    for (var imported = 0; imported < epochEnergies.length; imported++) {
                        if (epochEnergies[imported].energyType === 'IMPORT') {
                            importedEnergy.push(epochEnergies[imported].energyKWh);
                            var dataObj = {
                                x: utcDate,
                                y: epochEnergies[imported].energyKWh*-1
                            };
                            importedEnergyNegative.push(dataObj);
                            totalImport += epochEnergies[imported].energyKWh;
                        }
                    }
                    //exported
                    var exportedValue = 0;
                    for (var exported = 0; exported < epochEnergies.length; exported++) {
                        if (epochEnergies[exported].energyType === 'EXPORT') {
                            var dataObj = {
                                x: utcDate,
                                y: epochEnergies[exported].energyKWh
                            };
                            exportedEnergy.push(dataObj);
                            totalExport += epochEnergies[exported].energyKWh;
                            exportedValue = epochEnergies[exported].energyKWh;
                        }
                    }

                    var dataObj = {
                        x: utcDate,
                        y: generatedValue - exportedValue
                    }

                    solarUse.push(dataObj);
                }




                //create objects for chart
                var generatedEnergyProcessed = {
                    name:'Solar use',
                    data:solarUse
                };

                var importedEnergyProcessed = {
                    name:'Imported',
                    data:importedEnergyNegative
                };

                var exportedEnergyProcessed = {
                    name:'Exported',
                    data:exportedEnergy
                };



                //set total spend on summary display
                $scope.totalGenerated = totalGenerated.toFixed(3);
                $scope.totalImport = totalImport.toFixed(3);
                $scope.totalExport = totalExport.toFixed(3);
                $scope.totalGenerationUsed = (totalGenerated - totalExport).toFixed(3);




                //region CONFIGURE CHART
                    var chartOptions = angular.copy($scope.chartOptionsDefault);

                    ////set chart type
                    chartOptions.chart.type = 'column';
                    //use this option if stacking columns
                    chartOptions.plotOptions.series.stacking = 'normal';
                    //remove border
                    chartOptions.plotOptions.series.borderWidth = '0';


                    ////format tooltip
                    chartOptions.tooltip = {
                        formatter: function () {
                            return showToolTipEpoch(this);
                        }
                    };

                    //populate chart with data
                    chartOptions.series[0] = exportedEnergyProcessed;
                    chartOptions.series[1] = generatedEnergyProcessed;
                    chartOptions.series[2] = importedEnergyProcessed;

                    //color data
                    chartOptions.series[0].color = colourExported;
                    chartOptions.series[1].color = colourSolar;
                    chartOptions.series[2].color = colourImported;


                    //xAxis format
                    chartOptions.xAxis.type = 'datetime';
                    chartOptions.xAxis.tickInterval = 3600 * 1000;//1 epoch
                    chartOptions.xAxis.min = moment($scope.from).valueOf();
                    chartOptions.xAxis.max = moment($scope.to).valueOf();
                    chartOptions.xAxis.dateTimeLabelFormats = {day: '%H', hour:'%H'};

                    //manipulate chart yAxis
                    chartOptions.yAxis.labels = {
                        formatter: function () {
                            var value = this.value;
                            if(value <= 0){
                                value = value * -1;
                            }
                            return value.toFixed(3);;
                        }
                    };

                //endregion

                //CREATE CHART
                $scope.currentChart = new Highcharts.Chart(chartOptions);
                freeWatchers();
            }

            function drawWeekSummariesChart(response){
                var generatedEnergy        = [];
                var importedEnergy         = [];
                var importedEnergyNegative = [];
                var exportedEnergy         = [];
                var solarUse               = [];

                //variables for calculating the summary data
                var totalGenerated = 0;
                var totalImport    = 0;
                var totalExport    = 0;

                for (var inc = 0; inc<response.data.values.length; inc++) {
                    //create date object for current iteration
                    var day     = response.data.values[inc].day;
                    var month   = response.data.values[inc].month;
                    var year    = response.data.values[inc].year;
                    var utcDate = moment(year + ',' + month + ',' + day, "YYYY-MM-DD");

                    var energyKwhTotals = response.data.values[inc].energyKwhTotals;



                    //generated
                    var generatedValue = 0;
                    for (var key in energyKwhTotals) {
                        if(!key.indexOf(['GENERATION:GENERATION'])){
                            generatedValue += energyKwhTotals[key];
                        }
                    }
                    //add value to chart data
                    generatedEnergy.push(generatedValue);
                    totalGenerated += generatedValue;


                    //imported
                    var value = 0;
                    for (var key in energyKwhTotals) {
                        if(!key.indexOf(['IMPORT:IMPORT_T'])){
                            value += energyKwhTotals[key];
                        }
                    }
                    //add value to chart data
                    importedEnergy.push(value);
                    var importedObj = {
                        x: utcDate,
                        y: value*-1
                    }
                    importedEnergyNegative.push(importedObj);
                    totalImport += value;

                    //exported
                    var exportedValue = 0;
                    for (var key in energyKwhTotals) {
                        if(!key.indexOf(['EXPORT:EXPORT'])){
                            exportedValue += energyKwhTotals[key];
                        }
                    }
                    //add value to chart data
                    var expObj = {
                        x: utcDate,
                        y: exportedValue
                    }
                    exportedEnergy.push(expObj);
                    totalExport += exportedValue;

                    var dataObj = {
                        x: utcDate,
                        y: generatedValue - exportedValue
                    }
                    solarUse.push(dataObj);
                }

                //create objects for chart
                var generatedEnergyProcessed = {
                    name:'Solar use',
                    data:solarUse
                };

                var importedEnergyProcessed = {
                    name:'Imported',
                    data:importedEnergyNegative
                };

                var exportedEnergyProcessed = {
                    name:'Exported',
                    data:exportedEnergy
                };


                //set total spend on summary display
                $scope.totalGenerated      = totalGenerated.toFixed(3);
                $scope.totalImport         = totalImport.toFixed(3);
                $scope.totalExport         = totalExport.toFixed(3);
                $scope.totalGenerationUsed = (totalGenerated - totalExport).toFixed(3);



                //region CONFIGURE CHART//
                ////////////////////////////////////////////////////////////////
                var chartOptions = angular.copy($scope.chartOptionsDefault);

                ////set chart type
                chartOptions.chart.type = 'column';
                //use this option if stacking columns
                chartOptions.plotOptions.series.stacking = 'normal';
                //remove border
                chartOptions.plotOptions.series.borderWidth = '0';




                ////format tooltip
                chartOptions.tooltip = {
                    formatter: function () {
                        return showToolTipWeekSummaries(this);
                    }
                };


                //populate chart with data
                //populate chart with data
                chartOptions.series[0] = exportedEnergyProcessed;
                chartOptions.series[1] = generatedEnergyProcessed;
                chartOptions.series[2] = importedEnergyProcessed;

                //color data
                chartOptions.series[0].color = colourExported;
                chartOptions.series[1].color = colourSolar;
                chartOptions.series[2].color = colourImported;


                //xAxis format
                chartOptions.xAxis.type                 = 'datetime';
                chartOptions.xAxis.tickInterval         = 60 * 60 * 24 * 1000;//1 day
                chartOptions.xAxis.min                  = moment($scope.from).valueOf();
                chartOptions.xAxis.max                  = moment($scope.to).subtract(12, 'hour').valueOf();//subtracting 12 hours ensures another day isnt added
                chartOptions.xAxis.labels               = {step: 1};
                chartOptions.xAxis.dateTimeLabelFormats = {day: '%a %d'};

                //manipulate chart yAxis
                chartOptions.yAxis.labels = {
                    formatter: function () {
                        var value = this.value;
                        if(value <= 0){
                            value = value * -1;
                        }
                        return value.toFixed(3);;
                    }
                };
                //endregion

                 //create chart
                $scope.currentChart = new Highcharts.Chart(chartOptions);
                freeWatchers();
            }

            function drawMonthSummariesChart(response){
                var generatedEnergy        = [];
                var importedEnergy         = [];
                var importedEnergyNegative = [];
                var exportedEnergy         = [];
                var solarUse               = [];

                //variables for calculating the summary data
                var totalGenerated = 0;
                var totalImport    = 0;
                var totalExport    = 0;

                //get relevant data from response
                for (var inc = 0; inc<response.data.values.length; inc++) {
                    //create date object for current iteration
                    var day =  response.data.values[inc].day;
                    var month =  response.data.values[inc].month;
                    var year =  response.data.values[inc].year;
                    var utcDate =  moment(year + ',' + month + ',' + day, "YYYY-MM-DD");
                    var energyKwhTotals = response.data.values[inc].energyKwhTotals;

                    //generated
                    var generatedValue = 0;
                    for (var key in energyKwhTotals) {
                        if(!key.indexOf(['GENERATION:GENERATION'])){
                            generatedValue += energyKwhTotals[key];
                        }
                    }
                    //add value to chart data
                    generatedEnergy.push(generatedValue);
                    totalGenerated += generatedValue;


                    //imported
                    var value = 0;
                    for (var key in energyKwhTotals) {
                        if(!key.indexOf(['IMPORT:IMPORT_T'])){
                            value += energyKwhTotals[key];
                        }
                    }
                    //add value to chart data
                    importedEnergy.push(value);
                    var importedObj = {
                        x: utcDate,
                        y: value*-1
                    }
                    importedEnergyNegative.push(importedObj);
                    totalImport += value;

                    //exported
                    var exportedValue = 0;
                    for (var key in energyKwhTotals) {
                        if(!key.indexOf(['EXPORT:EXPORT'])){
                            exportedValue += energyKwhTotals[key];
                        }
                    }
                    //add value to chart data
                    var expObj = {
                        x: utcDate,
                        y: exportedValue
                    }
                    exportedEnergy.push(expObj);
                    totalExport += exportedValue;

                    var dataObj = {
                        x: utcDate,
                        y: generatedValue - exportedValue
                    }
                    solarUse.push(dataObj);
                }

                //create objects for chart
                var generatedEnergyProcessed = {
                    name:'Solar use',
                    data:solarUse
                };

                var importedEnergyProcessed = {
                    name:'Imported',
                    data:importedEnergyNegative
                };

                var exportedEnergyProcessed = {
                    name:'Exported',
                    data:exportedEnergy
                };


                //set total spend on summary display
                $scope.totalGenerated      = totalGenerated.toFixed(3);
                $scope.totalImport         = totalImport.toFixed(3);
                $scope.totalExport         = totalExport.toFixed(3);
                $scope.totalGenerationUsed = (totalGenerated - totalExport).toFixed(3);



                //region CONFIGURE CHART//
                ////////////////////////////////////////////////////////////////
                var chartOptions = angular.copy($scope.chartOptionsDefault);

                ////set chart type
                chartOptions.chart.type = 'column';
                //use this option if stacking columns
                chartOptions.plotOptions.series.stacking = 'normal';
                //remove border
                chartOptions.plotOptions.series.borderWidth = '0';

                ////format tooltip
                chartOptions.tooltip = {
                    formatter: function () {
                        return showToolTipWeekSummaries(this);
                    }
                };


                //populate chart with data
                //populate chart with data
                chartOptions.series[0] = exportedEnergyProcessed;
                chartOptions.series[1] = generatedEnergyProcessed;
                chartOptions.series[2] = importedEnergyProcessed;

                //color data
                chartOptions.series[0].color = colourExported;
                chartOptions.series[1].color = colourSolar;
                chartOptions.series[2].color = colourImported;

                //xAxis format
                chartOptions.xAxis.type                 = 'datetime';
                chartOptions.xAxis.tickInterval         = 60 * 60 * 24 * 1000;//1 day
                chartOptions.xAxis.min                  = moment($scope.from).valueOf();
                chartOptions.xAxis.max                  = moment($scope.to).subtract(12, 'hour').valueOf();//subtracting 12 hours ensures another day isnt added
                chartOptions.xAxis.labels               = {step: 1};
                chartOptions.xAxis.dateTimeLabelFormats = {day: '%d'};

                //manipulate chart yAxis
                chartOptions.yAxis.labels = {
                    formatter: function () {
                        var value = this.value;
                        if(value <= 0){
                            value = value * -1;
                        }
                        return value.toFixed(3);;
                    }
                };
                //endregion

                //create chart
                $scope.currentChart = new Highcharts.Chart(chartOptions);
                freeWatchers();
            }

            function drawYearSummariesChart(response){
                $scope.hasUpdated = true;

                var generatedEnergy        = [];
                var importedEnergy         = [];
                var importedEnergyNegative = [];
                var exportedEnergy         = [];
                var solarUse               = [];

                //variables for calculating the summary data
                var totalGenerated = 0;
                var totalImport    = 0;
                var totalExport    = 0;

                // Loop through months data to process
                for (var i = 0; i<response.data.summaries.length; i++) {
                    var epochEnergies = response.data.summaries[i].summary.epochEnergies;


                    //generated
                    var generatedValue = 0;
                    var importedValue  = 0;
                    var exportedValue  = 0;

                    for (var x = 0; x < epochEnergies.length; x++) {
                        if (epochEnergies[x].energyType === 'GENERATION') {
                            totalGenerated += epochEnergies[x].energyKWh;
                            generatedValue += epochEnergies[x].energyKWh;
                        }

                        if (epochEnergies[x].energyType === 'IMPORT') {
                            importedValue += epochEnergies[x].energyKWh;
                            totalImport   += epochEnergies[x].energyKWh;
                        }

                        if (epochEnergies[x].energyType === 'EXPORT') {
                            totalExport   += epochEnergies[x].energyKWh;
                            exportedValue += epochEnergies[x].energyKWh;
                        }
                    }

                    //add totals for month to chart data object
                    generatedEnergy.push(generatedValue);
                    importedEnergy.push(importedValue);
                    importedEnergyNegative.push(importedValue * -1);
                    exportedEnergy.push(exportedValue);

                    //generate solar use value for chart
                    solarUse.push(generatedValue - exportedValue);
                }


                //create objects for chart
                var generatedEnergyProcessed = {
                    name:'Solar use',
                    data:solarUse
                };

                var importedEnergyProcessed = {
                    name:'Imported',
                    data:importedEnergyNegative
                };

                var exportedEnergyProcessed = {
                    name:'Exported',
                    data:exportedEnergy
                };


                //set total spend on summary display
                $scope.totalGenerated = totalGenerated.toFixed(3);
                $scope.totalImport = totalImport.toFixed(3);
                $scope.totalExport = totalExport.toFixed(3);
                $scope.totalGenerationUsed = (totalGenerated - totalExport).toFixed(3);


                //region CONFIGURE CHART
                var chartOptions = angular.copy($scope.chartOptionsDefault);

                ////set chart type
                chartOptions.chart.type = 'column';
                //use this option if stacking columns
                chartOptions.plotOptions.series.stacking = 'normal';
                //remove border
                chartOptions.plotOptions.series.borderWidth = '0';


                ////format tooltip
                chartOptions.tooltip = {
                    formatter: function () {
                        return showToolTipEpoch(this);
                    }
                };

                //populate chart with data
                chartOptions.series[0] = exportedEnergyProcessed;
                chartOptions.series[1] = generatedEnergyProcessed;
                chartOptions.series[2] = importedEnergyProcessed;

                //color data
                chartOptions.series[0].color = colourExported;
                chartOptions.series[1].color = colourSolar;
                chartOptions.series[2].color = colourImported;

                //create chart xAxis
                chartOptions.xAxis.min          = 0;
                chartOptions.xAxis.max          = 11;
                chartOptions.xAxis.tickInterval = 0;
                chartOptions.xAxis.categories   = createMonthLabels();


                //manipulate chart yAxis
                chartOptions.yAxis.labels = {
                    formatter: function () {
                        var value = this.value;
                        if(value <= 0){
                            value = value * -1;
                        }
                        return value.toFixed(3);;
                    }
                };

                //endregion

                //CREATE CHART
                $scope.currentChart = new Highcharts.Chart(chartOptions);
                freeWatchers();
            }

            //tooltip when hovering over columnss
            function showToolTipEpoch(value){
                var valY = value.y;
                if(valY <= 0){
                    valY = valY * -1;
                }
                return value.series.name + '<br>' + valY.toFixed(3) + 'kWh';
            }
            function showToolTipWeekSummaries(value){
                var valY = value.y;
                if(valY <= 0){
                    valY = valY * -1;
                }
                return value.series.name + '<br>' + valY.toFixed(3) + 'kWh';
            }



            //create labels
            function createHoursLabels(){
                var mins = ['00','15','30','45'];
                var categories = [];
                for(var hrsInc=0;hrsInc<24;hrsInc++){
                    var hr = hrsInc;
                    if(hr<10){
                        hr = '0'+hr;
                    }

                    for(var minInc=0;minInc<mins.length;minInc++){
                        var hrmin = hr;
                        categories.push(hrmin);
                    }
                }
                return categories;
            }
            function createDaysLabels(){
                var categories = [];

                for (var numDays=0; numDays < 7; numDays++) {
                    var currentDay = Number(moment($scope.from).add(numDays, 'day').format("DD"));
                    var currentDayName = moment($scope.from).add(numDays, 'day').format("ddd");

                    categories[numDays] = currentDayName + ' ' + currentDay;
                }
                return categories;
            }
            function createDateLabels(){
                var categories = [];
                for(var dte=1;dte<32;dte++){
                    var date = dte;
                    if(date<10){
                        date = '0'+date;
                    }
                    categories.push(date);
                }
                return categories;
            }
            function createMonthLabels(){
                var categories = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

                return categories;
            }

            function calculateNumberOfDays(){
                var numberOfDays = moment($scope.from).daysInMonth() - 1;
                return numberOfDays;
            }


            //summary panel
            function updateSummaryPanel(totalEnergy){
                //set total energy
                $scope.totalEnergy = totalEnergy;

            }



            //watch input params
            function watchForInputChanges(){
                $scope.$watch(
                    'period',
                    function(){
                        //console.log('period: ' + $scope.hasUpdated);
                        if (!$scope.hasUpdated) {
                            updateData($scope.systemId,$scope.from,$scope.to);
                            $scope.hasUpdated = true;
                        }
                    }
                );

                $scope.$watch(
                    'from',
                    function(){
                        //console.log('from: ' + $scope.hasUpdated);
                        if (!$scope.hasUpdated) {
                            updateData($scope.systemId,$scope.from,$scope.to);
                            $scope.hasUpdated = true;
                        }
                    }
                );

                $scope.$watch(
                    'to',
                    function(){
                        //console.log('to: ' + $scope.hasUpdated);
                        if (!$scope.hasUpdated) {
                            updateData($scope.systemId,$scope.from,$scope.to);
                            $scope.hasUpdated = true;
                        }
                    }
                );

                $scope.$watch(
                    'type',
                    function(){
                        //console.log('type: ' + $scope.hasUpdated);
                        if (!$scope.hasUpdated) {
                            updateData($scope.systemId,$scope.from,$scope.to);
                            $scope.hasUpdated = true;
                        }
                    }
                );
            }
            function freeWatchers(){
                //frees the watchers to stop multiple renders
                $scope.hasUpdated = false;
            }


            //region MESSAGE FUNCTIONS
            function haveAlerts(){
                if ($scope.alertMessage === []) {
                    return false;
                } else {
                    return true;
                }
            }
            function addAlertMessage(msg){
                $scope.alertMessages.push(msg);
            }
            function showAlert(type){
                if(type === MESSAGE_TYPE.success){
                    $scope.messageType = MESSAGE_TYPE.success;
                } else
                if(type === MESSAGE_TYPE.fail){
                    $scope.messageType = MESSAGE_TYPE.fail;
                } else {
                    $scope.messageType = MESSAGE_TYPE.default;
                }
                var msg = '';
                for(var i=0; i<$scope.alertMessages.length; i++){
                    msg += '<p>' + $scope.alertMessages[i];
                }
                $scope.alertMessage = $sce.trustAsHtml(msg);
                $scope.showAlert = true;
            }
            function closeAlert(){
                $scope.alertMessages = [];
                $scope.alertMessage = '';
                $scope.showAlert = false;
                $scope.messageType = MESSAGE_TYPE.default;
            }
            //endregion

        }
    }


})();