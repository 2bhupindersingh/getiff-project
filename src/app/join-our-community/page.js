import React from "react";
import Image from "next/image";
import instagramImg from "../../../public/skill_icons_instagram.png";
import twitterImg from "../../../public/prime_twitter.png";
import Container from "react-bootstrap/Container";
import Link from "next/link";

const Page = () => {
  return (
    <Container>
      <div className="join-our-community mx-auto">
        <div className="join-our-community-header mb-2">
          <h1>Join Our Community</h1>
        </div>
        <div className="join-our-community-content">
          <h6>Follow us on:</h6>
          <div className="social-grid d-flex mb-3">
            <Image
              src={instagramImg}
              width={42}
              height={42}
              alt="Instagram pic"
              className="me-3"
            />
            <div className="social-grid-content">
              <h6 className="mb-0">Instagram</h6>
              <Link
                href="https://www.instagram.com/getiff_com/"
                className="btn btn-link p-0"
                target="_blank"
              >
                https://www.instagram.com/getiff_com/
              </Link>
            </div>
          </div>
          <div className="social-grid d-flex mb-3">
            <Image
              src={twitterImg}
              width={42}
              height={42}
              alt="Instagram pic"
              className="me-3"
            />
            <div className="social-grid-content">
              <h6 className="mb-0">Twitter</h6>
              <Link
                href="https://x.com/getiff_com"
                className="btn btn-link p-0"
                target="_blank"
              >
                https://x.com/getiff_com
              </Link>
            </div>
          </div>

          <p className="text-center hashtag-heading-space mb-2">
            Use our hashtag
          </p>
          <h5 className="text-center">#getiff</h5>
        </div>
      </div>
    </Container>
  );
};

export default Page;
