// Import dataset from data.js
var tableData = data;

// Select buttons
var filterbutton = d3.select("#filter-btn");

// Event handlers
//filterbutton.on("click", runEnter);
//form.on("submit",runEnter);

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

// Function for unique values (https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates)
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
  
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

// Complete the event handler function for the form
function runEnter() {

    // Select table and create reference to table
    var htmlTable = d3.select("#ufo-table");
    var tbody = d3.select("tbody")
    tbody.html("");

    // Select the input element
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    var searchcriteria = inputElement.property("value")
    
    // Function for filtering data
    var filteredData = tableData.filter(sighting =>
        sighting.datetime === searchcriteria);
    
    // Results and append
    filteredData.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.values(sighting).forEach((value) => {
          var cell = row.append("td");
          cell.text(value);
        });
    });
}