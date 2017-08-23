(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [
    	
        { id : "my", dataType : tableau.dataTypeEnum.int },
        { id : "tpd", dataType : tableau.dataTypeEnum.int },
        { id : "fpd", dataType : tableau.dataTypeEnum.int },
        { id : "um",dataType : tableau.dataTypeEnum.int },
        { id : "ud",dataType : tableau.dataTypeEnum.int },
        { id : "mpd", dataType : tableau.dataTypeEnum.int },
        { id : "admr",  dataType : tableau.dataTypeEnum.int },
        { id : "ahpdpm",  dataType : tableau.dataTypeEnum.int},
        { id : "addor",  dataType : tableau.dataTypeEnum.int },
        { id : "ahpdpd", dataType : tableau.dataTypeEnum.int },
        { id : "ampt",  dataType : tableau.dataTypeEnum.int},
        { id : "cc", dataType : tableau.dataTypeEnum.int }
    ];

    var tableInfo = {
        id : "taxi",
        alias : "TLC Trip Data",
        columns : cols
    };

    schemaCallback([tableInfo]);
};

    myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://github.com/NikhilNair009/NikhilNair009.github.io/blob/master/nyctaxi.json", function(resp) {
        var feat = resp;
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "my": feat[i]["Month"]["Year"],
                "tpd": feat[i]["Trips Per Day"],
                "fpd": feat[i] ["Farebox Per Day"],
                "um": feat[i] ["Unique Medallions"],
                "ud": feat[i] ["Unique Drivers"],
                "mpd": feat[i] ["Medallions Per Day"],
                "admr": feat[i] ["Avg Days Medallions on Road"],
                "ahpdpm": feat[i] ["Avg Hours Per Day Per Medallion"] ,
                "addor": feat[i] ["Avg Days Drivers on Road"],
                "ahpdpd": feat[i] ["Avg Hours Per Day Per Driver"],
                "ampt": feat[i] ["Avg Minutes Per Trip"],
                "cc": feat[i] ["Percent of Trips Paid with Credit Card"]
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
