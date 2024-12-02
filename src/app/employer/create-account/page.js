'use client';
import React, { useState, useEffect } from 'react';
import { Button, ProgressBar, Alert } from 'react-bootstrap';
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
  onAuthStateChanged,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword,
} from 'firebase/auth';
import { ref, set, update, get, serverTimestamp } from 'firebase/database';
import { db } from '../../firebase/config';

const Page = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [verificationTimer, setVerificationTimer] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [detailsError, setDetailsError] = useState('');

  // Company details state
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [industry, setIndustry] = useState('');

  const totalSteps = 5;
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
      const userRef = ref(db, `employers/${user.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        // Save initial user data to database
        await set(userRef, {
          email: user.email,
          registrationStep: 2, // Start from verification step
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          isGoogleSignIn: true,
        });
      }

      // For Google Sign-in, most emails are pre-verified
      if (user.emailVerified) {
        console.log("Email is verified, moving to step 3");
        setStep(3); // Move to password creation step
        setSuccess('Email verified successfully!');
      } else {
        console.log("Email needs verification");
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
      'outlook.com': 'https://outlook.live.com',
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
        'Password must be at least 9 characters long and contain both letters and numbers'
      );
      return;
    }

    try {
      if (user) {
        // Update password in Firebase
        await updatePassword(user, password);

        // Update profile URL if provided
        if (profileUrl) {
          const userRef = ref(db, 'employers/' + user.uid);
          await update(userRef, {
            profileUrl: profileUrl,
            lastUpdated: new Date().toISOString(),
            registrationStep: step + 1,
          });
        } else {
          // Just update the registration step
          const userRef = ref(db, 'employers/' + user.uid);
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

  // Handle employer details submission
  const handleDetailsSubmit = async () => {
    // Reset error state
    setDetailsError('');

    // Validate required fields
    if (!companyName || !mobileNumber || !companySize || !industry) {
      setDetailsError('Please fill in all required fields');
      return;
    }

    // Validate phone number format
    if (!validatePhoneNumber(mobileNumber)) {
      setDetailsError('Please enter a valid phone number');
      return;
    }

    // Validate website if provided
    if (websiteUrl && !validateWebsite(websiteUrl)) {
      setDetailsError('Please enter a valid website URL');
      return;
    }

    try {
      if (user) {
        // Update employer details in database
        const userRef = ref(db, 'employers/' + user.uid);
        await set(
          userRef,
          {
            companyName,
            mobileNumber,
            companySize,
            industry,
            websiteUrl,
            lastUpdated: new Date().toISOString(),
            registrationStep: step + 1,
          },
          { merge: true }
        );

        setSuccess('Details saved successfully!');
        nextStep();
      }
    } catch (error) {
      console.error('Error saving details:', error);
      setDetailsError('Failed to save company details: ' + error.message);
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
        const userRef = ref(db, 'employers/' + user.uid);
        await update(userRef, {
          industryExpertise: activeTags,
          lastUpdated: new Date().toISOString(),
          registrationStep: step + 1,
          registrationCompleted: true,
        });

        setSuccess('Registration completed successfully!');
        // Redirect to success page
        window.location.href = '/employer/register-successfully';
      }
    } catch (error) {
      console.error('Error saving industry expertise:', error);
      setError('Failed to save industry expertise: ' + error.message);
    }
  };

  const renderEmployerDetailsForm = () => {
    return (
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>

        <Form className="space-y-4">
          <Form.Group>
            <Form.Label>Company Name *</Form.Label>
            <Form.Control
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Mobile Number *</Form.Label>
            <Form.Control
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter mobile number"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Company Size *</Form.Label>
            <Form.Select
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              required
            >
              <option value="">Select company size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="501+">501+ employees</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Industry *</Form.Label>
            <Form.Select value={industry} onChange={(e) => setIndustry(e.target.value)} required>
              <option value="">Select industry</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail">Retail</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Company Website</Form.Label>
            <Form.Control
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="Enter company website (optional)"
            />
          </Form.Group>

          {detailsError && (
            <Alert variant="danger" className="mt-3">
              {detailsError}
            </Alert>
          )}

          <div className="flex justify-between mt-4">
            <Button variant="primary" onClick={handleDetailsSubmit} className="w-full">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    );
  };

  // Function to handle company details submission
  const handleCompanyDetailsSubmit = async () => {
    // Reset any previous errors
    setDetailsError('');

    // Basic validation
    if (
      !companyName ||
      !companyAddress ||
      !country ||
      !postalCode ||
      !registrationNo ||
      !mobileNumber ||
      !companySize ||
      !industry
    ) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate mobile number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    // Validate postal code
    const postalRegex = /^[0-9]{6}$/;
    if (!postalRegex.test(postalCode)) {
      setError('Please enter a valid 6-digit postal code');
      return;
    }

    // Validate website URL if provided
    if (websiteUrl) {
      try {
        new URL(websiteUrl);
      } catch (e) {
        setError('Please enter a valid website URL');
        return;
      }
    }

    try {
      if (user) {
        // Store company details in Firebase
        const userRef = ref(db, 'employers/' + user.uid);
        await set(
          userRef,
          {
            companyName,
            companyAddress,
            country,
            postalCode,
            registrationNo,
            mobileNumber,
            websiteUrl,
            companySize,
            industry,
            lastUpdated: new Date().toISOString(),
            registrationStep: step + 1,
          },
          { merge: true }
        );

        setSuccess('Company details saved successfully!');
        nextStep();
      }
    } catch (error) {
      console.error('Error saving company details:', error);
      setError('Error saving details: ' + error.message);
    }
  };

  return (
    <div className="container mt-5 employer-container">
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
                    <p>Please enter the email address linked with your company account.</p>

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
                    {passwordError && (
                      <Form.Text className="text-danger">{passwordError}</Form.Text>
                    )}
                    <Form.Text id="passwordHelpBlock">
                      At least <strong>9 characters</strong>, containing a <strong>letter</strong>{' '}
                      and <strong>a number</strong>
                    </Form.Text>
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
                <Form>
                  <Form.Group className="mb-3 position-relative" controlId="companyName">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter company name"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 position-relative" controlId="companyAddress">
                    <Form.Label>Company Address</Form.Label>
                    <Form.Control
                      type="text"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      placeholder="Enter company address"
                      required
                    />
                  </Form.Group>
                  <Row>
                    <Col md={6} sm={6} xs={6}>
                      <Form.Select
                        className="common-select"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      >
                        <option value="">Country</option>
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                      </Form.Select>
                    </Col>
                    <Col md={6} sm={6} xs={6} className="ps-0">
                      <Form.Group className="mb-3 position-relative" controlId="postalCode">
                        <Form.Control
                          type="number"
                          placeholder="Enter postal code"
                          className="common-textfield"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3 position-relative" controlId="registrationNo">
                    <Form.Label>Registration No. / GSTN No.</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Company ID number"
                      className="common-textfield"
                      value={registrationNo}
                      onChange={(e) => setRegistrationNo(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 position-relative" controlId="mobileNumber">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="common-textfield"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 position-relative" controlId="websiteUrl">
                    <Form.Label>Website URL</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="https://writehere"
                      className="common-textfield"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 position-relative" controlId="companySize">
                    <Form.Label>Company Size</Form.Label>
                    <Form.Select
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                      required
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3 position-relative" controlId="industry">
                    <Form.Label>Industry</Form.Label>
                    <Form.Select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      required
                    >
                      <option value="">Select industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail">Retail</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Form>

                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert variant="success" className="mt-3">
                    {success}
                  </Alert>
                )}

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleCompanyDetailsSubmit}
                    disabled={step === nextStep}
                  >
                    Confirm & Continue
                  </Button>
                </div>
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
                    disabled={activeTags.length < 3}
                  >
                    Complete Registration
                  </Button>
                </div>
              </div>
            </div>
          )
          // Fifth step start here
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
