'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#003B75] text-white pt-10 pb-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Editorial Team */}
          <div>
            <h3 className="text-lg font-semibold mb-4">सम्पादकीय टोली</h3>
            <ul className="text-sm space-y-1">
              <li>संचालक: रवि चौधरी</li>
              <li>प्रधान सम्पादक: सन्तोष चौधरी</li>
              <li>सिस्टम अपरेटर: रामकेश गुप्ता</li>
              <li>समाचार सहयोगी: साधना कुमारी थारु चौधरी</li>
              <li>कार्यालय व्यवस्थापक: जनकनन्दनी चौधरी</li>
            </ul>
          </div>

          {/* Contact Info & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">सम्पर्क</h3>
            <ul className="text-sm space-y-1">
              <li>मायादेवी गाउँपालिका ०३, गुण्डा चोक, रुपन्देही, नेपाल</li>
              <li>फोन: +९७७ ९७०२६८३६१८</li>
              <li>
                ईमेल:{' '}
                <a
                  href="mailto:news@mewskhabar.com"
                  className="underline hover:text-[#DA1E37] transition"
                >
                  news@mewskhabar.com
                </a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#DA1E37] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#DA1E37] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#DA1E37] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#DA1E37] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Legal Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">कानुनी</h3>
            <ul className="text-sm space-y-1">
              <li>प्रेस काउन्सिल दर्ता नं: ४९९७/८१-८२</li>
              <li>सूचना विभाग दर्ता नं: ४७१६/८१८२</li>
              <li>स्वाधिकार © २०८२ मेउज खबर | All rights reserved.</li>
              <li>
                Developed by{' '}
                <a
                  href="https://mewsmedia.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#DA1E37] transition"
                >
                  Mews Media Pvt. Ltd.
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-4 border-t border-white/20 text-center text-sm">
          <p>मेउज खबर — हाम्रो लुम्बिनी, हाम्रो खबर</p>
        </div>
      </div>
    </footer>
  );
}