"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const labels: Record<string, Record<string, string>> = {
  sk: { title: "Kontakt", name: "Vaše meno", email: "Váš email", subject: "Predmet", message: "Správa", send: "Odoslať správu", success: "Správa odoslaná!", hours: "Otváracie hodiny", address: "Adresa", phone: "Telefón" },
  hu: { title: "Kapcsolat", name: "Az Ön neve", email: "Az Ön emailje", subject: "Tárgy", message: "Üzenet", send: "Üzenet küldése", success: "Üzenet elküldve!", hours: "Nyitvatartás", address: "Cím", phone: "Telefon" },
  de: { title: "Kontakt", name: "Ihr Name", email: "Ihre E-Mail", subject: "Betreff", message: "Nachricht", send: "Nachricht senden", success: "Nachricht gesendet!", hours: "Öffnungszeiten", address: "Adresse", phone: "Telefon" },
  en: { title: "Contact", name: "Your name", email: "Your email", subject: "Subject", message: "Message", send: "Send message", success: "Message sent!", hours: "Opening hours", address: "Address", phone: "Phone" },
};

const dayNames: Record<string, { monThu: string; fri: string; sat: string; sun: string }> = {
  sk: { monThu: "Pondelok - Štvrtok", fri: "Piatok", sat: "Sobota", sun: "Nedeľa" },
  hu: { monThu: "Hétfő - Csütörtök", fri: "Péntek", sat: "Szombat", sun: "Vasárnap" },
  de: { monThu: "Montag - Donnerstag", fri: "Freitag", sat: "Samstag", sun: "Sonntag" },
  en: { monThu: "Monday - Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" },
};

export default function ContactPage() {
  const params = useParams();
  const locale = (params.locale as string) || "sk";
  const t = labels[locale] || labels.en;
  const days = dayNames[locale] || dayNames.en;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="section-title">{t.title}</h1>
          <div className="gold-line mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div>
            {submitted ? (
              <div className="card text-center py-16">
                <div className="text-euphoria-gold text-5xl mb-4">✓</div>
                <p className="text-base">{t.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  placeholder={t.name}
                  required
                  className="w-full bg-euphoria-dark border border-euphoria-gray/30 px-4 py-3 text-base text-white placeholder:text-euphoria-muted focus:border-euphoria-gold focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder={t.email}
                  required
                  className="w-full bg-euphoria-dark border border-euphoria-gray/30 px-4 py-3 text-base text-white placeholder:text-euphoria-muted focus:border-euphoria-gold focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  placeholder={t.subject}
                  required
                  className="w-full bg-euphoria-dark border border-euphoria-gray/30 px-4 py-3 text-base text-white placeholder:text-euphoria-muted focus:border-euphoria-gold focus:outline-none transition-colors"
                />
                <textarea
                  placeholder={t.message}
                  rows={5}
                  required
                  className="w-full bg-euphoria-dark border border-euphoria-gray/30 px-4 py-3 text-base text-white placeholder:text-euphoria-muted focus:border-euphoria-gold focus:outline-none transition-colors"
                />
                <button type="submit" className="btn-primary w-full">
                  {t.send}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="card">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-euphoria-gold mt-1" />
                  <div>
                    <div className="font-semibold text-sm mb-1">{t.address}</div>
                    <div className="text-euphoria-muted text-sm">Bratislavská 11, 931 01 Šamorín</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={20} className="text-euphoria-gold mt-1" />
                  <div>
                    <div className="font-semibold text-sm mb-1">{t.phone}</div>
                    <div className="text-euphoria-muted text-sm">
                      <a href="tel:+421950480799" className="hover:text-euphoria-gold transition-colors">+421 950 480 799</a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-euphoria-gold mt-1" />
                  <div>
                    <div className="font-semibold text-sm mb-1">Email</div>
                    <div className="text-euphoria-muted text-sm">
                      <a href="mailto:euphorianightclub11@gmail.com" className="hover:text-euphoria-gold transition-colors">euphorianightclub11@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={20} className="text-euphoria-gold" />
                <h3 className="font-semibold text-sm">{t.hours}</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-euphoria-muted">{days.monThu}</span>
                  <span>19:00 - 02:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-euphoria-muted">{days.fri}</span>
                  <span>19:00 - 04:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-euphoria-muted">{days.sat}</span>
                  <span>19:00 - 06:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-euphoria-muted">{days.sun}</span>
                  <span>19:00 - 02:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
