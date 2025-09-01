import React from 'react';

const Economics2013Lesson: React.FC = () => {
    return (
        <div className="bg-white dark:bg-transparent px-4 sm:px-6 py-6 prose-sm sm:prose dark:prose-invert max-w-none text-right prose-p:text-black dark:prose-p:text-white prose-li:text-black dark:prose-li:text-white prose-headings:text-black dark:prose-headings:text-white" dir="rtl">
            {/* Page Header */}
            <header className="text-center border-b border-gray-400 dark:border-gray-600 pb-4 mb-6">
                <div className="flex justify-between items-start">
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
                    <p>امتحان بكالوريا التعليم الثانوي</p>
                    <p>الشعبة: تسيير واقتصاد</p>
                </div>
                <div className="flex justify-between mt-2 font-bold">
                    <span>اختبار في مادة: الاقتصاد و المناجمنت</span>
                    <span>المدة: 03 سا و 30 د</span>
                </div>
            </header>

            <div className="text-center my-6 font-bold text-lg">
                <p>على المترشح أن يختار أحد الموضوعين التاليين:</p>
            </div>

            {/* Topic 1 */}
            <section className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h2 className="text-2xl font-extrabold text-center mb-6 text-blue-700 dark:text-blue-400">الموضوع الأول</h2>
                
                <div className="mb-6">
                    <h3 className="font-bold text-xl mb-2 border-r-4 border-blue-500 dark:border-blue-400 pr-2">الجزء الأول: ( 16 نقطة )</h3>
                    
                    <div className="space-y-4 pr-4">
                        <div>
                            <h4 className="font-semibold text-lg">السؤال الأول : ( 06 نقاط )</h4>
                            <p>يعتبر الإئتمان من أهم المعاملات التي تقوم بها المصارف التجارية.</p>
                            <ol className="list-decimal pr-6 mt-2 space-y-1">
                                <li>اشرح صور الإئتمان.</li>
                                <li>اذكر المعاملات المصرفية الأخرى.</li>
                            </ol>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg">السؤال الثاني : ( 06 نقاط )</h4>
                            <p>التضخم: ظاهرة اقتصادية تتميز بحركة تصاعدية للأسعار.</p>
                            <ol className="list-decimal pr-6 mt-2 space-y-1">
                                <li>اذكر أنواع التضخم مع الشرح المختصر.</li>
                                <li>اشرح سياسة تحقيق التوازن في الميزانية العامة كإجراء لمعالجة ظاهرة التضخم.</li>
                            </ol>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg">السؤال الثالث: ( 04 نقاط )</h4>
                            <p>الدافعية: هي تشجيع الأفراد وتحفيزهم للعمل أكثر.</p>
                            <p className="pr-6 mt-2">- اشرح العوامل المؤثرة في الدافعية.</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-xl mb-2 border-r-4 border-blue-500 dark:border-blue-400 pr-2">الجزء الثاني: ( 04 نقاط)</h3>
                    <div className="pr-4">
                        <p>السوق: هو المكان الذي يلتقي فيه البائع والمشتري لتبادل السلع والخدمات.</p>
                        <ol className="list-decimal pr-6 mt-2 space-y-1">
                            <li>اشرح أنواع الأسواق.</li>
                            <li>اذكر أشكاله، ثم اشرح سوق المنافسة الكاملة (التامة).</li>
                        </ol>
                    </div>
                </div>
                 <footer className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
                    صفحة 1 من 2
                </footer>
            </section>

            <hr className="my-10 border-gray-300 dark:border-gray-600" />
            
            {/* Topic 2 */}
            <section className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h2 className="text-2xl font-extrabold text-center mb-6 text-green-700 dark:text-green-400">الموضوع الثاني</h2>
                
                <div className="mb-6">
                    <h3 className="font-bold text-xl mb-2 border-r-4 border-green-500 dark:border-green-400 pr-2">الجزء الأول: ( 16 نقطة )</h3>
                    
                    <div className="space-y-4 pr-4">
                        <div>
                            <h4 className="font-semibold text-lg">السؤال الأول : ( 05 نقاط )</h4>
                            <p>تعتبر البطالة ظاهرة اقتصادية واجتماعية تعاني منها العديد من الدول بما فيها الجزائر.</p>
                            <ol className="list-decimal pr-6 mt-2 space-y-1">
                                <li>حدد أسباب البطالة.</li>
                                <li>ماهي إجراءات التخفيف من ظاهرة البطالة؟</li>
                            </ol>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg">السؤال الثاني : (06) نقاط )</h4>
                            <p>تتخذ السلطة النقدية للبلاد في مجال الصرف عدة إجراءات وتدابير بغية تحقيق أهداف مسطرة.</p>
                            <ol className="list-decimal pr-6 mt-2 space-y-1">
                                <li>اذكر أسباب الصرف.</li>
                                <li>حدد أهداف سياسة الصرف.</li>
                                <li>اشرح وسائل سياسة الصرف.</li>
                            </ol>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg">السؤال الثالث: ( 05 نقاط )</h4>
                            <p>تتولى المنظمة العالمية للتجارة " OMC " عملية الإشراف على مختلف المبادلات التجارية الخارجية.</p>
                             <ol className="list-decimal pr-6 mt-2 space-y-1">
                                <li>عرّف المنظمة العالمية للتجارة.</li>
                                <li>بيّن دور المنظمة العالمية للتجارة.</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-xl mb-2 border-r-4 border-green-500 dark:border-green-400 pr-2">الجزء الثاني : ( 04 نقاط )</h3>
                     <div className="pr-4">
                        <p>يعتبر الاتصال وسيلة هامة للتسيير.</p>
                        <ol className="list-decimal pr-6 mt-2 space-y-1">
                            <li>عرّف الاتصال.</li>
                            <li>اشرح مكوناته.</li>
                        </ol>
                    </div>
                </div>
                 <footer className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
                    صفحة 2 من 2
                </footer>
            </section>
        </div>
    );
};

export default Economics2013Lesson;