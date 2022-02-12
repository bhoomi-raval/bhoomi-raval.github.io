$(document).ready(function () {
    $.ajax({
        url: "https://api.rootnet.in/covid19-in/stats/latest",
        context: document.body,
        success: function (data) {
            const covidData = data.data;
            const active = covidData.summary.confirmedCasesIndian
            const recovered = covidData.summary.discharged
            const deaths = covidData.summary.deaths
            const regional = covidData.regional
            $("#activeCases").text(active);
            $("#recoveredCases").text(recovered);
            $("#death").text(deaths);

            var customers = new Array();
            customers.push(["Num", "State", "Confirmed Cases", "Discharged Cases", "Deaths Cases"]);

            for (var i = 0; i < regional.length; i++) {
                customers.push([i + 1, regional[i].loc, regional[i].totalConfirmed, regional[i].discharged, regional[i].deaths]);
            }

            var table = $("<table class='table table-bordered' />");
            table[0].border = "1";

            var columnCount = customers[0].length;

            var row = $(table[0].insertRow(-1));
            for (var i = 0; i < columnCount; i++) {
                var headerCell = $("<th />");
                headerCell.html(customers[0][i]);
                row.append(headerCell);
            }

            for (var i = 1; i < customers.length; i++) {
                row = $(table[0].insertRow(-1));
                for (var j = 0; j < columnCount; j++) {
                    var cell = $("<td />");
                    cell.html(customers[i][j]);
                    row.append(cell);
                }
            }

            var dvTable = $("#dvTable");
            dvTable.html("");
            dvTable.append(table);

            $("table").css("border", "black");
            $("table").css("background-color", "rgb(199, 243, 243)");

        }
    });
});