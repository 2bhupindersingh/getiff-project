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

const page = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const nextStep = () => {
    if (step < totalSteps) setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };

  const progress = (step / totalSteps) * 100;
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
                  <p>
                    Please enter the email address linked with your company
                    account.
                  </p>
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
                    You must use Getiff in line with our{" "}
                    <strong>Acceptable Use Policy</strong>. You cannot use a
                    personal account for business purposes.
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
                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Choose Your Profile URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="write here"
                      className="common-textfield web-url-textfield"
                    />
                    <span className="web-url">www.getiff.com/</span>
                  </Form.Group>
                </Form>

                <div className="default-check create-password-space">
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
                    <Form.Label>Company Name</Form.Label>
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
                    <Form.Label>Company Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your company address"
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
                    <Form.Label>Registration Number</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Your Registration Number"
                      className="common-textfield"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Your Mobile Number"
                      className="common-textfield"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label>Website URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Write here"
                      className="common-textfield"
                    />
                  </Form.Group>
                </Form>

                <div className="d-grid gap-2 ">
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
                <h1 className="mb-0 me-auto">Industry Expertise</h1>
              </div>
              <div className="join-our-community-content industry-expertise-content">
                <h3 className="text-center mt-5">Your company working on?</h3>
                <p className="text-center mb-4">Choose three or more.</p>
                <div className="tags-container d-flex align-items-center justify-content-center flex-wrap">
                  <div className="tag me-2 mb-2">Python +</div>
                  <div className="tag me-2 mb-2">JavaScript +</div>
                  <div className="tag me-2 mb-2">Java +</div>
                  <div className="tag me-2 mb-2">Node.js +</div>
                  <div className="tag me-2 mb-2">HTML/CSS +</div>
                  <div className="tag me-2 mb-2">React.js +</div>
                  <div className="tag me-2 mb-2">SQL +</div>
                  <div className="tag me-2 mb-2">Angular +</div>
                  <div className="tag me-2 mb-2">Data Science +</div>
                  <div className="tag tag-active me-2 mb-2">
                    Artificial Intelligence (AI)
                  </div>
                  <div className="tag me-2 mb-2">DevOps +</div>
                  <div className="tag me-2 mb-2">Machine Learning +</div>
                  <div className="tag me-2 mb-2">Blockchain +</div>
                  <div className="tag me-2 mb-2">
                    Cloud Computing (AWC, Azure, GCP) +
                  </div>
                  <div className="tag me-2 mb-2">PHP +</div>
                  <div className="tag me-2 mb-2">Kubernetes +</div>
                  <div className="tag me-2 mb-2">Docker +</div>
                  <div className="tag me-2 mb-2">Ruby on Rails +</div>
                  <div className="tag me-2 mb-2">Zoho +</div>
                  <div className="tag me-2 mb-2">Cybersecurity +</div>
                  <div className="tag me-2 mb-2">UI/UX Design +</div>
                  <div className="tag me-2 mb-2">SAP +</div>
                  <div className="tag me-2 mb-2">C++ +</div>
                  <div className="tag me-2 mb-2">Swift +</div>
                  <div className="tag me-2 mb-2">Typescript +</div>
                  <Button variant="link" className="show-more">
                    show more...
                  </Button>
                </div>
                <div className="d-grid gap-2 mt-5">
                  <Link
                    href="/employer/register-successfully"
                    className="btn btn-primary btn-lg"
                  >
                    Done
                  </Link>
                </div>
              </div>
            </div>
          )
          // Fifth step start here
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

export default page;
