import Image from 'next/image'
import Link from 'next/link'
import ServicesGrid from '@/components/ServicesGrid'
import CTASection from '@/components/CTASection'
import { getServices } from '@/lib/payload'

export default async function HomePage() {
  const services = await getServices()

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-dark to-brand py-24 text-center text-white">
        <div className="mx-auto max-w-content px-6">
          <h1 className="text-4xl font-bold md:text-5xl">Welcome to Demo Company</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-100">
            Building modern digital solutions with technology and innovation.
          </p>
          <Link
            href="/services"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-brand transition hover:bg-gray-100"
          >
            Explore Services
          </Link>
        </div>
      </section>

      {/* Services preview */}
      <section className="mx-auto max-w-content px-6 py-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">What We Do</h2>
          <p className="mt-2 text-gray-600">A few of the ways we help businesses grow.</p>
        </div>
        <ServicesGrid services={services.slice(0, 3)} />
      </section>

      {/* About preview */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto grid max-w-content items-center gap-10 px-6 md:grid-cols-2">
          <div className="relative h-72 w-full overflow-hidden rounded-xl bg-gray-200">
            <Image src="/placeholder.svg" alt="About Demo Company" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">About Demo Company</h2>
            <p className="mt-4 text-gray-600">
              We&apos;re a digital agency helping businesses design, build, and grow their
              online presence with modern, reliable technology.
            </p>
            <Link href="/about" className="mt-6 inline-block font-medium text-brand hover:underline">
              Learn more about us →
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
