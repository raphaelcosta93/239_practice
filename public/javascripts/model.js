export class Model {
  constructor() {
    
  }

  async displayContacts(substr) {
    try {
      let contacts = await this.getContactsData('http://localhost:3000/api/contacts');

      let transformedData = contacts.map(contact => {
        return {
          full_name: contact.full_name,
          phone_number: contact.phone_number,
          email: contact.email,
          tags: contact.tags,
          id: contact.id
        };
      });
      return transformedData;
    } catch (error) {
      console.log('Failed to get all contacts data', error);
    }
  }

  async getContactsData(url) {
    let response = await fetch(url);
    let data = await response.json();
    
    return data;
  }

  async getSingleContactData(id) {
    let response = await fetch('http://localhost:3000/api/contacts/' + id);
    let data = await response.json();
    if (data.tags) {
      data.tags = data.tags.split(',');
    }
    return data;
  }

  async updatesContact() {
    let data = await this.extractUpdatedContact();
    let id = data.id;

    let request = new XMLHttpRequest();
    request.open('PUT', 'http://localhost:3000/api/contacts/' + id);
    let jsonData = JSON.stringify(data);
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    request.addEventListener('load', (event) => {
      try {
        if (request.status === 404) {
          throw new Error('Network error: Resource not found');
        }
        // handle successful request here... what else needs to happen?
      } catch (error) {
        console.log("Adding a new contact was unsuccessful", error)
      }
    });

    request.addEventListener('error', (event) => {
      console.log("Network error occurred", event);
    });

    request.send(jsonData);
  }

  async extractUpdatedContact() {
    let form = document.querySelector("#update-form");
    const getValueOf = (selector) => form.querySelector(selector).value;
    let id = form.dataset.id;
    let full_name = getValueOf('#full-name');
    let email = getValueOf('#email');
    let phone_number = getValueOf('#phone-number');

    let tagsChecked = form.querySelectorAll('.tagOption');
    let contactTags = '';
    tagsChecked.forEach(tagBox => {
      if (tagBox.checked && contactTags === '') {
        contactTags += tagBox.value;
      } else if (tagBox.checked) {
        contactTags += (',' + tagBox.value);
      }
    });
    
    let newTag = getValueOf('#new-tag');
    if (newTag) {
      if (contactTags === '') {
        contactTags += newTag;
      } else {
        contactTags += (',' + newTag);
      }
      this.tags += (',' + newTag);
    }
    if (contactTags === '') contactTags = null;

    let newContactData = { id, full_name, email, phone_number, tags: contactTags}
    return newContactData;

  }
  validateNewContact(dataIn) {
    let data = dataIn;
    // let data = this.extractContact();
    let messages = [];
    if (this.invalidPhone(data.phone_number)) {
      messages.push('The phone number is invalid. Must be numbers only')
    }
    if (this.invalidName(data.full_name)) {
      messages.push('The name is invalid. Must be letters and spaces only')
    }
    if (this.invalidEmail(data.email)) {
      messages.push('The email is invalid. Should look something like "newguy@person.net"')
    }
    
    if(messages.length > 0) {
      this.validationMessages = messages;
      return false;
    }
    return true;
  }

  invalidPhone(phone) {
    if (phone.length > 0) {
      let reg = /^\d+$/;
      return !reg.test(phone);
    }
    return false;
  }
  invalidName(name) {
    if (name.length > 0) {
      let reg = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
      // let reg = /[a-zA-Z]\s*/;
      return !reg.test(name);
    }
    return false;
  }
  invalidEmail(email) {
    if (email.length > 0) {
      // const emailRegex = /^[a-z1-9]+@([a-z]+\.[a-z]+)+$/i;
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
      return !emailRegex.test(email);
    }
    return false;
  }

  extractContact() {
    let form = document.querySelector("#form");
    const getValueOf = (selector) => form.querySelector(selector).value;

    let full_name = getValueOf('.form-group input[type="text"]');
    let email = getValueOf('.form-group input[type="email"]');
    let phone_number = getValueOf('.form-group input[type="tel"]');
    // let tags = getValueOf('.tagInput') || null;
    let tagsChecked = document.querySelectorAll('.tagOption');
    let contactTags = '';
    tagsChecked.forEach(tagBox => {
      if (tagBox.checked && contactTags === '') {
        contactTags += tagBox.value;
      } else if (tagBox.checked) {
        contactTags += (',' + tagBox.value);
      }
    });
    
    let newTag = getValueOf('#new-tag');
    if (newTag) {
      if (contactTags === '') {
        contactTags += newTag;
      } else {
        contactTags += (',' + newTag);
      }
      this.tags += (',' + newTag);
    }
    if (contactTags === '') contactTags = null;
    let newContactData = { full_name, email, phone_number, tags: contactTags}
    return newContactData;
  }

  // post request to database
  addContact() {
    
      let data = this.extractContact();
      let request = new XMLHttpRequest();
      request.open('POST', 'http://localhost:3000/api/contacts/');
      let jsonData = JSON.stringify(data);
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

      request.addEventListener('load', (event) => {
        try {
          if (request.status === 404) {
            throw new Error('Network error: Resource not found');
          }
          // handle successful request here... what else needs to happen?
        } catch (error) {
          console.log("Adding a new contact was unsuccessful", error)
        }
      });

      request.addEventListener('error', (event) => {
        console.log("Network error occurred", event);
      });

      request.send(jsonData);
  }

  deleteContact(id) {
    let request = new XMLHttpRequest();
    request.open('DELETE', 'http://localhost:3000/api/contacts/' + id);
    request.send();
  }

}
