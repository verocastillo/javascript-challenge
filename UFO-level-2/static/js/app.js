// Import dataset from data.js
var tableData = data;

// Function for unique values (https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates)
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// Get reference to table 
var tbody = d3.select("tbody");

// Append data to table for initial page
data.forEach((sighting) => {
    var row = tbody.append("tr");
    Object.values(sighting).forEach((value) => {
      var cell = row.append("td");
      cell.text(value);
    });
});
  
// Select buttons
var filterButton = d3.select("#filter-btn");
var resetbutton = d3.select("#reset-btn");

// Get dates
var dateslct = d3.select("#datetime");
var dates = tableData.map(sighting => sighting.datetime);
var uniqdate = dates.filter(onlyUnique).sort();
uniqdate.forEach(date => {
  dateslct.append("option").text(date)
});

// Get countries
var countryslct = d3.select("#country");
var countries = tableData.map(sighting => sighting.country);
var countryunique = countries.filter(onlyUnique).sort();
countryunique.forEach(country => {
  countryslct.append("option").text(country)
});
  
// Get states
var stateslct = d3.select("#state");
var states = tableData.map(sighting => sighting.state);
var stateunique = states.filter(onlyUnique).sort();
stateunique.forEach(state => {
  stateslct.append("option").text(state)
});

// Get cities
var cityslct = d3.select("#city");
var cities = tableData.map(sighting => sighting.city);
var cityunique = cities.filter(onlyUnique).sort();
cityunique.forEach(city => {
  cityslct.append("option").text(city)
});

// Get duration
var timeslct = d3.select("#duration");
var times = tableData.map(sighting => sighting.durationMinutes);
var timeunique = times.filter(onlyUnique).sort();
timeunique.forEach(time => {
  timeslct.append("option").text(time)
});

// Event handlers
resetbutton.on('click', Reset);
d3.selectAll("select").on("change",runEnter);

// Complete the event handler for filter
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select table and create reference to table
    var tbody = d3.select("tbody")
    tbody.html("");

    // Select the input element and get value property
    var inputdate = d3.select("#datetime").property("value");
    var inputcountry = d3.select("#country").property("value");
    var inputstate = d3.select("#state").property("value");
    var inputcity = d3.select("#city").property("value");
    var inputime = d3.select("#duration").property("value");

    // Function for filtering data (https://stackoverflow.com/questions/31831651/javascript-filter-array-multiple-conditions)
    var resultdata = tableData.filter(sighting =>
      (sighting.datetime === inputdate || !inputdate) &&
      (sighting.country === inputcountry || !inputcountry) &&
      (sighting.state === inputstate || !inputstate) &&
      (sighting.city === inputcity || !inputcity) && 
      (sighting.durationMinutes === inputime || !inputime)
      );
    
    // Results and append
    resultdata.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.values(sighting).forEach((value) => {
          var cell = row.append("td");
          cell.text(value);
        });
    });
}

// Complete the event handler for reset
function Reset() {
  location.reload();
}