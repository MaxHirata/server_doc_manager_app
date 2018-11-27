

  //Creating a library of links from the folder containing all the documents


  if(window.File && window.FileReader && window.FileList && window.Blob) {
      //Great SUccess! All File APIs are supported
  }else{
      alert("The File API's are not all fully supported in this Broswer");
  }


  // Making the search bar interactive and able for someone to easily search and access documents
  function autoSearch(userInput, arr) {

// integer value used for tracking what search item the u/ser is currently focusubg on
    var currentFocus;

    userInput.addEventListener("input", function(e) {
        var searchList = this.value;
        var searchItem = this.value;
        var val = this.value;

        //close all already existing search list items
        closeAllLists();

        if(!val) return false;
        currentFocus = -1;
        
        //create a div element that will contain all the items
        searchList = document.createElement("DIV");
        searchList.setAttribute("id", this.id + "auto-search-list");
        searchList.setAttribute("class", "auto-search-items");

        //append the div element as child of the auto-search-container parent element
        this.parentNode.appendChild(searchList);

        for(var i = 0; i < arr.length; i++)
        {
            //check if the item starts with the same letters as teh text field values
            if(arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) 
            {
                searchItem = document.createElement("DIV");
                searchItem.classList.add("search-item");
                //searchItem.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                //searchItem.innerHTML += arr[i].substr(val.length);
                searchItem.innerHTML = arr[i];

                //insert input field that will hold the current array item's values
                //searchItem.innerHTML += "<input type='hidden' values='" + arr[i] +  "'>";

                searchItem.addEventListener("click", function(){

                    //insert the values for the auto-search text fields
                    userInput.value = this.innerHTML;
                    getServerDocument(this.innerHTML);
                    
                    //close all existing auto-search-item listl
                    closeAllLists();
                });
                searchList.appendChild(searchItem);
            }
        }

    });

    userInput.addEventListener("keydown", function(key){

        var searchItem = document.getElementById(this.id + "auto-search-list");
        var listItems = document.getElementsByClassName("search-item");
    

        if(searchItem) searchItem = searchItem.getElementsByTagName("div");
        if(key.keyCode == 40) {

            //if the arrow DOWN key is pressed, increment the currentFocus
            if(currentFocus < listItems.length ) currentFocus++;

            //add active class to the focused search item to make it more visable
            addActive(searchItem);
        }
        else if(key.keyCode == 38) {

            //if the arrow UP key is pressed, decrement the currentFocus
            if(currentFocus >= 0) currentFocus--;

            //add active class to the focused search item to make it more visable
            addActive(searchItem);
        }
        else if(key.keyCode == 13) {
            //if the ENTER key is pressed, prevent the form from being submited
            // *need to set up SERVER SIDE code before submitting this data

            //console.log(listItems[currentFocus + 1].innerHTML);
            var key = listItems[currentFocus + 1].innerHTML;

            getServerDocument(key);

            //key.preventDefualt();
            if(currentFocus > -1) {
                //simulate a click on the "active" items
                if(searchItem) 
                {
                    searchItem[currentFocus].click();

                }
            }


        }
    });

    function addActive(searchItem) {
        //classify an item as being "Active"
        if(!searchItem) return false;

        //first, remove the active class on all items
        removeActive(searchItem);
        if(currentFocus >= searchItem.length) currentFocus = 0;
        if(currentFocus < 0) currentFocus = (searchItem.length - 1);

        //add class "auto-search-active"
        searchItem[currentFocus].classList.add("auto-search-active");
    }

    function removeActive(searchItem) {
        //remove the auto-serach-active  from all auto-search items
        for(var i = 0; i < searchItem.length; i++) {
            searchItem[i].classList.remove("auto-search-active");
        }
    }

    function closeAllLists(searchElement) {
        var searchList = document.getElementsByClassName("auto-search-items");
        for(var i = 0; i < searchList.length; i++) {
            if(searchElement != searchList[i] && searchElement != userInput) {
                searchList[i].parentNode.removeChild(searchList[i]);
            }
        }
    }

    //execute the function when someone clicks in the document
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });

}

function getServerDocument(key){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var pathData = JSON.parse(this.responseText);
            var filePath = pathData[key];
            var display = document.getElementsByClassName("display-info");
            display[0].innerHTML = "<embed src='" + filePath + "' type='application/pdf' style='width:100%; height:100%;'>";
        }
    };
    xmlhttp.open("GET", "getFilePath.php", true);
    xmlhttp.send();
}
//getServerDocument();


function getServerData(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            autoSearch(document.getElementById("search-input"), data);
        }
    };
    xmlhttp.open("GET", "getFileName.php", true);
    xmlhttp.send();
}

getServerData();

function getDropDownMenu() {

    var dropdown_items = "";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var dropdown_items = JSON.parse(this.responseText);
            
            
            var dropdown_nav = document.getElementsByClassName("dropdown_nav");
            dropdown_nav[0].innerHTML = dropdown_items;

        }
    };
    xmlhttp.open("GET", "getDropDown.php", true);
    xmlhttp.send();          
}

getDropDownMenu();


