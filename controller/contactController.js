const asyncHandler = require("express-async-handler");
const Contact = require('../models/contactModel');


//@desc Create contact
//@route POST /api/contacts/
//@access Private
const createContact = asyncHandler (async (req,res)=>{
    console.log("The request body is", req.body);
    const {name, email, phone} = req.body;
    if( !name || !email || !phone){
        res.status(400);
        throw new Error("All fields are necessary!!");
    }

    const contact = await Contact.create({
        user_id: req.user.id, name, email, phone
    })
    res.status(201).json({message: "Created Contact",user: req.user.username, contact: contact});
});


//@desc Get all contacts
//@route GET /api/contacts
//@access Private
const getContacts = asyncHandler (async (req,res)=>{
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json({user: req.user.username, contacts: contacts})
});


//@desc Get contact
//@route GET /api/contacts/:id
//@access Private
const getContact = asyncHandler (async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found.");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Your are unathorized to access.")
    }
    res.status(200).json({user: req.user.username, contacts: contact});
});


//@desc Update the contact
//@route PUT /api/contacts
//@access Private
const updateContact = asyncHandler (async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found.");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Your are unathorized to access.")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json({message: "Updated Contact",user: req.user.username, contact: updatedContact});
});


//@desc Delete contact
//@route DELETE /api/contacts
//@access Private
const deleteContact = asyncHandler (async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found.");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Your are unathorized to delete other user contact.")
    }
    // await contact.remove();
    await Contact.findByIdAndRemove(req.params.id);
    // await Contact.remove();
    res.status(200).json({message: "Deleted Contact",user: req.user.username, contact: contact});
});


module.exports = {
    getContacts,
    getContact,
    updateContact,
    createContact,
    deleteContact
};