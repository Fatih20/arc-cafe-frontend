import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login, register } from '../utils/api';

import coffeeHour from '../assets/coffeehour.png';

import { BASE_URL } from '../routes';
import { useQueryClient } from 'react-query';
import { IWarningWhenInvalidProps } from '../types';

var approve = require('approvejs');

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;

  /* border: solid 1px black; */
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const FormContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 300px;
  padding: 1.5rem 1.5rem 3rem 1.5rem;
  box-shadow: 0 5px 15px 5px rgba(0, 0, 0, 0.4);
  /* border: solid 1px black; */
`;

const TitleContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CoffeeLogo = styled.img`
  height: auto;
  width: 2rem;
`;

const Title = styled.h2`
  color: #8c7466;
  font-size: 1.5rem;
  font-weight: 800;
`;

const StyledForm = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin: 0.5rem;
`;

const StyledInput = styled.input`
  border: solid 1px rgba(0, 0, 0, 0.5);
  border-radius: 0.25rem;
  padding: 0.5rem;
  width: 100%;
`;

const SubmitButton = styled.button`
  background-color: #95c79d;
  border-radius: 1.5rem;
  color: white;
  font-size: 1em;
  font-weight: 900;
  margin: 0.5rem 0 0 0;
  padding: 0.3rem 0.75rem;
`;

const SignInOption = styled.p`
  text-align: center;
`;

const SignInLink = styled.a`
  color: #95c79d;
`;

const WarningWhenInvalid = styled.p<IWarningWhenInvalidProps>`
  color: red;
  display: ${({ valid }) => (valid ? 'none' : 'initial')};
`;

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [emailOrPasswordInvalid, setEmailOrPasswordInvalid] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      await queryClient.invalidateQueries();
      window.scrollTo(0, 0);
      navigate(`${BASE_URL}`);
    } catch (error: any) {
      console.log(error.response.data);
      if (error.response.data.message === 'Invalid email or password') {
        setEmailOrPasswordInvalid(true);
        setPassword('');
      }
    }
  };

  return (
    <>
      <Spacer />
      <Main>
        <FormContainer>
          <TitleContainer>
            <CoffeeLogo src={coffeeHour} />
            <Title>SIGN IN</Title>
          </TitleContainer>
          <WarningWhenInvalid valid={!emailOrPasswordInvalid}>
            Wrong Email or Password
          </WarningWhenInvalid>
          <StyledForm onSubmit={handleSubmit}>
            <StyledInput
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <StyledInput
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <SubmitButton type="submit">Sign In</SubmitButton>
          </StyledForm>
        </FormContainer>
      </Main>
      <Spacer />
    </>
  );
}

export default LogIn;
