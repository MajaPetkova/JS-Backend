// desc Get all Contacts
// route GET api/contacts
// access public

const getContacts = (req, res) => {
  res.status(200).send("Get Contacts");
};

// desc Create New Contact
// route POST api/contacts
// access public

const createContact = (req, res) => {
    console.log(req.body)
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
  res.status(201).json({Message: "Create Contact"});
};

// desc Get Contact
// route GET api/contacts/:id
// access public

const getContact = (req, res) => {
  res.status(200).send(`Get Contact for ${req.params.id}`);
};

// desc Get Contact
// route PUT api/contacts/:id
// access public

const updateContact = (req, res) => {
    res.status(200).send(`Update Contact for ${req.params.id}`);
  }

// desc Delete Contact
// route DELETE api/contacts/:id
// access public

const deleteContact = (req, res) => {
    res.status(200).send(`Delete Contact for ${req.params.id}`)
  };
  
module.exports = { getContacts, createContact, getContact, updateContact, deleteContact};
