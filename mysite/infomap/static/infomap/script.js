var stateNumber
var bigStatList
var bigNameList = []

/* $("path, circle").hover(function (e) {
    console.log($(this).data('info'))

    var stateNumberNotFixed = $(this).data('info')
    stateNumber = stateNumberNotFixed.replace(/\D/g, "");

    console.log("State number from html id: " + stateNumber)

    returnedStateData = getOneStat(stateNumber)

    console.log("The boxes can see: " + returnedStateData)

    $('#info-box').css('display', 'block');
    $('#info-box').html(returnedStateData);

}); */

$("path, circle").hover(function (e) {
    console.log($(this).data('info'))

    var stateNumberNotFixed = $(this).data('info')
    stateNumber = stateNumberNotFixed.replace(/\D/g, "");

    console.log("State number from html id: " + stateNumber)

    returnedStateData = getListStat(stateNumber)

    console.log("The boxes can see: " + returnedStateData)

    $('#info-box').css('display', 'block');
    $('#info-box').html(returnedStateData);

});


$("path, circle").mouseleave(function (e) {
    $('#info-box').css('display', 'none');
});

$(document).mousemove(function (e) {
    $('#info-box').css('top', e.pageY - $('#info-box').height() - 30);
    $('#info-box').css('left', e.pageX - ($('#info-box').width()) / 2);
}).mouseover();

// This function should look at the list of stats, and grab one to be displayed.
function getListStat(stateID) {
    var dataFromStateID;

    var l;
    for (l = 0; l < bigStatList.length; l++) { // looks through stringJSONArray
        if (bigStatList[l][1] == stateID) { // if the stateID in the 2d array equals the one that is supposed to be displayed, 
            dataFromStateID = bigStatList[l][0]; // then give it the data that goes with the stateID
            dataFromStateID = bigNameList[l] + ": " + dataFromStateID
        }
    }

    console.log("Data gotten from the getAllStats big list: " + dataFromStateID)

    return dataFromStateID
}

function dataChooser(/* This is where user input will go*/) {
    var wantedData

    wantedData = "B19013_001E" // later this will be the argument of the function, but for now it's a placeholder data name

    /*
    
        LISTEN HERE BUSTER BROWN
        THIS IS WHERE YOU WILL CALL "getAllStats" 
        dataChooser SHOULD ONLY BE CALLED WHEN THE USER CHANGES THE VARIABLE THEY ARE GOING FOR 
        THIS IS A GREAT TIME TO GET ALL THE STATS FOR THE NEW VARIABLE THAT THEY WANT, AND 
        STORE THEM WITH bigStatList TO BE ACCESSED BY getListStat AND THEN PUT ON THE SCREEN
        BY CALLING getListStat IN THE MAP STUFF UP THERE 
    
    
    */ 


    return wantedData
}

function getOneStat(stateID) {
    // Practice url: https://api.census.gov/data/2018/acs/acs5?get=NAME,B19013_001E&for=state:55
    // Will get the stat "B19013_001E" for state 55, which is wisconsin


    console.log("getOneStat can see: " + stateID)

    wantedDataVariableName = dataChooser()

    console.log("Data name that is in the url: " + wantedDataVariableName)

    let infourl = 'https://api.census.gov/data/2018/acs/acs5?get=NAME,' + wantedDataVariableName + '&for=state:' + stateID; // JSON URL

    var jsonData = {};
    $.ajax({
        url: infourl,
        async: false,
        dataType: 'json',
        success: function (data) {
            jsonData = data;
        }
    });

    console.log("Data from json. Gotten using ajax: " + jsonData)

    var stringJSON = jsonData.toString()

    var fixedJSON = stringJSON.split(',');

    console.log("JSON after some changes: " + fixedJSON[4])

    return fixedJSON[4]


}

function getAllStats(stateID) {
    wantedDataVariableName = dataChooser()

    console.log("Data name that is in the url: " + wantedDataVariableName)

    let infourl = 'https://api.census.gov/data/2018/acs/acs5?get=NAME,' + wantedDataVariableName + '&for=state:*';
    // ^^^ note that there is no stateID. This is because this function gets the variable data for all states 

    var jsonData = {};
    $.ajax({
        url: infourl,
        async: false,
        dataType: 'json',
        success: function (data) {
            jsonData = data;
        }
    });

    var stringJSON = jsonData.toString() // turns the big all states json into a string 


    // got this little something from stackoverflow: https://stackoverflow.com/questions/56896081/how-to-split-a-string-into-an-array-based-on-every-four-commas
    // (?:[^,]+(?:,|$)){1,3}    will repeat 1 to 3 times 
    // [^,]+    Non comma characters 
    // (?:,|$)  Either a comma, or the end of the string
    const stringJSONArray = stringJSON.match(/(?:[^,]+(?:,|$)){1,3}/g); // this will split the string up into an array with every item in the array being the thing after every third comma

    var i;
    for (i = 0; i < stringJSONArray.length; i++) {
        stringJSONArray[i] = stringJSONArray[i].split(','); // split each stringJSONArray item up into smaller arrays
    }

    stringJSONArray.shift(); // get rid of the first item in the list 

    var j; // this loop will get rid of the 4th item in each list except for the last one 
    for (j = 0; j < (stringJSONArray.length) - 1; j++) {
        console.log("da name: " + stringJSONArray[j][0])
        bigNameList.push(stringJSONArray[j][0]) 
        stringJSONArray[j].pop();
    }

    var k; // this loop will get rid of the 1st item in each list (state name that we don't need since we have the id)  
    for (k = 0; k < stringJSONArray.length; k++) {
        stringJSONArray[k].shift();
    }

    console.log(stringJSONArray)
    console.log(bigNameList)

    bigStatList = stringJSONArray
}

var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (ios) {
    $('a').on('click touchend', function () {
        var link = $(this).attr('href');
        window.open(link, '_blank');
        return false;
    });
}