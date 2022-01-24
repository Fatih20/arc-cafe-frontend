import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { BASE_URL } from '../routes';

import checkmark from '../assets/checked.png';

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 1rem;
  gap: 1rem;
  justify-content: center;
`;

const CheckmarkImage = styled.img`
  height: auto;
  width: clamp(5rem, 20%, 7.5rem);
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: #8c7466;
  font-size: 1.5em;
  font-weight: 800;
`;

const Subtitle = styled.p`
  font-size: 0.9em;
`;

const BackButton = styled.button`
  background-color: #95c79d;
  border-radius: 0.25rem;
  color: white;
  font-size: 1em;
  font-weight: 900;
  margin: 0.5rem 0 0 0;
  padding: 0.3rem 0.75rem;
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

export default function Checked() {
  const navigate = useNavigate();

  function navigateToHome() {
    navigate(`${BASE_URL}/`);
  }

  return (
    <Main>
      <CheckmarkImage src={checkmark} />
      <Title>THANK YOU FOR YOUR ORDER!</Title>
      <Subtitle>You will be receiving an email with order details.</Subtitle>
      <BackButton onClick={navigateToHome}>BACK TO HOMEPAGE</BackButton>
    </Main>
  );
}
