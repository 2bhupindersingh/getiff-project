import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page-container mx-auto">
      <h1>Welcome to Getiff</h1>
      <p>
        <i>
          Your partner in building a career with transparency, opportunity, and
          growth.
        </i>
      </p>
      <p>
        <strong>Update:</strong> We&apos;ve been building Getiff for the past year,
        and over 10,000 people have already registered on our platform. Getiff
        is a powerful new platform designed to connect professionals and
        companies in meaningful ways, with features that prioritize
        transparency, feedback, and real-time insights into the workplace
        experience.
      </p>
      <p>
        At Getiff, we believe in an open and honest approach to career growth.
        In today&apos;s fast-paced world, we&apos;re giving employees and employers a
        unified space where connections are real, opportunities are clear, and
        the path forward is accessible for everyone.
      </p>
      <p>
        In a time when careers are increasingly dynamic, we&apos;re taking a stand
        for open communication and fair opportunities. By connecting employers
        and employees directly through verified experiences and insights, Getiff
        is designed to empower both sides of the career equation.
      </p>
      <p>
        Fair, Real Feedback: Get valuable feedback from past employers and learn
        from others&apos; experiences. Supportive Networking: Connect with
        professionals and employers who prioritize a positive, transparent work
        culture. Informed Career Decisions: Compare salaries across industries
        and locations, see real reviews, and make career moves with confidence.
      </p>
      <p>
        Our team is comprised of industry veterans and forward-thinking
        developers who have one goal: to build a trustworthy platform that
        respects and serves its users. We&apos;re here to make Getiff a reliable and
        transparent space for authentic connections, insights, and
        opportunities.
      </p>
      <p>
        Data Security: Your information is safe with us. We prioritize data
        privacy and user security in every feature we develop. User-Driven
        Development: We&apos;re building this platform with continuous feedback from
        our community because we know your experiences shape our mission. Global
        Accessibility: Our platform is designed for professionals across
        industries, roles, and regions, making it a universal tool for career
        growth.
      </p>
      <p>
        Hit <strong>“Register”</strong> at the top to join us as an Employee or
        Employer. After signing up, you&apos;ll receive a link to download the Getiff
        app and be among the first to explore its features. Let&apos;s create a
        professional network built on trust, transparency, and growth.
      </p>
      <p className="mb-0">
        (The Getiff Team)
        <br />
        <Link href="mailto:support@getiff.com" className="footer-link">
          Contact Us: support@getiff.com
        </Link>
      </p>
      <p>
        <Link href="/terms" className="footer-link">
          Terms and Privacy
        </Link>
      </p>
    </div>
  );
}
