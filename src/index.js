import { program } from 'commander';
import {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
} from './contacts.js';

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case 'list':
      const allContacts = await getContacts();
      return console.log(allContacts);

    case 'get':
      const oneContact = await getContactById(id);
      return console.log(oneContact);

    case 'add':
      const newContact = await addContact(data);
      return console.log(newContact);

    case 'remove':
      const deleteContact = await deleteContactById(id);
      return console.log(deleteContact);
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);
