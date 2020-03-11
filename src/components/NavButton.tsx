import Link from "next/link";
import React from "react";
import styled from "styled-components";

const PageLink = styled.a`
  display: inline-block;
  padding: 0 12px;
  color: #333;
  text-decoration: none;
  background-color: #ddd;
  border-radius: 6px;

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
