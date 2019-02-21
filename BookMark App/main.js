// Listen for form Submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//Save Bookmark
function saveBookmark(e){
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    //Validation
    if(!validateForm(siteName,siteUrl)){
        return false;
    }
    // Create object for local storage
    var bookmark = {
        name : siteName,
        url : siteUrl
    }
/*
    //Local Storage Test
    localStorage.setItem('test','Hello Avadhut');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test')
    console.log(localStorage.getItem('test'));
*/

// Check if localstorage has bookmarks already or not
    if(localStorage.getItem('bookmarks') === null){
        var bookmarks = [];
        // Add to Array
        bookmarks.push(bookmark);
        //Set to local storage also we need JSON to convert the array into string as localstorage only takes strings
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        // fetch from localstorage in array form using json.parse 
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(bookmark);
        
        // Re-set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    //clear the form
    document.getElementById('myForm').reset();
    // Prevent form from submitting
    e.preventDefault();

    //fetch Bookmarks from local storage
    fetchBookmarks();
}

// Delete bookmark

function deleteBookmark(url){
    // fetch from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through bookmarks
    for(var i=0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
        // remove from array
        bookmarks.splice(i,1);
        }
    }
    // Re-set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch
    fetchBookmarks();
}

// Fetch Bookmarks
function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    
    for(var i=0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                        '<h3>'+name+
                                        ' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> '+
                                        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="index.html">Delete</a> '
                                        +'</h3>'+
                                        '</div>';
    }
}

function validateForm(siteName,siteUrl){
    //validation for null values
    if(!siteName || !siteUrl){
        alert('Please enter the Website name and url');
        return false;
    }

    // Validate URL
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please enter valid URL');
        return false;
    }
   return true; 
}