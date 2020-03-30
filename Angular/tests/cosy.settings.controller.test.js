describe('CosySettingsController',function(){

    beforeEach(module('app'));
    beforeEach(module('app.cosy'));

    var $sce, $state, SiteData, Storage, MESSAGE_TYPE, Session, $q, $httpBackend;

    beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, _$httpBackend_, _$sce_, _$state_, _SiteData_, _Storage_, _MESSAGE_TYPE_, _Session_) {
        $state       = _$state_;
        SiteData     = _SiteData_;
        Storage      = _Storage_;
        $sce         = _$sce_;
        MESSAGE_TYPE = _MESSAGE_TYPE_;
        Session      = _Session_;
        $controller  = _$controller_;
        scope        = _$rootScope_.$new();
        $rootScope   = _$rootScope_;
        $q           = _$q_;
        $httpBackend = _$httpBackend_;

        ctrl = $controller('CosySettingsController', {
            $scope: scope
        });
        ctrl.settings = {
            data: {
                welcomeHomeEnabled: true
            }
        };
        ctrl.systemId = 'fakeid';
        ctrl.MESSAGE_TYPE = {
            success: MESSAGE_TYPE.success,
            fail: MESSAGE_TYPE.fail
        }


    }));

    beforeEach(function(){
        $httpBackend.whenGET('app/assets/translations/locale-en.json').respond();
        $httpBackend.whenGET('http://dev-ds-rest.geosmartdata.eu/api/userapi/system/cosy-settings/null').respond();
        $httpBackend.whenGET('http://trial-ds-rest.geosmartdata.eu/api/userapi/system/cosy-settings/null').respond();
        $httpBackend.whenGET('app/code/account/login/account.login.html').respond();
        $httpBackend.whenGET('http://dev-ds-rest.geosmartdata.eu/api/userapi/system/cosy-settings/undefined').respond();
        $httpBackend.whenGET('http://dev-ds-rest.geosmartdata.eu/api/userapi/system/cosy-live-data/undefined').respond();
        $httpBackend.whenGET('http://dev-ds-rest.geosmartdata.eu/api/userapi/system/cosy-live-data/1').respond();
        $httpBackend.whenGET('http://dev-ds-rest.geosmartdata.eu/api/userapi/system/cosy-settings/1').respond();
        $httpBackend.whenGET('http://dev-ds-rest.geosmartdata.eu/api/userapi/system/peripherals/null').respond();
        $httpBackend.whenGET('http://trial-ds-rest.geosmartdata.eu/api/userapi/system/peripherals/null').respond();
        $httpBackend.whenGET('http://dev-ds-rest.geosmartdata.eu/api/userapi/system/cosy-permissions/null').respond();
        $httpBackend.whenGET('http://trial-ds-rest.geosmartdata.eu/api/userapi/system/cosy-permissions/null').respond();
    })



    describe('changeWelcomeHome',function(){
        it('should call closeAlert',function() {
            //setup
            spyOn(ctrl,'closeAlert');

            spyOn(SiteData,'cosySetSystemWelcomeHome').and.callFake(function(){
                var deferred = $q.defer();
                return deferred.promise;
            });
            //test
            ctrl.changeWelcomeHome();
            expect(ctrl.closeAlert).toHaveBeenCalled();
        })
        it('should call SiteData.cosySetSystemWelcomeHome',function(){
            spyOn(SiteData,'cosySetSystemWelcomeHome').and.callFake(function(){
                var deferred = $q.defer();
                return deferred.promise;
            });
            ctrl.changeWelcomeHome();
            expect(SiteData.cosySetSystemWelcomeHome).toHaveBeenCalled();
        })
        it('should send SUCCESS  message if successful',function(){
            spyOn(ctrl,'showAlert');

            var response = { status: 200};
            spyOn(SiteData,'cosySetSystemWelcomeHome').and.callFake(function(){
               return $q.when(response);
            });

            ctrl.changeWelcomeHome().then(function() {
               expect(ctrl.showAlert).toHaveBeenCalledWith(ctrl.MESSAGE_TYPE.success);
            });
            $rootScope.$digest();
        })
        it('should send FAIL message if error',function(){
            spyOn(ctrl,'showAlert');

            var response = { status: 400};
            spyOn(SiteData,'cosySetSystemWelcomeHome').and.callFake(function(){
                return $q.when(response);
            });

            ctrl.changeWelcomeHome().then(function() {
                expect(ctrl.showAlert).toHaveBeenCalledWith(ctrl.MESSAGE_TYPE.fail);
            });
            $rootScope.$digest();
        })
    })

    describe('changeHibernate',function(){
        it('should call closeAlert',function() {
            //setup
            spyOn(ctrl,'closeAlert');

            spyOn(SiteData,'cosySetHibernate').and.callFake(function(){
                var deferred = $q.defer();
                return deferred.promise;
            });
            //test
            ctrl.changeHibernate();
            expect(ctrl.closeAlert).toHaveBeenCalled();
        })
        it('should call SiteData.cosySetHibernate',function(){
            spyOn(SiteData,'cosySetHibernate').and.callFake(function(){
                var deferred = $q.defer();
                return deferred.promise;
            });
            ctrl.changeHibernate();
            expect(SiteData.cosySetHibernate).toHaveBeenCalled();
        })
        it('should send SUCCESS  message if successful',function(){
            spyOn(ctrl,'showAlert');

            var response = { status: 200};
            spyOn(SiteData,'cosySetHibernate').and.callFake(function(){
                return $q.when(response);
            });

            ctrl.changeHibernate().then(function() {
                expect(ctrl.showAlert).toHaveBeenCalledWith(ctrl.MESSAGE_TYPE.success);
            });
            $rootScope.$digest();
        })
        it('should send FAIL message if error',function(){
            spyOn(ctrl,'showAlert');

            var response = { status: 400};
            spyOn(SiteData,'cosySetHibernate').and.callFake(function(){
                return $q.when(response);
            });

            ctrl.changeHibernate().then(function() {
                expect(ctrl.showAlert).toHaveBeenCalledWith(ctrl.MESSAGE_TYPE.fail);
            });
            $rootScope.$digest();
        })
    })
});

