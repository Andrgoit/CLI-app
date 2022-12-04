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

async function addContact(newName, newEmail, newPhone) {
  if (!newName) {
    return console.warn("\x1B[31m name is require!");
  }
  if (!newEmail) {
    return console.warn("\x1B[31m email is require!");
  }
  if (!newPhone) {
    return console.warn("\x1B[31m phone is require!");
  }
  const contacts = await listContacts();

  const name = String(newName);
  const email = String(newEmail);
  const phone = String(newPhone);
  const id = String(v4());

  const newContact = { name, email, phone, id };
  contacts.push(newContact);

  // в 56 строке. При записи файла он будт в виде одной строки
  // await fs.writeFile(contactsPath, JSON.stringify(contacts));

  // в 59 строке. При записи файла он будет отформатировано в обычном виде
  // null - сколько символов заменить
  // 2 - количество отступов слева
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === String(contactId));
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
