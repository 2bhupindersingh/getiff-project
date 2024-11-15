"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import successImg from "../../../../public/success-icon.png";
import copyImg from "../../../../public/fluent_copy-24-regular.svg";
import copyImgFilled from "../../../../public/fluent_copy-24-filled.svg";
import { Button } from "react-bootstrap";
import Link from "next/link";
import Alert from 'react-bootstrap/Alert';

const Page = () => {
  const [copySuccess, setCopySuccess] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [isActive, setIsActive] = useState(false);
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsActive(true); // Set the active class
      setCopySuccess("Website link has been copied to your clipboard");
      if (typeof window !== "undefined") {
        setCurrentUrl(window.location.href);
      }
      // Clear the message after 3 seconds
      setTimeout(() => setCopySuccess(""), 3000);
      setTimeout(() => setIsActive(false), 3000);
    } catch (err) {
      setCopySuccess("Failed to copy!");
      console.error("Failed to copy text: ", err);

      // Clear the error message after 3 seconds
      setTimeout(() => setCopySuccess(""), 3000);
    }
  };
  return (
    <div className="container">
      <div className="join-our-community register register-successfully mx-auto">
        <h2 className="pt-4">Registration Successful!</h2>
        <div className="join-our-community-content">
          <div className="d-flex justify-content-center mb-4">
            <Image
              src={successImg}
              width={54}
              height={54}
              alt="success pic"
              className="me-3"
            />
          </div>
          <h6 className="mb-1 text-center">
            Welcome to Getiff,
            <br /> [Employer&rsquo;s Name]!
          </h6>
          <p className="text-center">
            You&rsquo;re all set to start verifying employee histories,
            exploring company reviews, and managing disputes with ease. Begin by
            searching for employees or updating your company profile to get the
            most out of our platform.
          </p>
          <div className="d-grid gap-2 email-space">
            <Link href="/" className="btn btn-link btn-goto-home">
              Go back to Home
            </Link>

            <Button
              onClick={() => copyToClipboard('https://getiff-project.netlify.app/onboarding')}
              className={isActive ? "btn btn-primary btn-clipboard active" : "btn btn-primary btn-clipboard"}
            >
              Bring Others Onboard
              <Image
                src={copyImg}
                width={24}
                height={24}
                alt="copy pic"
                className="ms-2 copy-image-regular"
              />
              <Image
                src={copyImgFilled}
                width={24}
                height={24}
                alt="copy pic"
                className="ms-2 copy-image-filled"
              />
            </Button>
            {
              copySuccess &&
              <Alert variant="success">
                {copySuccess}
              </Alert>
            }
          </div>
          <p className="benefits-text text-center mt-2">
            Know someone who would benefit from our platform? Invite them now!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
