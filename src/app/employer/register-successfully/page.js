"use client";
import React, { useState, useEffect } from "react";
import { getAuth } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { db } from '../../firebase/config';
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
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        console.log("Current user:", user); // Debug log

        if (user) {
          const userRef = ref(db, `employers/${user.uid}`);
          console.log("Fetching data for uid:", user.uid); // Debug log
          
          const snapshot = await get(userRef);
          console.log("Database snapshot:", snapshot.val()); // Debug log
          
          if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log("Company name from DB:", userData.companyName); // Debug log
            setCompanyName(userData.companyName || 'Employer');
          } else {
            console.log("No data found for this user"); // Debug log
            setCompanyName('Employer');
          }
        } else {
          console.log("No authenticated user found"); // Debug log
          setCompanyName('Employer');
        }
      } catch (error) {
        console.error("Error fetching company name:", error);
        setCompanyName('Employer');
      }
    };

    // Add a small delay to ensure Firebase is initialized
    setTimeout(() => {
      fetchCompanyName();
    }, 1000);
  }, []);

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
            <br /> {companyName}
          </h6>
          <p className="text-center">
            You’re all set to start verifying employee histories,
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
