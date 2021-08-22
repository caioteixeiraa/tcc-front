import styled from 'styled-components'

export const Button = styled.button`
  font-weight: 600;
  font-size: 16px;
  border: ${({ theme }) => `1px solid ${theme.colors.primary.normal}`};
  border-radius: 4px;
  cursor: pointer;
  padding: 8px 8px;
`

export const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: #FFFFFF;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
  `

export const SecondaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary.normal};
  transition: background-color 0.3s;
  &:hover {
    border: ${({ theme }) => `1px solid ${theme.colors.primary.dark}`};
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`