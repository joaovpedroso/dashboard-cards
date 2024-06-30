import styled from "styled-components";
import { StatusEnum } from "~/services/registrations/types";

const registrationStatusStyles: {
  [key in string]: { background: string; title: string };
} = {
  [StatusEnum.REVIEW]: {
    background: "#FDF8E9",
    title: "#EFC24D",
  },
  [StatusEnum.APROVED]: {
    background: "#EEEEFD",
    title: "#4242DF",
  },
  [StatusEnum.REPROVED]: {
    background: "#FBEDF6",
    title: "#CE2893",
  },
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  justify-content: center;
  margin-top: 24px;
`;

export const Column = styled.div<{ status: StatusEnum }>`
  height: auto;
  background-color: ${({ status }) =>
    registrationStatusStyles[status].background};
  border-radius: 32px;
  min-height: 80vh;
  max-height: 80vh;
`;

export const TitleColumn = styled.h3<{ status: StatusEnum }>`
  margin: 0px;
  color: ${({ status }) => registrationStatusStyles[status].title};
  margin: 24px;
`;

export const CollumContent = styled.div`
  overflow: auto;
  max-height: 85%;
`;