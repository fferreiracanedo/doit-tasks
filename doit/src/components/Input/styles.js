import styled, { css } from 'styled-components'

export const Container = styled.div`
  text-align: left;
  div {
    span {
      color: #c53030;
    }
  }
`

export const InputContainer = styled.div`
  background: var(--white);
  border-radius: 10px;
  border: 2px solid #666360;

  padding: 1rem;
  width: 100%;
  display: flex;
  transition: 0.4s;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
      svg {
        color: #c53030;
      }
    `}
  input {
    background: transparent;
    align-items: center;
    flex: 1;
    border: 0;
    color: var(--black);
    &::placeholder {
      color: #666360;
    }
  }
  svg {
    margin-right: 16px;
  }
`
