'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-10 pb-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Editorial Team */}
          <div>
            <h3 className="text-lg font-semibold mb-4">सम्पादकीय टोली</h3>
            <div className="text-sm space-y-1">
              <p>संचालक: रवि चौधरी</p>
              <p>प्रधान सम्पादक: सन्तोष चौधरी</p>
              <p>सिस्टम अपरेटर: रामकेश गुप्ता</p>
              <p>समाचार सहयोगी: साधना कुमारी थारु चौधरी</p>
              <p>कार्यालय व्यवस्थापक: जनकनन्दनी चौधरी</p>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">सम्पर्क</h3>
            <div className="text-sm space-y-1">
              <p>मायादेवी गाउँपालिका ०३, गुण्डा चोक, रुपन्देही, नेपाल</p>
              <p>फोन: +९७७ ९७०२६८३६१८</p>
              <p>ईमेल: <a href="mailto:news@mewskhabar.com" className="underline hover:text-blue-200">news@mewskhabar.com</a></p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Legal Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">कानुनी</h3>
            <div className="text-sm space-y-1">
              <p>प्रेस काउन्सिल दर्ता नं: ४९९७/८१-८२</p>
              <p>सूचना विभाग दर्ता नं: ४७१६/८१८२</p>
              <p>स्वाधिकार © २०८२ मेउज खबर | All rights reserved.</p>
              <p>
                Developed by{' '}
                <a
                  href="https://mewsmedia.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-200"
                >
                  Mews Media Pvt. Ltd.
                </a>
              </p>
            </div>
          </div>

        </div>

        <div className="mt-10 pt-4 border-t border-white/20 text-center text-sm">
          <p>मेउज खबर — हाम्रो लुम्बिनी, हाम्रो खबर</p>
        </div>
      </div>
    </footer>
  );
}