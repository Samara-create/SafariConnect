const User = require('../models/user');
const Match = require('../models/Match');
const Trip = require('../models/Trip');
const Chat = require('../models/chat');

// 📊 Admin Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalMatches = await Match.countDocuments();
    const totalTrips = await Trip.countDocuments();
    const totalChats = await Chat.countDocuments();

    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    const recentMatches = await Match.find().populate('user1 user2').sort({ matchedAt: -1 }).limit(5);
    const recentTrips = await Trip.find().populate('userId').sort({ createdAt: -1 }).limit(5);

    const usersByGender = await User.aggregate([
      { $group: { _id: '$gender', count: { $sum: 1 } } }
    ]);

    const usersByAge = await User.aggregate([
      { $group: { _id: { $floor: { $divide: ['$age', 10] } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const matchStats = await Match.aggregate([
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$matchScore' },
          maxScore: { $max: '$matchScore' },
          minScore: { $min: '$matchScore' }
        }
      }
    ]);

    res.json({
      overview: {
        totalUsers,
        totalMatches,
        totalTrips,
        totalChats
      },
      recentActivity: {
        users: recentUsers,
        matches: recentMatches,
        trips: recentTrips
      },
      analytics: {
        usersByGender,
        usersByAge,
        matchStats: matchStats[0] || { avgScore: 0, maxScore: 0, minScore: 0 }
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: err.message });
  }
};

// 👥 Get All Users with Pagination & Filters
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', gender = '', ageRange = '' } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (gender) query.gender = gender;

    if (ageRange) {
      const [min, max] = ageRange.split('-').map(Number);
      query.age = { $gte: min, $lte: max };
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      total
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
};

// 🔁 Update User Status (Activate/Deactivate)
exports.updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user status', error: err.message });
  }
};

// ❌ Delete User and All Related Data
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await Match.deleteMany({ $or: [{ user1: userId }, { user2: userId }] });
    await Trip.deleteMany({ userId });
    await Chat.deleteMany({ participants: userId });
    await User.findByIdAndDelete(userId);

    res.json({ message: 'User and related data deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
};

// ❤️ Get All Matches
exports.getAllMatches = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const matches = await Match.find()
      .populate('user1', 'name email gender age')
      .populate('user2', 'name email gender age')
      .sort({ matchedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Match.countDocuments();

    res.json({
      matches,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      total
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch matches', error: err.message });
  }
};

// ❌ Delete Match
exports.deleteMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    await Match.findByIdAndDelete(matchId);
    res.json({ message: 'Match deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete match', error: err.message });
  }
};

// 🌍 Get All Trips
exports.getAllTrips = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const trips = await Trip.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Trip.countDocuments();

    res.json({
      trips,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      total
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trips', error: err.message });
  }
};

// 📈 Get System Analytics
exports.getSystemAnalytics = async (req, res) => {
  try {
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const matchStats = await Match.aggregate([
      {
        $group: {
          _id: null,
          totalMatches: { $sum: 1 },
          avgScore: { $avg: '$matchScore' },
          highScoreMatches: {
            $sum: { $cond: [{ $gte: ['$matchScore', 80] }, 1, 0] }
          }
        }
      }
    ]);

    const popularDestinations = await Trip.aggregate([
      { $group: { _id: '$destination', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const genderDistribution = await User.aggregate([
      { $group: { _id: '$gender', count: { $sum: 1 } } }
    ]);

    res.json({
      userGrowth,
      matchStats: matchStats[0] || {},
      popularDestinations,
      genderDistribution
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: err.message });
  }
};

// ⬇️ Export Data
exports.exportData = async (req, res) => {
  try {
    const { type } = req.params;
    let data;

    switch (type) {
      case 'users':
        data = await User.find().select('-password');
        break;
      case 'matches':
        data = await Match.find().populate('user1 user2');
        break;
      case 'trips':
        data = await Trip.find().populate('userId');
        break;
      default:
        return res.status(400).json({ message: 'Invalid export type' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to export data', error: err.message });
  }
};
