export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.bindListeners();
    this.displayContacts();
    this.id = null;
  }
  

  async updateContact(id) {
    let contactData = await this.model.getSingleContactData(id);
    contactData.headerTags = this.view.headerTags;
    this.view.displayEditForm(contactData);

    let addSearch = document.querySelector('#add-search');
    let formUpdateContainer = document.querySelector('.form-update-container');
    let contacts = document.querySelector('.contacts');
    this.view.fadeOut(contacts);
    this.view.fadeOut(addSearch);
    this.view.fadeIn(formUpdateContainer);

  }

  async displayContacts() {
    this.view.pageContactsReset();
    let contactsData = await this.model.displayContacts();
    this.view.displayContacts(contactsData);
  }

  confirmToDeleteItem(event) {
    this.view.confirmToDeleteItem(event)
  }

  // EVENT Listeners
  bindListeners() {
    // REVEAL ADD CONTACT FORM
    let addContactBtn = document.querySelectorAll(".add-contact-button");
    
    addContactBtn.forEach(contactBtn => {
      contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.view.revealForm();

        // CANCEL ADDING A NEW CONTACT
        let cancelBtn = document.querySelector('.form-group.cancel')
        cancelBtn.addEventListener('click', (event) => {
          event.preventDefault();
          let form = document.querySelector('#form');
          form.reset();
          this.view.revealContacts();
        });

      });
    });

    // SUBMIT A NEW CONTACT THROUGH FORM
    let submitNewContactBtn = document.querySelector('#form');
    
    submitNewContactBtn.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = this.model.validateNewContact(this.model.extractContact());
      if (!valid) {
        this.view.showValidationMessages(this.model.validationMessages);
      } else if (valid) {
        this.model.addContact();
        let form = document.querySelector('#form');
        let addSearch = document.querySelector('#add-search');
        
        form.reset();
        this.displayContacts();
  
        let formContainer = document.querySelector('.form-container');
        let contacts = document.querySelector('.contacts');
        this.view.fadeOut(formContainer);
        this.view.fadeIn(contacts);
        this.view.fadeIn(addSearch);
      }
    })
    

    // EVENT HANDLER FOR EDIT AND DELETE SINGLE CONTACT BUTTONS
    let contacts = document.querySelector('.contacts');
    contacts.addEventListener('click', async (event) => {
      if (event.target.nodeName === 'BUTTON') {
        event.preventDefault();
        let button = event.target;
        this.id = button.parentElement.parentElement.dataset.id;
        let fullName = button.parentElement.parentElement.dataset.full_name;
    
        if (button.classList.contains('edit-btn')) {
          await this.updateContact(this.id);
          let cancelBtn = document.querySelector('.form-update-group.cancel');
          let addSearch = document.querySelector('#add-search');
          let submitUpdate = document.querySelector('#update-form-submit');


          let formUpdateContainer = document.querySelector('.form-update-container');
          let contacts = document.querySelector('.contacts');



          // INNER CANCEL THE UPDATE EVENT HANDLER
          cancelBtn.addEventListener('click', (event) => {
            event.preventDefault();

            this.view.fadeOut(formUpdateContainer);
            this.view.fadeIn(addSearch);
            this.view.fadeIn(contacts);
            this.id = null;
            formUpdateContainer.remove();
          });

          // SUBMIT THE UPDATE EVENT HANDLER
          submitUpdate.addEventListener('click', async (event) => {
            event.preventDefault();
            let valid = this.model.validateNewContact(await this.model.extractUpdatedContact());
            if (!valid) {
              this.view.showValidationUpdateMessages(this.model.validationMessages);
            } else if (valid) {
              await this.model.updatesContact();
              this.view.fadeOut(formUpdateContainer);
              this.view.fadeIn(addSearch);
              this.displayContacts();
              contacts = document.querySelector('.contacts')
              this.view.fadeIn(contacts);
              formUpdateContainer.remove();
            }
          });

        } else if (button.classList.contains('delete-btn')) {
            event.preventDefault();
            
            this.confirmToDeleteItem(event);
        }


      }
    }); 
    document.body.addEventListener('click', event => {
      if (event.target.value === 'yes') {
        let id = event.target.parentElement.parentElement.dataset.id;
        this.view.hideModal(event);
        this.model.deleteContact(id);
        this.displayContacts();
        // event.target.parentNode.previousElementSibling.style.display='none';
        // event.target.parentNode.style.display='none';
      } else if (event.target.value === 'no') {
        this.view.hideModal(event);
        
      }
    })

    //HANDLER FOR TAG FILTERING
    let tagOptions = document.querySelector('.tag-options')

    tagOptions.addEventListener('click', (event) => {
      if (event.target.nodeName === 'A') {
        event.preventDefault();
        // this.view.removeFilters(); //removes tag-selected from tags and makes it so that all contacts are showing
        let filterTag = event.target.textContent;
        console.log(`filter tag is ${filterTag}`);
        event.target.classList.add('tag-selected')
        let allContacts = document.querySelectorAll('.contact-display');

        allContacts.forEach((contact) => {
          let contactTags = contact.querySelectorAll('.singleTag');
          console.log(contact)
          contactTags = Array.from(contactTags);
          contactTags = contactTags.map((tag) => {return tag.textContent})
          console.log(contactTags)
          if (!contactTags.includes(filterTag)) {
            contact.classList.add('hide');
          }
        });
      }
    });


    // HANDLER TO REMOVE FILTERS
    let clearFilter = document.querySelector('.remove-filter')
    clearFilter.addEventListener('click', (event) => {
      event.preventDefault();
      let allContacts = document.querySelectorAll('.contact-display');
      allContacts.forEach((contact) => {
        if(contact.classList.contains('hide')) {
          contact.classList.remove('hide');
        }
      });

      let allTagsFilters = document.querySelectorAll('.tag-selected');
      allTagsFilters.forEach(tag => {
        tag.classList.remove('tag-selected');
      })
    })

    // SEARCH LISTENER
    let searchField = document.querySelector('.search-bar');
    searchField.addEventListener('focus', (event) => {
      document.addEventListener('keyup', (event) => {

        let inputText = searchField.value;
        let regex = new RegExp(inputText, 'i');
        let allContacts = document.querySelectorAll('.contact-display');
          allContacts.forEach((contact) => {
            if(regex.test(contact.dataset.name)) {
              if(contact.classList.contains('hide')){
                contact.classList.remove('hide');
              }
            }
            if(!regex.test(contact.dataset.name)) {
              if(!contact.classList.contains('hide')){
                contact.classList.add('hide');
              }
            }
        });
      });
    });

    
  }  // this '}' is end of listeners
}

