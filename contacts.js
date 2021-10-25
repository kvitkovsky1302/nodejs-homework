const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const allContacts = JSON.parse(data);
  return allContacts;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find((item) => contactId === item.id.toString());
  return contact;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const id = allContacts.findIndex((item) => contactId === item.id.toString());
  if (id === -1) {
    return console.log(chalk.red("Incorrect contactId. Try again, plese!"));
  }
  const updateContacts = allContacts.splice(id, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return updateContacts;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
