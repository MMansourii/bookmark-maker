const modalShow =document.getElementById('show-modal');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

// Array of bookmarks
let bookmarks = [];

// Show modal / Focus on input
function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}
// Close modal
function closeModal(){
    modal.classList.remove('show-modal');
}
// Validation
function validate(nameVal,urlVal){
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/g;
    const regex = new RegExp(expression);
    if(!nameVal || !urlVal){
        alert('Please submit value for both blanks');
        return false;
    }
    if(!urlVal.match(regex)){
        alert('Please Provide Valid URL');
        return false;
    }
    return true;
}
// To buildour bookmarks
function buildBookmarks(){

    // Remove Bookmarks from array
    bookmarksContainer.textContent = '';

    // Build items
    bookmarks.forEach( bookmark =>{
        const {name, url} = bookmark ;
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // Close item
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title' , 'Remove Bookmarks');
        closeIcon.setAttribute('onclick',`deleteBookmark('${url}')`);
        // Favicon and Link
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // Image (favicon)
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt' , 'Favicon');
        // Link Anchor
        const link = document.createElement('a');
        link.setAttribute('href',`${url}`);
        link.setAttribute('target','_blank');
        link.textContent = name;
        // Append to bookmarks container
        linkInfo.append(favicon , link);
        item.append(closeIcon,linkInfo);
        bookmarksContainer.appendChild(item);
    });
}
// Fetch bookmarks from localstorage
function fetchBookmarks(){

    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }else{
        //  Create array and set to lacal storage
        bookmarks = [{
            name:'Mohammad Design',
            url:'test.com'
        }];
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    buildBookmarks();
}



// EventListeners
modalShow.addEventListener('click',showModal);
modalClose.addEventListener('click',closeModal);
window.addEventListener('click', event => event.target === modal ? modal.classList.remove('show-modal') : false  );

// Get data from inputs
function storeBookmark(event){
    event.preventDefault();
   const nameValue = websiteNameEl.value ;
   let urlValue = websiteUrlEl.value ; 

   if(!urlValue.includes('http://' , 'https://')){
       urlValue = `https://${urlValue}`;
   }
   if(!validate(nameValue,urlValue)){
       return false;
   }
// Put data to object then toout array
   const bookmark = { 
       name:nameValue,
       url:urlValue,
   };
   bookmarks.push(bookmark);
    // Set bookmarks in localStorage, fetch, reset input fields
   localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
   fetchBookmarks();
   bookmarkForm.reset();
   websiteNameEl.focus();
}
// Delete BookMark
function deleteBookmark(url){
    bookmarks.forEach( (bookmark ,i ) =>{
        if(bookmark.url === url){
            bookmarks.splice(i,1);
        }
    });
    // Update bookmarks Array
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
}

//Event Listener
bookmarkForm.addEventListener('submit',storeBookmark) ;

// Onload Fetch
fetchBookmarks();