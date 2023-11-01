import React, { useState } from 'react';
import styles from './Signup.module.css';
import InputController from './inputcontrollers/InputController';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { auth } from '../firebase';
// import GoogleLogin from 'react-google-login';

function Signup() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        email: '',
        pass: '',
    });

    const [errorMsg, setErrorMsg] = useState('');
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const [validation, setValidation] = useState({
        emailError: '',
        emailValid: true,
        passwordError: '',
        passwordValid: true,
        nameValid: true,
    });

    const handleValidation = () => {
        const { name, email, pass } = values;
        const { emailValid, passwordValid } = validation;

        if (!name.trim() || !email || !pass) {
            setErrorMsg('Please fill all the fields');
        } else if (!emailValid) {
            setErrorMsg('Email is not valid');
        } else if (!passwordValid) {
            setErrorMsg('Password is not valid');
        } else {
            setErrorMsg('');
            setSubmitButtonDisabled(true);
            createUserWithEmailAndPassword(auth, email, pass)
                .then((res) => {
                    const user = res.user;
                    // await updateProfile(user, { displayName: name })
                    console.log(res);                   
                    navigate('/login');
                })
                .catch((error) => {
                    setSubmitButtonDisabled(false);
                    setErrorMsg('Email is already in use');
                    console.error('Error', error);
                });
        }
    };

    const handleInputChange = (name, value) => {
        setValues((prev) => ({ ...prev, [name]: value }));
        if (name === 'email') {
            handleEmailValidation(value);
        } else if (name === 'pass') {
            handlePasswordValidation(value);
        } else if (name === 'name') {
            handleNameValidation(value);
        }
    };

    const handleEmailValidation = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!email || !emailRegex.test(email)) {
            setValidation({ ...validation, emailError: 'Invalid email address', emailValid: false });
        } else {
            setValidation({ ...validation, emailError: '', emailValid: true });
        }
    };

    const handlePasswordValidation = (password) => {
        if (password.length < 8) {
            setValidation({
                ...validation,
                passwordError: 'Password should be at least 8 characters long',
                passwordValid: false,
            });
        } else {
            setValidation({ ...validation, passwordError: '', passwordValid: true });
        }
    };

    const handleNameValidation = (name) => {
        if (name.trim() === '') {
            setValidation({ ...validation, nameValid: false });
        } else {
            setValidation({ ...validation, nameValid: true });
        }
    };

    // const responseGoogle = async (response) => {
    //     const auth = getAuth();
    //     const provider = new GoogleAuthProvider();

    //     if (response.error) {
    //         console.error('Google Sign-In failed:', response.error);
    //     } else {
    //         console.log('Google Sign-In success:', response);
    //         try {
    //             setSubmitButtonDisabled(true);
    //             const result = await signInWithPopup(auth, provider);
    //             const user = result.user;
    //             if (user) {
    //                 navigate('/dashboard');
    //             }
    //         } catch (error) {
    //             setSubmitButtonDisabled(false);
    //             console.error('Error signing in with Google:', error);
    //         }
    //     }
    // };

    return (
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>Sign Up</h1>
                <InputController
                    label="Name"
                    placeholder="Enter your name"
                    onChange={(event) => handleInputChange('name', event.target.value)}
                />
                <span className={styles.error}>{!validation.nameValid && 'Name is required'}</span>
                <InputController
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    onChange={(event) => handleInputChange('email', event.target.value)}
                />
                <span className={styles.error}>{validation.emailError}</span>
                <InputController
                    type="password"
                    label="Password"
                    placeholder="Enter Password"
                    onChange={(event) => handleInputChange('pass', event.target.value)}
                />
                <span className={styles.error}>{validation.passwordError}</span>
                <div className={styles.footer}>
                    <p><span className={styles.error}>{errorMsg}</span></p>
                    <button onClick={handleValidation} disabled={submitButtonDisabled}>
                        Sign Up
                    </button>
                    <p>
                        Already have an account? <span><Link to="/login">Log in</Link></span>
                    </p>
                    {/* <button onClick={responseGoogle} disabled={submitButtonDisabled}>
                        Sign In with Google
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default Signup;
