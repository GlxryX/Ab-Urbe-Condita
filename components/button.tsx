import React from 'react';
import classNames from 'classnames';
import styles from '../styles/button.module.scss';

interface ButtonProps {
  onClick: () => void;
  text: string;
  minimal?: boolean;
}

export default function Button({ onClick, text, minimal }: ButtonProps) {
  return (
    <button
      className={classNames(styles.button, {
        [styles.minimal]: minimal,
      })}
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  );
}