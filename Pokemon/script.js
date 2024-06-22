document.addEventListener("DOMContentLoaded", function () {
    var searchButton = document.getElementById("search-btn");
    searchButton.addEventListener("click", function (event) {
        event.preventDefault();
        var searchInput = document.getElementById("search-tracker").value.trim().toLowerCase();
        console.log("Search Query:", searchInput);

        fetch("https://pokeapi.co/api/v2/pokemon/" + searchInput)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok. Pokemon not found.");
                }
                return response.json();
            })
            .then(data => {
                var table = document.getElementById("table");
                var newRow = table.insertRow(-1);
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                var cell3 = newRow.insertCell(2);
                var cell4 = newRow.insertCell(3);
                var cell5 = newRow.insertCell(4);
                // var cell6 = newRow.insertCell(5);
                // var cell7 = newRow.insertCell(6);
                // var cell8 = newRow.insertCell(7);
                // var cell9 = newRow.insertCell(8);
                // var cell10 = newRow.insertCell(9);

           

                cell1.textContent = data.id;
                cell2.textContent = data.name;
                cell3.textContent = data.height;
                cell4.textContent = data.weight;
                cell5.textContent = data.base_experience;
                // cell6.textContent = data.images;
                // cell7.textContent = data.stats;
                // cell8.textContent = data.types;
                // cell9.textContent = data.abilities;
                // cell10.textContent = data.forms;

            })
            .catch(error => {
                console.error("Error:", error);
                alert("Failed to retrieve data. Check console for details.");
            });
    });
  
    //delete all rows
    var deleteAllButton = document.getElementById("delete-btn");
    deleteAllButton.addEventListener("click", function (event) {
        // console.log("Delete All Button Clicked");
        var table = document.getElementById("table");
        var rowsArray = Array.from(table.getElementsByTagName("tr"));
        rowsArray.forEach(function (row) {
            if (row.rowIndex !== 0) {
                row.parentElement.removeChild(row);
            }
        });
    });  

    //sort by id
    var sortButton = document.getElementById("sort-btn");
    sortButton.addEventListener("click", function (event) {
        var option = document.getElementById("sort-tracker").value;
        // console.log("Sort Option:", option);
        // console.log("Sort Button Clicked");
        var opt = 0;
        if (option === "id") {
            opt = 0;
        }
        else if (option === "name") {
            opt = 1;
        }
        else if (option === "height") {
            opt = 2;
        }
        else if (option === "weight") {
            opt = 3;
        }
        else if (option === "base_experience") {
            opt = 4;
        }
        else {
            opt = 0;
        }
        var table = document.getElementById("table");
        var rowsArray = Array.from(table.getElementsByTagName("tr"));
        rowsArray.shift();
        rowsArray.sort(function (row1, row2) {
            var id1 = parseInt(row1.cells[opt].textContent);
            var id2 = parseInt(row2.cells[opt].textContent);
            return id1 - id2;
        });
        rowsArray.forEach(function (row) {
            table.appendChild(row);
        });
    });

    //image change when clicked on name of pokemon
    var table = document.getElementById("table");
    table.addEventListener("click", function (event) {
        var target = event.target;
        if (target.tagName === "TD" && target.cellIndex === 1) {
            var name = target.textContent;
            console.log("Name Clicked:", name);
            fetch("https://pokeapi.co/api/v2/pokemon/" + name)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok. Pokemon not found.");
                    }
                    return response.json();
                })
                .then(data => {
                    var image = data.sprites.front_default;
                    var imageElement = document.getElementById("image");
                    imageElement.src = image;
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Failed to retrieve data. Check console for details.");
                });
        }
    });

    
});
