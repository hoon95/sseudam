import styled from "@emotion/styled";

export const Container = styled.aside`
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: var(--gap);

  h3 {
    font-size: var(--text-md);
  }

  /* select box */
  & .MuiSelect-select {
    display: flex;
    align-items: center;
  }
`;
