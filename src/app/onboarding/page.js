"use client";
import React from "react";
import { useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import Image from "next/image";
import employerImg from "../../../public/employer-img.png";
import employeeImg from "../../../public/employee-img.png";
import getiffLogo from "../../../public/getiff-logo.png";
import stepNextImg from "../../../public/step-next-arrow.svg";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import { RiEyeOffLine } from "react-icons/ri";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const page = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

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
        {step === 1 && (
          <div className="onboarding mx-auto">
            <ProgressBar
              className="onboarding-progress-bar"
              now={progress}
              label={`${progress}%`}
            />
            <div className="onboarding-header mt-5">
              <h1 className="mb-0 me-auto text-center">For Employers</h1>
            </div>
            <div className="onboarding-content text-center">
            <div className="onbloarding-img-container">
              <Image
                src={employerImg}
                width={245}
                height={240}
                alt="employer pic"
              />
              </div>
              <h5>Hire with Confidence</h5>
              <p>
                Verify employee history and ensure smooth onboarding/offboarding
                processes.
              </p>
              <div className="d-grid gap-2 onboarding-space">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={nextStep}
                  disabled={step === totalSteps}
                  className="btn-onboarding-step d-flex align-items-center justify-content-center"
                >
                  Next
                  <Image
                    src={stepNextImg}
                    width={13}
                    height={13}
                    alt="next arrow pic"
                    className="ms-2"
                  />
                </Button>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="onboarding mx-auto">
            <ProgressBar
              className="onboarding-progress-bar"
              now={progress}
              label={`${progress}%`}
            />
            <div className="onboarding-header mt-5">
              <h1 className="mb-0 me-auto text-center">For Employees</h1>
            </div>
            <div className="onboarding-content text-center">
            <div className="onbloarding-img-container">
              <Image
                src={employeeImg}
                width={245}
                height={240}
                alt="employer pic"
              />
              </div>
              <h5>Know Before You Go</h5>
              <p>
                Explore company culture, raise disputes, and manage your work
                history.
              </p>
              <div className="d-grid gap-2 onboarding-space">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={nextStep}
                  disabled={step === totalSteps}
                  className="btn-onboarding-step d-flex align-items-center justify-content-center"
                >
                  Next
                  <Image
                    src={stepNextImg}
                    width={13}
                    height={13}
                    alt="next arrow pic"
                    className="ms-2"
                  />
                </Button>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="onboarding mx-auto">
            <ProgressBar
              className="onboarding-progress-bar"
              now={progress}
              label={`${progress}%`}
            />
            <div className="onboarding-header mt-5">
              <h1 className="mb-0 me-auto text-center">Welcome to Getiff</h1>
            </div>
            <div className="onboarding-content text-center">
              <div className="onbloarding-img-container">
              <Image
                src={getiffLogo}
                width={200}
                height={86}
                alt="employer pic"
              />
              </div>
              <h5>Get Transparency, Get Success</h5>
              <p>
                Bringing transparency to employee histories and companies
                cultures effortlessly.
              </p>
              <div className="d-grid gap-2 onboarding-space">
                <Link
                href="/register"
                  className="btn btn-primary btn-onboarding-step d-flex align-items-center justify-content-center"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      {/* <div className="mt-4">
        <Button variant="secondary" onClick={prevStep} disabled={step === 1}>
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={nextStep}
          disabled={step === totalSteps}
          className="ms-2"
        >
          Next
        </Button>
      </div> */}
    </div>
  );
};

export default page;
