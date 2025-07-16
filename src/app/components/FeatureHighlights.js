// components/FeatureHighlights.tsx
import React from 'react';
import Image from 'next/image';
import first from '../assets/featureIcon1.svg';
import second from '../assets/featureIcon2.svg';
import third from '../assets/featureIcon3.svg';
import fourth from '../assets/featureIcon4.svg';

const features = [
  {
    title: 'Payment only online',
    description:
      'Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.',
    icon: first,
  },
  {
    title: 'New stocks and sales',
    description:
      'Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.',
    icon: second,
  },
  {
    title: 'Quality assurance',
    description:
      'Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.',
    icon: third,
  },
  {
    title: 'Delivery from 1 hour',
    description:
      'Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.',
    icon: fourth,
  },
];

const FeatureHighlights = () => {
  return (
    <section className="pt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="shrink-0">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  className="w-14 h-14"
                />
              </div>
              <div>
                <h3 className="text-[#030712] font-bold text-[15px]">
                  {feature.title}
                </h3>
                <p className="text-[12px] text-[#6B7280]">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
