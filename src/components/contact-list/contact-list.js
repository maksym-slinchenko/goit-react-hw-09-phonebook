import React, { useEffect, useCallback } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import operations from '../../redux/contacts/contacts-operations';

import ContactItem from '../contact-item/contact-item';
import styles from './contact-list.module.css';
import {
  getLoading,
  getFilteredContacts,
} from '../../redux/contacts/contacts-selectors';

export default function ContactList() {
  const contacts = useSelector(getFilteredContacts);
  const isLoading = useSelector(getLoading);

  // При первом Маунте фетчим контакты
  const dispatch = useDispatch();
  const onFetchContacts = useCallback(
    () => dispatch(operations.fetchContacts()),
    [dispatch],
  );

  useEffect(() => onFetchContacts(), [onFetchContacts]);
  // --------------------------

  return (
    <>
      {isLoading && (
        <Loader type="Bars" color="#00BFFF" height={80} width={80} />
      )}
      <TransitionGroup component="ul" className={styles.contactList}>
        {contacts.map(i => {
          return (
            <CSSTransition key={i.id} timeout={250} classNames={styles}>
              <ContactItem id={i.id} name={i.name} number={i.number} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </>
  );
}
