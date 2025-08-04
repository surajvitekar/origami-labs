import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
            Origami Labs AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A modular AI-first platform for rapid prototyping and deployment
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Playground Card */}
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">AI Playground</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Experiment with our AI agents in an interactive environment. Test capabilities and prototype new features.
            </p>
            <a href="/playground" className="text-blue-500 hover:text-blue-600 font-medium">
              Try it out →
            </a>
          </div>

          {/* Admin Dashboard Card */}
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Manage API keys, configure AI agents, and monitor system activity.
            </p>
            <a href="/admin" className="text-blue-500 hover:text-blue-600 font-medium">
              Manage →
            </a>
          </div>

          {/* Documentation Card */}
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Documentation</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Learn how to integrate and extend Origami Labs with our comprehensive guides.
            </p>
            <a href="/docs" className="text-blue-500 hover:text-blue-600 font-medium">
              Learn more →
            </a>
          </div>
        </main>

        <section className="mt-20 text-center">
          <h2 className="text-3xl font-semibold mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">Modular Design</h3>
              <p className="text-gray-600 dark:text-gray-300">Plug-and-play components for easy extension</p>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">AI-First</h3>
              <p className="text-gray-600 dark:text-gray-300">Built for advanced AI capabilities</p>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">Rapid Prototyping</h3>
              <p className="text-gray-600 dark:text-gray-300">Quick iteration and testing</p>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">Enterprise Ready</h3>
              <p className="text-gray-600 dark:text-gray-300">Scalable and secure deployment</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
