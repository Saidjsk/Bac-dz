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
                            {row.map((cell, cellIndex) => <td key={cellIndex} className="p-2 border border-gray-300 dark:border-gray-600">{cell}</td>)}
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
                            {/* FIX: Converted numerical values to strings to ensure consistent data types in columns that also contain string placeholders like '' or '...?...'. This resolves TypeScript errors related to type inference. */}
                            {renderTable(
                                ['رقم الحساب', 'اسم الحساب', 'مدین', 'دائن'],
                                [
                                    [151, 'مؤونة الأخطار', '', '120000'],
                                    [2182, 'معدات النقل', '...؟...', ''],
                                    [28182, 'اهتلاك معدات النقل', '', '1650000'],
                                    [31, 'المواد الأولية واللوازم', '300000', ''],
                                    [391, 'خسائر القيمة عن المواد الأولية والتوريدات', '', '50000'],
                                    [416, 'الزبائن المشكوك فيهم', '273700', ''],
                                    [491, 'خسائر القيمة عن حسابات الزبائن', '', '88000'],
                                    [616, 'أقساط التأمينات', '420000', '']
                                ],
                                'ميزان المراجعة قبل الجرد'
                            )}
                            <h4 className="font-bold text-lg mt-4">معلومات الجرد:</h4>
                            <ol className="list-decimal pr-6 space-y-2">
                                <li>مؤونة الأخطار متعلقة بنزاع قضائي مع أحد العمال، فصلت فيه المحكمة بتاريخ 2020/11/20 لصالح العامل وتم التسديد بشيك بنكي، وسُجل قيد التسديد في الدفتر اليومي.</li>
                                <li>معدات النقل تهتلك خطيا لمدة 5 سنوات، تم اقتناؤها بتاريخ 2017/04/01، سعر بيعها الصافي المحتمل بتاريخ 2020/12/31 يقدر بـ 700000 دج.</li>
                                <li>خسارة قيمة المواد الأولية والتوريدات أصبحت مبررة بـ 30% ، والباقي غير مبرر.</li>
                                <li>وضعية الزبائن المشكوك فيهم تتلخص في:
                                    {/* FIX: Converted numerical values to strings for type consistency within table columns. */}
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
                                            {/* FIX: Changed string literal "4" to a numeric value {4} for the colSpan prop to match React's expected type (number). */}
                                            <th className="p-2 border border-gray-300 dark:border-gray-600" colSpan={4}>الأصول</th>
                                            {/* FIX: Changed string literal "2" to a numeric value {2} for the colSpan prop. */}
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
                                        {/* FIX: Changed string literal colSpan props to numeric values. */}
                                        <tr className="font-bold bg-gray-50 dark:bg-gray-700/50"><td className="p-2 text-right border" colSpan={4}>الأصول غير الجارية</td><td className="p-2 text-right border" colSpan={2}>رؤوس الأموال الخاصة</td></tr>
                                        <tr><td className="p-2 border text-right">التثبيتات المعنوية</td><td className="p-2 border">360000</td><td className="p-2 border">60000</td><td className="p-2 border">300000</td><td className="p-2 border text-right">رأس المال</td><td className="p-2 border">1980000</td></tr>
                                        <tr><td className="p-2 border text-right">التثبيتات العينية</td><td className="p-2 border">3200000</td><td className="p-2 border">1200000</td><td className="p-2 border">2000000</td><td className="p-2 border text-right">النتيجة الصافية للسنة المالية</td><td className="p-2 border">450000 -</td></tr>
                                        <tr><td className="p-2 border text-right">التثبيتات المالية</td><td className="p-2 border">1000000</td><td className="p-2 border">64000</td><td className="p-2 border">936000</td><td className="p-2 border"></td><td className="p-2 border"></td></tr>
                                        <tr className="font-bold bg-gray-100 dark:bg-gray-700"><td className="p-2 border text-right">مج الأصول غير الجارية</td><td className="p-2 border">4560000</td><td className="p-2 border">1324000</td><td className="p-2 border">3236000</td><td className="p-2 border text-right">مج رؤوس الأموال الخاصة</td><td className="p-2 border">1530000</td></tr>

                                        {/* FIX: Changed string literal colSpan props to numeric values. */}
                                        <tr className="font-bold bg-gray-50 dark:bg-gray-700/50"><td colSpan={4}></td><td className="p-2 text-right border" colSpan={2}>الخصوم غير الجارية</td></tr>
                                        <tr><td colSpan={4}></td><td className="p-2 border text-right">الاقتراضات لدى مؤسسات القرض</td><td className="p-2 border">1200000</td></tr>
                                        <tr className="font-bold bg-gray-100 dark:bg-gray-700"><td colSpan={4}></td><td className="p-2 border text-right">مج الخصوم غير الجارية</td><td className="p-2 border">1200000</td></tr>

                                        {/* FIX: Changed string literal colSpan props to numeric values. */}
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
                             <h4 className="font-bold text-lg mt-4">2) معلومات إضافية:</h4>
                             <ul className="list-disc pr-6 space-y-2">
                                <li>من بين "المدينون الآخرون" مبلغ 80000 دج حساب الأعباء المعاينة مسبقا وهي خارج الاستغلال.</li>
                                <li>يتضمن حساب الموردون والحسابات الملحقة" حساب "موردو التثبيتات" فقط.</li>
                                <li>يتضمن حساب الضرائب الدائنة ضرائب على رقم الأعمال فقط.</li>
                            </ul>
                             <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-bold text-lg">العمل المطلوب:</h4>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>ما الهدف من إعداد الميزانية الوظيفية؟</li>
                                    <li>أنجز الميزانية الوظيفية بتاريخ 2020/12/31، مع إظهار العمليات الحسابية على ورقة الإجابة.</li>
                                    <li>احسب كل من:
                                        <ul className="list-disc pr-6 space-y-1 mt-1">
                                            <li>رأس المال العامل الصافي الإجمالي.</li>
                                            <li>احتياجات رأس المال العامل.</li>
                                            <li>الخزينة الصافية.</li>
                                            <li>نسبة التحرر المالي (نسبة الاستدانة المالية).</li>
                                        </ul>
                                    </li>
                                    <li>علق على الوضعية المالية للمؤسسة مع اقتراح الحلول.</li>
                                </ol>
                            </div>
                        </AccordionItem>
                    </div>
                     <footer className="text-center p-3 bg-gray-50 dark:bg-gray-900/30 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                        انتهى الموضوع الأول
                    </footer>
                </section>
                
                <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <h2 className="text-2xl font-extrabold text-center p-5 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-b border-gray-200 dark:border-gray-700 tracking-wide">الموضوع الثاني</h2>
                    
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <AccordionItem title="الجزء الأول: تحليل الكشوفات المالية (06 نقاط)" isOpen={openAccordion === 't2part1'} onClick={() => handleAccordionClick('t2part1')}>
                            <p>ليكن لديك السندين التاليين لمؤسسة "جبل سدات":</p>
                            <h4 className="font-bold text-lg mt-4">السند 1: معلومات متعلقة بقدرة التمويل الذاتي:</h4>
                            {renderTable(
                                ['البيان', '+', '-', 'المبالغ'],
                                [
                                    ['النتيجة الصافية للسنة المالية', '؟؟', '', ''],
                                    ['مخصصات الاهتلاكات والمؤونات وخسائر القيمة', '450000', '', ''],
                                    ['استرجاع على خسائر القيمة والمؤونات', '', '21000', ''],
                                    ['ح/752 فوائض القيمة عن خروج الأصول المثبتة غير المالية', '', '15000', ''],
                                    ['ح/652 نواقص القيمة عن خروج الأصول المثبتة غير المالية', '22000', '', ''],
                                    ['ح/765 +ح/767 (فارق التقييم عن أصول مالية – فوائض القيمة + الأرباح الصافية عن التنازل عن الأصول المالية)', '', '13000', ''],
                                    ['ح/665 +ح/667 (فارق التقييم عن أصول مالية – نواقص القيمة + الخسائر الصافية عن التنازل عن الأصول المالية)', '24000', '', ''],
                                    ['المجموع', '.......', '.......', ''],
                                    ['قدرة التمويل الذاتي', '', '', '1048020'],
                                ],
                                'قدرة التمويل الذاتي'
                            )}
                            <h4 className="font-bold text-lg mt-4">السند 2: أرصدة حساب النتائج حسب الطبيعة:</h4>
                            {renderTable(
                                ['البيان', 'المبالغ'],
                                [
                                    ['المبيعات والمنتجات الملحقة', '؟؟'],
                                    ['الإنتاج المخزن أو المنتقص من المخزون', '50000 -'],
                                    ['الإنتاج المثبت', '-'],
                                    ['اعانات الاستغلال', '-'],
                                    ['1. انتاج السنة المالية', '6950000'],
                                    ['المشتريات المستهلكة', '؟؟'],
                                    ['الخدمات الخارجية والاستهلاكات الأخرى', '250000'],
                                    ['2. استهلاك السنة المالية', '؟؟'],
                                    ['3. القيمة المضافة', '3500000'],
                                    ['أعباء المستخدمين', '2100000'],
                                    ['الضرائب والرسوم والمدفوعات المماثلة', '؟؟'],
                                    ['4. اجمالي فائض الاستغلال', '؟؟'],
                                    ['المنتوجات العملياتية الأخرى', '75000'],
                                    ['الأعباء العملياتية الأخرى', '62000'],
                                    ['مخصصات الاهتلاكات والمؤونات وخسائر القيمة', '؟؟'],
                                    ['استرجاع على خسائر القيمة والمؤونات', '؟؟'],
                                    ['5. النتيجة العملياتية', '؟؟'],
                                    ['المنتوجات المالية', '42000'],
                                    ['الأعباء المالية', '؟؟'],
                                    ['6. النتيجة المالية', '32000 -'],
                                    ['7. النتيجة العادية قبل الضرائب', '؟؟'],
                                    ['الضرائب الواجب دفعها عن النتائج العادية (19%)', '؟؟'],
                                    ['الضرائب المؤجلة (تغيرات) عن النتائج العادية', '؟؟'],
                                    ['8. النتيجة الصافية للأنشطة العادية', '؟؟'],
                                ],
                                'حساب النتائج حسب الطبيعة'
                            )}
                            <p className="text-sm mt-2"><b>ملاحظة:</b> حساب عناصر غير عادية – منتوجات وحساب عناصر غير عادية - أعباء: معدومان.</p>
                             <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-bold text-lg">المطلوب:</h4>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>احسب النتيجة الصافية للسنة المالية اعتمادا على السند 1.</li>
                                    <li>أكمل حساب النتائج حسب الطبيعة.</li>
                                    <li>احسب كل من:
                                        <ul className="list-disc pr-6 space-y-1 mt-1">
                                            <li>أ- معدل الادماج.</li>
                                            <li>ب- نسب تجزئة القيمة المضافة وعلق عليها.</li>
                                        </ul>
                                    </li>
                                </ol>
                            </div>
                        </AccordionItem>
                        <AccordionItem title="الجزء الثاني: أعمال نهاية السنة (06 نقاط)" isOpen={openAccordion === 't2part2'} onClick={() => handleAccordionClick('t2part2')}>
                            <p>من السجلات المحاسبية لشركة "النور" في 2020/12/31 استخرجنا المعلومات التالية:</p>
                             <ol className="list-decimal pr-6 space-y-2">
                                <li>سددت وسجلت الشركة مبلغ 50000 دج كتعويض للعامل "سمير" عن النزاع الذي كونت له مؤونة بنفس مبلغ السنة السابقة.</li>
                                <li>تحوي حافظة الأوراق المالية للشركة 500 سهم ثمن شرائها 1640 دج للسهم الواحد، وقد سجلت في السنة السابقة خسارة قيمة بـ 15000 دج، وبتاريخ 2020/06/20 تنازلت الشركة عن 350 سهم بسعر 1700 دج للسهم الواحد بشيك بنكي رقم 1805، والباقي قدر سعرها في السوق بتاريخ 2020/12/31 بـ 1595 دج للسهم.</li>
                                <li>حازت الشركة على معدات صناعية بمبلغ 12000000 دج بتاريخ 2018/03/01، مدتها النفعية 08 سنوات، تنازلت عن 20% منها في 2020/10/28 على الحساب وحققت ناقص قيمة بـ 500000 دج، قدرت القيمة السوقية لباقي المعدات الصناعية بتاريخ 2020/12/31 بمبلغ 5890000 دج.</li>
                                <li>الزبون "فريد" مدين بمبلغ 595000 دج متضمن الرسم في 2019/12/31 وسجلت له حينها خسارة قيمة بـ 30% من دينه، سدد خلال سنة 2020 مبلغ 238000 دج، وتبين بتاريخ 2020/12/31 أنه غير قادر على التسديد نهائيا، (معدل TVA: 19 %).</li>
                                <li>سددت الشركة في 2020/10/30 مبلغ 77000 دج أعباء إيجار محل عن الفترة الممتدة من 2020/11/01 الى 2021/05/30. علما أن عملية التسديد تم تسجيلها في الدفتر اليومي للشركة في حينها.</li>
                                <li>وعد المورد "نبيل" الشركة بمنحها محسومات مبلغها 24000 دج إلا أنه لم يرسل لها فاتورة الإنقاص إلى غاية 2020/12/31.</li>
                            </ol>
                            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-bold text-lg">المطلوب:</h4>
                                <p>أ) سجل عمليتي التنازل عن الأسهم والمعدات الصناعية، مع إظهار العمليات الحسابية على ورقة الإجابة.</p>
                                <p>ب) سجل قيود التسوية اللازمة في الدفتر اليومي لشركة "النور" بتاريخ 2020/12/31.</p>
                            </div>
                        </AccordionItem>
                        <AccordionItem title="الجزء الثالث: محاسبة التكاليف (08 نقاط)" isOpen={openAccordion === 't2part3'} onClick={() => handleAccordionClick('t2part3')}>
                             <p>تنتج وتبيع شركة "شيليا" المنتجين (P1) و (P2) باستعمال المادتين الأوليتين M1 و M2 في الورشتين 01 و 02. لشهر أفريل 2021 أعطيت لك المعلومات التالية:</p>
                             <ol className="list-decimal pr-6 space-y-3">
                                <li><b>المخزون الأولي:</b> المادة الأولية M2: 1500 كلغ بتكلفة 1595,6 دج للكلغ الواحد. المنتج (P1): 400 وحدة بتكلفة 8400 دج للوحدة.</li>
                                <li><b>مشتريات الفترة:</b> المادة الأولية M1: 1200 كلغ بسعر 900 دج للكلغ الواحد. المادة الأولية M2: 2500 كلغ بسعر 1520 دج للكلغ الواحد.</li>
                                <li><b>أعباء الشراء المباشرة على:</b> المادة الأولية M1: 36000 دج. المادة الأولية M2: 75000 دج.</li>
                                <li><b>انتاج واستعمالات الفترة:</b> انتاج 600 وحدة من المنتج (P1) باستعمال 700 كلغ من M1 و 2500 كلغ من M2. انتاج 400 وحدة من المنتج (P2) باستعمال 500 كلغ من M1 و 1500 كلغ من M2.</li>
                                <li><b>اليد العاملة المباشرة للإنتاج:</b> 02 ساعة لكل وحدة منتجة من المنتج (P1) بأجرة 150 دج للساعة الواحدة. 1,5 ساعة لكل وحدة منتجة من المنتج (P2) بأجرة 150 دج للساعة الواحدة.</li>
                                <li><b>الأعباء غير مباشرة:</b> مبينة في الجدول التالي مع الأخذ بعين الاعتبار مبلغ 12630 دج عناصر إضافية ومبلغ 5862,50 دج أعباء غير محملة:
                                    {renderTable(
                                        ['البيان', 'التموين', 'ورشة 01', 'ورشة 02', 'التوزيع'],
                                        [
                                            ['مجموع التوزيع الثانوي', '146400', '312000', '324000', '55750'],
                                            ['طبيعة وحدات العمل', '1000 دج مشترى', 'كلغ مواد أولية مستعملة', 'ساعة يد عمل مباشرة', '1000 دج من رقم الأعمال']
                                        ], 'توزيع الأعباء غير المباشرة'
                                    )}
                                </li>
                                <li><b>مبيعات الفترة:</b> 700 وحدة من المنتج (P1) بسعر بيع 12000 دج للوحدة. 250 وحدة من المنتج (P2) بسعر بيع 11000 دج للوحدة.</li>
                             </ol>
                            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-bold text-lg">العمل المطلوب:</h4>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>أتمم جدول توزيع الأعباء غير المباشرة.</li>
                                    <li>احسب تكلفة شراء المادتين الأوليتين M1 و M2. والتكلفة الوسطية المرجحة للمادة M2.</li>
                                    <li>احسب تكلفة إنتاج المنتج (P1) فقط، والتكلفة الوسطية المرجحة له.</li>
                                    <li>احسب سعر التكلفة والنتيجة التحليلية الإجمالية للمنتجين (P1) و (P2)، علما ان التكلفة الوسطية المرجحة للمنتج (P2) هي: 7704,75 دج للوحدة.</li>
                                    <li>احسب النتيجة التحليلية الصافية.</li>
                                </ol>
                                <p className="text-sm mt-2"><b>ملاحظة:</b> تقيم الإخراجات بالتكلفة الوسطية المرجحة للوحدة لمجموع الإدخالات مع مخزون أول المدة.</p>
                            </div>
                        </AccordionItem>
                    </div>
                     <footer className="text-center p-3 bg-gray-50 dark:bg-gray-900/30 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                        انتهى الموضوع الثاني
                    </footer>
                </section>
            </div>
        </div>
    );
};

export default Accounting2021Lesson;