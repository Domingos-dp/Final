"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockProperties } from '@/data/mockData';

export default function ResortsPage() {
  const resorts = mockProperties.filter(p => p.type === 'villa' || p.type === 'lodge' || p.type === 'resort');

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Resorts & Villas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resorts.map(r => (
          <Link key={r.id} href={`/property/${r.id}`} className="block rounded-lg overflow-hidden shadow-sm hover:shadow-md">
            <div className="relative h-48 bg-gray-100">
              <Image src={r.images[0]} alt={r.title} fill className="object-cover" />
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-lg">{r.title}</h3>
              <p className="text-sm text-gray-600">{r.location.city} • {r.type}</p>
              <p className="mt-2 font-bold">{r.pricePerNight.toLocaleString()} {r.currency}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
