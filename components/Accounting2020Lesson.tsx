import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

const Accounting2020Lesson: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<string | null>('t1part1');

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
                            <p>دورة: 2020</p>
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

                {/* الموضوع الأول */}
                <section className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <h2 className="text-2xl font-extrabold text-center p-5 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-b border-gray-200 dark:border-gray-700 tracking-wide">الموضوع الأول</h2>
                    
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <AccordionItem title="الجزء الأول: أعمال نهاية السنة (06 نقاط)" isOpen={openAccordion === 't1part1'} onClick={() => handleAccordionClick('t1part1')}>
                            <p className="leading-relaxed">تعتبر أعمال التسوية من بين أهم العمليات المحاسبية التي تنجزها المؤسسة في نهاية كل سنة مالية، ولهذا الغرض قدمت لك بعض الحالات للتسوية لمؤسسة " النجاح" كما يلي:</p>
                            <h4 className="font-bold text-lg mt-4">أولا: معدات النقل.</h4>
                            <p>من مخطط الاهتلاك لمعدات نقل تهتلك بطريقة الاهتلاك الخطي (الثابت) استخرجنا ما يلي:</p>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>تاريخ الاقتناء: 2016/07/03.</li>
                                <li>المدة النفعية: 05 سنوات.</li>
                                <li>القيمة المتبقية: معدومة (0).</li>
                                <li>الاهتلاك المتراكم بتاريخ 2018/12/31 بعد الجرد: 500000 دج.</li>
                                <li>خسارة القيمة: 100000 دج سجلت بتاريخ 2018/12/31.</li>
                                <li>تم التنازل عن معدات النقل بتاريخ: 2019/10/03 على الحساب مع تحقيق ناقص قيمة بمبلغ 30000 دج.</li>
                            </ul>

                            <h4 className="font-bold text-lg mt-4">ثانيا : القيم المنقولة للتوظيف:</h4>
                            <p>(ح/503) الأسهم الأخرى والسندات المخولة حقا في الملكية بياناتها موضحة في الجدول التالي:</p>
                            {renderTable(
                                ['البيان', 'الشراء', 'التنازل في 2019/10/30', 'القيمة السوقية في 2019/12/31'],
                                [
                                    ['الكمية', '150 سهم', '100 سهم', '50 سهم (المتبقية)'],
                                    ['السعر / القيمة', '2000 دج للسهم الواحد', '1900 دج للسهم الواحد (بشيك بنكي)', '2100 دج للسهم الواحد']
                                ],
                                'بيانات القيم المنقولة للتوظيف'
                            )}
                            
                            <h4 className="font-bold text-lg mt-4">ثالثا: معطيات أخرى بتاريخ الجرد في 2019/12/31 :</h4>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>للمؤسسة نزاع قضائي مع أحد عمالها نشأ بتاريخ 2019/08/20 وتتوقع دفع مبلغ 150000 دج كتعويض.</li>
                                <li>لم تستلم المؤسسة فاتورة إنقاص بمبلغ 10000 دج من أحد مورديها.</li>
                                <li>الزبون العادي" ليث " الذي يقدر دينه بـ 357000 دج متضمن الرسم على القيمة المضافة بمعدل 19% يحتمل تسديد 70% منه.</li>
                            </ul>
                            
                            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-bold text-lg">المطلوب:</h4>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>ما الهدف من أعمال نهاية السنة؟</li>
                                    <li>أنجز مخطط الاهتلاك لمعدات النقل إلى غاية تاريخ التنازل مع إظهار العمليات الحسابية.</li>
                                    <li>سجل في الدفتر اليومي عمليتي التنازل عن:
                                        <ul className="list-disc pr-4 mt-1">
                                            <li>أ- معدات النقل.</li>
                                            <li>ب- القيم المنقولة للتوظيف.</li>
                                        </ul>
                                    </li>
                                    <li>سجل في الدفتر اليومي قيود التسوية اللازمة بتاريخ 2019/12/31.</li>
                                </ol>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="الجزء الثاني: إعداد الكشوف المالية وتحليلها (06 نقاط)" isOpen={openAccordion === 't1part2'} onClick={() => handleAccordionClick('t1part2')}>
                           <p className="leading-relaxed">قدمت لك الميزانية الوظيفية لمؤسسة " الأطلس " بتاريخ 2019/12/31:</p>
                           <div className="overflow-x-auto my-4 text-sm">
                               <table className="w-full min-w-[600px] text-center border-collapse border border-gray-300 dark:border-gray-600">
                                   <thead className="bg-gray-100 dark:bg-gray-700 font-semibold">
                                       <tr>
                                           <th className="p-2 border border-gray-300 dark:border-gray-600">الأصول</th>
                                           <th className="p-2 border border-gray-300 dark:border-gray-600">المبالغ</th>
                                           <th className="p-2 border border-gray-300 dark:border-gray-600">%</th>
                                           <th className="p-2 border border-gray-300 dark:border-gray-600">الخصوم</th>
                                           <th className="p-2 border border-gray-300 dark:border-gray-600">المبالغ</th>
                                           <th className="p-2 border border-gray-300 dark:border-gray-600">%</th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                       <tr className="bg-gray-50 dark:bg-gray-800/50"><td className="p-2 border text-right">الاستخدامات الثابتة</td><td className="p-2 border">......</td><td className="p-2 border">....</td><td className="p-2 border text-right">الموارد الثابتة</td><td className="p-2 border">......</td><td className="p-2 border">....</td></tr>
                                       <tr><td></td><td></td><td></td><td className="p-2 border text-right">- الموارد الخاصة</td><td className="p-2 border">......</td><td className="p-2 border">50</td></tr>
                                       <tr><td></td><td></td><td></td><td className="p-2 border text-right">- الديون المالية</td><td className="p-2 border">......</td><td className="p-2 border">....</td></tr>
                                       <tr className="bg-gray-50 dark:bg-gray-800/50"><td className="p-2 border text-right">الأصول المتداولة</td><td className="p-2 border">......</td><td className="p-2 border">....</td><td className="p-2 border text-right">الخصوم المتداولة</td><td className="p-2 border">......</td><td className="p-2 border">....</td></tr>
                                       <tr><td className="p-2 border text-right">- للاستغلال</td><td className="p-2 border">......</td><td className="p-2 border">22</td><td className="p-2 border text-right">- للاستغلال</td><td className="p-2 border">......</td><td className="p-2 border">20</td></tr>
                                       <tr><td className="p-2 border text-right">- خارج الاستغلال</td><td className="p-2 border">......</td><td className="p-2 border">....</td><td className="p-2 border text-right">- خارج الاستغلال</td><td className="p-2 border">......</td><td className="p-2 border">15</td></tr>
                                       <tr><td className="p-2 border text-right">- خزينة الأصول</td><td className="p-2 border">......</td><td className="p-2 border">10</td><td className="p-2 border text-right">- خزينة الخصوم</td><td className="p-2 border">......</td><td className="p-2 border">....</td></tr>
                                       <tr className="font-bold bg-gray-100 dark:bg-gray-700"><td className="p-2 border text-right">المجموع</td><td className="p-2 border">......</td><td className="p-2 border">100</td><td className="p-2 border text-right">المجموع</td><td className="p-2 border">......</td><td className="p-2 border">100</td></tr>
                                   </tbody>
                               </table>
                           </div>
                           <h4 className="font-bold text-lg mt-4">معلومات إضافية:</h4>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>رأس المال العامل الصافي الإجمالي (FRNG) = الديون المالية.</li>
                                <li>احتياجات رأس المال العامل (BFR) = 100000 دج.</li>
                                <li>نسبة تمويل (تغطية) الاستخدامات الثابتة = 1,2.</li>
                                <li>كانت أرصدة بعض الحسابات للدورتين 2018 و 2019 كما يلي:</li>
                                {renderTable(
                                    ['الحساب', '2018/12/31', '2019/12/31'],
                                    [
                                        ['الزبائن والحسابات الملحقة', '120000', '140000'],
                                        ['الموردون والحسابات الملحقة', '260000', '160000'],
                                        ['مخزونات البضائع', '60000', '120000']
                                    ],
                                    'أرصدة الحسابات'
                                )}
                                <li>مبيعات سنة 2019: 1560000 دج.</li>
                                <li>مشتريات سنة 2019: 1260000 دج.</li>
                                <li>تكلفة شراء البضاعة المباعة: 1350000 دج.</li>
                            </ul>
                            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-bold text-lg">المطلوب:</h4>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>أكمل الميزانية الوظيفية أعلاه مع تبرير العمليات الحسابية على ورقة الإجابة.</li>
                                    <li>احسب الخزينة الصافية ونسبة الاستدانة المالية للمؤسسة.</li>
                                    <li>احسب المدة المتوسطة لكل من: أ ـ مخزونات البضائع - ب ـ الزبائن - ج ـ الموردين.</li>
                                    <li>علق على الوضعية المالية للمؤسسة.</li>
                                </ol>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="الجزء الثالث: إعداد الكشوف المالية وتحليلها (08 نقاط)" isOpen={openAccordion === 't1part3'} onClick={() => handleAccordionClick('t1part3')}>
                            <h4 className="font-bold text-lg">أولا: من حساب النتائج حسب الوظيفة لمؤسسة "الأحلام" لدورة 2019 استخرجنا ما يلي:</h4>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>هامش الربح الإجمالي: 3000000 دج.</li>
                                <li>التكاليف التجارية: 200000 دج.</li>
                                <li>الأعباء الإدارية: 300000 دج.</li>
                                <li>الأعباء المالية: 900000 دج.</li>
                                <li>النتيجة المالية: -700000 دج (سالبة).</li>
                                <li>الضرائب الواجبة دفعها على النتائج العادية: 500000 دج.</li>
                                <li><span className="font-semibold">ملاحظة:</span> الحسابات التالية معدومة: الحساب 67، الحساب 77، الحساب 78.</li>
                            </ul>
                             <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-bold text-lg">المطلوب:</h4>
                                <p>أنجز حساب النتائج حسب الوظيفة مع إظهار العمليات الحسابية علما أنّ:</p>
                                <ul className="list-disc pr-6 space-y-2">
                                    <li>رقم الأعمال = 2,5 هامش الربح الإجمالي.</li>
                                    <li>المنتوجات العملياتية الأخرى = ضعف الأعباء العملياتية الأخرى.</li>
                                    <li>معدل الضرائب على النتائج العادية 25%.</li>
                                </ul>
                            </div>
                             <h4 className="font-bold text-lg mt-4">ثانيا: إذا علمت أن:</h4>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>معدل الإدماج = 0,1.</li>
                                <li>نسبة استفادة المستخدمين من القيمة المضافة = 40 %.</li>
                                <li>نسبة استفادة الدولة من القيمة المضافة = 20 %.</li>
                                <li>ح/752 فوائض القيمة عن خروج الأصول المثبتة غير المالية: 50000 دج.</li>
                                <li>ح/652 نواقص القيمة عن خروج الأصول المثبتة غير المالية: 170000 دج.</li>
                                <li>حـ/765 فارق التقييم عن أصول مالية - فوائض القيمة: 50000 دج.</li>
                                <li>ح/767 الأرباح الصافية عن عمليات التنازل عن أصول مالية: 70000 دج.</li>
                                <li>ح/665 فارق التقييم عن أصول مالية - نواقص القيمة: 350000 دج.</li>
                                <li>حـ/667 الخسائر الصافية عن عمليات التنازل عن أصول مالية: 420000 دج.</li>
                            </ul>
                             <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-bold text-lg">المطلوب:</h4>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>احسب قيمة اجمالي فائض الاستغلال.</li>
                                    <li>احسب قدرة التمويل الذاتي انطلاقا من إجمالي فائض الاستغلال.</li>
                                </ol>
                            </div>
                        </AccordionItem>
                    </div>
                    <footer className="text-center p-3 bg-gray-50 dark:bg-gray-900/30 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">انتهى الموضوع الأول</footer>
                </section>

                {/* الموضوع الثاني */}
                <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <h2 className="text-2xl font-extrabold text-center p-5 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-b border-gray-200 dark:border-gray-700 tracking-wide">الموضوع الثاني</h2>
                    
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <AccordionItem title="الجزء الأول: أعمال نهاية السنة (06 نقاط)" isOpen={openAccordion === 't2part1'} onClick={() => handleAccordionClick('t2part1')}>
                            <p>من الدفاتر المحاسبية لمؤسسة " الآفاق " بتاريخ 2019/12/31 قبل الجرد استخرجنا المعلومات التالية:</p>
                            <h4 className="font-bold text-lg mt-4">1- مساهمات وحسابات دائنة ملحقة بمساهمات (ح/26):</h4>
                            {renderTable(
                                ['السندات', 'عدد السندات', 'تكلفة حيازة السند الواحد', 'سعر البيع المحتمل للسند في 2018/12/31', 'سعر البيع المحتمل للسند في 2019/12/31'],
                                [['A', 250, 1200, 1150, 1200], ['B', 120, 800, 800, 790]],
                                'بيانات المساهمات'
                            )}
                            <p className="mt-2">في 2019/11/15 تمّ التنازل عن 180 سند من النوع "A" بسعر 1160 دج للسند بشيك بنكي. <span className="font-semibold">ملاحظة:</span> المحاسب إلى غاية 2019/12/31 لم يسجل عملية التنازل.</p>

                            <h4 className="font-bold text-lg mt-4">2- الزبائن والحسابات الملحقة:</h4>
                            {renderTable(
                                ['الزبائن', 'مبلغ الدين متضمن الرسم', 'خسارة القيمة في 2018/12/31', 'المبلغ المسدد خلال 2019', 'الوضعية في 2019/12/31'],
                                [
                                    ['مؤسسة الهقار', 416500, '10% من الدين', 154700, 'سيسدد مبلغ 261800 دج'],
                                    ['مؤسسة المرجان', 333200, 'ــــــ', 95200, 'سيسدد 88% من الرصيد'],
                                    ['مؤسسة الندى', '...؟...', '86000 تمثل 20% من الدين', 178500, 'حالة إفلاس مؤكدة']
                                ],
                                'بيانات الزبائن'
                            )}
                            <p className="mt-2 text-sm"><span className="font-semibold">ملاحظة:</span> - معدل الرسم على القيمة المضافة المطبق 19%. - كل المبالغ المسددة خلال سنة 2019 تم تسجيلها محاسبيا.</p>

                            <h4 className="font-bold text-lg mt-4">3- البنوك الحسابات الجارية:</h4>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>في 2019/12/31 كان رصيد حساب البنك لدى المؤسسة مدين بـ 340000 دج بينما كان كشف البنك المرسل للمؤسسة يظهر رصيد دائن بـ 395000 دج.</li>
                                <li>يعود سبب الاختلاف بين الرصيدين إلى:
                                    <ul className="list-disc pr-4 mt-1">
                                        <li>تحويل مباشر لمبلغ 30000 دج من الزبون "ياسين" إلى الحساب البنكي للمؤسسة دون إشعارها.</li>
                                        <li>خدمات مصرفية بمبلغ 2400 دج.</li>
                                        <li>شيك للمورد "يوسف" لم يقدمه لتحصيل مبلغه 20000 دج.</li>
                                        <li>فوائد بنكية لصالح المؤسسة بمبلغ 7400 دج.</li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-bold text-lg">العمل المطلوب:</h4>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>أنجز حالة التقارب البنكي.</li>
                                    <li>سجل قيود التسوية في الدفتر اليومي لمؤسسة " الآفاق " بتاريخ 2019/12/31 مع إظهار العمليات الحسابية على ورقة الاجابة.</li>
                                </ol>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="الجزء الثاني: اعداد الكشوف المالية وتحليلها (06 نقاط)" isOpen={openAccordion === 't2part2'} onClick={() => handleAccordionClick('t2part2')}>
                            <p>المعلومات التالية مستخرجة من حساب النتائج لمؤسسة " النجاح" التجارية في 2019/12/31:</p>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>مجموع منتوجات الأنشطة العادية: 3520000 دج.</li>
                                <li>مجموع أعباء الأنشطة العادية: 2837500 دج.</li>
                                <li>معدل الضريبة على الأرباح: 25%.</li>
                                <li>النتيجة المالية: -40000 دج (سالبة).</li>
                                <li>حـ/66 الأعباء المالية: 120000 دج.</li>
                                <li>حـ/65 الأعباء العملياتية = 90000 دج.</li>
                                <li>حـ/600 مشتريات البضائع المبيعة يمثل 90% من حـ/60 المشتريات المستهلكة.</li>
                                <li>حـ/74 إعانات الاستغلال: 200000 دج.</li>
                                <li>حـ/75 المنتوجات العملياتية الأخرى = حـ/78 الاسترجاعات عن خسائر القيمة والمؤونات.</li>
                                <li>الحسابان (حـ/77 وحـ/67) معدومان.</li>
                                <li>هامش الربح الإجمالي يمثل 36% من رقم الأعمال.</li>
                            </ul>
                            <h4 className="font-bold text-lg mt-4">جدول إعادة ترتيب الأعباء حسب الطبيعة:</h4>
                            {renderTable(
                                ['البيان', 'حـ/(602+608)', 'حـ/61 + حـ/62', 'حـ/63', 'حـ/64', 'حـ/68'],
                                [
                                    ['وظيفة الشراء', 80000, 160000, 760000, 75000, 145000],
                                    ['الوظيفة التجارية', 10000, 35000, 50000, 13000, 30000],
                                    ['وظيفة الإدارة', 10000, 5000, 90000, 12000, 25000]
                                ],
                                'إعادة ترتيب الأعباء'
                            )}
                            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-bold text-lg">العمل المطلوب:</h4>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>أنجز جدول حساب النتائج حسب الوظيفة.</li>
                                    <li>أنجز جدول حساب النتائج حسب الطبيعة.</li>
                                    <li>احسب معدل الادماج.</li>
                                </ol>
                            </div>
                        </AccordionItem>

                        <AccordionItem title="الجزء الثالث: أعمال نهاية السنة (08 نقاط)" isOpen={openAccordion === 't2part3'} onClick={() => handleAccordionClick('t2part3')}>
                            <p>من ميزان المراجعة قبل الجرد لمؤسسة "الأمل" بتاريخ 2019/12/31 استخرجنا أرصدة الحسابات التالية:</p>
                            {renderTable(
                                ['رقم الحساب', 'اسم الحساب', 'مدين', 'دائن'],
                                [
                                    [2182, 'معدات النقل', 8000000, ''],
                                    [28182, 'اهتلاك معدات النقل', '', 3840000],
                                    [30, 'مخزونات البضائع', 300000, ''],
                                    [380, 'البضائع المخزنة', 4500000, ''],
                                    [390, 'خسائر القيمة عن مخزونات البضائع', '', 30000],
                                    [616, 'أقساط التأمينات', 56000, ''],
                                    [706, 'تقديم الخدمات الأخرى', '', 72600]
                                ],
                                'أرصدة الحسابات'
                            )}
                            <h4 className="font-bold text-lg mt-4">معلومات الجرد في 2019/12/31:</h4>
                            <ol className="list-decimal pr-6 space-y-2">
                                <li>خصصت المؤسسة مبلغ 100000 دج لإعادة تأهيل مخزن المؤسسة.</li>
                                <li>معدات النقل تهتلك اهتلاكا متناقصا لمدة 5 سنوات وتتكون من:
                                    <ul className="list-disc pr-4 mt-1">
                                        <li>سيارة نفعية: تم اقتناؤها بتاريخ 2019/01/02 بقيمة 2000000 دج.</li>
                                        <li>شاحنة: تم اقتناؤها بتاريخ 2017/01/04، وتنازلت عنها المؤسسة بتاريخ 2019/09/30 بمبلغ 1200000 دج بشيك بنكي، علما أن المحاسب إلى غاية 2019/12/31 لم يسجل أي قيد.</li>
                                    </ul>
                                </li>
                                <li>تتبع المؤسسة طريقة الجرد المتناوب في إدراج مخزون البضائع، حيث أثبت:
                                    <ul className="list-disc pr-4 mt-1">
                                        <li>الجرد المادي (خارج المحاسبة): 420000 دج.</li>
                                        <li>القيمة السوقية: 400000 دج.</li>
                                    </ul>
                                </li>
                                <li>أقساط التأمينات متعلقة بالفترة الممتدة من 2019/10/01 إلى غاية 2020/06/01.</li>
                                <li>لم تستلم المؤسسة فاتورة إنقاص متعلقة بتخفيض تجاري قدره 4 % على مشتريات شهر ديسمبر المقدرة بـ 400000 دج.</li>
                                <li>مبلغ تقديم الخدمات الأخرى يتعلق بتأجير مستودع للغير للفترة الممتدة من 2019/09/01 إلى غاية 2020/03/01.</li>
                                <li>بتاريخ 2019/12/31 تبين أن المؤسسة لم تحرر فاتورة لمبيعات البضائع بمبلغ 160000 دج علما أن البضائع سلمت للزبون بتاريخ 2019/11/07 وسجل قيد التسليم في يومه.</li>
                            </ol>
                            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-bold text-lg">العمل المطلوب:</h4>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>إعداد مخطط الاهتلاك للسيارة النفعية.</li>
                                    <li>بالنسبة للشاحنة:
                                        <ul className="list-disc pr-4 mt-1">
                                            <li>أ- احسب القيمة الأصلية.</li>
                                            <li>ب- احسب وسجل في الدفتر اليومي قسط الاهتلاك لدورة 2019.</li>
                                            <li>ج- سجل قيد التنازل.</li>
                                        </ul>
                                    </li>
                                    <li>سجل قيود التسوية اللازمة بالدفتر اليومي لمؤسسة "الأمل" في 2019/12/31.</li>
                                </ol>
                            </div>
                        </AccordionItem>
                    </div>
                    <footer className="text-center p-3 bg-gray-50 dark:bg-gray-900/30 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">انتهى الموضوع الثاني</footer>
                </section>
            </div>
        </div>
    );
};

export default Accounting2020Lesson;
