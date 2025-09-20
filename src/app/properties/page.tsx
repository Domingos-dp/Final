"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockProperties } from '@/data/mockData';

export default function PropertiesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProperties.map(p => (
          <Link key={p.id} href={`/property/${p.id}`} className="block rounded-lg overflow-hidden shadow-sm hover:shadow-md">
            <div className="relative h-48 bg-gray-100">
              <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-600">{p.location.city} • {p.type}</p>
              <p className="mt-2 font-bold">{p.pricePerNight.toLocaleString()} {p.currency}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
