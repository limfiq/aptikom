const { ContactInfo, sequelize } = require('../models');

async function seedContact() {
    try {
        // Sync database
        await sequelize.sync({ alter: true });
        console.log('Database synced successfully');

        // Clear existing contact info
        await ContactInfo.destroy({ where: {} });
        console.log('Cleared existing contact info');

        // Create APTIKOM contact information
        const contactData = {
            officeName: 'Kantor Pusat',
            address: 'Kampus STIMATA Malang',
            city: 'Malang',
            province: 'Jawa Timur',
            postalCode: '65145',
            phone: '+62 811 8300 996',
            email: 'admin@aptikomjatim.or.id',
            weekdayHours: '08.00 - 16.00 WIB',
            weekendHours: 'Tutup',
            latitude: -7.945561941639211,
            longitude: 112.65289152883587
        };

        await ContactInfo.create(contactData);
        console.log('✅ Successfully created contact information');

        // Display created contact info
        const createdContact = await ContactInfo.findOne({ raw: true });
        console.log('\nContact Information:');
        console.log(`Office: ${createdContact.officeName}`);
        console.log(`Address: ${createdContact.address}`);
        console.log(`Phone: ${createdContact.phone}`);
        console.log(`Email: ${createdContact.email}`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding contact info:', error);
        process.exit(1);
    }
}

seedContact();
