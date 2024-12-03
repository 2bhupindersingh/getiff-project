'use client';
import React, { useState, useEffect } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import Image from 'next/image';
import backArrowImg from '../../../../public/back-arrow.svg';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import appleImg from '../../../../public/apple-icon.png';
import googleImg from '../../../../public/google-icon.png';
import emailImg from '../../../../public/email-verification-icon.svg';
import { RiEyeOffLine, RiEyeLine } from 'react-icons/ri';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword,
} from 'firebase/auth';
import { ref, set, update, get, serverTimestamp } from 'firebase/database';
import { db } from '../../firebase/config';

const Page = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [user, setUser] = useState(null);
  const [verificationTimer, setVerificationTimer] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  // Employment verification states
  const [currentCompany, setCurrentCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [employmentId, setEmploymentId] = useState('');
  const [currentSalary, setCurrentSalary] = useState('');
  const [startDay, setStartDay] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');

  // Company Culture Feedback states
  const [experienceFeedback, setExperienceFeedback] = useState('');
  const [leavingReason, setLeavingReason] = useState('');

  const [step, setStep] = useState(1);
  const totalSteps = 7;

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTags, setActiveTags] = useState([]);

  const nextStep = () => {
    if (step < totalSteps) setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };

  const progress = (step / totalSteps) * 100;

  // Tags list
  const tags = [
    'Python',
    'JavaScript',
    'Java',
    'Node.js',
    'HTML/CSS',
    'React.js',
    'SQL',
    'Angular',
    'Data Science',
    'Artificial Intelligence (AI)',
    'DevOps',
    'Machine Learning',
    'Blockchain',
    'Cloud Computing (AWC, Azure, GCP)',
    'PHP',
    'Mobile Development (iOS, Android)',
    'Email Marketing',
    'Zoho',
    'Cybersecurity',
    'Data Analytics',
    'SAP',
    'C++',
    'UI/UX Design',
    'Typescript',
    'Go (Gplang)',
    'Big Data Technologies (Hadoop, Spark)',
    'R Programming',
    'Salesforce Development',
    'Swift',
    'Kubernetes',
    'Docker',
    'Ruby on Rails',
    'Agile Project Management',
    'Digital Marketing Strategy',
    'SEO',
    'SEM',
    'Google Analytics',
    'Copywriting',
    'Marketing Automation (e.g., HubSpot, Marketo)',
  ];

  // Set how many tags to show when collapsed
  const maxVisibleTags = 18;

  const toggleShowMore = () => {
    setIsExpanded(!isExpanded);
  };
  const handleTagClick = (tag) => {
    setActiveTags(
      (prevTags) =>
        prevTags.includes(tag)
          ? prevTags.filter((t) => t !== tag) // Remove tag if already active
          : [...prevTags, tag] // Add tag if not active
    );
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to check email verification status
  const checkEmailVerification = async () => {
    try {
      const auth = getAuth();
      if (auth.currentUser) {
        // Reload the user to get fresh token
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          clearInterval(verificationTimer);
          setVerificationTimer(null);
          setSuccess('Email verified successfully!');
          setStep(3); // Move to password creation after verification
        }
      }
    } catch (error) {
      console.error('Error checking email verification:', error);
    }
  };

  // Start monitoring email verification when user is set
  useEffect(() => {
    if (user && !user.emailVerified && step === 2) {
      // Check every 3 seconds
      const timer = setInterval(checkEmailVerification, 3000);
      setVerificationTimer(timer);

      // Cleanup on unmount or when user changes
      return () => {
        if (timer) clearInterval(timer);
      };
    }
  }, [user, step]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Create user with email and a placeholder password
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        'defaultPassword'
      );
      const user = userCredential.user;
      setUser(user); // Save user to state

      // Send verification email
      await sendEmailVerification(user);
      setSuccess('Verification email sent. Please check your inbox.');
      alert('Verification email sent. Please check your inbox.');

      // Save initial user data to database
      const userRef = ref(db, `employees/${user.uid}`);
      await set(userRef, {
        email: email,
        registrationStep: 2,
        createdAt: serverTimestamp(),
        userType: 'employee',
      });

      // Move to verification step
      nextStep();

      // Start verification check
      if (!user.emailVerified) {
        const timer = setInterval(checkEmailVerification, 3000);
        setVerificationTimer(timer);
      }
    } catch (error) {
      // Handle Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        setError('The email address is already in use. Please try another email.');
      } else if (error.code === 'auth/invalid-email') {
        setError('The email address is invalid. Please check your email format.');
      } else if (error.code === 'auth/weak-password') {
        setError('The password is too weak. Please choose a stronger password.');
      } else {
        setError('An error occurred: ' + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(getAuth(), provider);
      const user = result.user;

      // Save user data to state
      setUser(user);
      setEmail(user.email);

      // Check if user exists in database
      const userRef = ref(db, `employees/${user.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        // Save initial user data to database
        await set(userRef, {
          email: user.email,
          registrationStep: 2,
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          isGoogleSignIn: true,
          userType: 'employee', // Explicitly mark as employee
        });
      }

      // For Google Sign-in, most emails are pre-verified
      if (user.emailVerified) {
        console.log('Email is verified, moving to step 3');
        setStep(3); // Move to password creation step
        setSuccess('Email verified successfully!');
      } else {
        console.log('Email needs verification');
        // Send verification email
        await sendEmailVerification(user);
        setSuccess('Verification email sent. Please check your inbox.');
        alert('Verification email sent. Please check your inbox.');

        // Start verification check
        const timer = setInterval(checkEmailVerification, 3000);
        setVerificationTimer(timer);
        setStep(2); // Stay on verification step
      }
    } catch (error) {
      console.error('Google Sign In Error:', error);
      setError('An error occurred during Google sign-in: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to resend verification email
  const handleResendVerification = async () => {
    try {
      if (user) {
        await sendEmailVerification(user);
        setSuccess('Verification email resent. Please check your inbox.');
        alert('Verification email resent. Please check your inbox.');
      }
    } catch (error) {
      console.error('Error resending verification:', error);
      setError('Error resending verification email: ' + error.message);
    }
  };

  // Function to get webmail URL based on email domain
  const getWebmailUrl = (email) => {
    const domain = email.split('@')[1].toLowerCase();

    const emailProviders = {
      'gmail.com': 'https://mail.google.com',
      'yahoo.com': 'https://mail.yahoo.com',
      // 'outlook.com': 'https://outlook.live.com',
      'hotmail.com': 'https://outlook.live.com',
      'live.com': 'https://outlook.live.com',
      'aol.com': 'https://mail.aol.com',
    };

    return emailProviders[domain] || `https://${domain}`;
  };

  // Function to open email client
  const handleOpenEmail = () => {
    const emailAddress = user ? user.email : email;

    // First try to open default mail client
    window.location.href = `mailto:${emailAddress}`;

    // After a short delay, also open webmail in new tab
    setTimeout(() => {
      const webmailUrl = getWebmailUrl(emailAddress);
      window.open(webmailUrl, '_blank');
    }, 500);
  };

  // Password validation function
  const validatePassword = (password) => {
    const minLength = 9;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return password.length >= minLength && hasLetter && hasNumber;
  };

  // Handle password submission
  const handlePasswordSubmit = async () => {
    if (!validatePassword(password)) {
      setPasswordError(
        // 'Password must be at least 9 characters long and contain both letters and numbers'
        <>Password must be at least 9 characters long and contain both letters and numbers</>
      );
      return;
    }

    try {
      if (user) {
        // Update password in Firebase
        await updatePassword(user, password);

        // Update profile URL if provided
        if (profileUrl) {
          const userRef = ref(db, 'employees/' + user.uid);
          await update(userRef, {
            profileUrl: profileUrl,
            lastUpdated: new Date().toISOString(),
            registrationStep: step + 1,
            userType: 'employee', // Maintain consistency
          });
        } else {
          // Just update the registration step
          const userRef = ref(db, 'employees/' + user.uid);
          await update(userRef, {
            lastUpdated: new Date().toISOString(),
            registrationStep: step + 1,
          });
        }

        setSuccess('Password set successfully!');
        nextStep();
      }
    } catch (error) {
      console.error('Error setting password:', error);
      setPasswordError(error.message);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validate phone number format
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  // Validate website URL format
  const validateWebsite = (website) => {
    if (!website) return true; // Website is optional
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlRegex.test(website);
  };

  // Handle employee details submission
  const handleDetailsSubmit = async (e) => {
    if (e) e.preventDefault();

    console.log('Form Values:', {
      firstName,
      address,
      phoneNumber,
      postalCode,
      country,
    });

    if (!firstName || !address || !phoneNumber || !postalCode || !country) {
      const error = 'Please fill in all required fields';
      console.log('Validation Error:', error);
      setError(error);
      return;
    }

    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      const error = 'Please enter a valid 10-digit phone number';
      console.log('Phone Validation Error:', error);
      setError(error);
      return;
    }

    // Validate postal code (6 digits)
    const postalRegex = /^[0-9]{6}$/;
    if (!postalRegex.test(postalCode)) {
      const error = 'Please enter a valid 6-digit postal code';
      console.log('Postal Code Validation Error:', error);
      setError(error);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Attempting to save data...');
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('No authenticated user found');
      }

      console.log('Current User:', user.uid);
      const userRef = ref(db, `employees/${user.uid}`);

      const userData = {
        firstName,
        address,
        phoneNumber,
        postalCode,
        country,
        registrationStep: 4,
        lastUpdated: serverTimestamp(),
      };

      console.log('Saving user data:', userData);
      await update(userRef, userData);

      console.log('Data saved successfully');
      setSuccess('Personal details saved successfully!');
      nextStep();
    } catch (error) {
      console.error('Error in handleDetailsSubmit:', error);
      setError('Error saving personal details: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle industry expertise submission
  const handleIndustryExpertiseSubmit = async () => {
    if (activeTags.length < 1) {
      setError('Please select at least One areas of expertise');
      return;
    }

    try {
      if (user) {
        const userRef = ref(db, 'employees/' + user.uid);
        await update(userRef, {
          industryExpertise: activeTags,
          lastUpdated: new Date().toISOString(),
          registrationStep: step + 1,
          registrationCompleted: true,
        });

        setSuccess('Registration completed successfully!');
        // Redirect to success page
        window.location.href = '/employee/register-successfully';
      }
    } catch (error) {
      console.error('Error saving industry expertise:', error);
      setError('Failed to save industry expertise: ' + error.message);
    }
  };

  const handleEmploymentVerificationSubmit = async (e) => {
    if (e) e.preventDefault();

    console.log('Employment Form Values:', {
      currentCompany,
      jobTitle,
      employmentId,
      currentSalary,
      startDay,
      startMonth,
      startYear,
    });

    if (!currentCompany || !jobTitle || !currentSalary || !startDay || !startMonth || !startYear) {
      const error = 'Please fill in all required fields';
      console.log('Validation Error:', error);
      setError(error);
      return;
    }

    // Validate day (1-31)
    if (startDay < 1 || startDay > 31) {
      const error = 'Please enter a valid day (1-31)';
      console.log('Day Validation Error:', error);
      setError(error);
      return;
    }

    // Validate year (1950-current year)
    const currentYear = new Date().getFullYear();
    if (startYear < 1950 || startYear > currentYear) {
      const error = `Please enter a valid year (1950-${currentYear})`;
      console.log('Year Validation Error:', error);
      setError(error);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Attempting to save employment data...');
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('No authenticated user found');
      }

      console.log('Current User:', user.uid);
      const userRef = ref(db, `employees/${user.uid}`);

      const employmentData = {
        currentCompany,
        jobTitle,
        employmentId: employmentId || null, // Optional field
        currentSalary,
        startDate: `${startYear}-${startMonth}-${startDay}`,
        registrationStep: 5,
        lastUpdated: serverTimestamp(),
      };

      console.log('Saving employment data:', employmentData);
      await update(userRef, employmentData);

      console.log('Employment data saved successfully');
      setSuccess('Employment details saved successfully!');
      nextStep();
    } catch (error) {
      console.error('Error in handleEmploymentVerificationSubmit:', error);
      setError('Error saving employment details: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompanyCultureSubmit = async (e) => {
    if (e) e.preventDefault();

    console.log('Company Culture Form Values:', {
      experienceFeedback,
      leavingReason,
    });

    if (!experienceFeedback) {
      const error = 'Please provide feedback about your experience';
      console.log('Validation Error:', error);
      setError(error);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Attempting to save company culture feedback...');
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('No authenticated user found');
      }

      console.log('Current User:', user.uid);
      const userRef = ref(db, `employees/${user.uid}`);

      const cultureFeedbackData = {
        companyCultureFeedback: {
          experienceFeedback,
          leavingReason: leavingReason || null,
        },
        registrationStep: 6,
        lastUpdated: serverTimestamp(),
      };

      console.log('Saving culture feedback:', cultureFeedbackData);
      await update(userRef, cultureFeedbackData);

      console.log('Culture feedback saved successfully');
      setSuccess('Company culture feedback saved successfully!');
      nextStep();
    } catch (error) {
      console.error('Error in handleCompanyCultureSubmit:', error);
      setError('Error saving company culture feedback: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="container mt-5 employer-container employee-register-steps">
      {/* Display content based on step */}
      <>
        {
          step === 1 && (
            // First step start here
            <>
              <div className="join-our-community register create-account mx-auto">
                <div className="join-our-community-header d-flex align-items-center justify-content-center mb-2">
                  <Link href="/register" className="ms-3 me-auto">
                    <Image src={backArrowImg} width={28} height={28} alt="Arrow pic" />
                  </Link>

                  <h1 className="mb-0 me-auto">Create your account</h1>
                </div>
                <div className="join-our-community-content">
                  <Form onSubmit={handleSubmit}>
                    <p>Please enter the personal email address.</p>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Your email address"
                        className="common-textfield"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    {error && <p className="text-danger">{error}</p>}
                    <p className="text-center">or register with</p>
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <Button
                        variant="outline-dark"
                        className="google-btn"
                        onClick={handleGoogleSignIn}
                      >
                        <Image
                          src={googleImg}
                          width={17}
                          height={17}
                          alt="google pic"
                          className="me-2"
                        />
                        Google
                      </Button>
                      <Button variant="outline-dark" className="google-btn">
                        <Image
                          src={appleImg}
                          width={17}
                          height={17}
                          alt="apple pic"
                          className="me-2"
                        />
                        Apple
                      </Button>
                    </div>
                    <div className="d-grid gap-2 hashtag-heading-space">
                      <Button
                        variant="primary"
                        size="lg"
                        // onClick={nextStep}
                        // disabled={step === totalSteps}
                        type="submit"
                        disabled={isSubmitting}
                        className="ms-2"
                      >
                        Continue
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </>
          )
          // First step end here
        }
        {
          step === 2 && (
            // Second step start here
            <>
              <div className="join-our-community register create-account mx-auto">
                <div className="join-our-community-header d-flex align-items-center justify-content-center mb-2">
                  <Button
                    variant="link"
                    className="ms-3 me-auto p-0 border-0"
                    onClick={prevStep}
                    disabled={step === 1}
                  >
                    <Image src={backArrowImg} width={28} height={28} alt="Arrow pic" />
                  </Button>
                  <h1 className="mb-0 me-auto">Email Verification</h1>
                </div>
                <div className="join-our-community-content">
                  <div className="d-flex align-items-center justify-content-center email-space mb-4">
                    <Image src={emailImg} width={54} height={54} alt="email pic" />
                  </div>
                  <p className="text-center  mb-2">
                    We sent a verification email to{' '}
                    <Link href={`mailto:${user ? user.email : email}`} className="email-link">
                      {user ? user.email : email}
                    </Link>
                    , please check your email
                  </p>

                  <div className="d-grid gap-2 email-space">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleOpenEmail}
                      disabled={step === totalSteps}
                    >
                      Open email to approve
                    </Button>
                    <Button
                      variant="outline-light"
                      className="btn-resend-email"
                      onClick={handleResendVerification}
                    >
                      Resend Verification Email
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )
          // Second step end here
        }
        {
          step === 3 && (
            // Third step start here
            <div className="join-our-community register create-account mx-auto">
              <div className="join-our-community-header d-flex align-items-center justify-content-center mb-2">
                <Button
                  variant="link"
                  className="ms-3 me-auto p-0 border-0"
                  onClick={prevStep}
                  disabled={step === 2}
                >
                  <Image src={backArrowImg} width={28} height={28} alt="Arrow pic" />
                </Button>
                <h1 className="mb-0 me-auto">Create password</h1>
              </div>
              <div className="join-our-community-content">
                <Form>
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      className="common-textfield password-textfield"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError('');
                      }}
                      required
                    />
                    <span className="eye-icon" onClick={togglePasswordVisibility}>
                      {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                    </span>
                    {passwordError ? (
                      <Form.Text className="text-danger">
                        At least <strong>9 characters</strong>, containing a <strong>letter</strong>{' '}
                        and <strong>a number</strong>
                      </Form.Text>
                    ) : (
                      <Form.Text className="text-normal">
                        At least <strong>9 characters</strong>, containing a <strong>letter</strong>{' '}
                        and <strong>a number</strong>
                      </Form.Text>
                    )}
                    {/* {passwordError && (
                       <Form.Text className="text-danger">{passwordError}</Form.Text>
                        <Form.Text id="passwordHelpBlock">
                      At least <strong>9 characters</strong>, containing a <strong>letter</strong>{' '}
                      and <strong>a number</strong>
                    </Form.Text>
                    )} */}
                    {/* <Form.Text id="passwordHelpBlock">
                      At least <strong>9 characters</strong>, containing a <strong>letter</strong>{' '}
                      and <strong>a number</strong>
                    </Form.Text> */}
                  </Form.Group>

                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Choose Your Profile URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="write here"
                      className="common-textfield web-url-textfield"
                      value={profileUrl}
                      onChange={(e) => setProfileUrl(e.target.value)}
                    />
                    <span className="web-url">www.getiff.com/</span>
                  </Form.Group>
                </Form>

                <div className="default-check create-password-space">
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                      <Form.Check
                        type={type}
                        id={`default-${type}`}
                        label={
                          <span>
                            By signing up, you agree to our{' '}
                            <Link href="/terms" rel="noopener noreferrer" className="terms-link">
                              Terms and Conditions
                            </Link>{' '}
                            and{' '}
                            <Link href="/terms" rel="noopener noreferrer" className="terms-link">
                              Privacy Policy
                            </Link>
                            .
                          </span>
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handlePasswordSubmit}
                    disabled={!password}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          )
          // Third step end here
        }
        {
          step === 4 && (
            // Fourth step start here
            <div className="join-our-community register create-account mx-auto">
              <div className="join-our-community-header d-flex align-items-center justify-content-center mb-2">
                <Button
                  variant="link"
                  className="ms-3 me-auto p-0 border-0"
                  onClick={prevStep}
                  disabled={step === 3}
                >
                  <Image src={backArrowImg} width={28} height={28} alt="Arrow pic" />
                </Button>
                <h1 className="mb-0 me-auto">Enter your details</h1>
              </div>
              <div className="join-our-community-content">
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleDetailsSubmit(e);
                  }}
                >
                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your name, please?"
                      className="common-textfield"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput3"
                  >
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address Line"
                      className="common-textfield"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Row>
                    <Col md={6} sm={6} xs={6}>
                      {' '}
                      <Form.Group className="mb-3">
                        <Form.Label>Country *</Form.Label>
                        <Form.Select
                          className="common-select"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          required
                        >
                          <option value="">Select Country</option>
                          <option value="India">India</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="Japan">Japan</option>
                          <option value="China">China</option>
                          <option value="Singapore">Singapore</option>
                          {/* Add more countries as needed */}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6} sm={6} xs={6} className="ps-0">
                      {' '}
                      <Form.Group className="mb-3">
                        <Form.Label>Postal Code *</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter 6-digit postal code"
                          className="common-textfield"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          maxLength={6}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      placeholder="Enter your mobile number"
                      type="tel"
                      className="common-textfield"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <div className="d-grid gap-2 employee-detail-space">
                    <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Saving...' : 'Next'}
                    </Button>
                  </div>

                  {error && <div className="text-danger mt-3">{error}</div>}

                  {success && <div className="text-success mt-3">{success}</div>}
                  {/* <div className="d-grid gap-2 employee-detail-space">
                    <Button
                      variant="primary"
                      size="lg"
                      // onClick={nextStep}
                      onClick={handleDetailsSubmit}
                      // disabled={step === totalSteps}
                    >
                      Next
                    </Button>
                  </div> */}
                </Form>
              </div>
            </div>
          )
          // Fourth step end here
        }
        {
          step === 5 && (
            // Fifth step start here
            <div className="join-our-community register create-account mx-auto">
              <div className="join-our-community-header d-flex align-items-center justify-content-center mb-2">
                <Button
                  variant="link"
                  className="ms-3 me-auto p-0 border-0"
                  onClick={prevStep}
                  disabled={step === 4}
                >
                  <Image src={backArrowImg} width={28} height={28} alt="Arrow pic" />
                </Button>
                <h1 className="mb-0 me-auto">Employment Verification</h1>
              </div>
              <div className="join-our-community-content">
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEmploymentVerificationSubmit(e);
                  }}
                >
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Current Company *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Where are you currently working?"
                      className="common-textfield"
                      value={currentCompany}
                      onChange={(e) => setCurrentCompany(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Job Title *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your position (e.g., Project Manager)"
                      className="common-textfield"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Employment Id (optional)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your ID number"
                      className="common-textfield"
                      value={employmentId}
                      onChange={(e) => setEmploymentId(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Your current salary *</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter your annual package (lpa)"
                      className="common-textfield"
                      value={currentSalary}
                      onChange={(e) => setCurrentSalary(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Starting Date *</Form.Label>
                    <Row>
                      <Col md={3} sm={3} xs={3} className="pe-0 start-date-padding">
                        <Form.Control
                          type="number"
                          placeholder="Day"
                          className="common-textfield"
                          value={startDay}
                          onChange={(e) => setStartDay(e.target.value)}
                          min="1"
                          max="31"
                          required
                        />
                      </Col>
                      <Col md={6} sm={6} xs={6}>
                        <Form.Select
                          className="common-select"
                          value={startMonth}
                          onChange={(e) => setStartMonth(e.target.value)}
                          required
                        >
                          <option value="">Month</option>
                          <option value="01">January</option>
                          <option value="02">February</option>
                          <option value="03">March</option>
                          <option value="04">April</option>
                          <option value="05">May</option>
                          <option value="06">June</option>
                          <option value="07">July</option>
                          <option value="08">August</option>
                          <option value="09">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </Form.Select>
                      </Col>
                      <Col md={3} sm={3} xs={3} className="ps-0 end-date-padding">
                        <Form.Control
                          type="number"
                          placeholder="Year"
                          className="common-textfield"
                          value={startYear}
                          onChange={(e) => setStartYear(e.target.value)}
                          min="1950"
                          max={new Date().getFullYear()}
                          required
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  {error && <div className="text-danger mt-3">{error}</div>}
                  {success && <div className="text-success mt-3">{success}</div>}

                  <div className="d-grid gap-2 mt-5">
                    <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Saving...' : 'Next'}
                    </Button>
                  </div>
                </Form>
                {/* <Form>
                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Current Company</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Where are you currently working?"
                      className="common-textfield"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput3"
                  >
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your position (e.g., Project Manager)"
                      className="common-textfield"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label>Employment Id (optional)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Your ID number"
                      className="common-textfield"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label>Your current salary</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter your annual package (lpa)"
                      className="common-textfield"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label>Starting Date</Form.Label>
                    <Row>
                      <Col md={3} sm={3} xs={3} className="pe-0 start-date-padding">
                        {' '}
                        <Form.Group
                          className="mb-3 position-relative"
                          controlId="exampleForm.ControlInput4"
                        >
                          <Form.Control
                            type="text"
                            placeholder="Day"
                            className="common-textfield"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} sm={6} xs={6}>
                        {' '}
                        <Form.Select className="common-select" aria-label="Default select example">
                          <option>Month</option>
                          <option value="1">Jan</option>
                          <option value="2">Feb</option>
                          <option value="3">March</option>
                        </Form.Select>
                      </Col>
                      <Col md={3} sm={3} xs={3} className="ps-0 end-date-padding">
                        {' '}
                        <Form.Group
                          className="mb-3 position-relative"
                          controlId="exampleForm.ControlInput4"
                        >
                          <Form.Control
                            type="number"
                            placeholder="Year"
                            className="common-textfield"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>

                <div className="d-grid gap-2 mt-5">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={nextStep}
                    disabled={step === totalSteps}
                  >
                    Next
                  </Button>
                </div> */}
              </div>
            </div>
          )
          // Fifth step end here
        }
        {
          step === 6 && (
            // Sixth step start here
            <div className="join-our-community register create-account mx-auto">
              <div className="join-our-community-header d-flex align-items-center justify-content-center mb-2">
                <Button
                  variant="link"
                  className="ms-3 me-auto p-0 border-0"
                  onClick={prevStep}
                  disabled={step === 5}
                >
                  <Image src={backArrowImg} width={28} height={28} alt="Arrow pic" />
                </Button>
                <h1 className="mb-0 me-auto">Company Culture Feedback</h1>
              </div>
              <div className="join-our-community-content">
                <p>Share an honest review to help build a fully transparent community</p>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCompanyCultureSubmit(e);
                  }}
                >
                  <Form.Group className="mb-4">
                    <Form.Label>Feedback on your experience *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Please share your experience working with the company..."
                      className="common-textfield"
                      value={experienceFeedback}
                      onChange={(e) => setExperienceFeedback(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Why are you leaving?</Form.Label>
                    <Form.Control
                      type="text"
                      className="common-textfield"
                      placeholder="If you're leaving the company, please share your reasons..."
                      value={leavingReason}
                      onChange={(e) => setLeavingReason(e.target.value)}
                    />
                  </Form.Group>

                  {error && <div className="text-danger mt-3">{error}</div>}
                  {success && <div className="text-success mt-3">{success}</div>}

                  <div className="d-grid gap-2 mt-5">
                    <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Saving...' : 'Next'}
                    </Button>
                  </div>
                </Form>
                {/* <Form>
                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput3"
                  >
                    <Form.Label>Feedback on your experience</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder={`e.g "Working at TechVista has been a rewarding experience. The company values innovation, and I feel my work here truly makes an impact. It’s a fantastic place for driven individuals who thrive in dynamic, fast-paced environments."`}
                      className="common-textfield"
                      rows={3}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label>If leaving the company then “Why are you leaving?”</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Write here"
                      className="common-textfield"
                    />
                  </Form.Group>
                  <div className="d-grid gap-2 mt-5">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={nextStep}
                      disabled={step === totalSteps}
                    >
                      Confirm & Continue
                    </Button>
                  </div>
                </Form> */}
              </div>
            </div>
          )
          // Sixth step end here
        }
        {
          step === 7 && (
            // Sixth step start here
            <div className="join-our-community register create-account mx-auto">
              <div className="join-our-community-header d-flex align-items-center justify-content-center mb-2">
                <Button variant="link" className="ms-3 me-auto p-0 border-0" onClick={prevStep}>
                  <Image src={backArrowImg} width={28} height={28} alt="Arrow pic" />
                </Button>
                <h1 className="mb-0 me-auto">Industry Expertise</h1>
              </div>
              <div className="join-our-community-content industry-expertise-content">
                <h3 className="text-center mt-5">Your company working on?</h3>
                <p className="text-center mb-4">Choose three or more.</p>
                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}
                <div className="tags-container d-flex align-items-center justify-content-center flex-wrap">
                  {tags.slice(0, isExpanded ? tags.length : maxVisibleTags).map((tag, index) => (
                    <div
                      key={index}
                      className={`tag me-2 mb-2 ${activeTags.includes(tag) ? 'tag-active' : ''}`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag} {activeTags.includes(tag) ? '-' : '+'}
                    </div>
                  ))}
                  <button onClick={toggleShowMore} type="button" className="show-more btn btn-link">
                    {isExpanded ? 'Show Less' : 'Show More'}
                  </button>
                </div>
                <div className="d-grid gap-2 mt-5">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleIndustryExpertiseSubmit}
                    disabled={activeTags.length < 1}
                  >
                    Complete Registration
                  </Button>
                </div>
              </div>
            </div>
          )
          // Sixth step start here
        }
      </>

      {/* Navigation buttons */}
      {/* <div className="mt-4">
        <Button variant="secondary" onClick={prevStep} disabled={step === 1}>
          Previous
        </Button>
        <Button variant="primary" onClick={nextStep} disabled={step === totalSteps} className="ms-2">
          Next
        </Button>
      </div> */}
      <ProgressBar className="common-progress-bar" now={progress} label={`${progress}%`} />
    </div>
  );
};

export default Page;
