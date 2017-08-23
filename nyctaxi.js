(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [
        { id : "my", alias : "Month/Year", dataType : tableau.dataTypeEnum.float },
        { id : "tpd", alias : "Trips Per Day", dataType : tableau.dataTypeEnum.float },
        { id : "fpd", alias : "Farebox Per Day", dataType : tableau.dataTypeEnum.float },
        { id : "um", alias : "Unique Medallions",dataType : tableau.dataTypeEnum.float },
        { id : "mpd", alias : "Medallions Per Day", dataType : tableau.dataTypeEnum.float },
        { id : "admr", alias : "Avg Days Medallions on Road", dataType : tableau.dataTypeEnum.float },
        { id : "ahpdpm", alias : "Avg Hours Per Day Per Medallion", dataType : tableau.dataTypeEnum.float },
        { id : "addor", alias : "Avg Days Drivers on Road", dataType : tableau.dataTypeEnum.float },
        { id : "ahpdpd", alias : "Avg Hours Per Day Per Driver", dataType : tableau.dataTypeEnum.float },
        { id : "ampt", alias : "Avg Minutes Per Trip", dataType : tableau.dataTypeEnum.float },
        { id : "cc", alias : "Percent of Trips Paid with Credit Card", dataType : tableau.dataTypeEnum.float }
    ];

    var tableInfo = {
        id : "taxi",
        alias : "TLC Trip Data",
        columns : cols
    };

    schemaCallback([tableInfo]);
};

    myConnector.getData = function(table, doneCallback) {
    $.getJSON("http://www.nyc.gov/html/tlc/downloads/csv/data_reports_monthly_indicators_yellow.csv", function(resp) {
        var feat = resp.features,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "id": feat[i].id,
                "my": feat[i].properties.my,
                "tpd": feat[i].properties.tpd,
                "fpd": feat[i].properties.fpd,
                "um": feat[i].properties.um,
                "mpd": feat[i].properties.mpd,
                "admr": feat[i].properties.admr,
                "ahpdpm": feat[i].properties.ahpdpm,
                "addor": feat[i].properties.addor,
                "ahpdpd": feat[i].properties.ahpdpd,
                "ampt": feat[i].properties.ampt,
                "cc": feat[i].properties.cc
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};

    tableau.registerConnector(myConnector);
    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "taxi";
        tableau.submit();
    });
});
})();
