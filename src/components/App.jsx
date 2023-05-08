import { ContactForm } from './ContactForm';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { Container, Title, TitleContact } from 'Styles/StyleForm.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = newContact => {
    const { contacts } = this.state;

    const isExist = contacts.find(contact => contact.name === newContact.name);

    if (isExist) {
      alert(`${newContact.name} ia already in contacts`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    }
  };

  deliteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = evt => {
    this.setState({
      filter: evt.currentTarget.value,
    });
  };

  filterContact = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  render() {
    const filteredContact = this.filterContact();

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onAddContact={this.addContact} />
        <Filter onChange={this.changeFilter} value={this.state.filter} />

        <TitleContact>Contacts</TitleContact>
        <ContactList
          contacts={filteredContact}
          removeContact={this.deliteContact}
        />
      </Container>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
