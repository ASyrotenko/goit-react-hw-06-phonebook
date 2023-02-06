import { useState, useEffect } from 'react';
import shortid from 'shortid';

import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';

import styles from './app.module.css';

const initialContacts = JSON.parse(localStorage.getItem('contacts'));

export default function App() {
  const [contacts, setContacts] = useState(initialContacts || []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const normalizedName = name.toLowerCase();
    const findeName = contacts.some(contact =>
      contact.name.toLowerCase().includes(normalizedName)
    );
    if (findeName) {
      return alert(`${name} is already in contacts.`);
    }

    setContacts(prevState => [contact, ...prevState]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
    setFilter('');
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filtredContacts = filterContacts();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={styles.subTitle}>Contacts</h2>
      <div className={styles.contactListWrap}>
        {contacts.length === 0 ? (
          <p>There is no contacts in your list.</p>
        ) : (
          <>
            <Filter value={filter} onChange={changeFilter} />
            <ContactList
              contacts={filtredContacts}
              onDeleteContact={deleteContact}
            />
          </>
        )}
      </div>
    </div>
  );
}
