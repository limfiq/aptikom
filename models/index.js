const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

// Post Model
const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Post',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false
});

// Event Model
const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    link: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Event',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false
});

// BoardMember Model
const BoardMember = sequelize.define('BoardMember', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    period: {
        type: DataTypes.STRING,
        allowNull: false
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'BoardMember',
    timestamps: false
});

// MemberInstitution Model
const MemberInstitution = sequelize.define('MemberInstitution', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING
    },
    website: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'MemberInstitution',
    timestamps: false
});

// Journal Model
const Journal = sequelize.define('Journal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publisher: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rank: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'Journal',
    timestamps: false
});

// Document Model
const Document = sequelize.define('Document', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fileUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Document',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updatedAt'
});

// OrganizationProfile Model
const OrganizationProfile = sequelize.define('OrganizationProfile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Basic Information
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'APTIKOM'
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Asosiasi Pendidikan Tinggi Informatika dan Komputer'
    },
    abbreviation: {
        type: DataTypes.STRING,
        defaultValue: 'APTIKOM'
    },

    // Legal & Establishment
    establishedDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    legalStatus: {
        type: DataTypes.STRING,
        allowNull: true
    },
    registrationNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Contact Information
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    province: {
        type: DataTypes.STRING,
        allowNull: true
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Social Media
    facebook: {
        type: DataTypes.STRING,
        allowNull: true
    },
    twitter: {
        type: DataTypes.STRING,
        allowNull: true
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true
    },
    linkedin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    youtube: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Organizational Details
    chairperson: {
        type: DataTypes.STRING,
        allowNull: true
    },
    chairpersonPhoto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    secretary: {
        type: DataTypes.STRING,
        allowNull: true
    },
    treasurer: {
        type: DataTypes.STRING,
        allowNull: true
    },
    totalMembers: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    totalInstitutions: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    // Core Content
    history: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    vision: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    mission: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    goals: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    objectives: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    structure: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    // Media
    logo: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'OrganizationProfile',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updatedAt'
});

// IndividualMember Model
const IndividualMember = sequelize.define('IndividualMember', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employeeNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    affiliation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    studyProgram: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false
    },
    validityPeriod: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'IndividualMember',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false
});

// Banner Model
const Admin = require('./Admin');
const Banner = require('./Banner');
const ContactInfo = require('./ContactInfo');
const ActivityLog = require('./ActivityLog');

// Export all models
const ContactMessage = require('./ContactMessage');
const Achievement = require('./Achievement');
const Partner = require('./Partner');

module.exports = {
    Post,
    Event,
    BoardMember,
    MemberInstitution,
    Journal,
    Document,
    OrganizationProfile,
    IndividualMember,
    Admin,
    Banner,
    ContactInfo,
    ActivityLog,
    ContactMessage,
    Achievement,
    Partner,
    sequelize
};
