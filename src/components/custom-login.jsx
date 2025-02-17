// admin/components/custom-login.jsx
import { Box, Button, Text, H2, Input, FormGroup } from '@adminjs/design-system';
import { useTranslation } from 'adminjs';
import React from 'react';
import styled from 'styled-components';

const LoginBox = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #f5f5f5;
`;

const StyledLogo = styled.img`
  max-width: 200px;
  margin-bottom: 15px;
`;

const LoginForm = styled(Box)`
  width: 400px;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CustomLogin = (props) => {
  const { action, message } = props;
  const { translateButton, translateProperty, translateMessage } = useTranslation();

  return (
    <LoginBox>
      <StyledLogo src="/logo.png" alt="Company Logo" />
      <LoginForm as="form" action={action} method="POST">
        <H2>Admin Panel</H2>
        {message && <Text>{translateMessage(message)}</Text>}
        <FormGroup>
          <Text as="label" htmlFor="email">
            Email:
          </Text>
          <Input id="email" name="email" placeholder="admin@example.com" />
        </FormGroup>
        <FormGroup>
          <Text as="label" htmlFor="password">
            Password:
          </Text>
          <Input id="password" type="password" name="password" placeholder="●●●●●●●●" />
        </FormGroup>
        <Button variant="contained" type="submit">
          {translateButton('Login')}
        </Button>
      </LoginForm>
    </LoginBox>
  );
};

export default CustomLogin;
