import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import operations from '../../redux/contacts/contacts-operations';
import Message from '../message/message';
import styles from './contacts-form.module.css';
import { getContacts } from '../../redux/contacts/contacts-selectors';

export default function ContactForm() {
  // Локальный стэйт
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [errorActive, setErrorActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Глобальный стэйт
  // а. получение стэйта
  const contacts = useSelector(getContacts);
  // б. изменение стэйта
  const dispatch = useDispatch();
  const onCreateContacts = (name, number) =>
    dispatch(operations.createContact(name, number));

  // Изменение свойств для инпутов
  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        console.warn(`Тип поля name - ${name} не обрабатывается!`);
    }
  };

  // Вызов сообщения error
  const messageAppearing = message => {
    setErrorMessage(message);
    setErrorActive(true);
  };

  // Проверка пустые поля или нет
  const isFieldEmpty = name => {
    if (name === '') {
      messageAppearing('All fields must be completed');
      return true;
    }
  };
  // Обнуление значений формы
  const reset = () => {
    setName('');
    setNumber('');
  };

  // Добавление нового контатка в список
  const handleAddContacts = e => {
    e.preventDefault();
    if (isFieldEmpty(name) || isFieldEmpty(number)) {
      return;
    }
    const namesArray = contacts.map(c => c.name.toLowerCase());
    if (namesArray.includes(name.toLowerCase())) {
      const i = namesArray.indexOf(name.toLowerCase());
      messageAppearing(`"${contacts[i].name}" is already in contacts`);
      reset();
      return;
    }
    onCreateContacts(name, number);
    reset();
  };

  // Удаление сообщения error
  const resetError = () => {
    setTimeout(() => {
      setErrorActive(false);
    }, 2000);
  };

  return (
    <>
      <CSSTransition
        in={errorActive}
        timeout={2000}
        classNames={styles}
        unmountOnExit
        onEnter={resetError}
        onExited={() => setErrorMessage('')}
      >
        <Message message={errorMessage} />
      </CSSTransition>
      <form>
        <label>
          Name
          <input name="name" type="text" value={name} onChange={handleChange} />
        </label>
        <label>
          Number
          <input
            name="number"
            type="tel"
            value={number}
            onChange={handleChange}
          />
        </label>
        <button type="submit" onClick={handleAddContacts}>
          Add contact
        </button>
      </form>
    </>
  );
}
