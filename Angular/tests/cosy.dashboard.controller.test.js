describe('CosyDashboardController',function(){

        beforeEach(module('app'));
        beforeEach(module('app.cosy'));


        var ctrl, scope;
        var $rootScope, $controller, $q, SiteData, $timeout, $httpBackend;
        var settingsOneHeatingZoneOnly, settingsTwoHeatingZonesOnly, settingsTwoHeatingZonesAndHotWater;
        var liveData;

        beforeEach(inject(function(_$rootScope_, _$controller_, _$q_, _SiteData_, _$timeout_, _$httpBackend_) {
            $rootScope   = _$rootScope_;
            $controller  = _$controller_;
            $q           = _$q_;
            SiteData     = _SiteData_;
            $timeout     = _$timeout_;
            $httpBackend = _$httpBackend_;
            scope        = _$rootScope_.$new();


            ctrl = $controller('CosyDashboardController', {
                $scope: scope
            });
        }));

        beforeEach(function(){
            $httpBackend.whenGET('app/assets/translations/locale-en.json').respond();
            $httpBackend.whenGET('http://dev-ds-rest.geosmartdata.eu/api/userapi/system/cosy-live-data/87355b7d-9aec-43db-a635-4ded6213f017').respond();
            $httpBackend.whenGET('app/code/global/account/login/account.login.html').respond();
            $httpBackend.whenGET('http://dev-ds-rest.geosmartdata.eu/api/userapi/system/cosy-settings/').respond();
            $httpBackend.whenGET('http://dev-ds-rest.geosmartdata.eu/api/userapi/system/cosy-live-data/').respond();
            $httpBackend.whenGET('app/code/account/login/account.login.html').respond();
            $httpBackend.whenGET('http://dev-ds-rest.geosmartdata.eu/api/userapi/system/cosy-settings/undefined').respond();
            $httpBackend.whenGET('http://dev-ds-rest.geosmartdata.eu/api/userapi/system/cosy-live-data/undefined').respond();
            $httpBackend.whenGET('http://dev-ds-rest.geosmartdata.eu/api/userapi/system/cosy-live-data/1').respond();
            $httpBackend.whenGET('http://dev-ds-rest.geosmartdata.eu/api/userapi/system/cosy-settings/1').respond();
            $httpBackend.whenGET('http://dev-ds-rest.geosmartdata.eu/api/userapi/system/cosy-activitylog/').respond();
            $httpBackend.whenGET('http://trial-ds-rest.geosmartdata.eu/api/userapi/system/cosy-settings/').respond();
        });


        beforeEach(function(){
            //settings
            settingsOneHeatingZoneOnly = {
                status: 200,
                hasHotWater:false,
                zones:[
                    {
                        name:'Heating Zone 1',
                        type:'HEATING',
                        zoneId:0
                    }
                ]
            };
            settingsTwoHeatingZonesOnly = {
                status: 200,
                hasHotWater:false,
                zones:[
                    {
                        name:'Heating Zone 1',
                        type:'HEATING',
                        zoneId:0
                    },
                    {
                        name:'Heating Zone 2',
                        type:'HEATING',
                        zoneId:1
                    }
                ]
            };
            settingsTwoHeatingZonesAndHotWater = {
                status: 200,
                hasHotWater:true,
                hotWaterZone:2,
                zones:[
                    {
                        name:'Heating Zone 1',
                        type:'HEATING',
                        zoneId:0
                    },
                    {
                        name:'Heating Zone 2',
                        type:'HEATING',
                        zoneId:1
                    },
                    {
                        name:'Hot Water 1',
                        type:'HOT_WATER',
                        zoneId:2
                    }
                ]
            }
        });




        it('should define controller',function(){
            expect(ctrl).toBeDefined();
        });


        describe('getLiveData',function(){
            it('should not set data if no data returned',function(){
                //setup
                ctrl.liveData = [];

                var response = { status: -1, message: 'Error - No Data'};

                //when using broadcast instead
                spyOn(scope,'$on').and.callFake(function(){
                    return $q.when(response);
                });

                //tests
                ctrl.getLiveData().then(function() {
                    expect(ctrl.hasHotWater).toBe(false);
                    expect(ctrl.showAccordion).toBe(false);
                    expect(ctrl.liveData.length).toEqual(0);
                });
                $rootScope.$digest();

            });

            it('should not show hot-water if no hot-water data returned',function(){
                //setup
                ctrl.settings = {
                    hasHotWater: false
                };
                liveData = {
                    data: {
                        celloStatusList: [
                            {
                                nodeId: 71
                            }
                        ]
                    },
                    status: 200
                };


                //when using broadcast
                spyOn(scope,'$on').and.callFake(function(){
                    return $q.when(liveData);
                });

                //tests
                ctrl.getLiveData().then(function() {
                    expect(ctrl.hasHotWater).toBe(false);
                });

                $rootScope.$digest();
            });

            it('should get the zone name',function(){
                ctrl.settings = {
                    zones: [
                        {
                            zoneName: 'testname',
                            zoneType: 'HEATING',
                            zoneId: 0
                        }
                    ]
                };
                var zoneId = 0;
                var result = ctrl.getZoneName(zoneId);
                expect(result).not.toBe(null);
                expect(result).not.toBe(undefined);
                expect(result).toBe('testname');
            });

            it('should return a zone when supplied an ID',function(){
                ctrl.liveData = {
                    data: {
                        controllerStatusList: [
                            {
                                currentMode: 1,
                                currentModeReason: 0,
                                currentModeSetPoint: 12,
                                nextMode: 3,
                                nextModeActiveHH: 18,
                                nextModeActiveMM: 30,
                                nextModeActiveTs: 1461778200,
                                nextModeReason: 0,
                                zoneId: 0,
                                zoneType: 1
                            }
                        ]
                    }
                };
                var zoneId = 0;
                var result = ctrl.getZoneByZoneId(zoneId);

                expect(result).not.toBe(null);
                expect(result).not.toBe(undefined);
                expect(result.length).toBe(1);
                expect(result[0].currentMode).toBe(1);
            })
        });

        describe('getActivity',function(){

        it('should not set data if no data returned',function(){
            //setup
            ctrl.activity = [];
            ctrl.settings = {
            		timeZone: 'Australia/Sydney',
                    zones: [
                        {
                            zoneName: 'testname',
                            zoneType: 'HEATING',
                            zoneId: 0
                        }
                    ]
                };

            var response = { status: 400, message: '{"reason":"Failed to get activity events"}'};
            spyOn(SiteData,'cosyGetActivity').and.callFake(function(){
                return $q.when(response);
            });

            //tests
            ctrl.getActivity().then(function() {
                expect(ctrl.activity.length).toEqual(0);
            });
            $rootScope.$digest();
        });

		it('should use local time if no timezone from the HUB',function(){
            //setup
            ctrl.activity = [];
            ctrl.settings = {
            		 timeZone: '', // HUB did not provide timezone info
                    zones: [
                        {
                            zoneName: 'testname',
                            zoneType: 'HEATING',
                            zoneId: 0
                        }
                    ]
                };

            var response = { status: 200, message: '{"pastEvents":[],"futureEvents":[]}'};
            spyOn(SiteData,'cosyGetActivity').and.callFake(function(){
                return $q.when(response);
            });

            //tests
            ctrl.getActivity().then(function() {
                expect(ctrl.activity.length).toEqual(0);
            });
            $rootScope.$digest();
        });

        //
        // getActivityEvtTitle TESTS
        //

        it('should get the Title Cosy for a Cosy Activity Events',function(){
            ctrl.settings = {
                zones: [
                    {
                        zoneName: 'HeatingZone',
                        zoneType: 'HEATING',
                        zoneId: 0
                    },
                    {
                        zoneName: 'HotWaterZone',
                        zoneType: 'HOTWATER',
                        zoneId: 1
                    }
                ]
            };
            ctrl.hasHotWater = true;
            ctrl.hotWaterZone = 1;

            var activityEvt = { // Cosy starts at 6am for 2hrs (till 8am)
                timestamp: 1466575200,
                mode: 3,
                trigger: 0,
                triggerName: 'Scheduled',
                canBeCancelled: false,
                zoneId: 0,
                hh: 6,
                mm: 0,
                duration: 120
            };
            var result = ctrl.activitylog.getActivityEvtTitle(activityEvt);
            expect(result).not.toBe(null);
            expect(result).not.toBe(undefined);
            expect(result).toBe('Cosy');
        });

        it('should get the Title Smart Plugs for Smart Plugs Activity Events',function(){
            ctrl.settings = {
                zones: [
                    {
                        zoneName: 'HeatingZone',
                        zoneType: 'HEATING',
                        zoneId: 0
                    },
                    {
                        zoneName: 'HotWaterZone',
                        zoneType: 'HOTWATER',
                        zoneId: 1
                    }
                ]
            };
            ctrl.hasHotWater = true;
            ctrl.hotWaterZone = 1;

            var activityEvt = { // Smart plugs starts at 7pm
                timestamp: 1466582400,
                mode: 16,
                trigger: 0,
                triggerName: 'Scheduled',
                canBeCancelled: false,
                zoneId: 0,
                hh: 19,
                mm: 0,
                duration: 180 // till 10pm
            };
            var result = ctrl.getActivityEvtTitle(activityEvt);
            expect(result).not.toBe(null);
            expect(result).not.toBe(undefined);
            expect(result).toBe('Smart plugs');
        });

        it('should get the Title Hot water for Hot Water Activity Events',function(){
            ctrl.settings = {
                zones: [
                    {
                        zoneName: 'HeatingZone',
                        zoneType: 'HEATING',
                        zoneId: 0
                    },
                    {
                        zoneName: 'HotWaterZone',
                        zoneType: 'HOTWATER',
                        zoneId: 1
                    }
                ]
            };
            ctrl.hasHotWater = true;
            ctrl.hotWaterZone = 1;

            var activityEvt = { // Hot Water turns ON at 5:30am for 2hrs (till 7:30am)
                timestamp: 1466573400,
                mode: 2,
                trigger: 0,
                triggerName: 'Scheduled',
                canBeCancelled: false,
                zoneId: 1,
                hh: 5,
                mm: 30,
                duration: 120
            };
            var result = ctrl.getActivityEvtTitle(activityEvt);
            expect(result).not.toBe(null);
            expect(result).not.toBe(undefined);
            expect(result).toBe('Hot water');
        });

        //
        // getActivityEvtSubTitle TESTS
        //

        it('should get the zone name as subTitle for a Cosy Activity Evt',function(){
            ctrl.settings = {
                zones: [
                    {
                        zoneName: 'HeatingZone',
                        zoneType: 'HEATING',
                        zoneId: 0
                    },
                    {
                        zoneName: 'HotWaterZone',
                        zoneType: 'HOTWATER',
                        zoneId: 1
                    }
                ]
            };
            ctrl.hasHotWater = true;
            ctrl.hotWaterZone = 1;

            var activityEvt = { // Cosy starts at 6am for 2hrs (till 8am)
                timestamp: 1466575200,
                mode: 3,
                trigger: 0,
                triggerName: 'Scheduled',
                canBeCancelled: false,
                zoneId: 0,
                hh: 6,
                mm: 0,
                duration: 120
            };
            var result = ctrl.getActivityEvtSubTitle(activityEvt);
            expect(result).not.toBe(null);
            expect(result).not.toBe(undefined);
            expect(result).toBe('HeatingZone');
        });

        it('should get All zones as subTitle for a Slumber, hibernate or smart plugs Activity Evt',function(){
            ctrl.settings = {
                zones: [
                    {
                        zoneName: 'HeatingZone',
                        zoneType: 'HEATING',
                        zoneId: 0
                    },
                    {
                        zoneName: 'HotWaterZone',
                        zoneType: 'HOTWATER',
                        zoneId: 1
                    }
                ]
            };
            ctrl.hasHotWater = true;
            ctrl.hotWaterZone = 1;

            var activityEvt = { // Slumber starts at 8am
                timestamp: 1466582400,
                mode: 1,
                trigger: 0,
                triggerName: 'Scheduled',
                canBeCancelled: false,
                zoneId: 0,
                hh: 8,
                mm: 0,
                duration: 510 // till 4:30pm
            };
            var result = ctrl.getActivityEvtSubTitle(activityEvt);
            expect(result).not.toBe(null);
            expect(result).not.toBe(undefined);
            expect(result).toBe('All zones');
        });

        it('should get ON as subTitle for HotWater ON Activity Evt',function(){
            ctrl.settings = {
                zones: [
                    {
                        zoneName: 'HeatingZone',
                        zoneType: 'HEATING',
                        zoneId: 0
                    },
                    {
                        zoneName: 'HotWaterZone',
                        zoneType: 'HOTWATER',
                        zoneId: 1
                    }
                ]
            };
            ctrl.hasHotWater = true;
            ctrl.hotWaterZone = 1;

            var activityEvt = { // Hot Water turns ON at 5:30am for 2hrs (till 7:30am)
                timestamp: 1466573400,
                mode: 2,
                trigger: 0,
                triggerName: 'Scheduled',
                canBeCancelled: false,
                zoneId: 1,
                hh: 5,
                mm: 30,
                duration: 120
            };
            var result = ctrl.getActivityEvtSubTitle(activityEvt);
            expect(result).not.toBe(null);
            expect(result).not.toBe(undefined);
            expect(result).toBe('ON');
        });


    })












});