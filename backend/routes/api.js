import express from 'express';
import { handleQuery } from '../controllers/queryController.js';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        error: 'Message is required' 
      });
    }

    // Simple echo response for now
    const response = {
      id: Date.now(),
      message: `Thank you for your message: "${message}". How else can I help you?`,
      timestamp: new Date().toISOString(),
      userId: userId || 'anonymous'
    };

    res.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process chat message' 
    });
  }
});

// Get conversations
router.get('/conversations', async (req, res) => {
  try {
    // Placeholder for conversation history
    const conversations = [
      {
        id: 1,
        userId: 'user123',
        messages: [
          { text: 'Hello', isBot: false, timestamp: new Date() },
          { text: 'Hi! How can I help you?', isBot: true, timestamp: new Date() }
        ],
        createdAt: new Date()
      }
    ];

    res.json(conversations);
  } catch (error) {
    console.error('Conversations error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch conversations' 
    });
  }
});

// Query endpoint
router.post('/query', handleQuery);

// Get query history
router.get('/queries', async (req, res) => {
  try {
    // Placeholder for query history
    const queries = [
      {
        id: 1,
        query: 'What are your office hours?',
        response: 'Our office hours are Monday to Friday, 9 AM to 5 PM.',
        timestamp: new Date()
      }
    ];

    res.json(queries);
  } catch (error) {
    console.error('Queries error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch queries' 
    });
  }
});

export default router;