(function() {
    'use strict';

    angular
        .module('app.energynote')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$scope', '$rootScope', 'SiteData','LocationData','Storage', '$state','$sce', '$q', 'MESSAGE_TYPE', 'PRODUCT_TYPE','$translate'];

    /* @ngInject */
    function SettingsController($scope, $rootScope, SiteData, LocationData, Storage, $state, $sce, $q, MESSAGE_TYPE, PRODUCT_TYPE, $translate) {
        var vm = this;

        var promises              = [];//for queueing api calls

        vm.systemSettings         = false;
        vm.selectSystem           = false;
        vm.isSwitchButtonDisabled = false;
        vm.tab                    = 0;

        //microgeneration dropdown
        vm.microgenOptions = [
            {
                id: '0',
                name: 'Feed in tariff & optional deeming'
            },
            {
                id: '1',
                name: 'Export rate'
            }
        ];
        vm.microgenOptionSelected             = {}; //options for microgen select, options are 'vm.microgenOptions'
        vm.microgenOptionSelectedInitialValue = 1;

        //download options
        vm.downloadOptions = [
            {
                id: '1',
                name: 'Daily totals CSV'
            },
            {
                id: '2',
                name: 'Recent 15-Minute data CSV'
            }
        ];
        vm.downloads = vm.downloadOptions[0];

        //system dropdown
        vm.dropdownDefaultOption = {
            name:'select a system',
            systemid:0
        };
        vm.locationOptions = [
            {
                value: 'Australia/Adelaide',
                label: 'Australia/Adelaide'
            },
            {
                value: 'Australia/Brisbane',
                label: 'Australia/Brisbane'
            },
            {
                value: 'Australia/Darwin',
                label: 'Australia/Darwin'
            },
            {
                value: 'Australia/Hobart',
                label: 'Australia/Hobart'
            },
            {
                value: 'Australia/Melbourne',
                label: 'Australia/Melbourne'
            },
            {
                value: 'Australia/Perth',
                label: 'Australia/Perth'
            },
            {
                value: 'Australia/Sydney',
                label: 'Australia/Sydney'
            },
            {
                value: 'Europe/Vienna',
                label: 'Europe/Vienna'
            },
            {
                value: 'Europe/Brussels',
                label: 'Europe/Brussels'
            },
            {
                value: 'Asia/Nicosia',
                label: 'Asia/Nicosia'
            },
            {
                value: 'Europe/Copenhagen',
                label: 'Europe/Copenhagen'
            },
            {
                value: 'Europe/Helsinki',
                label: 'Europe/Helsinki'
            },
            {
                value: 'Europe/Paris',
                label: 'Europe/Paris'
            },
            {
                value: 'Europe/Berlin',
                label: 'Europe/Berlin'
            },
            {
                value: 'Europe/Rome',
                label: 'Europe/Rome'
            },
            {
                value: 'Asia/Kuwait',
                label: 'Asia/Kuwait'
            },
            {
                value: 'Europe/Riga',
                label: 'Europe/Riga'
            },
            {
                value: 'Europe/Amsterdam',
                label: 'Europe/Amsterdam'
            },
            {
                value: 'Pacific/Auckland',
                label: 'Pacific/Auckland'
            },
            {
                value: 'Europe/Oslo',
                label: 'Europe/Oslo'
            },
            {
                value: 'Europe/Ljubljana',
                label: 'Europe/Ljubljana'
            },
            {
                value: 'Europe/Madrid',
                label: 'Europe/Madrid'
            },
            {
                value: 'Europe/Stockholm',
                label: 'Europe/Stockholm'
            },
            {
                value: 'Europe/Zurich',
                label: 'Europe/Zurich'
            },
            {
                value: 'Europe/London',
                label: 'Europe/London'
            }
        ];

        vm.countriesThatUseEuro  = ['AT','BE','CY','EE','FI','FR','DE','GR','IE','IT','LV','LT','LU','MT','NL','PT','ES','SI','SK'];
        vm.unitedKingdomCode     = 'GB';
        
        vm.userSystem            = {};
        vm.userSystemsList       = [];
        vm.userSystemsOptions    = [];
        vm.doPopulate            = false;//required after q for the system dropdown to populate (used by watch)
        vm.selectIsCurrentSystem = '';
        vm.currentSystem         = '';
        vm.settings              = {};
        vm.hourOptions           = [];
        vm.minuteOptions         = [];

        //tariff options
        vm.hasTariff2            = false; //to show tariff 2 area if user has set tariff 2
        vm.hasTariff3            = false; //to show tariff 3 area if user has set tariff 3
        vm.hasTariff2InitialVal  = false; //used to store the initial value
        vm.hasTariff3InitialVal  = false; //used to store the initial value
        vm.t3Time                = {}; //object to hold tariff time
        vm.t2Time                = {}; //object to hold tariff time


        //patterns
        vm.patternNumbers       = /^[0-9.]{1,7}$/; //allows numbers and full point


        //expose on view
        vm.switchSystem          = switchSystem;
        vm.disableSwitchButton   = disableSystemSwitchButton;
        vm.showTab               = showTab;
        vm.attemptSave           = attemptSave;
        vm.closeAlert            = closeAlert;
        vm.download              = download;
        vm.showTariffSaveMessage = showTariffSaveMessage;

        //initialise
        activate();



        ////////////////

        function activate() {
            closeAlert();
            getHoursAsArray();
            getMinutesAsArray();
            checkUserSystems();
        }




        //public methods
        function checkUserSystems() {
            return SiteData.userDetailSystems()
                .then(function (response) {

                    if (response.status === 200) {
                        //no systems
                        if(response.data.systemDetails.length === 0){
                            _noSystems();
                        }
                        //1 system
                        if(response.data.systemDetails.length === 1){
                            _checkOneSystem(response.data.systemDetails);
                        }
                        //multiple systems
                        if(response.data.systemDetails.length > 1){
                            _checkMultipleSystems(response.data.systemDetails);
                        }
                    }
                });
        }

        //private methods
        function _noSystems(){
            ////user has no systems, go create one
            //delete rogue default system
            Storage.deleteDefaultSystem();
            //delete system name
            Storage.deleteSystemName();
            //go to install-first-product to create a system
            $state.go('install-first-product');
        }
        function _checkOneSystem(data){
            //save to local storage and go to dashboard
            var systemId = data[0].systemId;

            //we select data[0] as there is only 1 system
            var productType = _getProductType(data[0]);

            //if system isn't energynote
            if(productType !== PRODUCT_TYPE.energynote) {
                _goToProductSettings(productType);
            }

            vm.currentSystem = systemId;

            //save the current system
            Storage.saveCurrentSystemType(productType);

            //save system name
            Storage.saveSystemName(vm.currentSystem);

            //save default system
            Storage.saveDefaultSystem(vm.currentSystem);

            //SHOW SETTINGS/SHOW SELECT
            loadSystemData();
            vm.systemSettings = true;
            vm.selectSystem   = false;
            /////////////////////////
        }
        function _checkMultipleSystems(data){
            //store energynote systems in array for system dropdown if needed
            //filter out other system types
            for (var system=0; system < data.length; system++) {

                //we pass in selected system to determine its type
                var productType = _getProductType(data[system]);

                //if system is energynote
                if(productType === PRODUCT_TYPE.energynote) {
                    vm.userSystemsList.push(data[system].systemId);
                }
            }
            //only generate list if more than 1 system
            if(vm.userSystemsList.length > 1){
                generateListForSystemDropdown(vm.userSystemsList);
            };


            //check if default system saved
            if (Storage.defaultSystemExists()) {
                //check against users systems
                var storedDefaultSystem = Storage.getDefaultSystem();

                //determine whether the stored system matches any returned systems
                var systemFound = false;

                //loop through all users systems to see if one matches saved default
                for (var system = 0; system < data.length; system++) {
                    var systemId = data[system].systemId;

                    //if match is found then show settings
                    if (systemId === storedDefaultSystem) {
                        systemFound = true;

                        //we pass in selected system to determine its type
                        var productType = _getProductType(data[system]);

                        //if system isn't energynote
                        if(productType !== PRODUCT_TYPE.energynote) {
                            _goToProductSettings(productType);
                        }

                        //system found and is energynote
                        //SHOW SETTINGS/SHOW SELECT
                        vm.currentSystem = systemId;
                        //save system name
                        Storage.saveSystemName(vm.currentSystem);
                        //save the current system
                        Storage.saveCurrentSystemType(productType);
                        loadSystemData();
                        vm.systemSettings = true;
                        //only show dropdown list if more than 1 system
                        if(vm.userSystemsList.length > 1) {
                            populateSystemSelect(vm.currentSystem);
                            vm.selectSystem = true;
                        }
                        //////////////////////////
                        break;
                        ////
                    }
                }
                if (!systemFound){
                    _noDefaultFoundOnMultipleSystems(data);
                }
            } else {
                //no default exists for multiple systems
                _noDefaultFoundOnMultipleSystems(data);
            }
        }
        function _noDefaultFoundOnMultipleSystems(data){
            //todo: check that this works when we have an account with 2 systems
            //delete rogue default system
            Storage.deleteDefaultSystem();
            //delete any stored system names
            Storage.deleteSystemName();
            //HIDE SETTINGS/SHOW SELECT
            vm.systemSettings = false;
            populateSystemSelect();
            vm.selectSystem = true;
        }

        function _getProductType(systemObject){
            //takes 1 system object
            var productType = null;
            if( _.where(systemObject.devices, {'sensorType':68}).length){
                productType = PRODUCT_TYPE.energynote;
            }
            //cosy
            if( _.where(systemObject.devices, {'sensorType':0}).length){
                productType = PRODUCT_TYPE.cosy;
            }
            return productType;
        }
        function _goToProductSettings(productType){
            if(productType === PRODUCT_TYPE.energynote){
                $state.go('settings');
            } else
            if (productType === PRODUCT_TYPE.cosy){
                //todo: setup cosy settings
                $state.go('cosy-settings');
            }
        }

        function loadSystemData(){
            SiteData.systemInfo(vm.currentSystem)
                .then(function(response) {
                    if (response.status === 200) {
                       populateSettings(response.data);
                    } else {
                        addAlertMessage('Sorry, could not fetch system information');
                        showAlert(MESSAGE_TYPE.fail);
                    }
                });
        }

        function populateSettings(data){
            //populate form
            vm.settings = data;

            //locale tag
            //initially, locale will not be set and will throw and exception
            //if exception then set to default 'English'.
            var locale = 'en';
            for (var prop in vm.settings.tags) {
                if(prop === 'locale'){
                    locale = vm.settings.tags.locale;
                    break;
                } else {
                    locale = 'en';
                }
            }
            $translate.use(locale);




            //tariffs///////////////////////
            //get active tariffs (i.e. 2 and/or 3)
            if (typeof vm.settings.tariffDetails.tariffCostPence.IMPORT_T2 !== 'undefined') {
                vm.settings.tariffDetails.tariffCostPence.IMPORT_T2 = vm.settings.tariffDetails.tariffCostPence.IMPORT_T2.toFixed(3);
            }
            if (typeof vm.settings.tariffDetails.tariffCostPence.IMPORT_T3 !== 'undefined') {
                vm.settings.tariffDetails.tariffCostPence.IMPORT_T3 = vm.settings.tariffDetails.tariffCostPence.IMPORT_T3.toFixed(3);
            }


            vm.hasTariff2           = data.tariffDetails.tariffCostPence.IMPORT_T2;
            vm.hasTariff3           = data.tariffDetails.tariffCostPence.IMPORT_T3;
            vm.hasTariff2InitialVal = angular.copy(vm.hasTariff2);
            vm.hasTariff3InitialVal = angular.copy(vm.hasTariff3);

            //get dayTariffs
            var dayTariffs = data.tariffDetails.dayTariffs;


            //only get data for tariffs if the costs exist
            if(vm.hasTariff2){
                //number of t2 tariffs
                var tariffObjects      = _.where(dayTariffs, {tierType: "IMPORT_T2"});
                var numOfTariffObjects = tariffObjects.length;

                if(numOfTariffObjects > 1){
                    //there are only 2 day tariffs if time straddles midnight
                    //we then need to create 2 objects, i.e. if time set is 21:00-03:00 then
                    //2 objects: 21:00 - 23:59 and 00:00 - 03:00
                    for(var i=0;i<numOfTariffObjects;i++){
                        if(tariffObjects[i].endHour === 23 && tariffObjects[i].endMin === 59){
                            //start time
                            //use first object to populate start time
                            vm.t2Time.startHour = tariffObjects[i].startHour;
                            vm.t2Time.startMin = tariffObjects[i].startMin;

                        } else {
                            //end time
                            //use second object to populate end time
                            vm.t2Time.endHour = tariffObjects[i].endHour;
                            vm.t2Time.endMin = tariffObjects[i].endMin;
                        };
                    };
                } else {
                    vm.t2Time.startHour = tariffObjects[0].startHour;
                    vm.t2Time.startMin = tariffObjects[0].startMin;
                    vm.t2Time.endHour = tariffObjects[0].endHour;
                    vm.t2Time.endMin = tariffObjects[0].endMin;
                };
            };
            if(vm.hasTariff3){
                //number of t3 tariffs
                var tariffObjects      = _.where(dayTariffs, {tierType: "IMPORT_T3"});
                var numOfTariffObjects = tariffObjects.length;

                if(numOfTariffObjects > 1){
                    //there are only 2 day tariffs if time straddles midnight
                    //we then need to create 2 objects, i.e. if time set is 21:00-03:00 then
                    //2 objects: 21:00 - 23:59 and 00:00 - 03:00
                    for(var inc=0; inc<numOfTariffObjects; inc++){
                        if(tariffObjects[inc].endHour === 23 && tariffObjects[inc].endMin === 59){
                            //start time
                            //use first object to populate start time
                            vm.t3Time.startHour = tariffObjects[inc].startHour;
                            vm.t3Time.startMin = tariffObjects[inc].startMin;
                        } else {
                            //end time
                            //use second object to populate end time
                            vm.t3Time.endHour = tariffObjects[inc].endHour;
                            vm.t3Time.endMin = tariffObjects[inc].endMin;
                        }
                    }
                } else {
                    vm.t3Time.startHour = tariffObjects[0].startHour;
                    vm.t3Time.startMin  = tariffObjects[0].startMin;
                    vm.t3Time.endHour   = tariffObjects[0].endHour;
                    vm.t3Time.endMin    = tariffObjects[0].endMin;
                };
            };

            //copy object for comparison when saving
            vm.t2TimeClean = angular.copy(vm.t2Time);
            vm.t3TimeClean = angular.copy(vm.t3Time);

            vm.settings.budget  = (vm.settings.budget / 100).toFixed(2);
            vm.settings.pvSize  = vm.settings.pvSize.toFixed(2);
            vm.settings.pvPrior = (vm.settings.pvPrior / 100).toFixed(2);

            vm.settings.tariffDetails.defaultCost              = vm.settings.tariffDetails.defaultCost.toFixed(3);
            vm.settings.tariffDetails.importStandingChargeCost = vm.settings.tariffDetails.importStandingChargeCost.toFixed(3);

            //determine microgen settings
            vm.settings.tariffDetails.generationCost = vm.settings.tariffDetails.generationCost.toFixed(3);
            vm.settings.tariffDetails.exportCost     = vm.settings.tariffDetails.exportCost.toFixed(3);
            vm.settings.tariffDetails.deemingCost    = (vm.settings.tariffDetails.deemingCost * 2).toFixed(3);


            //determine microgen settings
            //microgeneration tag
            var microgenerationType = vm.microgenOptions[0].id;
            for (var prop in vm.settings.tags) {
                if(prop === 'microgenerationType'){
                    microgenerationType = vm.settings.tags.microgenerationType;
                    break;
                } else {
                    microgenerationType = vm.microgenOptions[0].id;
                }
            }

            //set default to FiT and Deeming
            vm.microgenOptionSelected = vm.microgenOptions[Number(microgenerationType)];

            //create objects for comparison when saving
            vm.microgenOptionSelectedInitialValue = angular.copy(vm.microgenOptionSelected);

        }

        function populateSystemSelect(system){
            //a watch is required to ensure that the array is ready before we start to populate the dropdown
            //vm.doPopulate is the trigger to allow the method to run
            var tempWatch = $scope.$watch('vm.doPopulate',function(){
                if(vm.doPopulate) {
                    //there is no current system
                    if (system === undefined) {
                        //insert 'select a system' into dropdown
                        vm.userSystemsOptions.unshift(vm.dropdownDefaultOption);
                        //preselect 'select a system'
                        vm.userSystem = vm.userSystemsOptions[0];
                        //enable the button
                        vm.isSwitchButtonDisabled = false;
                    }
                    //there is current system
                    else {
                        //set dropdown to current system
                        var currentSystemIndex = _.findIndex(vm.userSystemsOptions,{systemid:system});
                        vm.userSystem = vm.userSystemsOptions[currentSystemIndex];
                        //set the current system
                        vm.currentSystem = system;
                        //disable the button
                        vm.isSwitchButtonDisabled = true;
                    }
                    tempWatch();//clears the watch
                }


            })
            
        }

        function disableSystemSwitchButton(){
            if (vm.selectIsCurrentSystem === vm.userSystem) {
                vm.isSwitchButtonDisabled = true;
            } else {
                vm.isSwitchButtonDisabled = false;
            }
        }





        function isValidated(){
            closeAlert();

            var formIsValid = true;

            //system name
            if (vm.settingsForm.name.$error.required){
                addAlertMessage('Please enter a system name, it must have a minimum of 4 characters.');
                formIsValid = false;
            }
            if (vm.settingsForm.name.$error.minlength){
                addAlertMessage('System name must have a minimum of 4 characters.');
                formIsValid = false;
            }

            //country
            if (vm.settingsForm.country.$error.required){
                addAlertMessage('Please enter a country, it must have a minimum of 4 characters.');
                formIsValid = false;
            }
            if (vm.settingsForm.country.$error.minlength){
                addAlertMessage('Country must have a minimum of 4 characters.');
                formIsValid = false;
            }

            //postcode
            if (vm.settingsForm.postCode.$error.required){
                addAlertMessage('Please enter a postcode, it must have between 1 and 20 characters.');
                formIsValid = false;
            }
            if (vm.settingsForm.postCode.$error.minlength){
                addAlertMessage('Postcode must have a minimum of 1 characters.');
                formIsValid = false;
            }
            if (vm.settingsForm.postCode.$error.maxlength){
                addAlertMessage('Postcode must have a minimum of 20 characters.');
                formIsValid = false;
            }

            //budget
            if (vm.settingsForm.budget.$error.pattern){
                addAlertMessage('Budget: Only numbers and full stops allowed');
                formIsValid = false;
            }

            //kWp rating
            if (vm.settingsForm.pvSize.$error.pattern){
                addAlertMessage('kWp Rating: Only numbers and full stops allowed');
                formIsValid = false;
            }

            //prior earnings
            if (vm.settingsForm.pvPrior.$error.pattern){
                addAlertMessage('Prior Earnings: Only numbers and full stops allowed');
                formIsValid = false;
            }

            //export cost
            if (vm.settingsForm.exportCost.$error.pattern){
                addAlertMessage('Export Tariff: Only numbers and full stops allowed');
                formIsValid = false;
            }

            //generation cost
            if (vm.settingsForm.generationCost.$error.pattern){
                addAlertMessage('Generation Tariff: Only numbers and full stops allowed');
                formIsValid = false;
            }

            //deeming cost
            if (vm.settingsForm.deemingCost.$error.pattern){
                addAlertMessage('Deemed Export Tariff: Only numbers and full stops allowed');
                formIsValid = false;
            }

            //standing charge
            if (vm.settingsForm.importStandingChargeCost.$error.pattern){
                addAlertMessage('Standing Charge: Only numbers and full stops allowed');
                formIsValid = false;
            }

            //default cost
            if (vm.settingsForm.defaultCost.$error.pattern){
                addAlertMessage('Tariff 1 cost: Only numbers and full stops allowed');
                formIsValid = false;
            }

            //tariff 2 cost
            if (vm.settingsForm.tariff2Cost.$error.pattern){
                addAlertMessage('Tariff 2 cost: Only numbers and full stops allowed');
                formIsValid = false;
            }

            //tariff 3 cost
            if (vm.settingsForm.tariff3Cost.$error.pattern){
                addAlertMessage('Tariff 3 cost: Only numbers and full stops allowed');
                formIsValid = false;
            }



            return formIsValid;

        }

        function attemptSave(){
            //reset promises
            promises = [];

            if(isValidated()) {
                var doQueue = false;
                //check if microgen settings have changed
                var microgenChanged = !angular.equals(vm.microgenOptionSelectedInitialValue, vm.microgenOptionSelected);

                //save details if details change or microgen setting change
                if (detailsDirty() || microgenChanged) {
                    promises.push(submitDetails());
                    doQueue = true;
                }
                //system tariffs
                if (tariffsDirty()) {
                    promises.push(submitTariffs());
                    doQueue = true;
                }
                //system timezone
                if (timeZoneDirty()) {
                    promises.push(submitTimeZone());
                    doQueue = true;
                }

                // Wait for all promises
                if(doQueue){
                    $q.allSettled(promises)
                        .then(function (results) {
                            var hasFailed = false;
                            results.forEach(function (result) {
                                if (result.status === 'fulfilled') {
                                    //addAlertMessage(result.value);
                                } else {
                                    hasFailed = true;
                                    // This item failed to be loaded
                                    addAlertMessage(result.reason);
                                }
                            });

                            //reset form
                            vm.settingsForm.$setPristine();

                            //if failure then show failures
                            if (hasFailed) {
                                showAlert(MESSAGE_TYPE.fail);
                            } else {
                                //save system name
                                Storage.saveSystemName(vm.currentSystem);
                                //show singular success message if ass succeed
                                addAlertMessage('Settings successfully updated');
                                showAlert(MESSAGE_TYPE.success);
                            }
                        });
                }

            } else {
                //show alert for not valid
                showAlert(MESSAGE_TYPE.fail);
            }
        }

        function timeZoneDirty(){
            //initialise check
            var dirtyForm = false;

            //check timeZone
            if (vm.settingsForm.timeZone.$dirty) {
                dirtyForm = true;
            }


            return dirtyForm;
        }
        function submitTimeZone(){
            var deferred = $q.defer();

            var timezoneObject = {
                timeZoneId:vm.settings.timeZoneValue.timeZone
            }

            //save details
            SiteData.setTimeZone(vm.currentSystem, timezoneObject)
                .then(function(response) {
                    if (response.status === 200) {
                        deferred.resolve('Timezone successfully updated');
                    } else {
                        deferred.reject('Sorry, Timezone failed to update');
                    }
                });

            return deferred.promise;

        }

        function detailsDirty(){
            //initialise check
            var dirtyForm = false;


            //check budget
            if (vm.settingsForm.budget.$dirty) {
                dirtyForm = true;
            }

            //check system name
            if (vm.settingsForm.name.$dirty) {
                dirtyForm = true;
            }

            //check country
            if(vm.settingsForm.country.$dirty){
                dirtyForm = true;
            }
            //check postCode
            if(vm.settingsForm.postCode.$dirty){
                dirtyForm = true;
            }

            //check pvSize (kwp rating)
            if(vm.settingsForm.pvSize.$dirty){
                dirtyForm = true;
            }
            //check pvPrior (prior earnings)
            if(vm.settingsForm.pvPrior.$dirty){
                dirtyForm = true;
            }

            return dirtyForm;
        }
        function submitDetails(){
            var deferred = $q.defer();

            var detailsObject = {
                budget:vm.settings.budget*100,
                name:vm.settings.name,
                country:vm.settings.country,
                postCode:vm.settings.postCode,
                pvSize:vm.settings.pvSize,
                pvPrior:vm.settings.pvPrior*100,
                longitude:0,//fallback in case call to getPostCodeInfo fails
                latitude:0 //fallback in case call to getPostCodeInfo fails
            }

            //set localisation
            //currently there are only 2 options en and eu (£/€)
            //all countries that use euros will be set to eu (as determined by countriesThatUseEuro
            //GB will be set to en.

            var locale = '';
            var countryUsesEuroCurrency = _.contains(vm.countriesThatUseEuro,vm.settings.country);
            if(countryUsesEuroCurrency){
                locale = 'eu';
                $translate.use(locale);
            } else {
                locale = 'en';
                $translate.use(locale);
            }
            //add to the save object
            var localeTag = {
                locale:locale
            }
            detailsObject.tags = localeTag;

            //set microgeneration option change
            detailsObject.tags.microgenerationType = vm.microgenOptionSelected.id;


            //set longitude/latitude
            //only set if postcode has changed
            if(vm.settingsForm.postCode.$dirty){
                LocationData.getPostCodeInfo(vm.settings.postCode)
                    .then(function (response) {
                        if (response.data.result && response.data.result.latitude && response.data.result.longitude) {
                            detailsObject.latitude = response.data.result.latitude;
                            detailsObject.longitude = response.data.result.longitude;
                        }
                    }).finally(function() {
                    saveData();
                });
            } else {
                saveData();
            }


            function saveData(){
                //save details
                SiteData.setSystemDetails(vm.currentSystem, detailsObject)
                    .then(function(response) {
                        if (response.status === 200) {
                            deferred.resolve('System details successfully updated');
                        } else {
                            deferred.reject('Sorry, system details failed to update');
                        }
                    });
            }



            return deferred.promise;

        }

        function tariffsDirty(){
            //initialise check
            var dirtyForm = false;

            //check default cost
            if (vm.settingsForm.defaultCost.$dirty) {
                dirtyForm = true;
            }

            //check standing charge
            if (vm.settingsForm.importStandingChargeCost.$dirty) {
                dirtyForm = true;
            }

            //check hasTariff2
            if (!angular.equals(vm.hasTariff2, vm.hasTariff2InitialVal)) {
                dirtyForm = true;
            }

            //check hasTariff3
            if (!angular.equals(vm.hasTariff3, vm.hasTariff3InitialVal)) {
                dirtyForm = true;
            }


            //check tariff2
            if (!angular.equals(vm.t2Time, vm.t2TimeClean)) {
                dirtyForm = true;
            }
            //check tariff3
            if (!angular.equals(vm.t3Time, vm.t3TimeClean)) {
                dirtyForm = true;
            }

            //check tariff2 cost
            if(vm.settingsForm.tariff2Cost.$dirty){
                dirtyForm = true;
            }
            //check tariff3 cost
            if(vm.settingsForm.tariff3Cost.$dirty){
                dirtyForm = true;
            }

            //check generation cost
            if(vm.settingsForm.generationCost.$dirty){
                dirtyForm = true;
            }
            //check deeming cost
            if(vm.settingsForm.deemingCost.$dirty){
                dirtyForm = true;
            }
            //check export cost
            if(vm.settingsForm.exportCost.$dirty){
                dirtyForm = true;
            }

            return dirtyForm;
        }
        function submitTariffs(){
            var deferred = $q.defer();

            var tariffObject = {
                defaultCost:Number(vm.settings.tariffDetails.defaultCost),
                deemingCost:0,
                importStandingChargeCost:Number(vm.settings.tariffDetails.importStandingChargeCost),
                exportCost:0,
                generationCost:0,
                dayTariffs:[],
                tariffCostPence:{}
            }

            //deeming values
            if(vm.microgenOptionSelected.id === '0'){//feed in & deeming
                tariffObject.generationCost = Number(vm.settings.tariffDetails.generationCost);
                tariffObject.deemingCost    = Number(vm.settings.tariffDetails.deemingCost / 2);
                //set export to 0
                vm.settings.tariffDetails.exportCost = 0;
            }
            if(vm.microgenOptionSelected.id === '1'){//export
                tariffObject.exportCost = Number(vm.settings.tariffDetails.exportCost);
                //set generation and deeming to zero
                vm.settings.tariffDetails.generationCost = 0;
                vm.settings.tariffDetails.deemingCost    = 0;
            }

            var defaultDayTariff = {
                startHour:0,
                startMin:0,
                endHour:0,
                endMin:0,
                tierType:"",
                days:[
                    true,
                    true,
                    true,
                    true,
                    true,
                    true,
                    true
                ]
            };

            //dayTariffs
            if(vm.hasTariff2){
                //check if end hour is smaller than start hour
                if(vm.t2Time.endHour < vm.t2Time.startHour){
                    //generate 2 objects
                    var startObj = angular.copy(defaultDayTariff);
                    startObj.startHour = vm.t2Time.startHour;
                    startObj.startMin = vm.t2Time.startMin;
                    startObj.endHour = 23;
                    startObj.endMin = 59;
                    startObj.tierType = "IMPORT_T2";
                    tariffObject.dayTariffs.push(startObj);

                    var endObj = angular.copy(defaultDayTariff);
                    endObj.startHour = 0;
                    endObj.startMin = 0;
                    endObj.endHour = vm.t2Time.endHour;
                    endObj.endMin = vm.t2Time.endMin;
                    endObj.tierType = "IMPORT_T2";
                    tariffObject.dayTariffs.push(endObj);
                } else {
                    //generate 1 object
                    var singleObj = angular.copy(defaultDayTariff);
                    singleObj.startHour = vm.t2Time.startHour;
                    singleObj.startMin = vm.t2Time.startMin;
                    singleObj.endHour = vm.t2Time.endHour;
                    singleObj.endMin = vm.t2Time.endMin;
                    singleObj.tierType = "IMPORT_T2";
                    tariffObject.dayTariffs.push(singleObj);
                }

                //set tariff cost
                tariffObject.tariffCostPence.IMPORT_T2 = Number(vm.settings.tariffDetails.tariffCostPence.IMPORT_T2);
            };

            if(vm.hasTariff3){
                //check if end hour is smaller than start hour
                if(vm.t3Time.endHour < vm.t3Time.startHour){
                    //generate 2 objects
                    var startObj = angular.copy(defaultDayTariff);
                    startObj.startHour = vm.t3Time.startHour;
                    startObj.startMin = vm.t3Time.startMin;
                    startObj.endHour = 23;
                    startObj.endMin = 59;
                    startObj.tierType = "IMPORT_T3";
                    tariffObject.dayTariffs.push(startObj);

                    var endObj = angular.copy(defaultDayTariff);
                    endObj.startHour = 0;
                    endObj.startMin = 0;
                    endObj.endHour = vm.t3Time.endHour;
                    endObj.endMin = vm.t3Time.endMin;
                    endObj.tierType = "IMPORT_T3";
                    tariffObject.dayTariffs.push(endObj);
                } else {
                    //generate 1 object
                    var singleObj = angular.copy(defaultDayTariff);
                    singleObj.startHour = vm.t3Time.startHour;
                    singleObj.startMin = vm.t3Time.startMin;
                    singleObj.endHour = vm.t3Time.endHour;
                    singleObj.endMin = vm.t3Time.endMin;
                    singleObj.tierType = "IMPORT_T3";
                    tariffObject.dayTariffs.push(singleObj);
                }

                //set tariff cost
                tariffObject.tariffCostPence.IMPORT_T3 = Number(vm.settings.tariffDetails.tariffCostPence.IMPORT_T3);
            };

            SiteData.setTariff(vm.currentSystem, tariffObject)
                .then(function(response) {
                    if (response.status === 200) {
                        deferred.resolve('Tariffs successfully updated ');
                    } else {
                        deferred.reject('sorry, tariffs failed to update');
                    }
                });

            return deferred.promise;

        }





        function download(id){
            if(id === '1'){
                downloadDailyCsv();
            } else {
                downloadEpochCsv();
            }
        }
        function downloadDailyCsv() {
            SiteData.getDailyCsv(vm.currentSystem, moment().subtract(100, 'days'), moment())
                .then(
                    function (response) {
                        var blob = new Blob([response.data], {type: "text/csv;charset=utf-8"});
                        saveAs(blob, "daily-export.csv");
                    },

                    function () {
                        addAlertMessage('There was a problem downloading the CSV. Please contact support.');
                        showAlert(MESSAGE_TYPE.fail);
                    }
                );
        }
        function downloadEpochCsv() {
            SiteData.getEpochCsv(vm.currentSystem, moment().subtract(14, 'days'), moment())
                .then(
                    function (response) {
                        var blob = new Blob([response.data], {type: "text/csv;charset=utf-8"});
                        saveAs(blob, "epoch-export.csv");
                    },

                    function () {
                        addAlertMessage('There was a problem downloading the CSV. Please contact support.');
                        showAlert(MESSAGE_TYPE.fail);
                    }
                );
        }

        function showTariffSaveMessage(){
            closeAlert();
            addAlertMessage('You have unsaved changes.');
            addAlertMessage('To save, click \'Submit\' before moving away from this page.');
            showAlert(MESSAGE_TYPE.success);
        }



        function switchSystem(){
            if (vm.userSystem.systemid !== vm.dropdownDefaultOption.systemid) {
                //save new system
                Storage.saveDefaultSystem(vm.userSystem.systemid);
                //reload page
                $state.go($state.$current, null, { reload: true });
            }
            else {
                addAlertMessage('Please select a valid option');
                showAlert(MESSAGE_TYPE.fail);
            }
        }
        function showTab(tab){
            vm.show1 = false;
            vm.show2 = false;
            vm.show3 = false;
            if(tab === vm.tab){
                vm.tab = -1;
            } else {
                vm.tab = tab;
            }
        }
        function getHoursAsArray(){
            // Get days
            for(var i = 0; i < 24; i++) {
                var j = '';

                // Add leading 0 to label if needed
                if(i < 10) {
                    j = '0' + i.toString();
                } else {
                    j = i.toString();
                }

                // Create object
                var option = {
                    value: i,
                    label: j
                };

                // Add object to array
                vm.hourOptions.push(option);
            }
        }
        function getMinutesAsArray(){
            // Get hours
            for(var i = 0; i < 60; i+=15){
                var j = '';

                // Add leading 0 to label if needed
                if(i < 10){
                    j = '0' + i.toString();
                } else {
                    j = i.toString();
                }

                // Create object
                var option = {
                    value: i,
                    label: j
                };

                // Add object to array
                vm.minuteOptions.push(option);
            }
        }

        function generateListForSystemDropdown(systemsList){
            //reset promises
            promises = [];

           for (var i=0;i<systemsList.length;i++){
               promises.push(getSystemName(systemsList[i]));
           };

            // Wait for all promises
            $q.allSettled(promises)
                .then(function (results) {
                    vm.doPopulate = true;
                });
        }
        function getSystemName(systemId){
            var deferred = $q.defer();

            SiteData.systemInfo(systemId)
                .then(function(response) {
                    if (response.status === 200) {
                        //generate object and add to systemOptions array
                        vm.userSystemsOptions.push(
                            {
                                systemid: response.data.systemId,
                                name: response.data.name
                            }
                        );
                        deferred.resolve('success');
                    } else {
                        deferred.reject('fail');
                    }
                });

            return deferred.promise;
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