const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const allContacts = JSON.parse(data);
  return allContacts;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find((item) => contactId === item.id);
  return contact;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const id = allContacts.findIndex((item) => contactId === item.id);
  if (id === -1) {
    return console.log(chalk.red("Incorrect contactId. Try again, plese!"));
  }
  const updateContacts = allContacts.splice(id, 1);
  const newContacts = await fs.writeFile(
    contactsPath,
    JSON.stringify(allContacts)
  );
  return updateContacts;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = { ...allContacts, id: v4() };
  allContacts.push(newContact);
  await updateProducts(allContacts);
  return newProduct;
}

listContacts();
// getContactById(8);
removeContact(7);
module.exports = { listContacts, getContactById, removeContact, addContact };
