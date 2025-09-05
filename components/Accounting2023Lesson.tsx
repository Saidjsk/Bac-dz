import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

const Accounting2023Lesson: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const handleAccordionClick = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const renderTable = (headers: (string|React.ReactNode)[], data: (string | number)[][], caption: string) => (
        <div className="overflow-x-auto my-4">
            <table className="w-full min-w-max text-sm text-center text-gray-700 dark:text-gray-300 border-collapse border border-gray-300 dark:border-gray-600">
                <caption className="caption-bottom text-xs text-gray-500 dark:text-gray-400 py-1">{caption}</caption>
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        {headers.map((header, index) => <th key={index} className="p-2 border border-gray-300 dark:border-gray-600 font-semibold">{header}</th>)}
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
                            <p>دورة: 2023</p>
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
                        <AccordionItem title="الجزء الأول: إعداد الكشوف المالية وتحليلها (06 نقاط)" isOpen={openAccordion === 't1p1'} onClick={() => handleAccordionClick('t1p1')}>
                            <p className="text-gray-700 dark:text-gray-300">من أجل إعداد الميزانية الوظيفية لمؤسسة " القنادسة" تُقدّم لك الميزانية المحاسبية في 2022/12/31:</p>
                            <div className="overflow-x-auto my-4 text-sm">
                               <table className="w-full min-w-[600px] text-center border-collapse border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                                   <caption className="caption-top font-bold mb-2 text-gray-800 dark:text-gray-200">جانب الأصول</caption>
                                   <thead className="bg-gray-100 dark:bg-gray-700 font-semibold">
                                       <tr>
                                           <th className="p-2 border border-gray-300 dark:border-gray-600">الأصول</th>
                                           <th className="p-2 border border-gray-300 dark:border-gray-600">القيمة الإجمالية</th>
                                           <th className="p-2 border border-gray-300 dark:border-gray-600">الاهتلاكات وخسائر القيمة</th>
                                           <th className="p-2 border border-gray-300 dark:border-gray-600">القيمة المحاسبية الصافية</th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                       <tr className="font-bold bg-gray-50 dark:bg-gray-700/50"><td className="p-2 text-right border" colSpan={4}>الأصول غير الجارية</td></tr>
                                       <tr><td className="p-2 border text-right">التثبيتات المعنوية</td><td className="p-2 border">400000</td><td className="p-2 border">160000</td><td className="p-2 border">240000</td></tr>
                                       <tr><td className="p-2 border text-right">التثبيتات العينية</td><td className="p-2 border">1040000</td><td className="p-2 border">400000</td><td className="p-2 border">640000</td></tr>
                                       <tr><td className="p-2 border text-right">التثبيتات المالية</td><td className="p-2 border">240000</td><td className="p-2 border">40000</td><td className="p-2 border">200000</td></tr>
                                       <tr className="font-bold bg-gray-100 dark:bg-gray-700"><td className="p-2 border text-right">مجموع الأصول غير الجارية</td><td className="p-2 border">1680000</td><td className="p-2 border">600000</td><td className="p-2 border">1080000</td></tr>

                                       <tr className="font-bold bg-gray-50 dark:bg-gray-700/50"><td className="p-2 text-right border" colSpan={4}>الأصول الجارية</td></tr>
                                       <tr><td className="p-2 border text-right">المخزونات من البضائع</td><td className="p-2 border">480000</td><td className="p-2 border">112000</td><td className="p-2 border">368000</td></tr>
                                       <tr><td className="p-2 border text-right">الزبائن والحسابات الملحقة</td><td className="p-2 border">360000</td><td className="p-2 border">-</td><td className="p-2 border">360000</td></tr>
                                       <tr><td className="p-2 border text-right">الأعباء المعاينة مسبقا</td><td className="p-2 border">240000</td><td className="p-2 border">-</td><td className="p-2 border">240000</td></tr>
                                       <tr><td className="p-2 border text-right">القيم المنقولة للتوظيف</td><td className="p-2 border">128000</td><td className="p-2 border">-</td><td className="p-2 border">128000</td></tr>
                                       <tr><td className="p-2 border text-right">بنوك الحسابات الجارية</td><td className="p-2 border">400000</td><td className="p-2 border">-</td><td className="p-2 border">400000</td></tr>
                                       <tr className="font-bold bg-gray-100 dark:bg-gray-700"><td className="p-2 border text-right">مجموع الأصول الجارية</td><td className="p-2 border">1608000</td><td className="p-2 border">112000</td><td className="p-2 border">1496000</td></tr>
                                       <tr className="font-extrabold bg-gray-200 dark:bg-gray-600"><td className="p-2 border text-right">المجموع العام للأصول</td><td className="p-2 border">3288000</td><td className="p-2 border">712000</td><td className="p-2 border">2576000</td></tr>
                                   </tbody>
                               </table>
                           </div>
                           {renderTable(
                               ['الخصوم', 'المبالغ'],
                               [
                                   ['رؤوس الأموال الخاصة', ''],
                                   ['رأس المال', 1200000],
                                   ['النتيجة الصافية للسنة المالية', 118400],
                                   ['مجموع رؤوس الأموال الخاصة', 1318400],
                                   ['الخصوم غير الجارية', ''],
                                   ['اقتراضات لدى مؤسسات القرض', 215000],
                                   ['مؤونة الأخطار', 142600],
                                   ['مجموع الخصوم غير الجارية', 357600],
                                   ['الخصوم الجارية', ''],
                                   ['الموردون والحسابات الملحقة', 570000],
                                   ['الضرائب الدائنة', 80000],
                                   ['المنتوجات المعاينة مسبقا', 50000],
                                   ['المساهمات البنكية الجارية', 200000],
                                   ['مجموع الخصوم الجارية', 900000],
                                   ['المجموع العام للخصوم', 2576000],
                               ], 'جانب الخصوم'
                           )}
                           <h4 className="font-bold text-lg mt-4 text-gray-800 dark:text-gray-200">معلومات إضافية:</h4>
                           <ul className="list-disc pr-6 space-y-2 text-gray-700 dark:text-gray-300">
                               <li>%75 من رصيد حساب الأعباء المعاينة مسبقا يتعلق بالنشاط غير العادي للمؤسسة.</li>
                               <li>يتضمن حساب الموردون والحسابات الملحقة حساب موردو التثبيتات برصيد 240000 دج.</li>
                               <li>المنتوجات المعاينة مسبقا لا تتعلق بالنشاط العادي للمؤسسة.</li>
                               <li>من بين الضرائب الدائنة يوجد مبلغ 41600 دج يمثل الضريبة على الأرباح.</li>
                           </ul>
                           <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                               <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">المطلوب:</h4>
                               <ol className="list-decimal pr-6 space-y-2 text-gray-700 dark:text-gray-300">
                                   <li>عرّف الميزانية الوظيفية.</li>
                                   <li>أنجز الميزانية الوظيفية لمؤسسة " القنادسة" مع إظهار العمليات الحسابية على ورقة الإجابة.</li>
                                   <li>حدّد مفهوم قاعدة التوازن الوظيفي ثم احسب:<br/>
                                       أ- رأس المال العامل الصافي الإجمالي (FRNG).<br/>
                                       ب- احتياجات رأس المال العامل (BFR).<br/>
                                       جـ- الخزينة الصافية (TN).
                                   </li>
                               </ol>
                           </div>
                        </AccordionItem>
                         <AccordionItem title="الجزء الثاني: حساب وتحليل التكاليف الكلية (06 نقاط)" isOpen={openAccordion === 't1p2'} onClick={() => handleAccordionClick('t1p2')}>
                            <p>تنتج وتبيع مؤسسة " القدس" نوعين من المنتجات P1 و P2 في الورشتين (01) و (02) باستعمال المادتين الأوليتين M1 و M2 واللوازم C:</p>
                             <ul className="list-disc pr-6 space-y-2">
                                <li>لإنتاج وحدة من المنتج P1: تستعمل 1,5 كلغ من M1 و 60 دج من اللوازم C.</li>
                                <li>لإنتاج وحدة من المنتج :P2 تستعمل 2 كلغ من M1 و 0,5 كلغ من M2 و 130 دج من اللوازم C.</li>
                            </ul>
                            <h4 className="font-bold text-lg mt-4">لشهر ماي 2022 استخرجت المعلومات التالية:</h4>
                            <h5 className="font-semibold mt-2">1) المخزونات في 2022/01/ماي:</h5>
                             <ul className="list-disc pr-6 space-y-2">
                                <li>المادة الأولية M1 : 2000 كلغ بتكلفة 88 دج للكلغ الواحد.</li>
                                <li>المادة الأولية M2 : 1200 كلغ بتكلفة 78000 دج للإجمالي.</li>
                                <li>اللوازم C : 360000 دج.</li>
                                <li>المنتج P1 : 900 وحدة بتكلفة 303300 دج للإجمالي.</li>
                                <li>المنتج P2 : 200 وحدة بتكلفة 89900 دج للإجمالي.</li>
                            </ul>
                            <h5 className="font-semibold mt-2">2) مشتريات شهر ماي 2022:</h5>
                            <p>المادة الأولية M1 : 8000 كلغ بـ 75 دج للكلغ.</p>
                            <h5 className="font-semibold mt-2">3) الأعباء المباشرة على:</h5>
                             <ul className="list-disc pr-6 space-y-2">
                                <li>المشتريات: %10% من ثمن شراء المادة الأولية M1.</li>
                                <li>الإنتاج: 1200 ساعة عمل مباشرة بأجرة 140 دج للساعة، منها 860 ساعة للمنتج P1 والباقي للمنتج P2.</li>
                                <li>التوزيع 54000 دج ، تُوزع حسب الكميات المباعة.</li>
                            </ul>
                            <h5 className="font-semibold mt-2">4) إنتاج شهر ماي 2022:</h5>
                             <ul className="list-disc pr-6 space-y-2">
                                <li>المنتج P1 : 1600 وحدة.</li>
                                <li>المنتج P2 : 1800 وحدة.</li>
                            </ul>
                             <h5 className="font-semibold mt-2">5) الأعباء غير المباشرة:</h5>
                            <p>لخصت في الجدول التالي مع الأخذ بعين الاعتبار الفائدة النظرية على رأس المال المقدر بـ 1800000 دج بمعدل سنوي 06% وأعباء الأنشطة غير العادية المقدرة بـ 10360 دج.</p>
                            {renderTable(
                                ['البيان', 'الإدارة', 'الصيانة', 'التموين', 'الورشة (1)', 'الورشة (2)', 'التوزيع'],
                                [
                                    ['مجموع التوزيع الأولي', 11000, 18500, 59000, 141300, 40500, 29140],
                                    ['التوزيع الثانوي المركز: إدارة', '%100 -', '%10', '%20', '%30', '%30', '%10'],
                                    ['صيانة', '%20', '%100 -', '%10', '%30', '%30', '%10'],
                                    ['طبيعة وحدة العمل', '-', '-', 'كلغ مادة أولية مستعملة', 'وحدة منتجة', 'وحدة منتجة', '1000 دج من رقم الأعمال']
                                ], 'توزيع الأعباء غير المباشرة'
                            )}
                             <h5 className="font-semibold mt-2">6) مبيعات شهر ماي 2022:</h5>
                             <ul className="list-disc pr-6 space-y-2">
                                 <li>المنتج P1 : 2000 وحدة بسعر 400 دج للوحدة.</li>
                                 <li>المنتج P2 : 1600 وحدة بسعر 520 دج للوحدة.</li>
                             </ul>
                             <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-bold text-lg">المطلوب:</h4>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>حدّد الكميات المستعملة من المادتين الأوليتين M1 و M2 لإنتاج المنتجين P1 و P2.</li>
                                    <li>أتمم جدول توزيع الأعباء غير المباشرة.</li>
                                    <li>احسب:
                                        <br/>أ- تكلفة شراء المادة الأولية M1 والتكلفة الوسطية المرجحة لها (C.M.U.P).
                                        <br/>ب - تكلفة إنتاج المنتجين P1 و P2 والتكلفة الوسطية المرجحة لهما (C.M.U.P).
                                        <br/>جـ- سعر التكلفة للمنتجين P1 و P2.
                                    </li>
                                    <li>احسب النتيجة التحليلية للمنتجين P1 و P2 والنتيجة التحليلية الإجمالية.</li>
                                    <li>احسب النتيجة التحليلية الصافية.</li>
                                </ol>
                             </div>
                        </AccordionItem>
                         <AccordionItem title="الجزء الثالث: أعمال نهاية السنة - التسويات (08 نقاط)" isOpen={openAccordion === 't1p3'} onClick={() => handleAccordionClick('t1p3')}>
                            <p>من ميزان المراجعة قبل الجرد لمؤسسة "وصال" في 2022/12/31 ، استخرجت أرصدة الحسابات التالية:</p>
                             {renderTable(
                                ['ر/ح', 'اسم الحساب', 'مدين', 'دائن'],
                                [
                                    [151, 'مؤونة الأخطار', '', 65000],
                                    [2182, 'معدات النقل', 3000000, ''],
                                    [28182, 'اهتلاك معدات النقل', '', 600000],
                                    [29182, 'خسائر القيمة عن معدات النقل', '', 50000],
                                    [411, 'الزبائن', 297500, ''],
                                    [512, 'بنوك، الحسابات الجارية', 1220000, '']
                                ], 'أرصدة الحسابات'
                            )}
                            <h4 className="font-bold text-lg mt-4">معلومات إضافية:</h4>
                            <ol className="list-decimal pr-6 space-y-2">
                                <li>مؤونة الأخطار تتعلق بنزاع المؤسسة مع أحد العمال، صدر حكما نهائيا في 2022/12/04 لصالح المؤسسة.</li>
                                <li>معدات النقل: تهتلك خطيا بمعدل 20% وتتكون من الشاحنتين (T) و (H).
                                    {renderTable(
                                        ['معدات النقل', 'تكلفة الاقتناء', 'تاريخ الاقتناء', 'سعر البيع الصافي في 2022/12/31'],
                                        [['الشاحنة (T)', '.......', '2019/07/01', '-'], ['الشاحنة (H)', 1800000, '2022/04/01', 1445000]], 'معدات النقل'
                                    )}
                                    <ul className="list-disc pr-4 mt-1">
                                        <li>خسارة القيمة عن معدات النقل سُجّلت بتاريخ 2021/12/31.</li>
                                        <li>تنازلت المؤسسة بالبيع عن الشاحنة (T) على الحساب بتاريخ 2022/10/01 محققة فائض قيمة بمبلغ 15000 دج. لم يسجل المحاسب عملية التنازل في الدفتر اليومي للمؤسسة.</li>
                                    </ul>
                                </li>
                                <li>لخصت وضعية الزبائن في الجدول التالي: (معدل الرسم على القيمة المضافة 19%).
                                    {renderTable(
                                        ['الزبائن', 'مبلغ الدين متضمن الرسم', 'الوضعية في 2022/12/31'],
                                        [['مؤسسة نسيم', '142800 دج', 'إفلاس نهائي'], ['نهاد', '.......', 'يحتمل تسديد 80% من الدين']], 'وضعية الزبائن'
                                    )}
                                </li>
                                <li>أظهر الكشف البنكي المرسل من بنك التنمية المحلية إلى المؤسسة رصيدا دائنا بـ 1495000 دج. بعد المراجعة تبيّن أنّ سبب الاختلاف بين رصيد البنك لدى المؤسسة ورصيد الكشف البنكي يعود إلى:
                                    <h5 className="font-semibold mt-2">العمليات التي لم تُسجلها المؤسسة:</h5>
                                    <ul className="list-disc pr-4 mt-1">
                                        <li>شيك بنكي رقم 4784 بمبلغ 250000 دج، سلّمه الزبون مختار للبنك مباشرة.</li>
                                        <li>فوائد بنكية لصالح المؤسسة بمبلغ 75000 دج.</li>
                                        <li>خدمات مصرفية بمبلغ 15000 دج.</li>
                                        <li>فوائد بنكية لصالح بنك التنمية المحلية 30000 دج.</li>
                                    </ul>
                                    <h5 className="font-semibold mt-2">العمليات التي لم يُسجّلها بنك التنمية المحلية:</h5>
                                    <ul className="list-disc pr-4 mt-1">
                                        <li>شيك رقم 1985 استلمته المؤسسة من الزبون عمر بمبلغ 70000 دج ولم تتقدم لتحصيله.</li>
                                        <li>شيك رقم 1990 سلّمته المؤسسة للمورد رياض بمبلغ 65000 دج ولم يقدم للتحصيل.</li>
                                    </ul>
                                </li>
                            </ol>
                            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                               <h4 className="font-bold text-lg">المطلوب:</h4>
                               <ol className="list-decimal pr-6 space-y-2">
                                   <li>عرّف الاهتلاك واذكر طرق اهتلاك التثبيتات.</li>
                                   <li>أنجز حالة التقارب البنكي ثمّ سجّل قيود التسوية اللازمة له في الدفتر اليومي للمؤسسة.</li>
                                   <li>أنجز مخطط اهتلاك الشاحنة (T) إلى غاية تاريخ التنازل ثمّ سجّل قيود التنازل عنها في الدفتر اليومي للمؤسسة.</li>
                                   <li>اختبر خسارة القيمة للشاحنة (H) ثمّ سجّل قيود التسوية اللازمة لها في الدفتر اليومي للمؤسسة.</li>
                                   <li>سجّل قيود التسوية اللازمة للزبائن في الدفتر اليومي للمؤسسة. برّر العمليات الحسابية.</li>
                                   <li>سجّل قيد التسوية اللازم لمؤونة الأخطار في الدفتر اليومي للمؤسسة.</li>
                               </ol>
                           </div>
                        </AccordionItem>
                    </div>
                    <footer className="text-center p-3 bg-gray-50 dark:bg-gray-900/30 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">انتهى الموضوع الأول</footer>
                </section>

                {/* الموضوع الثاني */}
                <section className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <h2 className="text-2xl font-extrabold text-center p-5 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-b border-gray-200 dark:border-gray-700 tracking-wide">الموضوع الثاني</h2>
                     <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <AccordionItem title="الجزء الأول: تمويل واختيار المشاريع الاستثمارية (06 نقاط)" isOpen={openAccordion === 't2p1'} onClick={() => handleAccordionClick('t2p1')}>
                           <h4 className="font-bold">أولا: اختيار المشاريع الاستثمارية.</h4>
                           <p>ترغب مؤسسة "بني ونيف" في اقتناء الآلة الإنتاجية (SR) للمحافظة على القدرة الإنتاجية على حالها، لهذا الغرض وخلال شهر نوفمبر 2021 كلّفت المؤسسة أحد إطاراتها المتخصصة في دراسة الجدوى الاقتصادية للآلة الإنتاجية (SR) وبالاستناد على المعلومات التالية:</p>
                           <ul className="list-disc pr-6 space-y-2">
                               <li>تكلفة اقتناء الآلة الإنتاجية (SR): 1500000 دج.</li>
                               <li>مدة الاستعمال المتوقعة للآلة الإنتاجية (SR): 05 سنوات.</li>
                               <li>طريقة الاهتلاك: خطي (ثابت).</li>
                               <li>القيمة المتبقية في نهاية العمر الإنتاجي (VR): معدومة.</li>
                               <li>معدل الضرائب على الأرباح: 19%.</li>
                               <li>معدل الخصم (التحيين): 6%.</li>
                           </ul>
                           <p>المنتوجات والأعباء المتوقعة من استغلال الآلة الإنتاجية (SR) ملخصة في الجدول الآتي:</p>
                           {renderTable(
                               ['السنوات', '01', '02', '03', '04', '05'],
                               [
                                   ['المنتوجات المتوقعة', 750000, 750000, 950000, 950000, 950000],
                                   ['الأعباء المتوقعة', 200000, 200000, 350000, 350000, 350000],
                               ], 'التدفقات النقدية المتوقعة للآلة (SR)'
                           )}
                           <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                               <h4 className="font-bold text-lg">المطلوب:</h4>
                               <ol className="list-decimal pr-6 space-y-2">
                                   <li>حدد نوع الاستثمار الذي ترغب فيه مؤسسة "بني ونيف"؟</li>
                                   <li>أنجز جدول التدفقات الصافية لخزينة الآلة الإنتاجية (SR).</li>
                                   <li>احسب القيمة الحالية الصافية (VAN) للآلة الإنتاجية (SR).</li>
                                   <li>اعتمادا على نتيجة القيمة الحالية الصافية (VAN)، هل للآلة الإنتاجية (SR) مردودية؟ برّر إجابتك.</li>
                               </ol>
                           </div>
                           <h4 className="font-bold mt-4">ثانيا: تمويل المشاريع الاستثمارية.</h4>
                           <p>اتخذت مؤسسة "بني ونيف" قرار اختيار الآلة الإنتاجية (SR)، ولتمويل جزء من تكلفة اقتنائها، قدمت طلب الحصول على قرض عادي من البنك الوطني الجزائري (BNA). وافق البنك الوطني الجزائري (BNA) على تقديم قرض عادي لتمويل جزء من الآلة الإنتاجية (SR). بتاريخ 2022/01/02 استلمت المؤسسة مبلغ القرض على أن يُسدّد بواسطة خمسة (05) دفعات سنوية ثابتة، الأولى منها تُدفع في نهاية السنة الأولى من تاريخ استلام مبلغ القرض.</p>
                           <p>من جدول استهلاك هذا القرض استخرجت المعلومات التالية:</p>
                           <ul className="list-disc pr-6 space-y-2">
                               <li>الاستهلاك الثاني (A2): 188040,18 دج.</li>
                               <li>الاستهلاك الرابع (A4): 211281,95 دج.</li>
                           </ul>
                           <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                               <h4 className="font-bold text-lg">المطلوب:</h4>
                               <ol className="list-decimal pr-6 space-y-2">
                                   <li>عرف القرض العادي.</li>
                                   <li>احسب كلا من: معدل الفائدة المركبة السنوي (i)، الاستهلاك الأول (A1)، الدفعة الثابتة (a)، مبلغ القرض (vo).</li>
                                   <li>أنجز السطرين الأول والأخير من جدول استهلاك هذا القرض مع إظهار العمليات الحسابية على ورقة الإجابة.</li>
                                   <li>سجل في دفتر يومية المؤسسة قيد تسديد مبلغ الدفعة الأولى بتاريخ 2022/12/31.</li>
                               </ol>
                           </div>
                        </AccordionItem>
                         <AccordionItem title="الجزء الثاني: اعداد الكشوفات المالية وتحليلها (06 نقاط)" isOpen={openAccordion === 't2p2'} onClick={() => handleAccordionClick('t2p2')}>
                            <p>من ميزان المراجعة بعد الجرد للمؤسسة التجارية "آفاق" استخرجنا أرصدة حسابات التسيير التالية في 2022/12/31:</p>
                            {renderTable(
                                ['المنتوجات', '', 'الأعباء', ''],
                                [
                                    ['اسم الحساب', 'المبالغ', 'اسم الحساب', 'المبالغ'],
                                    ['المبيعات من البضائع', '.......', 'المشتريات المستهلكة', '1250000'],
                                    ['المنتوجات العملياتية الأخرى', '340000', 'الخدمات الخارجية والاستهلاكات الأخرى', '.......'],
                                    ['المنتوجات المالية', '.......', 'أعباء المستخدمين', '480000'],
                                    ['الاسترجاعات عن خسائر القيمة والمؤونات', '130000', 'الضرائب والرسوم والمدفوعات المماثلة', '.......'],
                                    ['', '', 'الأعباء العملياتية الأخرى', '490000'],
                                    ['', '', 'الاعباء المالية', '140000'],
                                    ['', '', 'المخصصات للاهتلاكات والمؤونات وخسائر القيمة', '980000']
                                ], 'أرصدة حسابات التسيير'
                            )}
                            <h4 className="font-bold text-lg mt-4">معلومات إضافية:</h4>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>معدل الادماج 60 %</li>
                                <li>القيمة المضافة للاستغلال 2400000 دج.</li>
                                <li>نسبة تجزئة القيمة المضافة بالنسبة لأجمالي فائض الاستغلال 75%.</li>
                                <li>النتيجة المالية - 100000 دج (الإشارة سالبة).</li>
                                <li>معدل الضريبة على الأرباح 26 %.</li>
                                <li>أرصدة الحسابات التالية: ح/73، ح/74، ح/67 وح/77 معدومة.</li>
                            </ul>
                             <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-bold text-lg">المطلوب:</h4>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>احسب كلا من: المبيعات من البضائع، استهلاك السنة المالية ثمّ رصيد الخدمات الخارجية والاستهلاكات الأخرى، اجمالي فائض الاستغلال، الضرائب والرسوم والمدفوعات المماثلة، النتيجة العملياتية.</li>
                                    <li>انجز حساب النتائج حسب الطبيعة لمؤسسة "آفاق".</li>
                                </ol>
                            </div>
                        </AccordionItem>
                         <AccordionItem title="الجزء الثالث: أعمال نهاية السنة - التسويات (08 نقاط)" isOpen={openAccordion === 't2p3'} onClick={() => handleAccordionClick('t2p3')}>
                            <p>من ميزان المراجعة قبل الجرد لمؤسسة "الياسمين" بتاريخ 2022/12/31 تحصلنا على أرصدة الحسابات التالية:</p>
                             {renderTable(
                                ['ر/ح', 'اسم الحساب', 'مدين', 'دائن'],
                                [
                                    [151, 'مؤونة الأخطار', '', 90000],
                                    [2182, 'معدات النقل', 2000000, ''],
                                    [262, 'سندات المساهمة الأخرى', 300000, ''],
                                    [28182, 'اهتلاك معدات النقل', '', 1568000],
                                    [2962, 'خسائر القيمة عن سندات المساهمة الأخرى', '', 15000],
                                    [30, 'مخزونات البضائع', 231000, ''],
                                    [380, 'البضائع المخزنة', 400000, ''],
                                    [416, 'الزبائن المشكوك فيهم', 357000, ''],
                                    [491, 'خسائر القيمة عن حسابات الزبائن', '', 100000],
                                    [613, 'الإيجارات', 50400, '']
                                ], 'أرصدة الحسابات'
                            )}
                             <h4 className="font-bold text-lg mt-4">معلومات إضافية بتاريخ الجرد:</h4>
                             <ol className="list-decimal pr-6 space-y-2">
                                 <li>مؤونة الأخطار تتعلق بنزاع قضائي مع العامل "رضا"، صدر حكما نهائيا لصالحه، وبتاريخ 2022/01/10 دفعت له المؤسسة تعويضا قيمته 90000 دج بشيك بنكي رقم 7581 (المحاسب سَجِّل مبلغ التعويض).</li>
                                 <li>معدات النقل:
                                     <ul className="list-disc pr-4 mt-1">
                                         <li>تكلفة الاقتناء: 2000000 دج.</li>
                                         <li>تاريخ الاقتناء: 2019/01/02.</li>
                                         <li>المدة النفعية: 05 سنوات.</li>
                                         <li>القيمة المتبقية (VR): معدومة.</li>
                                         <li>طريقة الاهتلاك: متناقص.</li>
                                     </ul>
                                 </li>
                                 <li>سندات المساهمة الأخرى: تتكون من الأسهم "A".
                                     {renderTable(
                                         ['الأسهم', 'العدد', 'تكلفة حيازة السهم الواحد', 'القيمة السوقية للسهم في 2021/12/31', 'القيمة السوقية للسهم في 2022/12/31'],
                                         [['"A"', '...؟...', '1000 دج', '950 دج', '1000 دج']], 'سندات المساهمة'
                                     )}
                                     <p>بتاريخ 2022/11/28 ، تنازلت المؤسسة عن 180 سهم "A" بمبلغ 1020 دج للسهم الواحد بشيك بنكي رقم 8511 ولم يُسجّل المحاسب أي قيد إلى غاية 2022/12/31.</p>
                                 </li>
                                  <li>مخزونات البضائع:
                                     <ul className="list-disc pr-4 mt-1">
                                        <li>تتبع المؤسسة في إدراج مخزوناتها طريقة الجرد المتناوب.</li>
                                        <li>الجرد المادي (خارج المحاسبة) 150000 دج.</li>
                                     </ul>
                                 </li>
                                 <li>لخصت وضعية الزبائن المشكوك فيهم في الجدول التالي: معدل الرسم على القيمة المضافة 19%.
                                     {renderTable(
                                         ['الزبائن', 'الرصيد TTC', 'خسارة القيمة في 2021/12/31', 'الوضعية في 2022/12/31'],
                                         [['خالد', '238000', '60000', 'احتمال عدم تسديده 20% من الرصيد'], ['جمال', '.......', '...؟...', 'حالة إفلاس نهائي']], 'وضعية الزبائن'
                                     )}
                                 </li>
                                  <li>رصيد ح/613 الإيجارات الوارد في ميزان المراجعة يتعلق باستئجار مخزن لسنة واحدة ابتداء من 2022/10/01.</li>
                             </ol>
                             <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-bold text-lg">المطلوب:</h4>
                                <ol className="list-decimal pr-6 space-y-2">
                                    <li>أنجز مخطط اهتلاك معدات النقل ثمّ سجّل قيد اهتلاك دورة 2022 في الدفتر اليومي للمؤسسة.</li>
                                    <li>سندات المساهمة الأخرى:
                                        <br/>أ - احسب عدد سندات المساهمة الأخرى "A".
                                        <br/>ب - احسب نتيجة التنازل عن 180 سهم من سندات المساهمة الاخرى "A".
                                        <br/>ج- سجل قيد التنازل عن سندات المساهمة الاخرى "A" في الدفتر اليومي للمؤسسة بتاريخ 2022/12/31.
                                        <br/>د- اختبر خسارة قيمة باقي سندات المساهمة الأخرى "A" ثمّ سجّل لها قيد التسوية في الدفتر اليومي بتاريخ 2022/12/31.
                                    </li>
                                    <li>سجّل قيود التسوية لمخزونات البضائع في الدفتر اليومي للمؤسسة في 2022/12/31.</li>
                                    <li>الزبائن:
                                         <br/>أ- احسب رصيد الزبون المشكوك فيه "جمال" في 2022/12/31.
                                        <br/>ب-احسب خسارة القيمة للزبون المشكوك فيه "جمال" في 2021/12/31.
                                        <br/>جـ- سجل قيود التسوية للزبائن المشكوك فيهم (خالد وجمال) في الدفتر اليومي للمؤسسة في 2022/12/31 مع إظهار العمليات الحسابية على ورقة الإجابة.
                                    </li>
                                    <li>سجّل قيود التسوية في الدفتر اليومي للمؤسسة المتعلقة بمؤونة الأخطار والإيجارات في 2022/12/31.</li>
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

export default Accounting2023Lesson;