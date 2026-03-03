import Link from 'next/link';

// since this component runs on the server we can bypass the HTTP layer
// and pull directly from the ORM – eliminating network errors altogether.
async function getProfile() {
    try {
        const { OrganizationProfile } = require('@/models');
        const profile = await OrganizationProfile.findOne({ raw: true });
        return profile;
    } catch (error) {
        console.error('Error querying profile:', error);
        return null;
    }
}

export default async function About() {
    const profile = await getProfile();

    if (!profile) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Gagal memuat data profil</p>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Header */}
            <div className="bg-primary py-20 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Tentang {profile.abbreviation}</h1>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    {profile.fullName}
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Basic Info Section */}
                <div className="mb-16 bg-gradient-to-r from-primary/5 to-primary/10 p-8 rounded-xl border border-primary/20">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-primary mb-3">Informasi Dasar</h3>
                            <div className="space-y-2 text-gray-700">
                                <p><strong>Nama:</strong> {profile.fullName}</p>
                                <p><strong>Singkatan:</strong> {profile.abbreviation}</p>
                                {profile.establishedDate && (
                                    <p><strong>Didirikan:</strong> {new Date(profile.establishedDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                )}
                                {profile.legalStatus && (
                                    <p><strong>Status Hukum:</strong> {profile.legalStatus}</p>
                                )}
                                {profile.registrationNumber && (
                                    <p><strong>No. Registrasi:</strong> {profile.registrationNumber}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-primary mb-3">Statistik</h3>
                            <div className="space-y-2 text-gray-700">
                                <p><strong>Total Anggota Individu:</strong> {profile.totalMembers?.toLocaleString('id-ID') || 0}</p>
                                <p><strong>Total Institusi Anggota:</strong> {profile.totalInstitutions?.toLocaleString('id-ID') || 0}</p>
                            </div>
                            <h3 className="text-lg font-semibold text-primary mb-3 mt-6">Pengurus</h3>
                            <div className="space-y-2 text-gray-700">
                                {profile.chairperson && <p><strong>Ketua:</strong> {profile.chairperson}</p>}
                                {profile.secretary && <p><strong>Sekretaris:</strong> {profile.secretary}</p>}
                                {profile.treasurer && <p><strong>Bendahara:</strong> {profile.treasurer}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-primary mb-6">Sejarah Singkat</h2>
                    <div className="prose prose-lg text-gray-600 max-w-none">
                        {profile.history.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                    </div>
                </div>

                {/* Vision & Mission */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-primary mb-4">Visi</h3>
                        <p className="text-gray-700 italic leading-relaxed">
                            "{profile.vision}"
                        </p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-primary mb-4">Misi</h3>
                        <div
                            className="text-gray-700 prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: profile.mission }}
                        />
                    </div>
                </div>

                {/* Goals & Objectives */}
                {(profile.goals || profile.objectives) && (
                    <div className="grid md:grid-cols-2 gap-12 mb-20">
                        {profile.goals && (
                            <div className="bg-primary/5 p-8 rounded-xl border border-primary/20">
                                <h3 className="text-2xl font-bold text-primary mb-4">Tujuan</h3>
                                <div
                                    className="text-gray-700 prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: profile.goals }}
                                />
                            </div>
                        )}
                        {profile.objectives && (
                            <div className="bg-primary/5 p-8 rounded-xl border border-primary/20">
                                <h3 className="text-2xl font-bold text-primary mb-4">Sasaran</h3>
                                <div
                                    className="text-gray-700 prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: profile.objectives }}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Organizational Structure */}
                {profile.structure && (
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-primary mb-6">Struktur Organisasi</h2>
                        <div
                            className="prose prose-lg text-gray-600 max-w-none bg-gray-50 p-8 rounded-xl border border-gray-100"
                            dangerouslySetInnerHTML={{ __html: profile.structure }}
                        />
                    </div>
                )}

                {/* Contact Information */}
                <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-8 rounded-xl mb-20">
                    <h2 className="text-3xl font-bold mb-6">Hubungi Kami</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Alamat</h3>
                            <div className="space-y-2 opacity-90">
                                {profile.address && <p>{profile.address}</p>}
                                {(profile.city || profile.province) && (
                                    <p>{profile.city}{profile.city && profile.province ? ', ' : ''}{profile.province} {profile.postalCode}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Kontak</h3>
                            <div className="space-y-2 opacity-90">
                                {profile.email && (
                                    <p>
                                        <strong>Email:</strong>{' '}
                                        <a href={`mailto:${profile.email}`} className="hover:underline">
                                            {profile.email}
                                        </a>
                                    </p>
                                )}
                                {profile.phone && <p><strong>Telepon:</strong> {profile.phone}</p>}
                                {profile.website && (
                                    <p>
                                        <strong>Website:</strong>{' '}
                                        <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            {profile.website}
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                {(profile.facebook || profile.twitter || profile.instagram || profile.linkedin || profile.youtube) && (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-primary mb-6">Ikuti Kami</h2>
                        <div className="flex justify-center gap-6 flex-wrap">
                            {profile.facebook && (
                                <a
                                    href={profile.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#1877F2] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
                                >
                                    Facebook
                                </a>
                            )}
                            {profile.twitter && (
                                <a
                                    href={profile.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#1DA1F2] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
                                >
                                    Twitter
                                </a>
                            )}
                            {profile.instagram && (
                                <a
                                    href={profile.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
                                >
                                    Instagram
                                </a>
                            )}
                            {profile.linkedin && (
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#0A66C2] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
                                >
                                    LinkedIn
                                </a>
                            )}
                            {profile.youtube && (
                                <a
                                    href={profile.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#FF0000] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold"
                                >
                                    YouTube
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
