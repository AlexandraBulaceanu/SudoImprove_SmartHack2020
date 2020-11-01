//<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

var chart_data = [
    ['Week Day', '#Products', 'Expenses'],
    ['monday', 4, 20],
    ['tuesday', 2, 15],
    ['wednesday', 1, 13],
    ['thursday', 3, 10]
]

var weekdays = ['monday', 'tuesday', 'wednesday', 'thursday','friday', 'saturday', 'sunday']
var index = 3

document.getElementById("getList").addEventListener("click", getList);


document.getElementById("sendData").addEventListener("click", getInfo);

function getList()
{
    $.ajax({
        type: "GET",
        url: "/post",
        contentType: "application/json",
        data: JSON.stringify(sendData),
        dataType: "json",
        success: function(response) {
            index += 1;
            indexx = index % 7;
            let append_list = [weekdays[index], sendData.quantity, sendData.price]
            chart_data.push(append_list)
            displayChart();
            console.log(response);
        },
        error: function(err) {
            console.log(err);
        }
    });
}


function getInfo()
{
    console.log("merge");
    let sendData = {
        product : document.getElementById("product").value,
        quantity : document.getElementById("quantity").value,
        price : document.getElementById("price").value
    };
    //reinit formulare
    document.getElementById("product").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
    document.getElementById("popUp").style.display = "none"
    if (sendData[product] == '')
        return;
        
    $.ajax({
        type: "POST",
        url: "/post",
        contentType: "application/json",
        data: JSON.stringify(sendData),
        dataType: "json",
        success: function(response) {
            console.log(response);
        },
        error: function(err) {
            console.log(err);
        }
    });
    
}


window.onload= function displayChart(){
    let btn = document.getElementById("addProduct");
    let screen = document.getElementById("popUp");

    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    btn.onclick = function () {
        console.log("ok");
        screen.style.display = "block";
    };

    function drawChart() {
        var data = google.visualization.arrayToDataTable(chart_data);

        var options = {
            title: 'Expenses over the last week',
            curveType: 'function',
            backgroundColor: '#7d6d86',
            legend: {
                position: 'bottom'
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
    }
};

