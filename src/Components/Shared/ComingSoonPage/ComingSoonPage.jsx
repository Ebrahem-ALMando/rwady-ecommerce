'use client';

import Image from 'next/image';

export default function ComingSoonPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <Image
        src="https://cdn-icons-png.flaticon.com/512/595/595067.png"
        alt="تحت التطوير"
        width={180}
        height={180}
        className="mb-6 animate-pulse"
        priority
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
        الصفحة قيد التطوير والاختبار
      </h1>
      <p className="text-lg md:text-xl text-gray-600">
        سيتم توفير الصفحة قريبًا، شكرًا لصبركم!
      </p>
    </main>
  );
}
