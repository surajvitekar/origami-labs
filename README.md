# Origami Labs AI Playground 🎯

A modular AI-first platform for rapid AI prototyping, deployment, and collaboration between humans and autonomous agents.

## 🚀 Features

- **Home Page**: Introduction to Origami Labs and AI use-cases
- **Admin Dashboard**: Manage API keys, AI agents, and system logs
- **Agent Playground**: Interactive environment for AI agent experimentation
- **Modular Architecture**: Plug-and-play components for easy extension
- **Enterprise Ready**: Built for scalability and security

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+ (App Router), React, Tailwind CSS, TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI Integration**: OpenAI SDK (GPT-4), LangChain
- **Deployment**: 
  - Frontend/API: Vercel
  - Long-running Agents: Docker on Strat-bot-node-1

## 🏗️ Project Structure

```
src/
  ├── app/              # Next.js App Router pages
  ├── components/       # Reusable React components
  ├── lib/             # Shared utilities and clients
  └── types/           # TypeScript type definitions
```

## 🚦 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/surajvitekar/OrigamiLabs.git
   cd origami-labs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp env.example .env.local   # Copy example env file
   ```
   Then edit .env.local with your actual keys.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Environment Variables

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
- `OPENAI_API_KEY`: OpenAI API key

## 🐳 Docker Setup

For long-running agents (Strat-bot-node-1 deployment):

1. Build the Docker image:
   ```bash
   docker build -t origami-labs .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 origami-labs
   ```

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [LangChain Documentation](https://js.langchain.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📝 License

This project is licensed under the MIT License.

## 🌟 Acknowledgments

- [Next.js Team](https://nextjs.org)
- [Supabase](https://supabase.io)
- [OpenAI](https://openai.com)
- [LangChain](https://js.langchain.com)
