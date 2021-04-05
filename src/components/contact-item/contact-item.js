import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import operations from '../../redux/contacts/contacts-operations';

export default function ContactItem({ id, name, number }) {
  const dispatch = useDispatch();
  const onRemove = id => dispatch(operations.removeContact(id));

  return (
    <>
      <li key={id} name={name}>
        {`${name}: ${number}`}
        <button
          type="button"
          onClick={() => {
            onRemove(id);
          }}
        >
          Delete
        </button>
      </li>
    </>
  );
}

ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};
