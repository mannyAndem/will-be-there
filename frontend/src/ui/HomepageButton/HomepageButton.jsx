import React from 'react';
import './HomePageButton.scss';

const HomePageButton = ({ children, onClick, variant = 'primary', className, ...otherProps }) => {
  const getClassNames = () => {
    const baseClasses = 'homeButton';
    const variantClasses = {
      main: 'more',
      secondary: 'secondary',
      danger: 'danger'  
    };
    return `${baseClasses} ${variantClasses[variant]} ${className}`;
  };

  return (
    <button
      className={getClassNames()}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default HomePageButton;