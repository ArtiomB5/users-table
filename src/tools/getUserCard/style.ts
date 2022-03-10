import styled from "styled-components";
import { column } from "../../common";

export const UserCard = styled(column)`
  width: 80vw;
  border: 1px solid #dbdee1;
  border-radius: 5px;
  margin: 0 auto;
  margin-bottom: 5px;
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;
export const ButtonsRow = styled(column)`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin: 5px;
`;
