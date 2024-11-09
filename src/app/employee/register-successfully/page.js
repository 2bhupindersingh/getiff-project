import React from "react";
import Image from "next/image";
import successImg from "../../../../public/success-icon.png";
import copyImg from "../../../../public/copy-icon.png";
import { Button } from "react-bootstrap";
import Link from "next/link";

const page = () => {
  return (
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
          <br /> [Employee Name]!
        </h6>
        <p className="text-center">
          You’re all set to start verifying employee histories, exploring
          company reviews, and managing disputes with ease. Begin by searching
          for employees or updating your company profile to get the most out of
          our platform.
        </p>
        <div className="d-grid gap-2 email-space">
          <Link href="/" className="btn btn-link btn-goto-home">
            Go back to Home
          </Link>

          <Button variant="primary" size="lg">
            Bring Others Onboard
            <Image
              src={copyImg}
              width={24}
              height={24}
              alt="copy pic"
              className="ms-2"
            />
          </Button>
        </div>
        <p className="benefits-text text-center mt-2">Know someone who would benefit from our platform? Invite them now!</p>
      </div>
    </div>
  );
};

export default page;
