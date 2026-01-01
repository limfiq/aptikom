const { sequelize, IndividualMember } = require('../models');

async function syncIndividualMemberTable() {
    try {
        console.log('🔄 Syncing IndividualMember table with new structure...');

        // Drop and recreate table with new structure
        await IndividualMember.sync({ force: true });

        console.log('✅ IndividualMember table synced successfully!');
        console.log('');
        console.log('📋 New table structure:');
        console.log('   - employeeNumber (STRING, required)');
        console.log('   - name (STRING, required)');
        console.log('   - affiliation (STRING, required)');
        console.log('   - studyProgram (STRING, required)');
        console.log('   - role (STRING, required)');
        console.log('   - province (STRING, required)');
        console.log('   - validityPeriod (DATEONLY, required)');
        console.log('');
        console.log('⚠️  Note: All existing data has been removed.');
        console.log('   Run: node scripts/seed-individual-members.js to add sample data');
        console.log('');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error syncing table:', error);
        process.exit(1);
    }
}

syncIndividualMemberTable();
