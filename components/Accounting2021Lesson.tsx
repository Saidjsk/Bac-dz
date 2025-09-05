import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

const Accounting2021Lesson: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<string | null>('part1');

    const handleAccordionClick = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const renderTable = (headers: string[], data: (string | number)[][], caption: string) => (
        <div className="overflow-x-auto my-4">
            <table className="w-full min-w-max text-sm text-center text-gray-700 dark:text-gray-300 border-collapse border border-gray-300 dark:border-gray-600">
                <caption className="caption-bottom text-xs text-gray-500 dark:text-gray-400 py-1">{caption}</caption>
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        {headers.map(header => <th key={header} className="p-2 border border-gray-300 dark:border-gray-600 font-semibold">{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="odd:bg-white dark:odd:bg-gray-800 even:bg-gray-50 dark:even:bg-gray-800/50">
                            {row.map((cell, cellIndex) => <td key={cellIndex} className="p-2 border border-gray-300 dark:border-gray-600">{String(cell)}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="bg-transparent" dir="rtl">
            <div className="p-4 sm:p-6">
                <header className="text-center border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-8 bg-white dark:bg-gray-800 shadow-sm text-gray-800 dark:text-gray-200">
                    <div className="flex justify-between items-start text-xs sm:text-base">
                        <div className="text-center">
                            <p className="font-semibold">الجمهورية الجزائرية الديمقراطية الشعبية</p>
                            <p>وزارة التربية الوطنية</p>
                        </div>
                         <img src="https://www.bac-onec-dz.net/images/logo-bac.png" alt="Bac Logo" className="w-16 h-16" />
                        <div className="text-center">
                            <p className="font-semibold">الديوان الوطني للامتحانات والمسابقات</p>
                            <p>دورة: 2021</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="font-bold text-lg">امتحان بكالوريا التعليم الثانوي</p>
                        <p>الشعبة: تسيير واقتصاد</p>
                    </div>
                    <div className="flex justify-between mt-2 font-bold text-sm sm:text-base">
                        <span>اختبار في مادة: التسيير المحاسبي والمالي</span>
                        <span>المدة: 04 سا و 30 د</span>
                    </div>
                </header>

                <div className="text-center my-8 font-bold text-lg text-gray-700 dark:text-gray-300">
                    <p>على المترشح أن يختار أحد الموضوعين الآتيين:</p>
                </div>

                <section className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <h2 className="text-2xl font-extrabold text-center p-5 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-b border-gray-200 dark:border-gray-700 tracking-wide">الموضوع الأول</h2>
                    
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <AccordionItem title="الجزء الأول: أعمال نهاية السنة (06 نقاط)" isOpen={openAccordion === 'part1'} onClick={() => handleAccordionClick('part1')}>
                            <p className="leading-relaxed">من ميزان المراجعة قبل الجرد لمؤسسة " دباغ " الإنتاجية بتاريخ 2020/12/31 قدمت لك أرصدة بعض الحسابات:</p>
                            {renderTable(
                                ['رقم الحساب', 'اسم الحساب', 'مدین', 'دائن'],
                                [
                                    ['151', 'مؤونة الأخطار', '', '120000'],
                                    ['2182', 'معدات النقل', '...؟...', ''],
                                    ['28182', 'اهتلاك معدات النقل', '', '1650000'],
                                    ['31', 'المواد الأولية واللوازم', '300000', ''],
                                    ['391', 'خسائر القيمة عن المواد الأولية والتوريدات', '', '50000'],
                                    ['416', 'الزبائن المشكوك فيهم', '273700', ''],
                                    ['491', 'خسائر القيمة عن حسابات الزبائن', '', '88000'],
                                    ['616', 'أقساط التأمينات', '420000', '']
                                ],
                                'ميزان المراجعة قبل الجرد'
                            )}
                            <h4 className="font-bold text-lg mt-4">معلومات الجرد:</h4>
                            <ol className="list-decimal pr-6 space-y-2">
                                <li>مؤونة الأخطار متعلقة بنزاع قضائي مع أحد العمال، فصلت فيه المحكمة بتاريخ 2020/11/20 لصالح العامل وتم التسديد بشيك بنكي، وسُجل قيد التسديد في الدفتر اليومي.</li>
                                <li>معدات النقل تهتلك خطيا لمدة 5 سنوات، تم اقتناؤها بتاريخ 2017/04/01، سعر بيعها الصافي المحتمل بتاريخ 2020/12/31 يقدر بـ 700000 دج.</li>
                                <li>خسارة قيمة المواد الأولية والتوريدات أصبحت مبررة بـ 30% ، والباقي غير مبرر.</li>
                                <li>وضعية الزبائن المشكوك فيهم تتلخص في:
                                    {renderTable(
                                        ['الزبائن المشكوك فيهم', 'مبلغ الدين متضمن الرسم TTC', 'خسارة القيمة بتاريخ 2019/12/31', 'التحصيلات خلال دورة 2020', 'الوضعية بتاريخ 2020/12/31'],
                                        [
                                            ['نسیم', '202300', '%20', '83300', 'حالة إفلاس نهائي'],
                                            ['مهدي', '...؟...', '...؟...', '59500', 'الخسارة المتوقعة 35% من الرصيد']
                                        ],
                                        'وضعية الزبائن'
                                    )}
                                    <p className="leading-relaxed mt-2 text-sm"><strong className="font-semibold">ملاحظة:</strong> التحصيلات خلال دورة 2020 مسجلة، معدل الرسم على القيمة المضافة المطبق 19%.</p>
                                </li>
                                <li>أقساط التأمينات المسجلة متعلقة بالفترة من 2020/09/01 إلى 2021/03/01.</li>
                                <li>لم تستلم المؤسسة فاتورة الكهرباء والغاز للثلاثي الأخير من سنة 2020 بمبلغ 85000 دج.</li>
                            </ol>
                             <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-bold text-lg">العمل المطلوب:</h4>
                                <p className="leading-relaxed">سجل في الدفتر اليومي للمؤسسة قيود التسوية الضرورية بتاريخ 2020/12/31، مع إظهار العمليات الحسابية على ورقة الإجابة.</p>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="الجزء الثاني: إعداد الكشوف المالية وتحليلها (06 نقاط)" isOpen={openAccordion === 'part2'} onClick={() => handleAccordionClick('part2')}>
                            <p className="leading-relaxed">من حساب النتائج حسب الوظيفة لمؤسسة "الحكمة" بتاريخ 2020/12/31 قدمت لك المعلومات التالية:</p>
                            <ul className="list-disc list-inside pr-4 space-y-2">
                                <li>الضرائب واجبة الدفع عن النتائج العادية 90000 دج.</li>
                                <li>معدل الضرائب على النتائج العادية 25%.</li>
                                <li>النتيجة المالية تُمثل 20% من النتيجة العملياتية.</li>
                                <li>الأعباء المالية 15000 دج.</li>
                                <li>المنتوجات المالية ...؟... دج.</li>
                                <li>النتيجة العملياتية تُمثل 60% من هامش الربح الإجمالي.</li>
                                <li>كلفة المبيعات تُمثل 60% من رقم الأعمال.</li>
                                <li>التكاليف التجارية تمثل 1,2 من الأعباء الإدارية.</li>
                                <li>الأعباء الإدارية تمثل 1,5 من الأعباء العملياتية الأخرى.</li>
                                <li>الأعباء العملياتية الأخرى 100000 دج.</li>
                                <li>الاسترجاعات عن خسائر القيمة والمؤونات 30000 دج.</li>
                                <li>المنتوجات العملياتية الأخرى تمثل ضعف الأعباء العملياتية الأخرى.</li>
                                <li>الحسابان ح/77، ح/67 (عناصر غير عادية – منتوجات وعناصر غير عادية – أعباء) معدومان.</li>
                            </ul>
                            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-bold text-lg">العمل المطلوب:</h4>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>أنجز حساب النتائج حسب الوظيفة، مع إظهار العمليات الحسابية على ورقة الإجابة.</li>
                                    <li>احسب نسبة المردودية المالية، علما ان مبلغ رؤوس الأموال الخاصة يقدر بـ 7200000 دج.</li>
                                </ol>
                            </div>
                        </AccordionItem>
                        
                        <AccordionItem title="الجزء الثالث: إعداد وتحليل الميزانية الوظيفية (08 نقاط)" isOpen={openAccordion === 'part3'} onClick={() => handleAccordionClick('part3')}>
                             <p className="leading-relaxed">من أجل إعداد وتحليل الميزانية الوظيفية لمؤسسة "صحراء" التجارية بتاريخ 2020/12/31 قدمت لك المعلومات التالية:</p>
                            <h4 className="font-bold text-lg mt-4">1) الميزانية المحاسبية بتاريخ 2020/12/31:</h4>
                            <div className="overflow-x-auto my-4 text-sm text-center text-gray-700 dark:text-gray-300">
                                <table className="w-full min-w-[640px] border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-700 font-semibold">
                                        <tr>
                                            <th className="p-2 border border-gray-300 dark:border-gray-600" colSpan={4}>الأصول</th>
                                            <th className="p-2 border border-gray-300 dark:border-gray-600" colSpan={2}>الخصوم</th>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 dark:border-gray-600">الأصول</th>
                                            <th className="p-2 border border-gray-300 dark:border-gray-600">القيمة الإجمالية</th>
                                            <th className="p-2 border border-gray-300 dark:border-gray-600">الإهتلاكات وخسائر القيمة</th>
                                            <th className="p-2 border border-gray-300 dark:border-gray-600">القيمة الصافية</th>
                                            <th className="p-2 border border-gray-300 dark:border-gray-600">الخصوم</th>
                                            <th className="p-2 border border-gray-300 dark:border-gray-600">المبالغ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="font-bold bg-gray-50 dark:bg-gray-700/50"><td className="p-2 text-right border" colSpan={4}>الأصول غير الجارية</td><td className="p-2 text-right border" colSpan={2}>رؤوس الأموال الخاصة</td></tr>
                                        <tr><td className="p-2 border text-right">التثبيتات المعنوية</td><td className="p-2 border">360000</td><td className="p-2 border">60000</td><td className="p-2 border">300000</td><td className="p-2 border text-right">رأس المال</td><td className="p-2 border">1980000</td></tr>
                                        <tr><td className="p-2 border text-right">التثبيتات العينية</td><td className="p-2 border">3200000</td><td className="p-2 border">1200000</td><td className="p-2 border">2000000</td><td className="p-2 border text-right">النتيجة الصافية للسنة المالية</td><td className="p-2 border">450000 -</td></tr>
                                        <tr><td className="p-2 border text-right">التثبيتات المالية</td><td className="p-2 border">1000000</td><td className="p-2 border">64000</td><td className="p-2 border">936000</td><td className="p-2 border"></td><td className="p-2 border"></td></tr>
                                        <tr className="font-bold bg-gray-100 dark:bg-gray-700"><td className="p-2 border text-right">مج الأصول غير الجارية</td><td className="p-2 border">4560000</td><td className="p-2 border">1324000</td><td className="p-2 border">3236000</td><td className="p-2 border text-right">مج رؤوس الأموال الخاصة</td><td className="p-2 border">1530000</td></tr>

                                        <tr className="font-bold bg-gray-50 dark:bg-gray-700/50"><td colSpan={4}></td><td className="p-2 text-right border" colSpan={2}>الخصوم غير الجارية</td></tr>
                                        <tr><td colSpan={4}></td><td className="p-2 border text-right">الاقتراضات لدى مؤسسات القرض</td><td className="p-2 border">1200000</td></tr>
                                        <tr className="font-bold bg-gray-100 dark:bg-gray-700"><td colSpan={4}></td><td className="p-2 border text-right">مج الخصوم غير الجارية</td><td className="p-2 border">1200000</td></tr>

                                        <tr className="font-bold bg-gray-50 dark:bg-gray-700/50"><td className="p-2 text-right border" colSpan={4}>الأصول الجارية</td><td className="p-2 text-right border" colSpan={2}>الخصوم الجارية</td></tr>
                                        <tr><td className="p-2 border text-right">مخزونات البضائع</td><td className="p-2 border">300000</td><td className="p-2 border">16000</td><td className="p-2 border">284000</td><td className="p-2 border text-right">الموردون والحسابات الملحقة</td><td className="p-2 border">660000</td></tr>
                                        <tr><td className="p-2 border text-right">الزبائن والحسابات الملحقة</td><td className="p-2 border">200000</td><td className="p-2 border">10000</td><td className="p-2 border">190000</td><td className="p-2 border text-right">الضرائب الدائنة</td><td className="p-2 border">300000</td></tr>
                                        <tr><td className="p-2 border text-right">المدينون الآخرون</td><td className="p-2 border">240000</td><td className="p-2 border">-</td><td className="p-2 border">240000</td><td className="p-2 border text-right">المساهمات البنكية الجارية</td><td className="p-2 border">960000</td></tr>
                                        <tr><td className="p-2 border text-right">القيم المنقولة للتوظيف</td><td className="p-2 border">520000</td><td className="p-2 border">-</td><td className="p-2 border">520000</td><td className="p-2 border"></td><td className="p-2 border"></td></tr>
                                        <tr><td className="p-2 border text-right">البنوك الحسابات الجارية</td><td className="p-2 border">120000</td><td className="p-2 border">-</td><td className="p-2 border">120000</td><td className="p-2 border"></td><td className="p-2 border"></td></tr>
                                        <tr><td className="p-2 border text-right">الصندوق</td><td className="p-2 border">60000</td><td className="p-2 border">-</td><td className="p-2 border">60000</td><td className="p-2 border"></td><td className="p-2 border"></td></tr>
                                        <tr className="font-bold bg-gray-100 dark:bg-gray-700"><td className="p-2 border text-right">مجموع الأصول الجارية</td><td className="p-2 border">1440000</td><td className="p-2 border">26000</td><td className="p-2 border">1414000</td><td className="p-2 border text-right">مجموع الخصوم الجارية</td><td className="p-2 border">1920000</td></tr>
                                        <tr className="font-extrabold bg-gray-200 dark:bg-gray-600"><td className="p-2 border text-right">المجموع العام للأصول</td><td className="p-2 border">6000000</td><td className="p-2 border">1350000</td><td className="p-2 border">4650000</td><td className="p-2 border text-right">المجموع العام للخصوم</td><td className="p-2 border">4650000</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </AccordionItem>
                    </div>
                    <footer className="text-center p-3 bg-gray-50 dark:bg-gray-900/30 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                        انتهى الموضوع الأول
                    </footer>
                </section>
            </div>
        </div>
    );
};

// FIX: Add default export to the component
export default Accounting2021Lesson;
