const { Command } = require("commander");
const program = new Command();
const contactsOperations = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id = ${id} not found :(`);
      }
      console.table(contact);
      break;

    case "add":
      const newContact = await contactsOperations.addContact(
        String(name),
        String(email),
        String(phone)
      );
      console.table(newContact);
      break;

    case "remove":
      const removedContact = await contactsOperations.removeContact(id);
      console.table(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
