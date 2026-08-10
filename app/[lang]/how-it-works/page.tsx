import { getDictionary } from '@/lib/dictionary';
import FinalCTA from '@/components/sections/FinalCTA';

export default async function HowItWorksPage({ params }: { params: Promise<{ lang: 'en' | 'ne' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const steps = [
    { num: "01", title: dict.howItWorks.step1Title, desc: dict.howItWorks.step1Desc },
    { num: "02", title: dict.howItWorks.step2Title, desc: dict.howItWorks.step2Desc },
    { num: "03", title: dict.howItWorks.step3Title, desc: dict.howItWorks.step3Desc },
    { num: "04", title: dict.howItWorks.step4Title, desc: dict.howItWorks.step4Desc },
    { num: "05", title: dict.howItWorks.step5Title, desc: dict.howItWorks.step5Desc },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-dark mb-6">
            {dict.howItWorks.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {dict.howItWorks.subtitle}
          </p>
        </div>

        <div className="relative border-l-4 border-green-100 ml-4 md:ml-12 space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative pl-8 md:pl-12">
              <div className="absolute -left-[1.35rem] top-1 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold shadow-md ring-4 ring-white">
                {step.num}
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-green-200 transition-colors">
                <h3 className="font-bold text-2xl text-dark mb-3">{step.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FinalCTA lang={lang} />
    </div>
  );
}
