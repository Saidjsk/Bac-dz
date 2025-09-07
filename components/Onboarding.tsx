import React, { useState } from 'react';
import { ClockIcon, BookOpenIcon, CalculatorIcon, SparklesIcon } from './icons';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);

  const steps = [
    {
      icon: (
        <video 
          src="https://j.top4top.io/m_3536t9j002.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-48 h-48 object-cover rounded-2xl shadow-lg"
        />
      ),
      title: 'مرحباً بك في رفيق البكالوريا',
      description: 'كل ما تحتاجه للتحضير والمراجعة في مكان واحد. لنبدأ رحلة النجاح معاً.',
    },
    {
      icon: (
        <video
          src="https://c.top4top.io/m_3536ptx3b0.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-48 h-48 object-cover rounded-2xl shadow-lg"
        />
      ),
      title: 'أدواتك نحو التفوق',
      description: 'تابع العد التنازلي، تصفح المواد، احسب معدلك، واستفد من نصائحنا القيمة.',
    },
    {
      icon: <SparklesIcon className="h-24 w-24 text-white" />,
      title: 'أنت الآن جاهز!',
      description: 'انطلق في رحلتك نحو تحقيق أعلى المعدلات. بالتوفيق!',
    },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(s => s + 1);
    }
  };

  const currentStepData = steps[step - 1];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white animate-fade-in" dir="rtl">
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        {step === 3 ? (
             <div className="mb-10 w-40 h-40 rounded-full bg-white/20 flex items-center justify-center animate-pulse-glow">
                <div key={step} className="animate-scale-in">
                    {currentStepData.icon}
                </div>
            </div>
        ) : (
            <div key={step} className="mb-10 animate-scale-in">
                {currentStepData.icon}
            </div>
        )}
        <div key={step+10}>
            <h2 className="text-3xl font-extrabold mb-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
              {currentStepData.title}
            </h2>
            <p className="max-w-xs text-lg text-blue-200 animate-slide-up" style={{ animationDelay: '200ms' }}>
              {currentStepData.description}
            </p>
        </div>
      </div>

      <div className="flex-shrink-0">
        <div className="flex justify-center gap-2 mb-8">
            {steps.map((_, index) => (
                <div key={index} className={`w-3 h-3 rounded-full transition-all duration-300 ${step === index + 1 ? 'bg-white scale-125' : 'bg-white/40'}`}></div>
            ))}
        </div>
        {step < 3 ? (
            <button
                onClick={handleNext}
                className="w-full bg-white text-blue-600 font-bold py-4 px-6 rounded-xl text-lg hover:bg-blue-100 transition-colors transform hover:scale-105 shadow-2xl"
            >
                التالي
            </button>
        ) : (
            <button
                onClick={onComplete}
                className="w-full bg-white text-blue-600 font-bold py-4 px-6 rounded-xl text-lg hover:bg-blue-100 transition-colors transform hover:scale-105 shadow-2xl"
            >
                إبدأ
            </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
