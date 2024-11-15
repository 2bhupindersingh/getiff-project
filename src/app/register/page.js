import React from "react";
import Image from "next/image";
import employeeImg from "../../../public/employee-icon.svg";
import employerImg from "../../../public/employer-icon.svg";
import backArrowImg from "../../../public/back-arrow.svg";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container">
    <div className="join-our-community register common-register mx-auto">
      <div className="join-our-community-header d-flex align-items-center justify-content-center mb-2">
        <Link href="/" className="ms-3 me-auto">
          <Image src={backArrowImg} width={28} height={28} alt="Arrow pic" />
        </Link>

        <h1 className="mb-0 me-auto">Register</h1>
      </div>
      <div className="join-our-community-content">
        <h6 className="mb-1">
          Which type of account would you like to create?
        </h6>
        <p>You can always add another account later.</p>
        <Link href="/employer/create-account" className="text-decoration-none">
        <div className="social-grid d-flex align-items-center mb-3">
          <Image
            src={employerImg}
            width={42}
            height={42}
            alt="Employer pic"
            className="me-3"
          />
          <div className="social-grid-content">
            <h6 className="mb-0">Employer</h6>
            <p className="mb-0">
              Verify employee histories and manage disputes.
            </p>
          </div>
        </div>
        </Link>
        <Link href="/employee/create-account" className="text-decoration-none">
        <div className="social-grid d-flex align-items-center mb-3">
          <Image
            src={employeeImg}
            width={42}
            height={42}
            alt="Employee pic"
            className="me-3"
          />
          <div className="social-grid-content">
            <h6 className="mb-0">Employee</h6>
            <p className="mb-0">
              Explore company culture and manage your work history.
            </p>
          </div>
        </div>
        </Link>
        <p className="text-center hashtag-heading-space mb-2">
          You must use Getiff in line with our{" "}
          <Link href="/terms" className="use-policy-link">Acceptable Use Policy</Link>. You cannot use a personal
          account for business purposes.
        </p>
      </div>
    </div>
    </div>
  );
};

export default Page;
