import { getDictionary } from '@/lib/dictionary';
import FinalCTA from '@/components/sections/FinalCTA';
import { Mail, MapPin, Phone } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact EazySIP | Talk to Our Investment Team',
    description: 'Get in touch with the EazySIP team. Ask questions, learn about SIPs, or receive guidance on starting your investment journey.',
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: 'en' | 'ne' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-dark mb-6">
            {dict.contact.title}
          </h1>
          <p className="text-xl text-gray-600">
            {dict.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info Column */}
          <div className="space-y-12 bg-gray-50 rounded-3xl p-10 border border-gray-100">
            <h2 className="text-2xl font-bold text-dark mb-8">
              {dict.contact.infoTitle}
            </h2>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <Mail className="text-primary w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-dark text-lg mb-1">{dict.contact.emailSupportTitle}</h3>
                <p className="text-gray-600 mb-1">{dict.contact.emailSupportDesc}</p>
                <a href="mailto:dzambala.consultancy@gmail.com" className="text-primary font-bold hover:underline">dzambala.consultancy@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <Phone className="text-primary w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-dark text-lg mb-1">{dict.contact.whatsappSupportTitle}</h3>
                <p className="text-gray-600 mb-1">{dict.contact.whatsappSupportDesc}</p>
                <a href="tel:+917557051930" className="text-primary font-bold hover:underline">+91 75570 51930</a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="text-primary w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-dark text-lg mb-1">{dict.contact.officeLocationTitle}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {dict.contact.officeAddressLine1}<br />
                  {dict.contact.officeAddressLine2}<br />
                  {dict.contact.officeAddressLine3}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">{dict.contact.formName}</label>
                  <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder={dict.contact.placeholderName} />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">{dict.contact.formPhone}</label>
                  <input type="tel" id="phone" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder={dict.contact.placeholderPhone} />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">{dict.contact.formEmail}</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder={dict.contact.placeholderEmail} />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">{dict.contact.formSubject}</label>
                <input type="text" id="subject" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder={dict.contact.placeholderSubject} />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">{dict.contact.formMessage}</label>
                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none" placeholder={dict.contact.placeholderMessage}></textarea>
              </div>

              <button type="button" className="w-full bg-primary hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-sm">
                {dict.contact.formSubmit}
              </button>
            </form>
          </div>
        </div>

      </div>

      <FinalCTA lang={lang} />
    </div>
  );
}
