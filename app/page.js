import Hero from '@/components/Hero';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, BookOpen, Users, Award } from 'lucide-react';
const { Post, Event } = require('@/models');

export default async function Home() {
  const news = await Post.findAll({
    order: [['createdAt', 'DESC']],
    limit: 3,
    raw: true
  });

  const events = await Event.findAll({
    order: [['date', 'ASC']],
    limit: 3,
    raw: true
  });
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Chairman's Welcome Message */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3 text-center">
              <div className="relative w-64 h-64 mx-auto mb-6">
                <div className="absolute inset-0 bg-secondary rounded-full transform rotate-6 opacity-20"></div>
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Prof. Dr. Ir. Zainal A. Hasibuan"
                  className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-xl z-10"
                />
              </div>
              <h3 className="text-xl font-bold text-primary">Prof. Dr. Ir. Zainal A. Hasibuan, MLS., Ph.D.</h3>
              <p className="text-secondary font-medium uppercase tracking-wider text-sm mt-1">Ketua Umum APTIKOM</p>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-primary mb-6 relative inline-block">
                Sambutan Ketua Umum
                <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-secondary rounded-full"></span>
              </h2>
              <blockquote className="text-gray-600 text-lg leading-relaxed mb-6 italic">
                "Selamat datang di website resmi Asosiasi Pendidikan Tinggi Informatika dan Komputer (APTIKOM).
                Di era transformasi digital yang begitu cepat ini, kolaborasi adalah kunci. APTIKOM hadir sebagai rumah besar
                bagi seluruh perguruan tinggi informatika di Indonesia untuk bersinergi, berbagi pengetahuan, dan
                meningkatkan mutu pendidikan demi mencetak talenta digital bangsa yang unggul dan berdaya saing global."
              </blockquote>
              <div className="flex gap-4">
                <Link href="/about" className="text-secondary font-semibold hover:text-secondary-hover inline-flex items-center">
                  Profil Lengkap APTIKOM <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link href="/management" className="text-gray-500 font-semibold hover:text-primary inline-flex items-center">
                  Lihat Pengurus <Users size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Mengapa Bergabung dengan APTIKOM?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami memfasilitasi kolaborasi, peningkatan kualitas, dan pengembangan profesional bagi institusi dan dosen informatika di seluruh Indonesia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Jejaring Luas</h3>
              <p className="text-gray-600 text-sm">
                Terhubung dengan ribuan program studi dan pakar informatika dari seluruh Indonesia untuk kolaborasi riset dan pengajaran.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Kurikulum Standar</h3>
              <p className="text-gray-600 text-sm">
                Akses panduan kurikulum berbasis OBE dan KKNI terkini yang diselaraskan dengan kebutuhan industri global.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Akreditasi Unggul</h3>
              <p className="text-gray-600 text-sm">
                Pendampingan dan klinik mutu untuk membantu program studi mencapai akreditasi unggul LAM INFOKOM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News & Events Split */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* News Column (2/3 width) */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-primary">Berita Terbaru</h2>
                <Link href="/news" className="text-secondary hover:text-secondary-hover font-medium flex items-center text-sm">
                  Lihat Semua <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {news.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-secondary uppercase tracking-wider">{item.category}</span>
                        <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2 leading-tight">
                        <Link href={`/news/${item.id}`} className="hover:text-secondary transition-colors">
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{item.content}</p>
                      <Link href={`/news/${item.id}`} className="text-sm font-medium text-primary hover:text-secondary inline-flex items-center">
                        Baca Selengkapnya
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events Column (1/3 width) */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-primary">Agenda Kegiatan</h2>
                <Link href="/events" className="text-secondary hover:text-secondary-hover font-medium flex items-center text-sm">
                  Lihat Semua <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="space-y-6">
                  {events.map((event) => (
                    <div key={event.id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex-shrink-0 w-16 text-center">
                        <div className="bg-primary/5 text-primary rounded-lg py-2 px-1">
                          <span className="block text-xs font-bold uppercase">{new Date(event.date).toLocaleDateString('id-ID', { month: 'short' })}</span>
                          <span className="block text-xl font-bold">{new Date(event.date).getDate()}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-secondary mb-1 block">{event.type}</span>
                        <h4 className="text-base font-bold text-primary mb-1 leading-snug">
                          <Link href={`/events/${event.id}`} className="hover:text-secondary transition-colors">
                            {event.title}
                          </Link>
                        </h4>
                        <div className="flex items-center text-gray-500 text-xs">
                          <MapPin size={12} className="mr-1" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <Link href="/events" className="text-sm font-bold text-primary hover:text-secondary transition-colors block w-full bg-gray-50 py-2 rounded-lg">
                    Lihat Kalender Lengkap
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Siap untuk Berkontribusi?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan institusi pendidikan tinggi lainnya dan jadilah bagian dari revolusi pendidikan informatika di Indonesia.
          </p>
          <button className="bg-white text-secondary font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors transform hover:-translate-y-1">
            Daftar Sekarang
          </button>
        </div>
      </section>
    </div>
  );
}
