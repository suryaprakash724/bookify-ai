'use client';

import Image from 'next/image';
import Link from 'next/link';

const steps = [
  { number: 1, title: 'Upload PDF', description: 'Add your book file' },
  { number: 2, title: 'AI Processing', description: 'We analyze the content' },
  { number: 3, title: 'Voice Chat', description: 'Discuss with AI' },
];

export default function HeroSection() {
  return (
    <section className="wrapper pt-18 mb-10 md:mb-16">
      <div className="library-hero-card">
        <div className="library-hero-content">
          {/* Left: Text + Button */}
          <div className="hero-left">
            <h1 className="hero-title">Your Library</h1>
            <p className="hero-description">
              Convert your books into interactive AI conversations. Listen, learn, and discuss your favorite reads.
            </p>
            <Link href="/books/new" className="hero-add-btn">
              <span className="hero-add-icon">+</span>
              Add new book
            </Link>
          </div>

          {/* Center: Illustration */}
          <div className="hero-center">
            <Image
              src="/assets/hero-illustration.png"
              alt="Vintage books and globe"
              width={400}
              height={240}
              className="w-full max-w-[340px] h-auto object-contain"
              priority
            />
          </div>

          {/* Right: Steps card */}
          <div className="hero-steps-card">
            {steps.map(({ number, title, description }) => (
              <div key={number} className="hero-step-item">
                <span className="hero-step-number">{number}</span>
                <div>
                  <div className="hero-step-title">{title}</div>
                  <div className="hero-step-description">{description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
