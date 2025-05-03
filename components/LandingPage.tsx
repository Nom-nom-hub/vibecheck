'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Navigation */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5 flex items-center">
              <div className="bg-blue-600 text-white text-xl font-bold py-1 px-2 rounded-lg mr-2">
                VC
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">VibeCheck</span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#features" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Pricing
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign up free
            </Link>
          </div>
        </nav>

        {/* Mobile menu, show/hide based on mobile menu state */}
        {mobileMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50"></div>
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-gray-800">
              <div className="flex items-center justify-between">
                <a href="/" className="-m-1.5 p-1.5 flex items-center">
                  <div className="bg-blue-600 text-white text-xl font-bold py-1 px-2 rounded-lg mr-2">
                    VC
                  </div>
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">VibeCheck</span>
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-700">
                  <div className="space-y-2 py-6">
                    <a
                      href="#features"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Features
                    </a>
                    <a
                      href="#how-it-works"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      How It Works
                    </a>
                    <a
                      href="#pricing"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pricing
                    </a>
                  </div>
                  <div className="py-6">
                    <Link
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="mt-4 w-full flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign up free
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-purple-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>

        <div className="px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-gray-700 hover:ring-gray-900/20 dark:hover:ring-gray-600">
                  AI-powered social media assistant. <a href="#pricing" className="font-semibold text-blue-600 dark:text-blue-400"><span className="absolute inset-0" aria-hidden="true"></span>See pricing <span aria-hidden="true">&rarr;</span></a>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                <span className="block">Never Post Cringe Again</span>
                <span className="block text-blue-600 dark:text-blue-400">With VibeCheck AI</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Get instant AI feedback on your social media posts before you share them. Boost engagement, avoid embarrassment, and post with absolute confidence.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/signup"
                  className="rounded-md bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/login"
                  className="rounded-md bg-white px-5 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200"
                >
                  Log In
                </Link>
                <a href="#features" className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-600 to-purple-600 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">AI-POWERED INSIGHTS</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to perfect your social media presence
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              VibeCheck analyzes your posts using advanced AI to provide actionable feedback and suggestions that help you create content that resonates with your audience.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                  </div>
                  <span>Engagement Score</span>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">Get a detailed score on how likely your post is to engage your audience and drive meaningful interactions.</p>
                  <p className="mt-4">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Boost your likes and comments by up to 43%
                    </span>
                  </p>
                </dd>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                    </svg>
                  </div>
                  <span>Cringe Detection</span>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">Avoid embarrassing posts with our advanced cringe detection that helps you stay authentic and relatable.</p>
                  <p className="mt-4">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Never worry about posting something embarrassing again
                    </span>
                  </p>
                </dd>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  </div>
                  <span>Trend Analysis</span>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">Stay ahead of the curve with AI-powered trend analysis that helps you create content that's relevant and timely.</p>
                  <p className="mt-4">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Tap into what's trending before your competitors
                    </span>
                  </p>
                </dd>
              </div>
            </dl>
          </div>

          {/* Second row of features */}
          <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {/* Feature 4 */}
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <span>Instant Feedback</span>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">Get immediate, actionable feedback on your posts in seconds, not hours or days.</p>
                  <p className="mt-4">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Save time and post with confidence
                    </span>
                  </p>
                </dd>
              </div>

              {/* Feature 5 */}
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                    </svg>
                  </div>
                  <span>Improvement Suggestions</span>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">Receive specific suggestions to improve your content's clarity, relatability, and overall impact.</p>
                  <p className="mt-4">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Turn good posts into great ones
                    </span>
                  </p>
                </dd>
              </div>

              {/* Feature 6 */}
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <span>Multi-Platform Support</span>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">Optimize your content for multiple platforms including Instagram, Twitter, LinkedIn, and TikTok.</p>
                  <p className="mt-4">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      One tool for all your social media needs
                    </span>
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">HOW IT WORKS</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Three simple steps to better social media posts
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              VibeCheck makes it easy to improve your social media content with a simple, intuitive process.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500 text-white text-2xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Paste Your Post</h3>
                <p className="text-center text-base text-gray-600 dark:text-gray-300">
                  Simply paste your draft post into VibeCheck. Works with any type of social media content.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500 text-white text-2xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Get AI Analysis</h3>
                <p className="text-center text-base text-gray-600 dark:text-gray-300">
                  Our AI analyzes your content for engagement potential, cringe factor, clarity, and more.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500 text-white text-2xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Improve & Post</h3>
                <p className="text-center text-base text-gray-600 dark:text-gray-300">
                  Apply the suggested improvements and post with confidence, knowing your content will resonate.
                </p>
              </div>
            </div>

            <div className="mt-16 flex justify-center">
              <Link
                href="/signup"
                className="rounded-md bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
              >
                Try It Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">SIMPLE PRICING</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Choose the right plan for your needs
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Whether you're a casual poster or a serious content creator, we have a plan that fits your social media strategy.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-10 gap-x-8 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
            {/* Basic Plan */}
            <div className="relative rounded-3xl p-8 ring-1 ring-gray-200 dark:ring-gray-700 sm:p-10 bg-white dark:bg-gray-900 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-blue-600 dark:text-blue-400">Basic</h3>
                <p className="rounded-full bg-blue-100/80 dark:bg-blue-900/80 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  Most Popular
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                Perfect for casual social media users who want to improve their posts.
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">$4.99</span>
                <span className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300">/month</span>
              </p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Billed monthly. Cancel anytime.
              </p>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span><strong>10 posts</strong> per month</span>
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span>Basic engagement analysis</span>
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span>Standard improvement suggestions</span>
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span>Email support</span>
                </li>
              </ul>
              <Link
                href="/signup"
                className="mt-8 block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
              >
                Get started with Basic
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative rounded-3xl p-8 ring-1 ring-gray-900/10 dark:ring-white/10 sm:p-10 bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              {/* Best value tag */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 transform">
                <div className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-1 text-xs font-medium text-indigo-800 ring-1 ring-inset ring-indigo-600/20">
                  Best value
                </div>
              </div>

              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-white">Pro</h3>
                <p className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white">
                  Unlimited
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-blue-100">
                For serious content creators and influencers who want to maximize engagement.
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">$9.99</span>
                <span className="text-sm font-semibold leading-6 text-blue-100">/month</span>
              </p>
              <p className="mt-2 text-xs text-blue-100/80">
                Billed monthly. Cancel anytime.
              </p>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-blue-100">
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Unlimited</strong> posts</span>
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Advanced</strong> analytics and insights</span>
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Premium</strong> improvement suggestions</span>
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Priority</strong> support</span>
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Trend</strong> analysis and alerts</span>
                </li>
                <li className="flex gap-x-3">
                  <svg className="h-6 w-5 flex-none text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Multi-platform</strong> optimization</span>
                </li>
              </ul>
              <Link
                href="/signup"
                className="mt-8 block w-full rounded-md bg-white px-3.5 py-2.5 text-center text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200"
              >
                Get started with Pro
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-2xl text-center">
            <p className="text-base text-gray-600 dark:text-gray-300">
              Not sure which plan is right for you? <Link href="/signup" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">Start with a free trial</Link> and upgrade anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">TESTIMONIALS</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Trusted by content creators worldwide
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 dark:text-gray-300 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
            <figure className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 sm:col-span-2 xl:col-start-2 xl:row-end-1">
              <blockquote className="p-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 dark:text-white sm:p-8 sm:text-xl sm:leading-8">
                <p>"VibeCheck has completely transformed my social media strategy. I've seen a 47% increase in engagement since I started using it to analyze my posts before publishing."</p>
              </blockquote>
              <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-100 dark:border-gray-700 px-6 py-4 sm:flex-nowrap">
                <div className="flex-auto">
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-gray-600 dark:text-gray-400">@sarahjcreates • Instagram Influencer</div>
                </div>
                <div className="flex-none py-1">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
              </figcaption>
            </figure>

            <figure className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
              <blockquote className="p-6 text-base font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">
                <p>"The cringe detection feature alone is worth the subscription. It's saved me from posting some truly embarrassing content!"</p>
              </blockquote>
              <figcaption className="flex items-center gap-x-4 border-t border-gray-100 dark:border-gray-700 px-6 py-4">
                <div className="flex-auto">
                  <div className="font-semibold">Alex Chen</div>
                  <div className="text-gray-600 dark:text-gray-400">TikTok Creator</div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </figcaption>
            </figure>

            <figure className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
              <blockquote className="p-6 text-base font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">
                <p>"As a small business owner, VibeCheck has been a game-changer. The suggestions are spot-on and have helped me connect better with my audience."</p>
              </blockquote>
              <figcaption className="flex items-center gap-x-4 border-t border-gray-100 dark:border-gray-700 px-6 py-4">
                <div className="flex-auto">
                  <div className="font-semibold">Michael Torres</div>
                  <div className="text-gray-600 dark:text-gray-400">Small Business Owner</div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">FAQ</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Frequently asked questions
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Everything you need to know about VibeCheck and how it can help you create better social media content.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="space-y-8">
              {/* FAQ Item 1 */}
              <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-8">
                <dt className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                  How does VibeCheck analyze my posts?
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                  VibeCheck uses advanced AI powered by Google's Gemini API to analyze your content across multiple dimensions including engagement potential, relatability, cringe factor, originality, clarity, and trendiness. Our algorithms have been trained on millions of social media posts to identify what works and what doesn't.
                </dd>
              </div>

              {/* FAQ Item 2 */}
              <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-8">
                <dt className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                  Is my content secure and private?
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Absolutely. We take privacy very seriously. Your content is only used for analysis and is never shared with third parties. We don't store your posts longer than necessary to provide our service, and all data is encrypted in transit and at rest.
                </dd>
              </div>

              {/* FAQ Item 3 */}
              <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-8">
                <dt className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                  Can I cancel my subscription anytime?
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. If you cancel, you'll continue to have access to VibeCheck until the end of your current billing period.
                </dd>
              </div>

              {/* FAQ Item 4 */}
              <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-8">
                <dt className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                  Which social media platforms does VibeCheck support?
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                  VibeCheck works with content for all major social media platforms including Instagram, TikTok, Twitter, Facebook, LinkedIn, and YouTube. Our analysis is tailored to the specific platform you're posting to, as each has its own unique audience and content style.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            {/* Decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <svg
                className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-white/10 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                    width={200}
                    height={200}
                    x="50%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M100 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <svg x="50%" y={-1} className="overflow-visible fill-blue-500/20">
                  <path
                    d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                    strokeWidth={0}
                  />
                </svg>
                <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
              </svg>
            </div>

            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Stop posting cringe. Start getting results.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
                Join thousands of content creators who are using VibeCheck to create more engaging, authentic, and successful social media posts.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/signup"
                  className="rounded-md bg-white px-5 py-3 text-base font-semibold text-blue-600 shadow-md hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200 w-full sm:w-auto"
                >
                  Start Your Free Trial
                </Link>
                <Link
                  href="/login"
                  className="text-base font-semibold leading-6 text-white hover:text-blue-100 transition-all duration-200"
                >
                  Already have an account? Log in <span aria-hidden="true">→</span>
                </Link>
              </div>

              <p className="mt-8 text-sm text-blue-100/80">
                No credit card required. 7-day free trial.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <div className="flex items-center justify-center md:justify-start">
              <a href="/" className="flex items-center">
                <div className="bg-blue-600 text-white text-sm font-bold py-1 px-1.5 rounded-md mr-2">
                  VC
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">VibeCheck</span>
              </a>
            </div>
            <p className="mt-4 text-center text-xs leading-5 text-gray-500 md:text-left">
              &copy; {new Date().getFullYear()} VibeCheck. All rights reserved.
            </p>
            <div className="mt-4 flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">Terms of Service</a>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
