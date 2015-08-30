var MYAPP = {};

MYAPP.run = function() {
    var MAX_DATA_VALUE = 1000;

    var elemGraphType = document.getElementById("selGraphType");
    var elemObjectNum = document.getElementById("selObjectNum");
    var elemSectionNum = document.getElementById("selSectionNum");
    var elemRandomData = document.getElementById("btnRandomData");
    var elemRandomAll = document.getElementById("btnRandomAll");
    var elemGraph = document.getElementById("graphDisplay");

    var dataSet = [];

    var settings = {
        graphType: "",
        objectNum: "",
        sectionNum: ""
    };

    var updateSetting = function(key, value) {
        settings[key] = value;
    };

    var updateSettings = function() {
        updateSetting('graphType', elemGraphType.value);
        updateSetting('objectNum', elemObjectNum.value);
        updateSetting('sectionNum', elemSectionNum.value);
    };

    var updateRandomSetting = function(elem, key) {
        var index = (Math.floor(Math.random() * 1000)) % elem.length;
        elem.selectedIndex = index;
        updateSetting(key, elem.value);
    };

    var genRandomData = function(config) {
        var value = 0;
        var objectName = "";
        var tempObj = {};

        if (config.graphType === true) {
            updateRandomSetting(elemGraphType, 'graphType');
        }

        if (config.objectNum === true) {
            updateRandomSetting(elemObjectNum, 'objectNum');
        }

        if (config.sectionNum === true) {
            updateRandomSetting(elemSectionNum, 'sectionNum');
        }

        // it should be executed at last
        if (config.dataSet === true) {
            dataSet = [];
            for (var i = 0, len_i = Number(settings.sectionNum); i < len_i; i++) {
                tempObj = {}
                for (var j = 0, len_j = Number(settings.objectNum); j < len_j; j++) {
                    objectName = 'Object' + j;
                    value = Math.floor(Math.random() * MAX_DATA_VALUE);
                    tempObj[objectName] = value;
                }
                tempObj['time'] = i;
                dataSet.push(tempObj);
            }
        }
    };

    var cleanNode = function(elem) {
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
    };

    var updateGraph = function(elem) {
        cleanNode(elem);
    };


    var handler = function() {
        if (this === elemGraphType) {
            updateSetting('graphType', elemGraphType.value);
        } else if (this === elemObjectNum) {
            updateSetting('objectNum', elemObjectNum.value);
        } else if (this === elemSectionNum) {
            updateSetting('sectionNum', elemSectionNum.value);
        } else if (this === elemRandomData) {
            genRandomData({
                dataSet: true
            });
        } else if (this === elemRandomAll) {
            genRandomData({
                graphType: true,
                objectNum: true,
                sectionNum: true,
                dataSet: true
            });
        }

        updateGraph(elemGraph);
    };

    updateSettings();

    _addListener(elemGraphType, 'change', handler);
    _addListener(elemObjectNum, 'change', handler);
    _addListener(elemSectionNum, 'change', handler);
    _addListener(elemRandomData, 'click', handler);
    _addListener(elemRandomAll, 'click', handler);

    genRandomData({
        graphType: true
    });

    function _addListener(element, type, expression) {
        var bubbling = false;
        if (window.addEventListener) {
            element.addEventListener(type, expression, bubbling);
        } else if (window.attachEvent) {
            element.attachEvent('on' + type, expression);
        } else {
            return false;
        }
    }
};
