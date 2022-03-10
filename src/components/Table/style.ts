import styled from "styled-components";
import { column } from "../../common";


export const Table = styled.table`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;
export const Header = styled.th`
  padding: 5px;
  font-weight: 700;
`;
export const Row = styled.tr`
  padding: 5px;
  border-top: 2px solid #dbdee1;

  &:hover {
    background-color: #233549;
    color: #fff;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -ms-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
    cursor: pointer;
  }
`;
export const Cell = styled.td`
  min-width: 100px;
  text-align: center;
  padding: 5px;
`;

export const CardsWrapper = styled(column)`
  padding: 5px 0;
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;
