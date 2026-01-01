const { ContactMessage } = require('../models');

async function syncContactMessage() {
    try {
        console.log('🔄 Syncing ContactMessage table...');

        // Sync the table (creates if not exists, updates if schema changed)
        await ContactMessage.sync({ force: true });

        console.log('✅ ContactMessage table synced successfully!');
        console.log('\nTable structure:');
        console.log('- id: INTEGER (Primary Key, Auto Increment)');
        console.log('- name: STRING (NOT NULL)');
        console.log('- email: STRING (NOT NULL, Email validation)');
        console.log('- subject: STRING (NOT NULL)');
        console.log('- message: TEXT (NOT NULL)');
        console.log('- status: ENUM(unread, read, replied) DEFAULT unread');
        console.log('- ipAddress: STRING');
        console.log('- userAgent: STRING');
        console.log('- createdAt: TIMESTAMP');
        console.log('- updatedAt: TIMESTAMP');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error syncing ContactMessage table:', error);
        process.exit(1);
    }
}

syncContactMessage();
