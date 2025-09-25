import Query from '../models/Query.js';

// Handle incoming queries and generate responses
export const handleQuery = async (req, res) => {
  try {
    const { query, userId, category } = req.body;

    if (!query) {
      return res.status(400).json({
        error: 'Query is required'
      });
    }

    // Simple response logic (can be enhanced with AI integration)
    const response = generateResponse(query);

    // Save query to database
    const queryRecord = new Query({
      query: query.trim(),
      response,
      userId: userId || 'anonymous',
      category: category || categorizeQuery(query),
      confidence: 0.8, // Mock confidence score
      metadata: {
        source: 'basic-handler',
        responseTime: Date.now(),
        model: 'simple-rule-based'
      }
    });

    await queryRecord.save();

    res.json({
      id: queryRecord._id,
      query,
      response,
      category: queryRecord.category,
      confidence: queryRecord.confidence,
      timestamp: queryRecord.createdAt
    });

  } catch (error) {
    console.error('Query handling error:', error);
    res.status(500).json({
      error: 'Failed to process query',
      message: error.message
    });
  }
};

// Simple response generation (can be replaced with AI model)
const generateResponse = (query) => {
  const lowercaseQuery = query.toLowerCase();

  // Basic keyword matching
  if (lowercaseQuery.includes('hours') || lowercaseQuery.includes('time')) {
    return 'Our office hours are Monday to Friday, 9:00 AM to 5:00 PM. We are closed on weekends and holidays.';
  }
  
  if (lowercaseQuery.includes('appointment') || lowercaseQuery.includes('schedule')) {
    return 'To schedule an appointment, please call us at (555) 123-4567 or use our online booking system. We typically have availability within 2-3 business days.';
  }
  
  if (lowercaseQuery.includes('location') || lowercaseQuery.includes('address')) {
    return 'We are located at 123 Main Street, Suite 100, City, State 12345. Parking is available in the building garage.';
  }
  
  if (lowercaseQuery.includes('contact') || lowercaseQuery.includes('phone')) {
    return 'You can reach us at (555) 123-4567 or email us at info@company.com. Our support team responds to emails within 24 hours.';
  }
  
  if (lowercaseQuery.includes('services') || lowercaseQuery.includes('what do you do')) {
    return 'We offer a wide range of services including consultations, technical support, and customer assistance. Would you like more information about a specific service?';
  }

  // Default response
  return 'Thank you for your question. I\'d be happy to help you with that. Could you provide more specific details about what you\'re looking for?';
};

// Simple query categorization
const categorizeQuery = (query) => {
  const lowercaseQuery = query.toLowerCase();
  
  if (lowercaseQuery.includes('appointment') || lowercaseQuery.includes('schedule')) {
    return 'appointment';
  }
  
  if (lowercaseQuery.includes('technical') || lowercaseQuery.includes('support') || lowercaseQuery.includes('problem')) {
    return 'technical';
  }
  
  if (lowercaseQuery.includes('hours') || lowercaseQuery.includes('location') || lowercaseQuery.includes('contact')) {
    return 'information';
  }
  
  return 'general';
};

// Get query statistics
export const getQueryStats = async (req, res) => {
  try {
    const stats = await Query.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgConfidence: { $avg: '$confidence' }
        }
      }
    ]);

    const totalQueries = await Query.countDocuments();

    res.json({
      totalQueries,
      categoryStats: stats,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch query statistics'
    });
  }
};