// Import dataset from data.js
var tableData = data;

// Select buttons
var filterbutton = d3.select("#filter-btn");

// Select the form
var form = d3.select("#datetime")

// Event handlers
filterbutton.on("click", runEnter);
form.on("submit",runEnter);

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