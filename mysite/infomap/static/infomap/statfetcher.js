function getOneStat() {
    // Practice url: https://api.census.gov/data/2018/acs/acs5?get=NAME,B19013_001E&for=state:55
    // Will get the stat "B19013_001E" for state 55, which is wisconsin

    let url = 'https://api.census.gov/data/2018/acs/acs5?get=NAME,B19013_001E&for=state:55';

    fetch(url)
        .then(res => res.json())
        .then((out) => {
            console.log(out); // puts the json from url in the console
            document.getElementById("testId").innerHTML = "Stat: " + out; // try to get another function to do this
        })
        .catch(err => { throw err }); 


}

