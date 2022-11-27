//импорт модуля fs для рабобты с файлами
// const fs = require("fs/promises");
// или
const fs = require("fs").promises;

//импорт генератора id
const { v4 } = require("uuid");

//импорт модуля path для работы с путями
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === String(contactId));

  if (!contact) {
    return null;
  }
  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: v4() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === String(contactId));
  if (idx === -1) {
    return null;
  }
  const removedContact = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
