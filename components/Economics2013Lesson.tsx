import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

const Economics2013Lesson: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<string | null>('t1q1');

    const handleAccordionClick = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    return (
        <div className="bg-transparent" dir="rtl">
            <div className="p-4 sm:p-6">
                <header className="text-center border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-8 bg-white dark:bg-gray-800 shadow-sm text-gray-800 dark:text-gray-200">
                    <div className="flex justify-between items-start text-xs sm:text-base">
                        <div className="text-center">
                            <p className="font-semibold">الجمهورية الجزائرية الديمقراطية الشعبية</p>
                            <p>وزارة التربية الوطنية</p>
                        </div>
                        <div className="text-center">
                            <p className="font-semibold">الديوان الوطني للامتحانات والمسابقات</p>
                            <p>دورة: جوان 2013</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="font-bold text-lg">امتحان بكالوريا التعليم الثانوي</p>
                        <p>الشعبة: تسيير واقتصاد</p>
                    </div>
                    <div className="flex justify-between mt-2 font-bold text-sm sm:text-base">
                        <span>اختبار في مادة: الاقتصاد و المناجمنت</span>
                        <span>المدة: 03 سا و 30 د</span>
                    </div>
                </header>

                <div className="text-center my-8 font-bold text-lg text-gray-700 dark:text-gray-300">
                    <p>على المترشح أن يختار أحد الموضوعين التاليين:</p>
                </div>

                {/* Topic 1 */}
                <section className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <h2 className="text-2xl font-extrabold text-center p-5 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-b border-gray-200 dark:border-gray-700 tracking-wide">الموضوع الأول</h2>
                    
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <div>
                            <h3 className="font-bold text-xl p-5 bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300">الجزء الأول: ( 16 نقطة )</h3>
                            <AccordionItem title="السؤال الأول : ( 06 نقاط )" isOpen={openAccordion === 't1q1'} onClick={() => handleAccordionClick('t1q1')}>
                                <p className="leading-relaxed">يعتبر الإئتمان من أهم المعاملات التي تقوم بها المصارف التجارية.</p>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>اشرح صور الإئتمان.</li>
                                    <li>اذكر المعاملات المصرفية الأخرى.</li>
                                </ol>
                            </AccordionItem>
                             <AccordionItem title="السؤال الثاني : ( 06 نقاط )" isOpen={openAccordion === 't1q2'} onClick={() => handleAccordionClick('t1q2')}>
                                <p className="leading-relaxed">التضخم: ظاهرة اقتصادية تتميز بحركة تصاعدية للأسعار.</p>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>اذكر أنواع التضخم مع الشرح المختصر.</li>
                                    <li>اشرح سياسة تحقيق التوازن في الميزانية العامة كإجراء لمعالجة ظاهرة التضخم.</li>
                                </ol>
                            </AccordionItem>
                            <AccordionItem title="السؤال الثالث: ( 04 نقاط )" isOpen={openAccordion === 't1q3'} onClick={() => handleAccordionClick('t1q3')}>
                                 <p className="leading-relaxed">الدافعية: هي تشجيع الأفراد وتحفيزهم للعمل أكثر.</p>
                                 <p className="pr-6 leading-relaxed">- اشرح العوامل المؤثرة في الدافعية.</p>
                            </AccordionItem>
                        </div>
                         <div>
                            <h3 className="font-bold text-xl p-5 bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300">الجزء الثاني: ( 04 نقاط)</h3>
                             <AccordionItem title="التمرين" isOpen={openAccordion === 't1p2'} onClick={() => handleAccordionClick('t1p2')}>
                                <p className="leading-relaxed">السوق: هو المكان الذي يلتقي فيه البائع والمشتري لتبادل السلع والخدمات.</p>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>اشرح أنواع الأسواق.</li>
                                    <li>اذكر أشكاله، ثم اشرح سوق المنافسة الكاملة (التامة).</li>
                                </ol>
                            </AccordionItem>
                        </div>
                    </div>
                     <footer className="text-center p-3 bg-gray-50 dark:bg-gray-900/30 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                        صفحة 1 من 2
                    </footer>
                </section>
                
                {/* Topic 2 */}
                <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <h2 className="text-2xl font-extrabold text-center p-5 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-b border-gray-200 dark:border-gray-700 tracking-wide">الموضوع الثاني</h2>
                    
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <div>
                            <h3 className="font-bold text-xl p-5 bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300">الجزء الأول: ( 16 نقطة )</h3>
                            <AccordionItem title="السؤال الأول : ( 05 نقاط )" isOpen={openAccordion === 't2q1'} onClick={() => handleAccordionClick('t2q1')}>
                                <p className="leading-relaxed">تعتبر البطالة ظاهرة اقتصادية واجتماعية تعاني منها العديد من الدول بما فيها الجزائر.</p>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>حدد أسباب البطالة.</li>
                                    <li>ماهي إجراءات التخفيف من ظاهرة البطالة؟</li>
                                </ol>
                            </AccordionItem>
                            <AccordionItem title="السؤال الثاني : ( 06 نقاط )" isOpen={openAccordion === 't2q2'} onClick={() => handleAccordionClick('t2q2')}>
                                <p className="leading-relaxed">تتخذ السلطة النقدية للبلاد في مجال الصرف عدة إجراءات وتدابير بغية تحقيق أهداف مسطرة.</p>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>اذكر أسباب الصرف.</li>
                                    <li>حدد أهداف سياسة الصرف.</li>
                                    <li>اشرح وسائل سياسة الصرف.</li>
                                </ol>
                            </AccordionItem>
                            <AccordionItem title="السؤال الثالث: ( 05 نقاط )" isOpen={openAccordion === 't2q3'} onClick={() => handleAccordionClick('t2q3')}>
                                <p className="leading-relaxed">تتولى المنظمة العالمية للتجارة " OMC " عملية الإشراف على مختلف المبادلات التجارية الخارجية.</p>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>عرّف المنظمة العالمية للتجارة.</li>
                                    <li>بيّن دور المنظمة العالمية للتجارة.</li>
                                </ol>
                            </AccordionItem>
                        </div>
                         <div>
                            <h3 className="font-bold text-xl p-5 bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300">الجزء الثاني: ( 04 نقاط)</h3>
                             <AccordionItem title="التمرين" isOpen={openAccordion === 't2p2'} onClick={() => handleAccordionClick('t2p2')}>
                                <p className="leading-relaxed">يعتبر الاتصال وسيلة هامة للتسيير.</p>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>عرّف الاتصال.</li>
                                    <li>اشرح مكوناته.</li>
                                </ol>
                            </AccordionItem>
                        </div>
                    </div>
                     <footer className="text-center p-3 bg-gray-50 dark:bg-gray-900/30 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                        صفحة 2 من 2
                    </footer>
                </section>
            </div>
        </div>
    );
};

export default Economics2013Lesson;