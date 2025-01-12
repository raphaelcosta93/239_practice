Requirements:
Contact Manager
Details
Add contact button:
  When clicked: Accordian up a Create Contact form

Form**
  Validation techniques ** not required here but I bet it will be on the assessment. Better to just make it work here.
    
  Form has:
    Full Name:
    Email address:
    Telephone number:

    Submit Button
    Cancel Button
    Tags: Separate by commas? or Spaces? 

  Homepage:
    Shows all contacts that have been entered
    For each contact, there are two buttons
      Edit
        Creates a PUT request to update informatoin
      Delete
        DELETE request to: http://localhost:3000/api/contacts/:id
        Creates a popup to validate the decision
          Either deletes the entry
          Or does nothing


CREATE a new contact

  Contacts:
    document `contacts.json`
      Stored as an array of objects. Each object has the following format
      Note tags: How do I filter that
      {
      "id": 2,
      "full_name": "Victor Reyes",
      "email": "vpr@example.com",
      "phone_number": "09876543210",
      "tags": "work,friend"
    },
      POST requsest to http://localhost:3000/api/contacts/
      Accepts JSON or query string
      Response: JSON representation of the contact with given id.
      Returns 400 if the contact cannot be found (How could you end up with a contact not found?)

    There is going to have to be an XHR POST
    Event listener on the submit button
      When it is submitted, then the data is pushed to the api
      The form data is grabbed
      parsed
      sent
       

Search
  Seach is by name
  Should I make a toggle for searching by tag? Choose search by name or tag?
  This is 'auto complete' (I think) Or that might be the best way to go about it
  As content is typed into the search bar, the listed contacts change to show matches
  Filtering method for the contacts
  Throttle by 300 ms (debounce)


UPDATE
  x model - get request to get the data for the specific contact
    
  x controler -  Handlebars form with variables for extracted data
    x Bring up the form (use fade in/out)
       - with everything filled in
    Hide the id in some variable
      if cancel 
        Need to delete the node? **- delete the form element from the page (currently it is hanging onto the last set of info when cancel is pressed, so that if you press next edit on another contact, the first is still there in the edit form. 
        X ALSO: having a name clashing issue.
        - fade in the contacts
      if submit - validate and submit the form
        extract form data
        make put request for the data to the existing id
        refresh display

    Adding the update form, with the tags. For whatever reason, this has been really tricky. How is the update form being built? And how does the tags template work, exactly? 
    X- When I extract the data for the form update, I need to switch the tags data from a string to an array.
    X  - This making one tag appear. Next iterate through use /each
    - Check the boxes
      - Need the data from the form data
        - For each tag in the data, find that element and add checked

    CANCEL UPDATE BUTTON
      - delete the node and fade it out. 
        Find node
        remove

    
TAGS
  Description from requirements:
  "You should implement all the features there, including the search. Also, implement a "tagging" feature, which allows you to create tags, such as "marketing," "sales," "engineering," and when you add/edit a contact, you can select a tag to attach to the contact. Finally, you can click on a tag and show all the contacts with that tag. The UI isn't too important here since the focus is on the functionality."
  
  **Tags is not a fill form field.
  In the fill form for creating a new contact or editing a contact, have existing tags that can be checked and added.
  There will also be an option to create a new tag. 


  Inside a contact object the tags are a single string, and comma separated.
    Decide: 
      If there are no tags, should the tag label still be displayed?
      If there are two tags, should I add a space and keep the comma? 

  Dynamic generation of tags
    From where?
    availableTags = ['friends', 'work']
      Iterates through this array and adds check boxes

      Below the last tag is a button to create new tag
    
    
    createNewTag function
      renders a form

  TAG FILTER
    When you click on one of the tag elements, at the top of the page
      Only contacts with that tag will show
   
    Clear filter button with click listener
    X create button for clear filter
      if clicked
        Select all contacts
          Iterate over contacts
          if contains '.hide'
          remove 'hide'

        select all tag buttons
          Iterate over tag buttons
          if contains 'tag-selected'
            remove 'tag-selected'
    

    Click event listener
      prevent default
      x Board turns red
      filterTag = value base on text in target item

      Identify all contacts
        `document.querySelectorAll('.contact-display');`
      iterate through contacts
        For each contact
        identify tags
          
        if the contact does not contain a tag === filterTag
          then hide it (not inline)
          contactTags = contact.querySelectorAll('.singleTag)
          if (!contactTags.includes(filterTag))
            then add class 'hide'


    Remove filter
      Iterate through contacts
        if the contact contains a class of hide
          remove it. 


FORM VALIDATION
  New contact and for update
  Going to check full name, email, and phone number
    If any field does not pass, a message is displayed and form does not submit.

    Full Name


    add span below each field      

Model:


View:
displayContacts


Controller:
 call to getContacts




  * Approach 

  Get a geneal idea of what all is going to be needed - an overall feel 
  Then, get some html together
    Make it so that there is homepage
      - A landing point, Start to build the palces where interactive functionality will come
      - Move one piece at a time. 
        - Use PEDAC for each step. Use the relavant exercises for strucuture.

High level still todo:
X edit form entry
- form validation
X popup comfirmation before delete (is it?)
- search

- tags - how to display them
- tags - filter by tags