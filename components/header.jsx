import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Inner } from '../styles/common';

const StyledHeader = styled.header`
  padding: 12px;
  background-color: #8AA6A6;
  color: #FFFFFF;
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 1.6;
`;

const Header = () => (
  <StyledHeader><Inner><h1><Link href="/">Movie Stocker</Link></h1></Inner></StyledHeader>
);

export default Header;
