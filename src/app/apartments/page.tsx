"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockProperties } from '@/data/mockData';

export default function ApartmentsPage() {
  const apartments = mockProperties.filter(p => p.type === 'apartment');

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Apartments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartments.map(a => (
          <Link key={a.id} href={`/property/${a.id}`} className="block rounded-lg overflow-hidden shadow-sm hover:shadow-md">
            <div className="relative h-48 bg-gray-100">
              <Image src={a.images[0]} alt={a.title} fill className="object-cover" />
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-lg">{a.title}</h3>
              <p className="text-sm text-gray-600">{a.location.city} • {a.type}</p>
              <p className="mt-2 font-bold">{a.pricePerNight.toLocaleString()} {a.currency}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
