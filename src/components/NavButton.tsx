import React from "react";
import Link from "next/link";
import styled from "styled-components";

const PageLink = styled.a`
  display: inline-block;
  height: 30px;
  margin-bottom: 12px;
  padding: 0 12px;
  color: #333;
  font-size: 1.8rem;
  line-height: 30px;
  text-decoration: none;
  background-color: #ddd;
  border-radius: 6px;
  cursor: pointer;

  & + & {
    margin-left: 8px;
  }
`;

interface NavButtonProps {
  link: string;
  text: string;
}

const NavButton = ({ link, text }: NavButtonProps) => (
  <Link href={link}>
    <PageLink>{text}</PageLink>
  </Link>
);

export default NavButton;
