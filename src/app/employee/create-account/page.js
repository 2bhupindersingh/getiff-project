"use client";
import React from "react";
import { useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import Image from "next/image";
import backArrowImg from "../../../../public/back-arrow.png";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import appleImg from "../../../../public/apple-icon.png";
import googleImg from "../../../../public/google-icon.png";
import emailImg from "../../../../public/email-icon.png";
import { RiEyeOffLine } from "react-icons/ri";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Page = () => {
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
    "Python",
    "JavaScript",
    "Java",
    "Node.js",
    "HTML/CSS",
    "React.js",
    "SQL",
    "Angular",
    "Data Science",
    "Artificial Intelligence (AI)",
    "DevOps",
    "Machine Learning",
    "Blockchain",
    "Cloud Computing (AWC, Azure, GCP)",
    "PHP",
    "Kubernetes",
    "Docker",
    "Ruby on Rails",
    "Zoho",
    "Cybersecurity",
    "UI/UX Design",
    "SAP",
    "C++",
    "Swift",
    "Typescript",
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
  return (
    <div className="container mt-5">
      {/* Display content based on step */}
      <div className="mt-4">
        {
          step === 1 && (
            // First step start here
            <>
              <div className="join-our-community register create-account mx-auto">
                <div className="join-our-community-header d-flex align-items-center justify-content-center mb-2">
                  <Link href="/register" className="ms-3 me-auto">
                    <Image
                      src={backArrowImg}
                      width={28}
                      height={28}
                      alt="Arrow pic"
                    />
                  </Link>

                  <h1 className="mb-0 me-auto">Create your account</h1>
                </div>
                <div className="join-our-community-content">
                  <p>Please enter the personal email address.</p>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Your email address"
                        className="common-textfield"
                      />
                    </Form.Group>
                  </Form>

                  <p className="text-center">or register with</p>
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <Button variant="outline-dark" className="google-btn">
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
                      onClick={nextStep}
                      disabled={step === totalSteps}
                      className="ms-2"
                    >
                      Continue
                    </Button>
                  </div>
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
                    <Image
                      src={backArrowImg}
                      width={28}
                      height={28}
                      alt="Arrow pic"
                    />
                  </Button>
                  <h1 className="mb-0 me-auto">Email Verification</h1>
                </div>
                <div className="join-our-community-content">
                  <div className="d-flex align-items-center justify-content-center email-space mb-4">
                    <Image
                      src={emailImg}
                      width={54}
                      height={54}
                      alt="email pic"
                    />
                  </div>
                  <p className="text-center  mb-2">
                    We sent a verification email to{" "}
                    <Link
                      href="mailto:nitishkaliajoh@gmail.com"
                      className="email-link"
                    >
                      nitishkaliajoh@gmail.com
                    </Link>
                    , please check your email
                  </p>

                  <div className="d-grid gap-2 email-space">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={nextStep}
                      disabled={step === totalSteps}
                    >
                      Continue
                    </Button>
                    <Button
                      variant="outline-light"
                      className="btn-resend-email"
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
                  <Image
                    src={backArrowImg}
                    width={28}
                    height={28}
                    alt="Arrow pic"
                  />
                </Button>
                <h1 className="mb-0 me-auto">Create password</h1>
              </div>
              <div className="join-our-community-content">
                <Form>
                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Create a password"
                      className="common-textfield password-textfield"
                    />

                    <span className="eye-icon">
                      <RiEyeOffLine />
                    </span>
                    <Form.Text id="passwordHelpBlock">
                      At least <strong>9 characters</strong>, containing a{" "}
                      <strong>letter</strong> and <strong>a number</strong>
                    </Form.Text>
                  </Form.Group>
                </Form>

                <div className="default-check employee-create-password-space">
                  {["checkbox"].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                      <Form.Check // prettier-ignore
                        type={type}
                        id={`default-${type}`}
                        label={`By signing up, you agree to our Terms and Conditions and Privacy Policy. ${type}`}
                      />
                    </div>
                  ))}
                </div>

                <div className="d-grid gap-2 ">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={nextStep}
                    disabled={step === totalSteps}
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
                  <Image
                    src={backArrowImg}
                    width={28}
                    height={28}
                    alt="Arrow pic"
                  />
                </Button>
                <h1 className="mb-0 me-auto">Enter your details</h1>
              </div>
              <div className="join-our-community-content">
                <Form>
                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      className="common-textfield"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput3"
                  >
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your address"
                      className="common-textfield"
                    />
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      {" "}
                      <Form.Select
                        className="common-select"
                        aria-label="Default select example"
                      >
                        <option>Country</option>
                        <option value="1">India</option>
                        <option value="2">USA</option>
                        <option value="3">Canada</option>
                      </Form.Select>
                    </Col>
                    <Col md={6}>
                      {" "}
                      <Form.Group
                        className="mb-3 position-relative"
                        controlId="exampleForm.ControlInput4"
                      >
                        <Form.Control
                          type="number"
                          placeholder="Pincode"
                          className="common-textfield"
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
                      type="number"
                      placeholder="Your Registration Number"
                      className="common-textfield"
                    />
                  </Form.Group>
                </Form>

                <div className="d-grid gap-2 employee-detail-space">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={nextStep}
                    disabled={step === totalSteps}
                  >
                    Next
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
                <Button
                  variant="link"
                  className="ms-3 me-auto p-0 border-0"
                  onClick={prevStep}
                  disabled={step === 4}
                >
                  <Image
                    src={backArrowImg}
                    width={28}
                    height={28}
                    alt="Arrow pic"
                  />
                </Button>
                <h1 className="mb-0 me-auto">Employment Verification</h1>
              </div>
              <div className="join-our-community-content">
                <Form>
                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Current Company</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Company Name"
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
                      placeholder="Job Title"
                      className="common-textfield"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label>Employment Id</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Write here"
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
                      placeholder="In lakhs per annum"
                      className="common-textfield"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label>Starting Date</Form.Label>
                    <Row>
                      <Col md={3} className="pe-0 start-date-padding">
                        {" "}
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
                      <Col md={6}>
                        {" "}
                        <Form.Select
                          className="common-select"
                          aria-label="Default select example"
                        >
                          <option>Month</option>
                          <option value="1">Jan</option>
                          <option value="2">Feb</option>
                          <option value="3">March</option>
                        </Form.Select>
                      </Col>
                      <Col md={3} className="ps-0 end-date-padding">
                        {" "}
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
                </div>
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
                  <Image
                    src={backArrowImg}
                    width={28}
                    height={28}
                    alt="Arrow pic"
                  />
                </Button>
                <h1 className="mb-0 me-auto">Company Culture Feedback</h1>
              </div>
              <div className="join-our-community-content">
                <p>
                  Share an honest review to help build a fully transparent
                  community
                </p>
                <Form>
                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Rate the culture</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Company Name"
                      className="common-textfield"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput3"
                  >
                    <Form.Label>Feedback on your experience</Form.Label>
                    <div className="tags-container d-flex align-items-center flex-wrap">
                      <div className="tag me-2 mb-2">Python +</div>
                      <div className="tag me-2 mb-2">JavaScript +</div>
                    </div>
                    <Form.Control
                      as="textarea"
                      placeholder="Write here"
                      className="common-textfield"
                      rows={3}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label>
                      If leaving the company then “Why are you leaving?”
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Write here"
                      className="common-textfield"
                    />
                  </Form.Group>
                </Form>

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
                <Button
                  variant="link"
                  className="ms-3 me-auto p-0 border-0"
                  onClick={prevStep}
                  disabled={step === 6}
                >
                  <Image
                    src={backArrowImg}
                    width={28}
                    height={28}
                    alt="Arrow pic"
                  />
                </Button>
                <h1 className="mb-0 me-auto">Industry Expertise</h1>
              </div>
              <div className="join-our-community-content industry-expertise-content">
                <h3 className="text-center mt-5">Your company working on?</h3>
                <p className="text-center mb-4">Choose three or more.</p>
                <div className="tags-container d-flex align-items-center justify-content-center flex-wrap">
                  {tags
                    .slice(0, isExpanded ? tags.length : maxVisibleTags)
                    .map((tag, index) => (
                      <div
                        key={index}
                        className={`tag me-2 mb-2 ${
                          activeTags.includes(tag) ? "tag-active" : ""
                        }`}
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag} +
                      </div>
                    ))}
                  <button
                    onClick={toggleShowMore}
                    type="button"
                    className="show-more btn btn-link"
                  >
                    {isExpanded ? "Show Less" : "Show More"}
                  </button>
                </div>
                <div className="d-grid gap-2 mt-5">
                  <Link
                    href="/employee/register-successfully"
                    className="btn btn-primary btn-lg"
                  >
                    Done
                  </Link>
                </div>
              </div>
            </div>
          )
          // Sixth step start here
        }
      </div>

      {/* Navigation buttons */}
      {/* <div className="mt-4">
        <Button variant="secondary" onClick={prevStep} disabled={step === 1}>
          Previous
        </Button>
        <Button variant="primary" onClick={nextStep} disabled={step === totalSteps} className="ms-2">
          Next
        </Button>
      </div> */}
      <ProgressBar
        className="common-progress-bar"
        now={progress}
        label={`${progress}%`}
      />
    </div>
  );
};

export default Page;
