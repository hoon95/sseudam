import styled from "@emotion/styled";

export const Container = styled.aside`
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: var(--gap);

  h3 {
    font-size: var(--text-md);
  }

  & .subtitle {
    font-size: calc(var(--text-md) * 0.8);
    padding-top: var(--gap);
  }

  & .age,
  .weight {
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding-bottom: var(--gap);

    & .range {
      color: var(--main);
    }
  }

  /* select box */
  & .MuiSelect-select {
    display: flex;
    align-items: center;
  }
`;
