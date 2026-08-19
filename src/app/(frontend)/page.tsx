import type { Metadata } from 'next'
import PageBuilder from '@/components/blocks/PageBuilder'
import HomeHeroBlock from '@/components/blocks/HomeHeroBlock'
import ProofBarBlock from '@/components/blocks/ProofBarBlock'
import SegmentCardsBlock from '@/components/blocks/SegmentCardsBlock'
import TransformSplitBlock from '@/components/blocks/TransformSplitBlock'
import ServiceMarqueeBlock from '@/components/blocks/ServiceMarqueeBlock'
import AIWorkflowPanelBlock from '@/components/blocks/AIWorkflowPanelBlock'
import VideoTestimonialsBlock from '@/components/blocks/VideoTestimonialsBlock'
import CaseStudySpotlightBlock from '@/components/blocks/CaseStudySpotlightBlock'
import InsightsGridBlock from '@/components/blocks/InsightsGridBlock'
import { getHome } from '@/lib/payload'
import type { Media } from '@/lib/payload'

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHome()
  return {
    title: home?.seo?.metaTitle || 'GO MO Group | AI-Infused B2B Digital Marketing',
    description:
      home?.seo?.metaDescription ||
      'Multi-market performance marketing, built to help brands grow, adapt and lead in the generative AI era.',
  }
}

/** Wraps a local /public image path as a Media shape so fallback content can reuse the block renderers. */
function img(path: string, alt = ''): Media {
  return { id: path, alt, url: path }
}

export default async function HomePage() {
  const home = await getHome()
  const hasLayout = home?.layout && home.layout.length > 0

  if (hasLayout) {
    return <PageBuilder blocks={home!.layout} />
  }

  return (
    <>
      <HomeHeroBlock
        blockType="homeHero"
        eyebrow="AI-Powered Growth"
        heading="AI-Infused B2B Digital Marketing"
        highlight="B2B Digital Marketing"
        subtext="We combine strategy, creativity, and generative AI to help B2B companies grow faster and build a lasting competitive advantage."
        buttonLabel="Accelerate your growth with us"
        buttonHref="/contact"
        scrollLabel="Scroll for more"
      />

      <ProofBarBlock
        blockType="proofBar"
        eyebrow="Proof, not promises"
        heading="Why growing teams choose to work with us."
        highlight="growing teams"
        logos={[
          { image: img('/images/home/logos/1.png') },
          { image: img('/images/home/logos/2.png') },
          { image: img('/images/home/logos/3.png') },
          { image: img('/images/home/logos/4.png') },
          { image: img('/images/home/logos/5.png') },
        ]}
        caption="Join 120+ B2B teams already growing with GO MO Group"
        captionSubtext="Trusted by industrial, SaaS & enterprise brands worldwide"
        stats={[
          { value: '195%', description: 'Increase in organic clicks after deploying Gen-AI automation', color: 'yellow' },
          { value: '400+', description: 'Hours saved through AI-driven marketing automation', color: 'rose' },
          { value: '25%', description: 'Efficiency gain unlocked by our generative AI offering', color: 'cyan' },
          { value: '40%', description: 'Improvement in output quality with generative AI', color: 'purple' },
        ]}
      />

      <SegmentCardsBlock
        blockType="segmentCards"
        eyebrow="What Sets Us Apart"
        heading="We build teams targeting three Specific ICPs"
        highlight="three Specific ICPs"
        subtext="You will have your own 360 team with industry experts such as Designer, Website Developer, Copywriter and Strategist, working together to deliver the right solution for your goals irrespective of the scale of your business."
        cards={[
          {
            title: 'Segment Enterprise',
            description:
              'We enhance your global presence with pull marketing and SEO to drive growth. With robust and AI-adapted GEO, we ensure your digital strategy is future-proof.',
            image: img('/images/home/icp-cards/enterprise.png'),
            buttonLabel: 'Read more',
            buttonHref: '/services',
          },
          {
            title: 'Segment SME',
            description:
              'Traditional medium-sized industrial and manufacturing companies are a perfect fit for us. We have a dedicated digital marketing offering that we internally call "B2B SME."',
            image: img('/images/home/icp-cards/sme.png'),
            buttonLabel: 'Read more',
            buttonHref: '/services',
          },
          {
            title: 'Segment B2B SaaS & Tech',
            description:
              'Improve your online presence and attract potential customers with our vertical SaaS/Tech solution and enhanced searchability. Reach up to 1,000 key prospects annually with a targeted and segmented strategy.',
            image: img('/images/home/icp-cards/saas-tech.png'),
            buttonLabel: 'Read more',
            buttonHref: '/services',
          },
          {
            title: 'Generative AI Offering',
            description:
              'The digital world is constantly evolving, and generative AI (Gen AI) is crucial for future success. Increase your efficiency by 25% and improve result quality by 40%. Let generative AI take you to the next level.',
            image: img('/images/home/icp-cards/generative-ai.png'),
            buttonLabel: 'Read more',
            buttonHref: '/services',
          },
        ]}
      />

      <TransformSplitBlock
        blockType="transformSplit"
        eyebrow="Beyond Boundaries"
        heading="Taking a Transformative Leap Forward Through the Power of Generative AI"
        highlight="Power of Generative AI"
        paragraph="Explore the vast potential of generative AI in reshaping industries and breaking new ground. This insightful feature delves into how cutting-edge artificial intelligence is not only transforming business operations but also redefining the boundaries of innovation and strategic growth."
        buttonLabel="Read more"
        buttonHref="/services"
        galleryImages={[
          { image: img('/images/home/team-photos/tile-1.png') },
          { image: img('/images/home/team-photos/tile-2.png') },
          { image: img('/images/home/team-photos/tile-3.png') },
          { image: img('/images/home/team-photos/tile-4.png') },
          { image: img('/images/home/team-photos/tile-5.png') },
        ]}
      />

      <ServiceMarqueeBlock
        blockType="serviceMarquee"
        eyebrow="Our services"
        heading="Pull marketing for long-term growth."
        highlight="long-term growth."
        subtext="We create valuable digital assets that generate business value over time, with the capacity to scale delivery around your ambition and goals."
        limit={12}
      />

      <AIWorkflowPanelBlock
        blockType="aiWorkflowPanel"
        eyebrow="Built to fit"
        heading="AI Workflow Engineering"
        highlight="Engineering"
        paragraph="We start with your problem, not the platform. Then we design and build a secure AI tool or workflow within your existing environment, aligned with your data requirements and train your team to use it confidently in everyday work."
        listLabel="What we help you improve"
        improvements={[
          { title: 'Marketing', description: 'Turn repetitive marketing tasks into connected AI workflows that help your team move faster and improve performance.' },
          { title: 'Sales' },
          { title: 'Communication' },
        ]}
        tags={[
          { label: 'Custom Workflow Solutions' },
          { label: 'Built within your environment' },
          { label: 'Scalable AI Operations' },
          { label: 'Data & security compliant' },
          { label: 'Team Adoption Training' },
          { label: 'Compliance by Design' },
        ]}
        buttonLabel="Book a discovery call"
        buttonHref="/contact"
        backgroundImage={img('/images/home/ai-workflow/bg.png')}
      />

      <VideoTestimonialsBlock
        blockType="videoTestimonials"
        eyebrow="Behind the work"
        heading="Meet the minds driving our work forward."
        highlight="driving our work forward."
        mainSpeaker={{ name: 'Henrik Anderberg', role: 'EVP / Vice VD', posterImage: img('/images/home/testimonials/henrik.png') }}
        testimonials={[
          { name: 'Puja Kumari', role: 'Vice Managing Director', posterImage: img('/images/home/testimonials/puja.png') },
          { name: 'S Vishnu Vardhan Adithya', role: 'Segment Lead - Digital Marketing', posterImage: img('/images/home/testimonials/vishnu.png') },
          { name: 'Lina Nygren', role: 'Vice President SME Strategy & Success', posterImage: img('/images/home/testimonials/lina.png') },
        ]}
      />

      <CaseStudySpotlightBlock
        blockType="caseStudySpotlight"
        eyebrow="Case studies"
        heading="We craft digital experiences that elevate your business."
        highlight="digital experiences"
        limit={6}
      />

      <InsightsGridBlock
        blockType="insightsGrid"
        eyebrow="Latest insights"
        heading="Insights that drive smarter growth."
        highlight="smarter growth."
        subtext="Industry-specific insights make a difference. We bring experience from over successful 100 client projects to each new case to develop and implement optimal digital marketing strategies for all of our clients."
        buttonLabel="View all insights"
        buttonHref="#"
        cards={[
          {
            category: 'Generative AI, SEO',
            date: 'October 8, 2024',
            readTime: '5 min read',
            title: 'AI in marketing: the end of website traffic as we know it',
            image: img('/images/home/insights/1.png'),
          },
          {
            category: 'Generative AI',
            date: 'May 7, 2025',
            readTime: '5 min read',
            title: 'An AI-Case Study from a Global Leader in Heavy Industry and Manufacturing',
            image: img('/images/home/insights/3.png'),
          },
          {
            category: 'Generative AI',
            date: 'February 26, 2026',
            readTime: '5 min read',
            title: 'Welcome to the Agentic Era: Where your next customer might be an AI',
            image: img('/images/home/insights/4.png'),
          },
        ]}
      />
    </>
  )
}
