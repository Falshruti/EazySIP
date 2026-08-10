import { getDictionary } from '@/lib/dictionary';
import FinalCTA from '@/components/sections/FinalCTA';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Privacy Policy - eazySIP',
    description: 'Privacy Policy for eazySIP operated by Dzambala Financial Services LLP.',
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: 'en' | 'ne' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const p = dict.privacy;

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-dark mb-4">
            {dict.common.privacyPolicy}
          </h1>

          <p className="text-sm sm:text-base font-semibold text-primary mb-2">
            {p.subheading || 'EazySip | Dzambala Financial Services LLP'}
          </p>

          <p className="text-sm text-gray-500 mb-8">
            <strong>{p.lastUpdatedLabel}</strong> {p.lastUpdatedDate}
          </p>

          {(p as any).intro && (
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
              {(p as any).intro}
            </p>
          )}

          <div className="prose prose-lg prose-green max-w-none text-gray-700 space-y-6">
            {p.sections && p.sections.map((section: any, idx: number) => {
              const num = parseInt(section.id || String(idx + 1), 10);

              // Map heading tag (1-2: h2, 3-6: h3, 7-9: h4, 10-12: h5, 13-16: h6)
              let HeadingTag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h2';
              if (num === 1 || num === 2) {
                HeadingTag = 'h2';
              } else if (num >= 3 && num <= 6) {
                HeadingTag = 'h3';
              } else if (num >= 7 && num <= 9) {
                HeadingTag = 'h4';
              } else if (num >= 10 && num <= 12) {
                HeadingTag = 'h5';
              } else if (num >= 13 && num <= 16) {
                HeadingTag = 'h6';
              }

              const headingClasses = 'text-lg sm:text-xl font-bold font-heading text-dark mt-6 mb-2';

              return (
                <div key={section.id || idx} className="space-y-2">
                  <HeadingTag className={headingClasses}>
                    {section.title}
                  </HeadingTag>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {section.body}
                  </p>

                  {section.contactDetails && (
                    <div className="mt-4 space-y-2">
                      <ul className="space-y-1.5 list-disc pl-5 text-base text-gray-700">
                        <li><strong>Grievance Officer:</strong> {section.contactDetails.officer}</li>
                        <li>
                          <strong>Email:</strong>{' '}
                          <a href={`mailto:${section.contactDetails.email}`} className="text-primary underline font-medium">
                            {section.contactDetails.email}
                          </a>
                        </li>
                        <li>
                          <strong>Phone:</strong>{' '}
                          <a href={`tel:${section.contactDetails.phone}`} className="text-primary underline font-medium">
                            {section.contactDetails.phone}
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <FinalCTA lang={lang} />
    </div>
  );
}

