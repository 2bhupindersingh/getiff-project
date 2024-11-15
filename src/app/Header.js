"use client";
import React from "react";
import logo from "../../public/logo.svg";
import Stack from "react-bootstrap/Stack";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  // Define the routes for which you want to hide the button
  const hiddenButtonRoutes = [
    "/employer/create-account",
    "/employee/create-account",
    "/employer/register-successfully",
    "/employee/register-successfully",
  ];

  // Check if the current path is one where the button should be hidden
  const isButtonHidden = hiddenButtonRoutes.includes(pathname);
  return (
    <nav className="navigation">
      <Stack direction="horizontal" gap={3}>
        <Link href="/" className="me-auto">
          <Image
            src={logo}
            width={111}
            height={42}
            alt="Picture of the author"
            className="logo"
          />
        </Link>
        <Link href="/join-our-community" className="btn btn-outline-primary">
          Join our Community
        </Link>
        {!isButtonHidden && (
          <Link href="/onboarding" className="btn btn-primary">
            Register Now
          </Link>
        )}
      </Stack>
    </nav>
  );
};

export default Header;
