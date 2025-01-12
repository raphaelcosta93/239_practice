// line 130
//<div class="form-group">
//<label for="tags">Tags:</label>
//<input class="tagInput" type="text" id="tags" name="tags" value="{{tags}}">
//</div>

// line 114 (before 130 code is pasted add this back...)
//<!-- <div id="checkbox-container">
//{{> checkbox-partial tags=tags}}
//</div> -->


// displayOneContact(data) {
    
  //   let li = document.createElement('li');
  //   li.classList.add('contact-display');
  //   let h3 = document.createElement('h3');
  //   h3.textContent = data.full_name

  //   let dl = document.createElement('dl');
    
  //   let dtPhone = document.createElement('dt');
  //   dtPhone.textContent = "Phone Number:";
  //   let ddPhone = document.createElement('dd');
  //   ddPhone.textContent = data.phone_number;

  //   dl.append(dtPhone, ddPhone);
    
  //   let dtEmail = document.createElement('dt')
  //   dtEmail.textContent = "Email:";
  //   let ddEmail = document.createElement('dd');
  //   ddEmail.textContent = data.email;

  //   dl.append(dtEmail, ddEmail);

  //   let dtTags = document.createElement('dt')
  //   dtTags.textContent = "Tags:";
  //   let ddTags = document.createElement('dd');
  //   ddTags.textContent = data.tags;

  //   dl.append(dtTags, ddTags);

  //   let divForBtns = document.createElement('div');
  //   divForBtns.classList.add('contact-actions');
  //   let editBtn = document.createElement('button');
  //   editBtn.classList.add('edit-btn');
  //   editBtn.textContent = 'Edit';

  //   let deleteBtn = document.createElement('button');
  //   deleteBtn.classList.add('delete-btn');
  //   deleteBtn.textContent = 'Delete';

  //   divForBtns.append(editBtn, deleteBtn);

  //   li.appendChild(h3);
  //   li.appendChild(dl);
  //   li.appendChild(divForBtns);

  //   document.querySelector('.contacts').appendChild(li);
  // }


  // reveal form guts
          // REMOVE THIS CODE
        // let formContainer = document.querySelector('.form-container');
        // let addSearch = document.querySelector('#add-search');
    
        // let contacts = document.querySelector('.contacts');
        // this.view.fadeOut(contacts);
        // this.view.fadeOut(addSearch);
        // this.view.fadeIn(formContainer);

// reveal contacts guts from controller
            // let formContainer = document.querySelector('.form-container'); // Moved inside the click handler
          // let addSearch = document.querySelector('#add-search');
          // let contacts = document.querySelector('.contacts');
          // this.view.fadeOut(formContainer);
          // this.view.fadeIn(contacts);
          // this.view.fadeIn(addSearch);