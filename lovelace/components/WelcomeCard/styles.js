import styled from 'styled-components'

export const CardContainer = styled.div`
  border: ${({ theme }) => `2px solid ${theme.colors.primary.normal}`};
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  width: 300px;
  max-width: 40%;
`

export const Title = styled.h1`
  margin: 0;
  font-size: 32px;
`

export const Text = styled.p`
  margin: 16px auto 24px;
  max-width: 80%;
`