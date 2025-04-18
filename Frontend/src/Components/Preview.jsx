import React from "react";
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Resume() {
  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto shadow-lg">
      {/* Left Sidebar */}
      <div className="bg-[#2c5282] text-white p-6 md:w-1/3">
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white">
            <img
              src="https://via.placeholder.com/160"
              alt="Profile photo"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">ABOUT ME</h2>
          <p className="text-sm">
            A graphic designer is a professional within the graphic design and graphic art industry who assembles
            images.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">SKILL</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Motion graphic</li>
            <li>Layout</li>
            <li>Illustration</li>
            <li>Graphic Design</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">LANGUAGE</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>English</li>
            <li>Spanish</li>
            <li>French</li>
            <li>Arabic</li>
            <li>Germany</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">CONTACT</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="text-sm">123 Anywhere ST, Any City</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span className="text-sm">+123-456-7890</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span className="text-sm">hello@reallygreatsite.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="bg-white text-gray-800 p-6 md:w-2/3">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-[#2c5282]">ISABEL MERCADO</h1>
          <h2 className="text-xl text-gray-600">GRAPHIC DESIGN</h2>
          <div className="h-px bg-gray-300 w-full my-4"></div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2c5282] mb-4">WORK EXPERIENCE</h2>

          <div className="relative border-l border-gray-300 pl-6 pb-4">
            <div className="absolute w-3 h-3 bg-[#2c5282] rounded-full -left-[6px]"></div>
            <div className="mb-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">Borcelle Inc.</h3>
                  <p className="text-sm text-gray-600">Any City</p>
                  <p className="text-sm text-gray-600">2025 - 2027</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#2c5282]">Junior Designer</h3>
                  <p className="text-xs max-w-xs">
                    Tasked to make graphic for off line and offline layout. Edited editorial photos for clients and
                    magazines across various post.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative border-l border-gray-300 pl-6 pb-4">
            <div className="absolute w-3 h-3 bg-[#2c5282] rounded-full -left-[6px]"></div>
            <div className="mb-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">Borcelle Inc.</h3>
                  <p className="text-sm text-gray-600">Any City</p>
                  <p className="text-sm text-gray-600">2022 - 2024</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#2c5282]">Senior Designer</h3>
                  <p className="text-xs max-w-xs">
                    Tasked to make graphic for off line and offline layout. Works closely with the copy writing team.
                    Concept and develop content besides editorial.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative border-l border-gray-300 pl-6 pb-4">
            <div className="absolute w-3 h-3 bg-[#2c5282] rounded-full -left-[6px]"></div>
            <div className="mb-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">Borcelle Inc.</h3>
                  <p className="text-sm text-gray-600">Any City</p>
                  <p className="text-sm text-gray-600">2019 - 2021</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#2c5282]">Senior Designer</h3>
                  <p className="text-xs max-w-xs">
                    Tasked to make graphic for off line and offline layout. Works closely with the copy writing team.
                    Concept and develop content besides editorial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-300 w-full my-4"></div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2c5282] mb-4">EDUCATION</h2>

          <div className="relative border-l border-gray-300 pl-6 pb-4">
            <div className="absolute w-3 h-3 bg-[#2c5282] rounded-full -left-[6px]"></div>
            <div className="mb-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">Fauget University</h3>
                  <p className="text-sm text-gray-600">2022 - 2024</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#2c5282]">BACHELOR OF DESIGNER</h3>
                  <p className="text-xs max-w-xs">
                    Customer-oriented Graphic Design with strong history of leading high-performance team to meet or
                    exceed objectives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative border-l border-gray-300 pl-6 pb-4">
            <div className="absolute w-3 h-3 bg-[#2c5282] rounded-full -left-[6px]"></div>
            <div className="mb-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">Fauget University</h3>
                  <p className="text-sm text-gray-600">2025 - 2027</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#2c5282]">MASTER OF DESIGNER</h3>
                  <p className="text-xs max-w-xs">
                    Customer-oriented Graphic Design with strong history of leading high-performance team to meet or
                    exceed objectives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-300 w-full my-4"></div>

        <div>
          <h2 className="text-2xl font-bold text-[#2c5282] mb-4">HOBBIES</h2>
          <ul className="flex flex-wrap gap-8">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#2c5282] rounded-full"></span>
              Game
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#2c5282] rounded-full"></span>
              Travelling
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#2c5282] rounded-full"></span>
              Reading Book
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}