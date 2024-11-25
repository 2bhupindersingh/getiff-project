import styles from './page.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import Link from 'next/link';
import { BsInstagram, BsTwitterX } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import verifiedReviews from '../../public/verified-reviews.svg';
import gracefullEmployeeImg from '../../public/graceful-employee.svg';
import stayEmpowered from '../../public/stay-empowered-img.svg';
import raseConcernImg from '../../public/raise-concern.svg';
import homeBannerleftImg from '../../public/getiff-banner-left-img.svg';
import homeBannerRightImg from '../../public/getiff-banner-right-img.svg';
import { RiLinkedinLine } from 'react-icons/ri';
import logo from '../../public/logo.svg';
import { Button, Stack } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <section className={styles.heroContainer}>
        <section className={styles.heroSection}>
          <Stack direction="horizontal" className="justify-space-between heroSectionContainer">
            <Stack
              direction="horizontal"
              className="justify-content-between align-items-start hide-on-desktop"
              gap={4}
            >
              <div className="w-50">
                <Image src={homeBannerleftImg} alt="verified reviews" />
              </div>
              <div className="w-50">
                <Image src={homeBannerRightImg} alt="stay empowered" />
              </div>
            </Stack>

            <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 custom-order-1 hide-on-mobile">
              <Image src={homeBannerleftImg} alt="verified reviews" />
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 custom-order-3">
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>What&apos;s New on Getiff</h1>
                <p className={styles.heroText}>
                  Discover the innovative ways Getiff is transforming the workplace for employees
                  and employers alike.
                </p>
                <Stack
                  direction="horizontal"
                  gap={3}
                  className="justify-content-center btn-container"
                >
                  <Link href="/register" className="btn btn-primary btn-register-home">
                    Register Now
                  </Link>
                  <Link href="/register" className="btn btn-outlined btn-contact-home">
                    Contact Us
                  </Link>
                </Stack>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 custom-order-2 hide-on-mobile">
              <Image src={homeBannerRightImg} alt="stay empowered" />
            </div>
          </Stack>
        </section>
      </section>

      <section className={styles.centeredSection}>
        <div className={styles.centeredContainer}>
          <h6 className={styles.centeredSubheading}>Getiff’s Story</h6>
          <h5 className={styles.centeredHeading}>Get Transparency, Get Success</h5>
          <p className={styles.centeredParagraph}>
            Our platform, Getiff, carefully analyzes your unique employee or company needs, creating
            a tailored solution to help you verify employee histories, understand company cultures,
            and resolve workplace disputes efficiently.
          </p>
        </div>
      </section>
      <section className={styles.storySection}>
        <div className={styles.flexContainer}>
          <div className={`${styles.leftColumn} ${styles.orderClass} ${styles.contentSpacing}`}>
            <h6 className={styles.storySubHeading}>Employee Reviews</h6>
            <h4 className={styles.storyHeading}>
              Verified Reviews, Powered by
              <br /> Transparency
            </h4>
            <ul className={styles.storyList}>
              <li>
                <strong>Get authentic insights</strong> directly from employees—past and present.
              </li>
              <li>
                Uncover verified reviews on work culture, salaries, and growth opportunities to make
                informed decisions.
              </li>
              <li>Navigate through real feedback, eliminating the guesswork.</li>
            </ul>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.imageWrapper}>
              <Image
                src={verifiedReviews}
                alt="Verified Reviews Illustration"
                fill
                sizes="(max-width: 768px) 100vw ' 50vw"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.flexContainer}>
          <div className={styles.leftColumn}>
            <div className={styles.imageWrapper}>
              <Image
                src={gracefullEmployeeImg}
                alt="Employee History Illustration"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
          <div className={`${styles.rightColumn} ${styles.contentSpacing}`}>
            <h6 className={styles.storySubHeading}>Employer Insights</h6>
            <h4 className={styles.storyHeading}>
              Graceful Employee History for
              <br /> Employers
            </h4>
            <ul className={styles.storyList}>
              <li>
                Access <strong>accurate employment history</strong> to make confident hiring
                decisions.
              </li>
              <li>
                Simplify your hiring process with reviews from past employers, work performance
                insights, and dispute resolutions.
              </li>
              <li>All this, while ensuring compliance and privacy.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.flexContainer}>
          <div className={`${styles.leftColumn} ${styles.orderClass} ${styles.contentSpacing}`}>
            <h6 className={styles.storySubHeading}>AI-Powered Insights</h6>
            <h4 className={styles.storyHeading}>
              Stay Empowered With <br />
              AI-Driven Insights
            </h4>
            <ul className={styles.storyList}>
              <li>
                Getiff&apos;s <strong>AI-powered analytics</strong> provide actionable data on
                salary benchmarks, trends, and company performance.
              </li>
              <li>
                Employees can compare companies effortlessly, while employers track engagement and
                workforce trends.
              </li>
              <li>Decisions, now backed by data.</li>
            </ul>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.imageWrapper}>
              <Image
                src={stayEmpowered}
                alt="AI Insights Illustration"
                fill
                sizes="(max-width: 768px) 100vw' 50vw"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.flexContainer}>
          <div className={styles.leftColumn}>
            <div className={styles.imageWrapper}>
              <Image
                src={raseConcernImg}
                alt="Raise Concerns Illustration"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
          <div
            className={`${styles.rightColumn} ${styles.rightColumnPadding} ${styles.contentSpacing}`}
          >
            <h6 className={styles.storySubHeading}>Resolve concerns</h6>
            <h4 className={styles.storyHeading}>
              Raise Concerns and Get
              <br /> Support
            </h4>
            <ul className={styles.storyList}>
              <li>
                A <strong>dedicated dispute resolution</strong> feature ensures fairness and
                accountability in the workplace.
              </li>
              <li>
                Employees can raise concerns regarding final settlements, experience letters, and
                more, directly on the platform.
              </li>
              <li>Employers can resolve issues transparently and build trust.</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerTop}>
            <div className={styles.footerLogo}>
              <Link href="/">
                <Image
                  src={logo}
                  width={111}
                  height={42}
                  alt="Picture of the author"
                  className="logo"
                />
              </Link>
            </div>
            <div className={styles.footerText}>
              <p>
                Join the journey. Over 10,000+ users have already registered!{' '}
                <Link href="/onboarding">Get Started Today</Link>
              </p>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <div className={styles.footerCopyright}>
              &copy;{new Date().getFullYear()}hustletechinnovations
            </div>
            <div className={styles.footerLegal}>
              <Link href="/terms">Terms and Policy</Link>
              <Link href="/our-story">Our Story</Link>
              <Link href="/join-our-community">Join our Community</Link>
              <Link href="/">Our Blogs</Link>
              <Link href="/">Email us</Link>
            </div>
            <div className={styles.socialLinks}>
              <h6 className={styles.socialTitle}>Follow us:</h6>
              <Link
                href="https://www.instagram.com/getiff_com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                <BsInstagram />
              </Link>
              <Link
                href="https://x.com/getiff_com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className={styles.socialLink}
              >
                <BsTwitterX />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={styles.socialLink}
              >
                <RiLinkedinLine />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
