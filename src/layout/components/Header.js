import React,{ useState, useRef, useEffect } from 'react';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Header = ({ onClickLogout }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const wrapperRef = useRef(null);

  const handleClickShowDropDown = () => setShowDropDown(!showDropDown);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  })

  return (
    <header className='todo-header'>
      <div className='todo-header__content container todo__dropdown'>
        <div 
          className='todo-header__avatar d-flex align-items-center todo__pointer'
          onClick={handleClickShowDropDown}
          ref={wrapperRef}
        >
          <figure className='todo-header__img-container'>
            <img 
              className='todo-header__img'
              src='data:image/jpeg;base64,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'  
              alt='avatar'
            />
          </figure>
          <div className='todo-header__name ml-2'>
              Wilmer Maldonado
          </div>
          <i  className='todo-icon-keyboard_arrow_down-24px ml-2'/>
          <div
            className={`todo__dropdown-content todo-header__dropdown 
              ${showDropDown ? 'todo__dropdown-content--show' : ''} 
            `}
          >
            <div className='todo-header__link' onClick={onClickLogout}>Cerrar sesión</div>
          </div>
        </div>
        
      </div>
    </header>
  );
}
  

export default Header;
