const { Command } = require("commander");
const chalk = require("chalk");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (contactById) {
        console.table(contactById);
      } else {
        console.log(chalk.yellow("Incorrect contactId. Try again, plese!"));
      }
      break;

    case "add":
      const contact = await addContact(name, email, phone);
      console.table(contact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      if (removedContact) {
        console.table(removedContact);
      } else {
        console.log(chalk.yellow("Incorrect contactId. Try again, plese!"));
      }
      break;

    default:
      console.warn("chalk.red(31m Unknown action type!)");
  }
};

invokeAction(argv);
