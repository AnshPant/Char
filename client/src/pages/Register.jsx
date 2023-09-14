// import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import axios from 'axios';
import { Checkbox } from '@material-ui/core';
import { ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-left: -10px;
  margin-right: -10px;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 10px 0px;
  flex-basis: 100%;
  display: flex;
  align-items: center;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const Button = styled.button`
  flex-basis: 40%;
  border: none;
  padding: 15px 20px;
  margin: 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

// const Back = styled.div`
//   flex-basis: 40%;
//   border: none;
//   padding: 15px 20px;
//   margin: 10px;
//   background-color: teal;
//   color: white;
//   cursor: pointer;
//   text-align: center;

//   a {
//     color: white;
//     text-decoration: none;
//   }
// `;

// const StyledLink = styled(Link)`

//   text-decoration: none;
//   color: white;
// `;
// const ErrorMessage = styled.div`
// `;
const Register = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleRegister = () => {
    console.log(name);
    if (!agreementAccepted) {
      setError('Please accept the agreement to continue.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    if (!otpSent) {
      axios.post('https://char.onrender.com/api/auth/send-otp', {
        email,
      })
        .then(response => {
          console.log(response.data);
          setOtpSent(true);
        })
        .catch(error => {
          console.error(error);
          setError('Failed to send OTP. Please try again.');
        });
    } else {
      axios.post('https://char.onrender.com/api/auth/register', {
        name,
        lastName,
        username,
        email,
        password,
        otp,
      })
        .then(response => {
          console.log(response.data);
          setError(null); // clear any existing errors
          history.push('/');
        })
        .catch(error => {
          console.error(error);
          setError('Registration failed. Please try again.'); // set the error message
        });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Input
            placeholder="last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <Input
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Input
            placeholder="confirm password"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {otpSent ? (
            <Input
              placeholder="OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />
          ) : (
            <Button onClick={handleRegister} disabled={!agreementAccepted}>
              SEND OTP
            </Button>
          )}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
            <CheckboxContainer>
              <Checkbox
                id="agreement"
                checked={agreementAccepted}
                onChange={e => setAgreementAccepted(e.target.checked)}
              />
              <label htmlFor="agreement">
                I accept the agreement
              </label>
            </CheckboxContainer>
          </Agreement>
          <Button onClick={handleRegister} disabled={!agreementAccepted}>
            CREATE
          </Button>
          {/* <StyledLink to="/">
            <Back>BACK</Back>
          </StyledLink> */}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
