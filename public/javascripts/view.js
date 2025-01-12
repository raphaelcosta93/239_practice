export class View {
  constructor () {
    this.headerTags = null;
  }

  displayContacts(data) {
    if (data.length === 0 ) {
      let emptyContactsPlaceHolder = document.querySelector(".empty-contacts-placeholder");
      emptyContactsPlaceHolder.classList.remove('hide')
    }
    let contactData = Array.from(data);
    contactData.forEach(contact => {
      if (contact.tags) {
        contact.tags = contact.tags.split(',');
        // This call is for updating the tags heading. Probably should not be inside this method.
        this.pushToTagsHeading(contact.tags);
      }
      this.displayOneContact(contact);
    });
  }

  pushToTagsHeading(tagsArray) {
    let currentTags = document.querySelectorAll('.tag-options a');
    let currentTagsArray = Array.from(currentTags);
    let startLength = currentTagsArray.length;
    currentTagsArray = currentTagsArray.map(tag => {
      return tag.textContent;
       })
    // console.log(currentTagsArray);
    tagsArray.forEach(tag => {
      if (!currentTagsArray.includes(tag)) {
        currentTagsArray.push(tag);
      }
    });
    let endLength = currentTagsArray.length;
    if (startLength !== endLength) {
      this.renderTags(currentTagsArray);
      this.headerTags = currentTagsArray;
    }
  }

  renderTags(tagsArray) {
    let tagDisplay = document.querySelector('.tag-options');
    while (tagDisplay.children.length) {
      tagDisplay.firstElementChild.remove();
    }

    tagsArray.forEach(tag => {
      let a = document.createElement('a');
      a.setAttribute('href', '#');
      a.textContent = tag;
      tagDisplay.appendChild(a);
    })
  }

  revealForm() {
    this.displayFormTags(this.headerTags);
    let formContainer = document.querySelector('.form-container');
    let addSearch = document.querySelector('#add-search');

    let contacts = document.querySelector('.contacts');
    this.fadeOut(contacts);
    this.fadeOut(addSearch);
    this.fadeIn(formContainer);
  }

  revealContacts() {
    let formContainer = document.querySelector('.form-container'); // Moved inside the click handler
    let addSearch = document.querySelector('#add-search');
    let contacts = document.querySelector('.contacts');
    this.fadeOut(formContainer);
    this.fadeIn(contacts);
    this.fadeIn(addSearch);
  }

  displayOneContact(data) {
    const templateScript = document.getElementById('contact-template').innerHTML;
    const template = Handlebars.compile(templateScript);
  
    const html = template(data);

    // document.querySelector('.contacts').innerHTML += html;
    document.querySelector('.contacts').insertAdjacentHTML('beforeend', html);
  }

  displayFormTags(tags) {
    const templateScript = document.getElementById('checkbox-template').innerHTML;
    const template = Handlebars.compile(templateScript);
    const context = { tags: tags };
    const html = template(context);

    // Inject the generated HTML into the form
    const tagLocation = document.getElementById('checkbox-container');
    while (tagLocation.children.length) {
      tagLocation.firstElementChild.remove();
    }

    tagLocation.insertAdjacentHTML('beforeend', html);
  }


  displayEditForm(data) {    
    const templateScript = document.getElementById('contact-update-template').innerHTML;
    const template = Handlebars.compile(templateScript);
    const html = template(data);


    document.querySelector('#new-contact-form').insertAdjacentHTML('beforebegin', html)

    this.checkTags(data);
  }

  checkTags(data) {
    if (data.tags) {
      data.tags.forEach(tag => {
        document.querySelector(`.tagOption[value='${tag}']`).checked = true;
      });
    }
  }

  pageContactsReset() {
    let ul = document.querySelector('.contacts');
    while (ul.children.length) {
      ul.firstElementChild.remove();
    }
  }

  fadeIn(element) {
    element.classList.remove('hidden');
    element.classList.add('fade');
  }

  fadeOut(element) {
    element.classList.add('hidden');
  }

  confirmToDeleteItem(event){
    // console.log(event.target.parentNode.nextElementSibling);
    event.target.parentNode.nextElementSibling.style.display='block'
  }

  hideModal(event) {
    event.target.parentNode.style.display='none';
  }

  // showValidationMessages() {
  //   let formValidation = document.querySelector('#form .validation-messages');
  //   formValidation.style.display='block';
  // }
  showValidationMessages(messages) {
    const source = document.getElementById('validation-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template({ messages });
    
    const validationContent = document.getElementById('validation-content');
    validationContent.innerHTML = html;
  
    const formValidation = document.getElementById('validation-messages');
    formValidation.style.display = 'block';
  
    // Add event listener to close the validation messages
    const closeBtn = document.getElementById('close-validation');
    closeBtn.addEventListener('click', () => {
      formValidation.style.display = 'none';
    });
  }
  showValidationUpdateMessages(messages) {
    const source = document.getElementById('validation-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template({ messages });
    
    const validationContent = document.getElementById('validation-content');
    validationContent.innerHTML = html;
  
    const formValidation = document.getElementById('validation-update-messages');
    formValidation.style.display = 'block';
  
    // Add event listener to close the validation messages
    const closeBtn = document.getElementById('close-validation');
    closeBtn.addEventListener('click', () => {
      formValidation.style.display = 'none';
    });
  }
  

}