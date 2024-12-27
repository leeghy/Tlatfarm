// MenuBar.js

import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Styles/Menubar.css'; // 메뉴 바 스타일 임포트

const MenuBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 메뉴 열고 닫기 핸들러
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prevState => !prevState);
  }, []);

  return (
    <>
      <button className="menu-button" onClick={toggleMenu} aria-label="메뉴 열기/닫기">
        &#x2630;
      </button>

      {/* 메뉴바 */}
      <div className={`menu-bar ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleMenu} aria-label="메뉴 닫기">
          &times;
        </button>
        <nav>
          <ul>
            <li><Link to="/">홈</Link></li>
            <li><Link to="/planner">플래너</Link></li>
            <li><Link to="/dashboard">대시보드</Link></li>
            <li><Link to="/trading">거래</Link></li>
            <li><Link to="/resources">자원 관리</Link></li>
            <li><Link to="/analysis">분석</Link></li>
            <li><Link to="/alerts">경고</Link></li>
            <li><Link to="/settings">설정</Link></li>
            
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MenuBar;
