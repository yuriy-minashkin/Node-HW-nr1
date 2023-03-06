const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    console.table(result);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const result = contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContacts = contacts.filter(
      (contact) => contact.id !== contactId.toString()
    );
    const newContactsData = JSON.stringify(newContacts);
    try {
      await fs.writeFile(contactsPath, newContactsData);
      console.log(`Contact with id nr.${contactId} has been removed!`);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newId = uuidv4();
    const newContact = { id: newId, name, email, phone };
    const newContactsList = JSON.stringify(
      [newContact, ...contacts],
      null,
      "\t"
    );
    try {
      await fs.writeFile(contactsPath, newContactsList);
      console.log(`New contact successfully added to Contacts!`);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
