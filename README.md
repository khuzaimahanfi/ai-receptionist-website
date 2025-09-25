# AI Receptionist

A modern AI-powered receptionist application built with React and Node.js. This application provides an intelligent chat interface for handling customer inquiries, appointments, and general assistance.

## 🚀 Features

- **Interactive Chat Interface**: Real-time chat widget with modern UI
- **AI-Powered Responses**: Intelligent response generation for common queries
- **Multi-Agent Support**: Different specialized agents for various needs
- **Conversation History**: Track and manage conversation records
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **REST API**: Comprehensive backend API for chat and query management

## 🏗️ Architecture

```
ai-receptionist/
├─ frontend/          # React + Vite frontend application
├─ backend/           # Node.js + Express API server
├─ docker-compose.yml # Container orchestration
└─ README.md          # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (optional, for local development)

### Quick Start with Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-receptionist
```

2. Start all services:
```bash
docker-compose up -d
```

3. Open your browser:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Local Development Setup

#### Backend Setup
```bash
cd backend
npm install
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-receptionist
NODE_ENV=development
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## 📚 API Documentation

### Endpoints

#### Health Check
```
GET /api/health
```

#### Chat
```
POST /api/chat
Body: { "message": "Hello", "userId": "user123" }
```

#### Queries
```
POST /api/query
Body: { "query": "What are your hours?", "userId": "user123" }

GET /api/queries
```

#### Conversations
```
GET /api/conversations
```

## 🎯 Usage

1. **Start a Conversation**: Click the chat widget in the bottom-right corner
2. **Ask Questions**: Type your questions about hours, appointments, services, etc.
3. **Get Instant Responses**: The AI will provide relevant information
4. **Multiple Agents**: Choose different agents for specialized help

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test
```

### Backend Testing
```bash
cd backend  
npm run test
```

## 🚀 Deployment

### Production Build

#### Frontend
```bash
cd frontend
npm run build
```

#### Backend
```bash
cd backend
npm start
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Future Enhancements

- [ ] Integration with OpenAI/GPT for advanced responses
- [ ] Voice chat functionality
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Appointment booking integration
- [ ] File upload support
- [ ] Real-time notifications

## 📞 Support

For support and questions:
- Email: support@ai-receptionist.com
- Issues: [GitHub Issues](https://github.com/your-repo/ai-receptionist/issues)

---

Built with ❤️ using React and Node.js