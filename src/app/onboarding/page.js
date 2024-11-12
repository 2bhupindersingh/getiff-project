"use client";
import React from "react";
import { Button, ProgressBar } from "react-bootstrap";
import Image from "next/image";
import employerImg from "../../../public/employer-img.png";
import employeeImg from "../../../public/employee-img.png";
import getiffLogo from "../../../public/getiff-logo.png";
import stepNextImg from "../../../public/step-next-arrow.svg";
import Link from "next/link";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Page = () => {
  return (
    <div className="container mt-4">
        <Row>
          <Col md={4} sm={4} xs={12}>
            <div className="onboarding mx-auto">
              <ProgressBar
                className="onboarding-progress-bar"
                now={30}
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
                  Verify employee history and ensure smooth
                  onboarding/offboarding processes.
                </p>
                <div className="d-grid gap-2 onboarding-space">
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} sm={4} xs={12}>
            <div className="onboarding mx-auto">
              <ProgressBar
                className="onboarding-progress-bar"
                now={60}
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
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} sm={4} xs={12}>
            <div className="onboarding mx-auto">
              <ProgressBar
                className="onboarding-progress-bar"
                now={100}
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
          </Col>
        </Row>
    </div>
  );
};

export default Page;
