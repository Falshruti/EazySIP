import { getDictionary } from '@/lib/dictionary';
import FinalCTA from '@/components/sections/FinalCTA';
import { CheckCircle2 } from 'lucide-react';

export default async function FeaturesPage({ params }: { params: Promise<{ lang: 'en' | 'ne' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const featuresList = [
    { title: dict.features.f1Title, desc: dict.features.f1Desc },
    { title: dict.features.f2Title, desc: dict.features.f2Desc },
    { title: dict.features.f3Title, desc: dict.features.f3Desc },
    { title: dict.features.f4Title, desc: dict.features.f4Desc },
    { title: dict.features.f5Title, desc: dict.features.f5Desc },
    { title: dict.features.f6Title, desc: dict.features.f6Desc },
    { title: dict.features.f7Title, desc: dict.features.f7Desc },
    { title: dict.features.f8Title, desc: dict.features.f8Desc },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-dark mb-6">
            {dict.common.eazySipApp}
          </h1>
          <p className="text-xl text-gray-600">
            {dict.features.heroTitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuresList.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-primary mb-6">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <FinalCTA lang={lang} />
    </div>
  );
}
