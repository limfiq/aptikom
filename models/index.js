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
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    affiliation: {
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
    image: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'IndividualMember',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false
});

module.exports = {
    sequelize,
    Post,
    Event,
    BoardMember,
    MemberInstitution,
    Journal,
    Document,
    OrganizationProfile,
    IndividualMember
};
