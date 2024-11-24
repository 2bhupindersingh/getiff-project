import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import Link from 'next/link';
import { BsInstagram, BsTwitterX } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import verifiedReviews from '../../public/verified-reviews.svg';
import gracefullEmployeeImg from '../../public/graceful-employee.svg';
import stayEmpowered from '../../public/stay-empowered-img.svg';
import raseConcernImg from '../../public/raise-concern.svg';
import { RiLinkedinLine } from 'react-icons/ri';
import logo from '../../public/logo.svg';

export default function Home() {
  return (
    <>
      <section className={styles.heroContainer}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>What's New on Getiff</h1>
            <p className={styles.heroText}>
              Discover the innovative ways Getiff is transforming the workplace for employees and
              employers alike.
            </p>
          </div>
        </section>
      </section>

      <section className={styles.storySection}>
        <div className={styles.flexContainer}>
          <div className={`${styles.leftColumn} ${styles.orderClass}`}>
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
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
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
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className={styles.rightColumn}>
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
          <div className={`${styles.leftColumn} ${styles.orderClass}`}>
            <h6 className={styles.storySubHeading}>AI-Powered Insights</h6>
            <h4 className={styles.storyHeading}>
              Stay Empowered With <br />
              AI-Driven Insights
            </h4>
            <ul className={styles.storyList}>
              <li>
                Getiff's <strong>AI-powered analytics</strong> provide actionable data on salary
                benchmarks, trends, and company performance.
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
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
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
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className={styles.rightColumn}>
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
