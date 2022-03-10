import styled from "styled-components";

export const Table = styled.table`
  margin-bottom: 20px;
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
