"use client";

import { useEffect, useState, type ReactNode } from "react";
import { addressLine, email, salesEmail } from "@/lib/content";
import { useSite } from "./site";

const topics = [
  "Mobil Kırma & Eleme Sistemleri",
  "Yıkama & Konveyör Bant Sistemleri",
  "İş Makinesi Ataşmanları (Kaya Kovası, Kırıcı vb.)",
  "Araç Üstü Ekipmanlar & Lowbed Dorse",
  "Mobil Çözümler & Saha Üniteleri",
  "Fason İmalat & Lazer Kesim İşlemi",
];

export function ContactBlock() {
  const { draft } = useSite();
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (draft) setMessage(draft);
  }, [draft]);

  return (
    <section id="iletisim" className="contact-gradient-bg relative py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-medium tracking-wider text-gray-300 uppercase sm:text-sm">Bize yazın ve iletişim bilgileri</p>
          <h2 className="mt-1 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">BİZE YAZIN</h2>
          <h3 className="mt-1 font-display text-xl font-bold text-gray-100 sm:text-2xl">Bizimle İletişime Geçin</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-300 sm:text-[15px]">
            Formu doldurarak talep, öneri ve projelerinizi bizimle paylaşabilir ya da doğrudan iletişim kanallarımızdan bize ulaşabilirsiniz.
          </p>
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="rounded-xl border border-white/10 bg-[#22272e]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8 lg:col-span-7">
            {sent ? (
              <p className="text-sm leading-7 text-gray-200">
                Mesajınız ve proje talebiniz REDASY mühendislik ekibine iletildi. Dönüş bu formun kayıtlı olduğu tarayıcıda onaylanır; bir posta kutusuna otomatik gitmez.
              </p>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  const data = new FormData(event.currentTarget);
                  const name = String(data.get("name") || "").trim();
                  const mail = String(data.get("email") || "").trim();
                  const phone = String(data.get("phone") || "").trim();
                  const message = String(data.get("message") || "").trim();
                  if (!name || !mail.includes("@") || !phone || !message) return;
                  setSent(true);
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm text-gray-200">
                    Adınız Soyadınız *
                    <input name="name" required placeholder="Örn: Ahmet Yılmaz" className="redasy-input mt-1.5" />
                  </label>
                  <label className="block text-sm text-gray-200">
                    E-Posta Adresiniz *
                    <input name="email" type="email" required placeholder="ornek@firma.com" className="redasy-input mt-1.5" />
                  </label>
                  <label className="block text-sm text-gray-200">
                    Telefon Numaranız *
                    <input name="phone" required placeholder="+90 (5XX) XXX XX XX" className="redasy-input mt-1.5" />
                  </label>
                  <label className="block text-sm text-gray-200">
                    Firma / Kurum Adı
                    <input name="company" placeholder="Firma veya Belediye Adı" className="redasy-input mt-1.5" />
                  </label>
                </div>
                <select name="topic" className="redasy-input text-gray-200" defaultValue={topics[0]}>
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Mesajınız, proje detaylarınız veya talep ettiğiniz teknik kapasite..."
                  className="redasy-input resize-none"
                />
                <button type="submit" className="w-full rounded-md bg-[#8b1220] py-3.5 font-display text-base font-bold shadow-lg hover:bg-[#b3192b]">
                  Bize Yazın
                </button>
              </form>
            )}
          </div>
          <aside className="space-y-8 pt-2 lg:col-span-5 lg:border-s lg:border-white/10 lg:ps-6">
            <div>
              <h3 className="mb-6 font-display text-xl font-bold">İletişim Bilgileri</h3>
              <div className="space-y-6 text-sm leading-relaxed text-gray-300">
                <Info title="Merkez & Fabrika">{addressLine}</Info>
                <Info title="Telefon">
                  <a href="tel:+908505218200" className="hover:text-white">
                    +90 850 521 82 00
                  </a>
                  {" | Faks: "}
                  <a href="tel:+903125030713" className="hover:text-white">
                    +90 312 503 07 13
                  </a>
                </Info>
                <Info title="E-Posta">
                  <a href={`mailto:${email}`} className="hover:text-white">
                    {email}
                  </a>
                  {" | "}
                  <a href={`mailto:${salesEmail}`} className="hover:text-white">
                    {salesEmail}
                  </a>
                </Info>
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-display text-lg font-bold">Bizimle İletişime Geçin</h4>
              <div className="flex flex-wrap gap-3.5 text-sm font-bold">
                {["in", "ig", "f", "yt", "x"].map((mark) => (
                  <span key={mark} className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#1c2024]">
                    {mark}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Info({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#8b1220] text-xs font-bold text-white">•</span>
      <div>
        <h4 className="font-display text-[15px] font-bold text-white">{title}</h4>
        <p className="mt-0.5">{children}</p>
      </div>
    </div>
  );
}
