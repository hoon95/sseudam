import styled from "@emotion/styled";

export const FooterLink = styled.ul`
  display: flex;
  gap: var(--gap);

  a {
    color: var(--light);
    font-size: calc(var(--text-sm) * 1.2);
  }
`;

export const SnsIcon = styled.ul`
  display: flex;
  justify-content: end;
  gap: calc(var(--gap) * 0.2);

  svg {
    font-size: var(--text-md);
  }
`;
